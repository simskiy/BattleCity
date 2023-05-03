type EventHandler = (...args: any[]) => any;

export default class Observer {
  private c = new Map<string, EventHandler[]>();

  subscribe(event: string, ...fn: EventHandler[]) {
    let events = this.c.get(event);

    if (!events) {
      this.c.set(event, (events = []));
    }

    events.push(...fn);
  }

  unsubscribe(event: string, fn?: EventHandler): boolean {
    if (!fn) {
      return this.c.delete(event);
    }

    const events = this.c.get(event);

    if (!events) {
      return false;
    }

    const index = events.indexOf(fn);

    if (index < 0) {
      return false;
    }

    events.splice(index, 1);

    if (events.length === 0) {
      this.c.delete(event);
    }

    return true;
  }

  emit(
    event: string,
    ...args: { [x: string]: string | Set<unknown> | HTMLImageElement }[]
  ): any[] | null {
    const events = this.c.get(event);

    if (!events) {
      return null;
    }

    return events.map((fn) => {
      try {
        return fn(...args);
      } catch (e) {
        console.error(e);
        return null;
      }
    });
  }
}
