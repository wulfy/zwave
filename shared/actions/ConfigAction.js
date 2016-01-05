import request from 'axios';
const BACKEND_URL = 'http://192.168.1.27:8080/json.htm?';

export function saveConfig(data)
{
  return {
    type: 'SAVE_CONFIG',
    data: data,
    date: Date.now()
  }
}

export function getConfig() {
  return {
    type: 'GET_CONFIG',
    promise: request.get("url"),
    date: Date.now()
  }
}
