# @cucumber/screenplay

[![CI](https://github.com/cucumber/screenplay.js/actions/workflows/ci.yml/badge.svg)](https://github.com/cucumber/screenplay.js/actions/workflows/ci.yml)

This small library is an implementation of the [screenplay pattern](https://cucumber.io/blog/bdd/understanding-screenplay-(part-1)/) for
[cucumber.js](https://github.com/cucumber/cucumber-js/).

It also enables you to swap in and out different implementations of automation code (*interactions*), so you can run the same scenarios against
different layers of your system, with different tradeoffs:

* In-memory - only interact with the system's domain logic (fastest, lowest confidence)
* HTTP - only interact with the system via a HTTP API (slower, medium confidence)
* UI - only interact with the system via the UI (slowest, highest confidence)

Don't be put off by "slowest" here - you will still be able to run 10-100 scenarios *per second* if you automate through the UI
using [@cucumber/electron](https://github.com/cucumber/cucumber-electron).

## Installation

First, add the library to your project:

    npm install @cucumber/screenplay --save-dev

## Usage

This guide will walk you through the usage of the library step by step. For a full example, please refer to the files
in the `features` directory (which are also acceptance tests for this library).

### Actors

The central concept in `@cucumber/screenplay` is the `Actor`. An actor object represents a user interacting with the
system.

In order to access actor objects from your step definitions, you first need to define an `{actor}` 
[parameter type](https://cucumber.io/docs/cucumber/cucumber-expressions/#parameter-types). `@cucumber/screenplay`
provides some utilities to do this.

Create a file called `features/support/World.ts` (if you haven't already got one) and add the following code: 

```typescript
import { setWorldConstructor } from '@cucumber/cucumber'
import { ActorWorld, defineActorParameterType } from '@cucumber/screenplay'

// Define an {actor} parameter type that creates Actor objects
defineActorParameterType()

// Define your own World class that extends from ActorWorld
export default class World extends ActorWorld {
}
setWorldConstructor(World)
```

Your step definitions will now be passed `Actor` objects for `{actor}` parameters, for example:

```gherkin
Then Martha should hear nothing
```

```typescript
Then('{actor} should hear nothing', async function (actor: Actor) {
  // Do something with the actor
})
```

#### Using an explicit ActorLookup

If you cannot extend `ActorWorld`, you can add an `ActorLookup` field to your existing world class like so:

```typescript
import { ActorLookup } from '@cucumber/screenplay'

class World {
  private readonly actorLookUp = new ActorLookup()

  public findOrCreateActor(actorName: string): Actor<World> {
    return this.actorLookUp.findOrCreateActor(this, actorName)
  }
}
```

#### defineActorParameterType options

The `defineActorParameterType` function defines a parameter type named `{actor}` by default, and it uses the RegExp
`/[A-Z][a-z]+/` (a capitailsed string).

If you want to use a different name or regexp, you can override these defaults:

```typescript
defineActorParameterType({ name: 'acteur' })
defineActorParameterType({ regexp: /Marcel|Bernadette|Hubert/ })
defineActorParameterType({ name: 'acteur', regexp: /Marcel|Bernadette|Hubert/ })
```

### Interacting with the system

Now that you have an `Actor` object, you can use it to interact with the system under test. To do so, the `Actor` has 
two methods: `attemptsTo` and `ask`.

Both methods are technically synonymous, but it adds some clarity to use `attemptsTo` to perform an action 
that modifies the state of the system, and `ask` to query the system for information. For example:

```typescript
When('{actor} logs in', function (actor: Actor) {
  actor.attemptsTo(logIn())
})

Then('{actor} should be logged-in', function (actor: Actor<World>) {
  assert.ok(actor.ask(isLoggedIn()))
})
```

### Defining interactions and questions

The `Actor#attemptsTo` and `Actor#ask` methods accept a single `Interaction` argument that describes how to perform
an action (or ask a question).

Interactions are simply functions that return a function that takes an `Actor` parameter. For example:

```typescript
export default function signUp(email: string, password: string) {
  return function (actor: Actor<World>): string {
    // Interact with the system the way you like (Selenium, API call or whatever)

    return userId // the ID assigned to the user on sign-up
  }
}
```

Now you can use the interaction in your step definitions:

```typescript
const userId = await actor.attemptsTo(signUp('someone@example.com', 'some-secret-password'))
```

### Using different interaction implementations

It can often be useful to have multiple implementations of the same interaction. This allows you
to build new functionality incrementally with fast feedback.

For example, you might be working on a new requirement that allows users to log in. You can start
by building just the server side domain logic without any HTTP or UI, and get quick feedback as you progress.

Then, you can run the same scenarios again, but this time swapping out your interactions with implementations
that make HTTP requests or interact with a DOM - without changing any code.

If you look at the [shouty example included in this repo](./features), you will see that we organized 
our interactions/questions based on a tree structure:

```
features
├── hear_shout.feature
└── support
    └── interactions
        ├── direct
        │   ├── messagesHeard.ts
        │   ├── moveTo.ts
        │   └── shout.ts
        ├── dom
        │   ├── messagesHeard.ts
        │   ├── moveTo.ts
        │   └── shout.ts
        └── http
            ├── messagesHeard.ts
            ├── moveTo.ts
            └── shout.ts
```

In order to decide at run-time what implementations to use, you can use the *interaction loader* provided in `@cucumber/screenplay`:

```typescript
import { setWorldConstructor } from '@cucumber/cucumber'
import { ActorWorld, makeInteractionLoader, defineActorParameterType, Interaction } from '@cucumber/screenplay'

// Declare interaction signatures
type Shout = (message: string) => Interaction
type MessagesHeard = () => Interaction<readonly string[]>

export default class World extends ActorWorld {
  public shout: Shout
  public messagesHeard: MessagesHeard
}
setWorldConstructor(World)

Before(async function (this: World) {
  const interactionsDir = `${__dirname}/interactions/${process.env.CUCUMBER_SCREENPLAY_INTERACTIONS || 'direct'}`
  const interaction = makeInteractionLoader(interactionsDir)

  this.shout = await interaction('shout')
  this.messagesHeard = await interaction('messagesHeard')
})
```

This will load the appropriate interations based on the value of the `CUCUMBER_INTERACTIONS` environment variable.

If you're using this technique, you also need to adapt your step definitions to reference interactions from the *world* (`this`):

```typescript
When('{actor} shouts {string}', async function (this: World, actor: Actor, message: string) {
    await actor.attemptsTo(this.shout(message))
  }
)
```

### Sharing data between steps

Your actors have the abililty to `remember` and `recall` data between steps. For example:

```typescript
When('{actor} logs in', function (this: World, actor: Actor<World>) {
  const userId = actor.attemptsTo(this.login())
  actor.remember('userId', userId)
})

Then('{actor} should be logged in', function (actor: Actor<World>) {
  assert.ok(actor.recall('userId'))
})
```

**Note:** the data remembered is scoped by `Actor`, so you can not access a data remembered by an actor when using another 
one. You can also have multiple actors storing different data with the same key. Every `Actor` is discarded at the end of
each scenario, so you won't be able to `recall` anything from previous scenarios.

### Accessing the world from actors

If your interactions need to access data in the `world`, they can do so via the `Actor#world` property. If you're doing this
you should also declare the generic type of the actor in the interaction implementation:

```typescript
export const moveTo: MoveTo = (coordinate) => {
  // We're declaring the World type of the actor so that we can access its members
  return async (actor: Actor<World>) => {
    actor.world.shouty.moveTo(actor.name, coordinate)
  }
}
```
