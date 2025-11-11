import assert = require('assert')
import { Action, ActorWorld } from '../src'
import type { IActorWorldOptions } from '../src/ActorWorld'
import asyncAssignTasks from '../src/asyncAssignTasks'

describe(asyncAssignTasks.name, () => {
  const options: IActorWorldOptions = { parameters: {} } as IActorWorldOptions

  // success
  it('successfully loads a task', async () => {
    class TestWorld extends ActorWorld {
      public goodtask: () => Action<void>
    }

    const world = new TestWorld(options)

    // Load the task
    await asyncAssignTasks(world, `${__dirname}/fixtures/tasks/goodtasks`)

    // Execute the task
    world.goodtask()
  })

  // error compiling
  it('fails with a helpful error message if the task could not be compiled', async () => {
    class TestWorld extends ActorWorld {
      public brokentask: () => Action<void>
    }

    const world = new TestWorld(options)

    // Try to load the task
    await assert.rejects(asyncAssignTasks(world, `${__dirname}/fixtures/tasks/brokentask`), {
      name: 'TSError',
      message: /Cannot find module '\.\/src'/,
    })
  })
})
