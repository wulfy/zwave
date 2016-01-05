# zwave mini interface

A based react isomorphic interface to display zwave devices and send action.
Use DOMOTICZ API (http://www.domoticz.com/)

(https://cdn2.iconfinder.com/data/icons/freecns-cumulus/32/519791-101_Warning-128.png "warning") This is only a POC.
=> For security reason it works only in local network (cause it's not using any API token or other authentification)
=> there are lot s of logs in the console

## GOALS
Goals of this POC are
- use the DOMOTICZ API
- use react isomorphic concepts with redux as a flux implementation
- use external files to configure the display
- handle action errors and use redux middlewares

## INSTALLATION
- Clone the repo
- launch npm install

## RUN
- launch "npm run build" to generate "bundle.js" client side code
- launch "npm run [dev/prod]" to launch the server (listening on port 3000)

## CONFIGURE
- edit devices.yml to configure the device display (is it a switch with "actions" or only a meter ?, wich icon should we display, etc.)

## DEMO
- Go to http://localhost:3000/home
- you can click on the switch devices to switch on/off
- you can display meters devices 



