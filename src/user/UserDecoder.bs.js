// Generated by ReScript, PLEASE EDIT WITH CARE


function encode(ev) {
  return {
          type: "UserRegistered",
          data: ev._0
        };
}

function decode(ev) {
  var match = ev.type;
  if (match === "UserRegistered") {
    return /* UserRegistered */{
            _0: ev.data
          };
  }
  
}

export {
  encode ,
  decode ,
  
}
/* No side effect */