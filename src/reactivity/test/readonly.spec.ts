import { isReadonly, readonly, isProxy } from '../reactive';

describe('readonly', () => {
  it('happy path', () => {
    const original = { foo: 1, bar: { baz: 2 } };
    const warpped = readonly(original);
    expect(warpped).not.toBe(original);
    expect(isReadonly(warpped)).toBe(true);
    expect(isReadonly(original)).toBe(false);
    expect(isReadonly(warpped.bar)).toBe(true);
    expect(warpped.foo).toBe(1);
    expect(isProxy(warpped)).toBe(true);
  });

  it('warn', () => {
    // console.warn
    console.warn = jest.fn();
    const user = readonly({
      age: 10,
    });
    user.age = 11;
    expect(console.warn).toBeCalled();
  });
});
