import { Body, Controller, Post } from '@nestjs/common'
import { IsEmail, IsString, Matches, MinLength } from 'class-validator'
import { hash, genSalt } from 'bcrypt'
import * as Decider from './user.decider'
import { AppendResult, EventStoreDBClient } from '@eventstore/db-client'
import { createCommandHandler } from '../eventstore/command-handler'

class RegisterUserDto {
  @IsEmail()
  email: string
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string
}
@Controller('user')
export class UserController {
  private readonly handle: (
    command: Decider.Command,
  ) => Promise<{ success: boolean }>
  constructor(private readonly client: EventStoreDBClient) {
    this.handle = createCommandHandler(
      client,
      // email is the primary ID of a user in our system
      (cmd) => `User-${cmd.data.email}`,
      Decider,
    )
  }

  @Post('register')
  async register(@Body() { email, password }: RegisterUserDto) {
    const passwordHash = await hash(password, await genSalt())
    return this.handle({ type: 'RegisterUser', data: { email, passwordHash } })
  }
}
