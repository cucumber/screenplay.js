import { Given, When, Then } from '@cucumber/cucumber'
import {Actor} from '../../src'

import assert from 'assert'
import World from '../support/World'

Given('{actor} is located {int}m from {actor}', async function (this: World, mainActor: Actor<World>, distance: number, secondaryActor: Actor<World>) {
  await mainActor.attemptsTo(this.moveTo(distance))
})

When('{actor} shouts {string}', async function (this: World, actor: Actor<World>, message: string) {
  await actor.attemptsTo(this.shout(message))
  actor.remember('lastMessage', message)
})

Then('{actor} hears {actor}’s message', async function (this: World, mainActor: Actor<World>, secondaryActor: Actor<World>) {
  const mainActorHeardMessages = await mainActor.ask(this.messagesHeard())
  const secondaryActorLatestMessage = secondaryActor.recall('lastMessage')

  assert.deepStrictEqual(mainActorHeardMessages, [secondaryActorLatestMessage])
})

Then('{actor} hears nothing', async function (actor: Actor<World>) {
  const heardMessages = await actor.ask(this.messagesHeard())

  assert.deepStrictEqual(heardMessages, [])
});
