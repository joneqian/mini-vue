import { reactive, isReactive, isProxy } from '../reactive';
describe('reactive', () => {
  it('core path', () => {
    const org = { foo: 1 };
    const observed = reactive(org);
    expect(observed).not.toBe(org);
    expect(observed.foo).toBe(1);
    expect(isReactive(observed)).toBe(true);
    expect(isReactive(org)).toBe(false);
    expect(isProxy(observed)).toBe(true);
  });
  it('nested reactive', () => {
    const org = {
      obj: {
        foo: 1,
      },
      arr: [{ baz: 1 }],
    };
    const observed = reactive(org);
    expect(isReactive(observed.obj)).toBe(true);
    expect(isReactive(observed.arr)).toBe(true);
    expect(isReactive(observed.arr[0])).toBe(true);
  });
});
