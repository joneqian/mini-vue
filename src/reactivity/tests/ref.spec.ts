import { effect } from '../effect';
import { ref } from '../ref';

describe('ref', () => {
  it('core path', () => {
    const a = ref(1);
    expect(a.value).toBe(1);
  });
  it('ref is reactive', () => {
    const a = ref(1);
    let calls = 0;
    let dummy;
    effect(() => {
      calls++;
      dummy = a.value;
    });
    expect(calls).toBe(1);
    expect(dummy).toBe(1);
    a.value = 2;
    expect(calls).toBe(2);
    expect(dummy).toBe(2);
    // a.value = 2;
    // expect(calls).toBe(2);
    // expect(dummy).toBe(2);
  });
});
