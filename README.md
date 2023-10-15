# Codefever Typescript level framework

This is the readme for the typescript framework for minecraft education

# Terminology

## Puppeteer

Puppeteer is a class that handles all the UI code for displaying messages to the player. It also handles translations. see [Translations](#translations)

## MindKeeper

This is the system that handles all the world storage, supported types are `boolean`, `number`, `string`

> **Important** : all registering of the world variables must be done in the world.afterEvents.worldInitialize event (this event can't send anything to the world (like messages))
>
> Here is a example of a definition of the world variable foo

```typescript
world.afterEvents.worldInitialize.subscribe(({ propertyRegistry }) => {
  mindKeeper.registerStore("foo", StoreType.string);

  mindKeeper.registerToWorld(propertyRegistry);
});
```

## Level (could be abit convoluted) **WIP**

This defines a level in a world, it has 3 callback functions as parameters. These functions should

- define the setup logic
- define the update (loop) logic (Used for actionbar mainly)
- define the condition to pass the level
- define the code to be run when the level is completed

> There is a a AbstractCondition class included with a BlockCondition. This (convoluted) way you can define a BlockCondition in the function that checks if the level is complete.

## Translations

Translations work with a resource pack. It's the same as with regular resource packs. The way it works with Pupeteer is to set a message to the screen but add the "%" prefix to the key.
So `pupeteer.setActionbar("%foo.bar)` will look for the key `foo.bar` in the resource pack and display that message.

# Random knowlege

bunch of helper scripts for this [here](https://github.com/JaylyDev/ScriptAPI)
This could be handy [jaylydb](https://github.com/JaylyDev/ScriptAPI/tree/stable/scripts/jaylydb)

# Authors

- [Bram Verhulst](https://github.com/brammie15) :p
