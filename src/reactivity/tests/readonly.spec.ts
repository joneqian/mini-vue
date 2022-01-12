import { readonly, isReadonly, isProxy } from '../reactive';
describe('readonly', () => {
  it('core path', () => {
    const org = { foo: 1, bar: { baz: 2 } };
    const warpepd = readonly(org);
    expect(warpepd).not.toBe(org);
    expect(warpepd.foo).toBe(1);
    expect(isReadonly(warpepd)).toBe(true);
    expect(isReadonly(warpepd.bar)).toBe(true);
    expect(isReadonly(org.bar)).toBe(false);
    expect(isProxy(warpepd)).toBe(true);
  });
  it('warn when call set', () => {
    const user = readonly({
      age: 10,
    });
    console.warn = jest.fn();
    user.age++;
    expect(console.warn).toBeCalled();
  });
});
