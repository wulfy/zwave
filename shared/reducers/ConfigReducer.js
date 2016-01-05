const defaultState = {};

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

export default function configReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_CONFIG':
      return action.res.data ;
    case 'SAVE_CONFIG':
      return action.data ;
    default:
      return state;
  }
}