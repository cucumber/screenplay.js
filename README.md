# @cucumber/screenplay

This library is intented to ease the implementation of the [screenplay pattern](https://cucumber.io/blog/bdd/understanding-screenplay-(part-1)/) with `cucumber.js`.

## Usage

First, add the library to your project:

    npm install @cucumber/screenplay --save-dev

### Actor lookup

Then, you will need a way to find actors inside your step definitions. For example, you can add a lookup map in your World instance and a custom parameter type:

```typescript
class World {
  private readonly actorByName = new Map<string, Actor>()

  findOrCreateActor(actorName: string): Actor<World> {
    let actor = this.actorByName.get(actorName)

    if (actor === undefined) {
      actor = new Actor<World>(this, actorName)
      this.actorByName.set(actorName, actor)
    }

    return actor
  }
}

defineParameterType({
  name: 'actor',
  regexp: /[A-Z][a-z]+/,
  transformer(this: World, actorName: string) {
    return this.findOrCreateActor(actorName)
  },
})
```

In your step, you will then be able to get your `Actor` instance, for example:

```typescript
Then('{actor} hears nothing', async function (this: World, actor: Actor<World>) {
  // Do something with the actor
})
```

### Interacting with the system

Now that you have an `Actor` object, you can use it to interact with the system under test. To do so, the `Actor` has two methods: `attemptsTo` and `ask`.

Both methods are technically synonymous, but it adds some clarity to use `attemptTo` when performing an action on the system and use `ask` to perform a check. For example:

```typescript
When('{actor} logs in', function (actor: Actor<World>) {
  actor.attempTo(logIn())
})

Then('{actor} should be logged-in', function (actor: Actor<World>) {
  assert.ok(actor.ask(isLoggedIn())
})
```

### Creating interactions or questions

Interactions are simply functions that return a function that takes an `Actor` parameter. For example:

```typescript
export default function signUp(email: string, password: string) {
  return function (actor: Actor<World>) {
    // Interact with the system the way you like (Selenium, API call or whatever)

    return userId // the ID assigned to the user on sign-up
  }
}
```

And then to use it in the steps:

```typescript
  const userId = actor.attemptTo(signUp('someone@example.com', 'some-secret-password'))
```

You can define those functions as the `World` method or as simple function, depending on your needs.
If you look at the [shouty example included in this repo](./samples/shouty), you will see that we organized our interactions/questions based on a tree structure:

```
features/
└── support/
    ├── interactions
    |   ├── anInteraction
    |   |   ├── inProcessAnInteraction.ts
    |   |   └── httpAnInteraction.ts
    |   └── anotherInteraction
    |       ├── inProcessAnotherInteraction.ts
    |       └── httpAnotherInteraction.ts
    └── questions
        ├── aQuestion
        |   ├── inProcessAQuestion.ts
        |   └── httpAQuestion.ts
        └── anotherQuestion
            ├── inProcessAnotherQuestion.ts
            └── httpAnotherQuestion.ts
```

This architecture is not mandatory at all, but proves to be really usefull when you want to have multiple implementations of the same interaction/question, but interacting
with the system under test on different layers.

### Sharing data between steps

Your actors have the possibility to recall data between steps using the `recall` and `remember` methods. For example:

```typescript
When('{actor} logs in', function (actor: Actor<World>) {
  const loggedIn = actor.attemptsTo(login())
  actor.remember('loggedIn', loggedIn)
})


Then('{actor} should be logged-in', function (actor: Actor<World>) {
  assert.ok(actor.recall('loggedIn'))
})
```

**Note:** the data remembered are scoped by `Actor`, so you can not access a data remembered by an actor when using another one. You can also have multiple
actors storing different data with the same key.