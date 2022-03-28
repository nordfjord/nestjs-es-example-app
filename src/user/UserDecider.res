type user_registered = {email: string, passwordHash: string}

type event = UserRegistered(user_registered)
type command = RegisterUser(user_registered)
type state = Initial | Registered(user_registered)

@gentype
let initialState = Initial

@gentype
let evolve = (_state, event) =>
  switch event {
  | UserRegistered(data) => Registered(data)
  }

exception User_already_registered

@gentype
let decide = (state, command) =>
  switch (state, command) {
  | (Initial, RegisterUser(data)) => [UserRegistered(data)]
  | (Registered(_), RegisterUser(_)) => raise(User_already_registered)
  }