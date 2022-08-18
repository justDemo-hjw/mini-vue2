import { reactive, isReactive } from '../reactive';
describe('reactive', () => {
  it('happy path', () => {
    const original = { foo: 10 };
    const observer = reactive(original);
    expect(original).not.toBe(observer);
    expect(observer.foo).toBe(10);
    expect(isReactive(observer)).toBe(true);
    expect(isReactive(original)).toBe(false);
  });
});
