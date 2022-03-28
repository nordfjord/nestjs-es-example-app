import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { EventStoreModule } from './eventstore/eventstore.module'

@Module({
  imports: [UserModule, EventStoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
