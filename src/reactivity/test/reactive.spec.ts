import { reactive, isReactive, isProxy } from '../reactive';
describe('reactive', () => {
  it('happy path', () => {
    const original = { foo: 10 };
    const observer = reactive(original);
    expect(original).not.toBe(observer);
    expect(observer.foo).toBe(10);
    expect(isReactive(observer)).toBe(true);
    expect(isReactive(original)).toBe(false);
    expect(isProxy(observer)).toBe(true);
  });

  it('nested reactive', () => {
    const original = {
      nested: {
        foo: 1,
      },
      array: [{ bar: 2 }],
    };
    const observed = reactive(original);
    expect(isReactive(observed)).toBe(true);
    expect(isReactive(observed.nested)).toBe(true);
    expect(isReactive(observed.array[0])).toBe(true);
  });
});
