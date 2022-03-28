import {
  ErrorType,
  EventData,
  EventStoreDBClient,
  ExpectedRevision,
  jsonEvent,
  NO_STREAM,
  ResolvedEvent,
} from '@eventstore/db-client'

type Decider<S, E, C> = {
  initialState: S
  evolve: (state: S, event: E) => S
  decide: (state: S, command: C) => E[]
}

async function* handleEmpty(eventStream: AsyncIterable<ResolvedEvent>) {
  try {
    for await (const resolved of eventStream) {
      if (!resolved.event) continue
      yield resolved.event
    }
  } catch (err) {
    if (err.type === ErrorType.STREAM_NOT_FOUND) return
    throw err
  }
}

type Ctx = { $correlationId?: string; $causationId?: string; userId?: string }

type Event = { type: string; data: any }

export const createCommandHandler =
  <S, E, C>(
    client: EventStoreDBClient,
    getStreamName: (command: C) => string,
    decider: Decider<S, E, C>,
    encode: (e: E) => Event = (e) => e as any,
    decode: (e: Event) => E = (e) => e as any,
  ) =>
  async (command: C, context?: Ctx) => {
    const streamName = getStreamName(command)
    let state = decider.initialState
    let revision: ExpectedRevision = NO_STREAM
    for await (const event of handleEmpty(client.readStream(streamName))) {
      state = decider.evolve(state, decode(event))
      revision = event.revision
    }

    const newEvents = decider.decide(state, command).map((event) => {
      const encoded = encode(event)
      return jsonEvent({
        type: encoded.type,
        data: encoded.data,
        metadata: context,
      })
    })

    await client.appendToStream(streamName, newEvents, {
      expectedRevision: revision,
    })

    return { success: true }
  }
