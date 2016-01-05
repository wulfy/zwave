import React from 'react';
import DevicesView              from 'components/DevicesView';
import { bindActionCreators } from 'redux';
import * as DevicesActions       from 'actions/DevicesActions';
import { connect }            from 'react-redux';



//connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
//revient à export default connect(state => ({ todos: state.todos }))(TodoApp)
//mapStateToProps => If specified, the component will subscribe to Redux store updates. Any time it updates, mapStateToProps will be called
//mapDispatchToProps => If an object is passed, each function inside it will be assumed to be a Redux action creator. An object with the same function names, but bound to a Redux store, will be merged into the component’s props.
/*
function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(todoActionCreators, dispatch),
    counterActions: bindActionCreators(counterActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)

Le state de state.todos est celui du store?


state.todos (normalement), le state est le store et le todos du state est le reducer (cf index du répertoire reducers qui fait un * import à todos)

on utilise state.todos donc les messages (contenus dans state.message) ne modifient pas le store et donc la vue

autre point flickr view pour le moment est définit dans le composant "home" pluggé sur le connect TODO, il va se refresh donc avec le composant home à
chaque update de todo.=> fixed maintenant il est à part
si on veut un refresh séparé il faut prévoir un composant différent ou ailleurs (voir comment faire avec route)
par contre si on met à jour flickr il ne raffraichit pas home

state: state n'est pas utile c'est juste pour voir ce qui est passé comme paramètre , le state du store (cad la list des reducers)
*/
@connect(state => ({ devices: state.devices, config: state.config}))
export default class DevicesContainer extends React.Component {

  

	render()
	{
		
    	var { devices, dispatch,config } = this.props;
    	console.log("STATE RENDERING DEVICES CONTAINER : ");
    	console.log(devices.ServerTime +  "-" + devices.status );
      

      //console.log(devices_config);
      console.log(config);
      console.log(config.devices[1]);
    	//todos = todos.todos.concat(todos.message); //décommenter pour que message change le store
		return (
      		<div id="device-container">
           {devices.ServerTime} - {devices.status}
	      		<DevicesView deviceslist={devices.result} config={config}
		          {...bindActionCreators(DevicesActions, dispatch)} />
      		</div>
      		);
	}

}