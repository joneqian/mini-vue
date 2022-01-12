import { isReadonly, shallowReadonly } from '../reactive';

describe('shallowReadonly', () => {
  it('core path', () => {
    const props = shallowReadonly({ foo: 1, bar: { baz: 2 } });
    expect(isReadonly(props)).toBe(true);
    expect(isReadonly(props.foo)).toBe(false);
    expect(isReadonly(props.bar.baz)).toBe(false);
  });
});
