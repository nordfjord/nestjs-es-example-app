import { EventStoreDBClient } from '@eventstore/db-client'
import { Module, Global } from '@nestjs/common'

const EventStore = {
  provide: EventStoreDBClient,
  useFactory: () =>
    EventStoreDBClient.connectionString(
      process.env.ESDB_CONN_STRING ||
        'esdb://admin:changeit@localhost:2113?tls=false',
    ),
}

@Global()
@Module({ providers: [EventStore], exports: [EventStore] })
export class EventStoreModule {}
