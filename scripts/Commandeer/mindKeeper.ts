import { ChatSendAfterEvent, DynamicPropertiesDefinition, PropertyRegistry, World } from "@minecraft/server";

class Store {
  type: StoreType;
  name: string;

  constructor(type: StoreType, name: string) {
    this.type = type;
    this.name = name;
  }

  getType(): StoreType {
    return this.type;
  }

  getName(): string {
    return this.name;
  }
}

enum StoreType {
  string = "string",
  number = "number",
  boolean = "boolean",
}

/**
 * Represents a Mindkeeper, responsible for managing stores and dynamic properties in a world.
 */
class Mindkeeper {
  registerdStores: Array<Store> = [];
  propertyManager = new DynamicPropertiesDefinition();
  world: World;
  initialised: boolean = false;
  debugLog: string[] = [];

  /**
   * Creates a new instance of Mindkeeper.
   * @param world The world associated with the Mindkeeper.
   */
  constructor(world: World) {
    this.world = world;
  }

  /**
   * Registers a store with the specified name and type.
   * @param store The name of the store.
   * @param type The type of the store.
   */
  registerStore(store: string, type: StoreType): void {
    this.registerdStores.push(new Store(type, store));
  }

  /**
   * Returns an array of registered stores.
   * @returns An array of registered stores.
   */
  getStores() {
    return this.registerdStores;
  }

  /**
   * Prints the debug log by sending each log entry as a message to the world.
   */
  printDebug() {
    this.debugLog.forEach((t) => {
      this.world.sendMessage(t);
    });
  }

  /**
   * Registers the dynamic properties to the world's property registry.
   * @param propertyRegistry The property registry of the world.
   */
  registerToWorld(propertyRegistry: PropertyRegistry) {
    for (let i = 0; i < this.registerdStores.length; i++) {
      let isAlreadyDefined = true;

      try {
        let test = this.world.getDynamicProperty(this.registerdStores[i].getName());
        if (test === undefined) {
          isAlreadyDefined = false;
        }
      } catch (e) {
        isAlreadyDefined = false;
      }
      if (isAlreadyDefined) {
        continue;
      }
      switch (this.registerdStores[i].getType()) {
        case StoreType.string:
          this.propertyManager.defineString(this.registerdStores[i].getName(), 255);
          this.debugLog.push("registerd string" + this.registerdStores[i].getName());
          break;
        case StoreType.number:
          this.propertyManager.defineNumber(this.registerdStores[i].getName(), 0);
          this.debugLog.push("registerd number" + this.registerdStores[i].getName());
          break;
        case StoreType.boolean:
          this.propertyManager.defineBoolean(this.registerdStores[i].getName(), false);
          this.debugLog.push("registerd boolean" + this.registerdStores[i].getName());
          break;
      }
    }
    propertyRegistry.registerWorldDynamicProperties(this.propertyManager);
    this.initialised = true;
  }

  /**
   * Sets the value of a store.
   * @param store The name of the store.
   * @param value The value to set.
   */
  set(store: string, value: string | number | boolean): void {
    if (this.registerdStores.find((s) => s.getName() === store)?.getType() != typeof value) {
      this.world.sendMessage(`Store ${store} is not of type ${typeof value}`);
      return;
    }
    this.world.setDynamicProperty(store, value);
  }

  /**
   * Retrieves the value of a store.
   * @param store The name of the store.
   * @returns The value of the store, or undefined if the store is not defined.
   */
  get(store: string): string | number | boolean | undefined {
    try {
      let data = this.world.getDynamicProperty(store);
      if (data === undefined) {
        this.world.sendMessage(`Store ${store} is not defined`);
        return undefined;
      }
      return data;
    } catch (e) {
      // this.world.sendMessage(`Store ${store} is not defined`);
      return undefined;
    }
  }

  /**
   * Increments the value of a store if it is a number.
   * @param store The name of the store.
   */
  increment(store: string): void {
    let data = this.get(store);
    if (typeof data === "number") {
      this.set(store, data + 1);
    }
  }

  /**
   * Handles chat commands by executing the corresponding actions.
   * @param event The chat send after event.
   */
  chatCommands(event: ChatSendAfterEvent) {
    const command = event.message.split(" ")[0];
    const args = event.message.split(" ").slice(1);

    if (command === "!get") {
      const store = event.message.split(" ")[1];
      const value = this.get(store);
      this.world.sendMessage(`Value of ${store} is ${value}`);
    }
    if (command === "!set") {
      const store = event.message.split(" ")[1];
      const value = event.message.split(" ")[2];
      const type = event.message.split(" ")[3];
      if (type === "number") {
        this.set(store, Number(value));
      } else {
        this.set(store, value);
      }
      this.world.sendMessage(`Value of ${store} is ${value}`);
    }
    if (event.message.startsWith("!listStores")) {
      this.getStores().forEach((store) => {
        this.world.sendMessage(`${store.getName()} is ${store.getType()}`);
      });
    }
  }
}

export { Mindkeeper, Store, StoreType };
