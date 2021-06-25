import { Given, When, Then, defineParameterType } from '@cucumber/cucumber'
import { Actor } from '../../src'

import assert from 'assert'
import World from '../support/World'
import { Coordinate } from '../src/types'

defineParameterType({
  name: 'coordinate',
  regexp: /\(\s*(\d+),\s*(\d+)\s*\)/,
  transformer(x, y) {
    return { x: +x, y: +y }
  },
})

Given(
  '{actor} is located at {coordinate}',
  async function (this: World, mainActor: Actor<World>, coordinate: Coordinate) {
    await mainActor.attemptsTo(this.moveTo(coordinate))
  }
)

When('{actor} shouts {string}', async function (this: World, actor: Actor, message: string) {
  await actor.attemptsTo(this.shout(message))
  actor.remember('lastMessage', message)
})

Then('{actor} hears {actor}’s message', async function (this: World, mainActor: Actor, secondaryActor: Actor) {
  const mainActorHeardMessages = await mainActor.ask(this.messagesHeard())
  const secondaryActorLatestMessage = secondaryActor.recall('lastMessage')

  assert.deepStrictEqual(mainActorHeardMessages, [secondaryActorLatestMessage])
})

Then('{actor} hears nothing', async function (actor: Actor) {
  const heardMessages = await actor.ask(this.messagesHeard())

  assert.deepStrictEqual(heardMessages, [])
})
