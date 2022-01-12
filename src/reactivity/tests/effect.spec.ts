import { reactive } from '../reactive';
import { effect, stop } from '../effect';
describe('effect', () => {
  it('core path', () => {
    const user = reactive({
      age: 10,
    });
    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    });
    expect(nextAge).toBe(11);

    // update
    user.age++;
    expect(nextAge).toBe(12);
  });
  it.skip('runner', () => {
    let foo = 10;
    const runner = effect(() => {
      foo++;
      return 'foo++';
    });

    expect(foo).toBe(11);
    const r = runner();
    expect(foo).toBe(12);
    expect(r).toBe('foo++');
  });

  it.skip('scheduler', () => {
    let sum;
    let run: any;
    const scheduler = jest.fn(() => {
      run = runner;
    });
    const obj = reactive({ foo: 1 });
    const runner = effect(
      () => {
        sum = obj.foo + 1;
      },
      { scheduler }
    );

    expect(scheduler).not.toHaveBeenCalled();
    expect(sum).toBe(2);
    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(1);
    expect(sum).toBe(2);
    run();
    expect(sum).toBe(3);
  });

  it('stop', () => {
    let sum = 0;
    const obj = reactive({ foo: 1 });
    const runner = effect(() => {
      sum = obj.foo;
    });
    obj.foo = 2;
    expect(sum).toBe(2);
    stop(runner);
    // obj.foo = 3;
    obj.foo++;
    expect(sum).toBe(2);
    runner();
    expect(sum).toBe(3);
  });
  it.skip('onStop', () => {
    let sum = 0;
    const obj = reactive({ foo: 1 });
    const onStop = jest.fn(() => {});
    const runner = effect(
      () => {
        sum = obj.foo + 1;
      },
      { onStop }
    );
    stop(runner);
    expect(onStop).toBeCalledTimes(1);
  });
});
