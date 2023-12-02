export class AsyncQueue {
  private promise: Promise<any>;

  constructor() {
    this.promise = Promise.resolve();
  }

  add(task: () => Promise<any>) {
    return new Promise((resolve, reject) => {
      this.promise = this.promise.then(async () => {
        await task().then(resolve).catch(reject);
      });
    });
  }
}

const queues = new Map<string, AsyncQueue>();

export const addAsyncQueue = (key: string, task: () => Promise<void>) => {
  if (!queues.has(key)) {
    queues.set(key, new AsyncQueue());
  }
  const queue = queues.get(key)!;
  return queue.add(task);
};
