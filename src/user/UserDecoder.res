open UserDecider

@gentype
let encode = ev =>
  switch ev {
  | UserRegistered(data) => {"type": "UserRegistered", "data": data}
  }

@gentype
let decode = ev =>
  switch ev["type"] {
  | "UserRegistered" => Some(UserRegistered(ev["data"]))
  | _ => None
  }