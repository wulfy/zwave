import request from 'axios';
const BACKEND_URL = 'http://192.168.1.27:8080/json.htm?';
const REQUEST_STATUS_URL = BACKEND_URL + 'type=devices&filter=all&used=true&order=Name&plan=0&lastupdate=1451569488';

function getSwitchCommand(deviceId,switchCommand)
{
  return BACKEND_URL + "type=command&param=switchlight&idx="+deviceId+"&switchcmd="+switchCommand+"&level=0&passcode=";
}



export function SendCommand(deviceId,switchCommand) {
  console.log(getSwitchCommand(deviceId,switchCommand));
  return {
    type: 'SEND_SWITCH_COMMAND',
    promise: request.get(getSwitchCommand(deviceId,switchCommand)),
    date: Date.now()
  }
}

export function getDevicesStatus() {
  return {
    type: 'REQUEST_STATUS',
    promise: request.get(REQUEST_STATUS_URL),
    date: Date.now()
  }
}