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

Given('{actor} is located at {coordinate}', async function (this: World, actor: Actor<World>, coordinate: Coordinate) {
  // It's a good guideline to never use interations in Given steps.
  // Given steps is for setting up the "scene" of the scenario, and the preferred way
  // to do this is by doing it directly in the domain layer
  this.shouty.moveTo(actor.name, coordinate)
})

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
