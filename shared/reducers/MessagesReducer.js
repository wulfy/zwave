import Immutable from 'immutable';

const defaultState = {list:{},message:{}};

function dateToStr(vardate) {
  console.log("transforming" + vardate);
   var yyyy = vardate.getFullYear().toString();
   var mm = (vardate.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = vardate.getDate().toString();
   var ss  = vardate.getSeconds().toString();
   var ii  = vardate.getMinutes().toString();
   var hh  = vardate.getHours().toString();
   return ('' + dd+'/'+mm+'/'+yyyy+' '+hh+':'+ii+':'+ss); // padding
  };

export default function messageReducer(state = defaultState, action) {
  switch(action.type) {
    case 'SEND_SWITCH_COMMAND':
      return action.res.data ;
    case 'SEND_SWITCH_COMMAND_FAILURE':
      return action.res.data ;
    default:
      return state;
  }
}