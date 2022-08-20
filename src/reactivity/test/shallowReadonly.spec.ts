import { isReadonly, shallowReadonly } from '../reactive';

describe('shallowReadonly', () => {
  it('shallowReadonly should shallow', () => {
    const original = {
      foo: 1,
      bar: { baz: 2 },
    };
    const observer = shallowReadonly(original);
    expect(isReadonly(observer)).toBe(true);
    expect(isReadonly(observer.bar)).toBe(false);
  });
});
