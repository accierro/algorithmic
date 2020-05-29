class PriorityQueue<T> {
  private items: { elem: T; priority: number }[];
  constructor() {
    this.items = [];
  }

  enqueue(elem: T, priority: number) {
    let contain = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority < priority) {
        this.items.splice(i, 0, { elem, priority });
        contain = true;
        break;
      }
    }

    if (!contain) {
      this.items.push({ elem, priority });
    }
  }

  dequeue(): T | undefined {
    return this.items.pop()?.elem;
  }
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  changePriority(t: T, priority: number) {
    let deleted = false;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].elem === t) {
        this.items.splice(i, 1);
        break;
      }
    }
    if (deleted) {
      this.enqueue(t, priority);
    }
  }

  hasValue(t: T): boolean {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].elem === t) {
        return true;
      }
    }
    return false;
  }

  printQueue() {
    console.log(this.items);
  }
}

export default PriorityQueue;
