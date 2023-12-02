import { describe, expect, test } from '@jest/globals';
import { AsyncQueue } from '../src/AsyncQueue';

describe('queue test', () => {
  test('hello world', async () => {
    const executedTasks: string[] = [];
    const createAsyncFunction =
      (delay = 3000, value: string) =>
      () =>
        new Promise(resolve =>
          setTimeout(() => {
            executedTasks.push(value);
            console.log(`success ${value} task`);
            resolve(value);
          }, delay),
        );

    const queue = new AsyncQueue();

    const startedAt = Date.now();

    const firstPromise = queue.add(createAsyncFunction(1000, 'first'));
    const secondPromise = queue.add(createAsyncFunction(1000, 'second'));
    const thirdPromise = queue.add(createAsyncFunction(1000, 'third'));

    await Promise.all([firstPromise, secondPromise, thirdPromise]);

    const totalTime = Date.now() - startedAt;

    expect(totalTime).toBeGreaterThanOrEqual(3000); // 총 시간이 3000ms 이상인지 검증
    expect(JSON.stringify(executedTasks)).toBe(
      JSON.stringify(['first', 'second', 'third']),
    );
  });
});
