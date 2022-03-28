import { ConflictException } from '@nestjs/common'

type DomainEvent<Type extends string, Data extends Record<string, any>> = {
  type: Type
  data: Data
}

export type UserRegistered = { email: string; passwordHash: string }
export type RegisterUser = { email: string; passwordHash: string }

export type Event = DomainEvent<'UserRegistered', UserRegistered>

export type Command = DomainEvent<'RegisterUser', RegisterUser>

export type State =
  | { type: 'initial' }
  | { type: 'registered'; email: string; passwordHash: string }

export const initialState = { type: 'initial' }

export const evolve = (state: State, event: Event): State => {
  switch (event.type) {
    case 'UserRegistered':
      return {
        type: 'registered',
        email: event.data.email,
        passwordHash: event.data.passwordHash,
      }
  }
}

export const decide = (state: State, command: Command) => {
  switch (command.type) {
    case 'RegisterUser':
      if (state.type === 'initial')
        return [{ type: 'UserRegistered', data: command.data }]
      // the practise of using nestjs exceptions inside the decider
      // can be debated. It's here for brevity. You may want to consider
      // mapping domain exceptions to HTTP status codes instead
      throw new ConflictException('User already registered')
  }
  return []
}
