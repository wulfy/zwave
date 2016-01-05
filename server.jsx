import express                   from 'express';
import React                     from 'react';
import { renderToString }        from 'react-dom/server'
import { RoutingContext, match } from 'react-router';
import createLocation            from 'history/lib/createLocation';
import routes                    from 'routes';
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import * as reducers             from 'reducers';
import path                      from 'path';
import { applyMiddleware } from 'redux';
import promiseMiddleware   from 'lib/promiseMiddleware';
import {logMiddleware,thunkMiddleware}   from 'lib/logMiddleware';
import fetchComponentData from 'lib/fetchComponentData';
import fs from 'fs';
import yaml from 'js-yaml';
import {saveConfig} from 'actions/ConfigAction';

const app = express();


app.use(express.static(path.join(__dirname, 'dist')));
const zwave_config = yaml.safeLoad(fs.readFileSync('/Users/llasry/Documents/dev/zwave/dist/config.yml', 'utf8'));
const devices_config = yaml.safeLoad(fs.readFileSync('/Users/llasry/Documents/dev/zwave/dist/devices.yml', 'utf8'));


app.use((req, res) => {
  const location = createLocation(req.url);
  const reducer  = combineReducers(reducers);
  const store    = applyMiddleware(thunkMiddleware,promiseMiddleware,logMiddleware)(createStore)(reducer);

  //matche la location avec le tableau de "routes" et retourne un objet renderProps qui contient l'élément correspondant a la route
  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) { 
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) return res.status(404).end('Not found.');

    store.dispatch(saveConfig(devices_config));

    function renderView()
    {
            const InitialComponent = (
              //provider permet de fournir le store au composant 
              <Provider store={store}> 
                  <RoutingContext {...renderProps} />
                </Provider>
            );
            //this.props.createThunkFlickr();
            const componentHTML = renderToString(InitialComponent);
            const initialState = store.getState();

            const HTML = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>Zwave mini interface</title>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
                <script type="application/javascript">
                  window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                  function fadeOut(domid)
                  {
                    $( domid ).fadeOut( "slow");
                  }
                </script>
              </head>
              <body>
                <div id="react-view">${componentHTML}</div>
                <script type="application/javascript" src="/bundle.js"></script>
              </body>
          </html>    
        `
            //res.end(HTML);
            return HTML;
      }
      console.log(renderProps);
      //permet de créer un promise pour traiter les taches asynchrone (promise de la todo et request de flickr)
      //Ainsi le serveur attend le retour de la promesse pour générer le rendu
      //utilise les needs des components fournis par renderprops 
      //ces components sont ceux utilisés dans route car renderprops est rempli par rect-router
      fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
                        .then(renderView)
                        .then(html => res.end(html))
                        .catch(err => res.end(err.message));
  });
});

export default app;