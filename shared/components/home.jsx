import React                  from 'react';
import { bindActionCreators } from 'redux';
import DevicesContainer       from 'components/DevicesContainer';
import MessagesContainer       from 'components/MessagesContainer';
import * as DevicesActions       from 'actions/DevicesActions';

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
dispatch est fourni par provider (cf client/index et server.jsx)

autre point flickr view pour le moment est définit dans le composant "home" pluggé sur le connect TODO, il va se refresh donc avec le composant home à
chaque update de todo.
si on veut un refresh séparé il faut prévoir un composant différent ou ailleurs (voir comment faire avec route)
par contre si on met à jour flickr il ne raffraichit pas home
*/
export default class Home extends React.Component {
  //utilisé dans fetch component data
  static needs = [
      DevicesActions.getDevicesStatus
    ]

  render() 
  {
    console.log("render home");
    return (
      <div id="todo-list">
          <MessagesContainer />
          <DevicesContainer />
      </div>
    );
  }
}