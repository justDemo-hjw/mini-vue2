import { track, trigger } from './effect';

export const reactive = (raw) => {
  const observer = new Proxy(raw, {
    get: (target, key) => {
      track(target, key);
      const res = Reflect.get(target, key);
      return res;
    },
    set: (target, key, value) => {
      const res = Reflect.set(target, key, value);
      trigger(target, key);
      return res;
    },
  });
  return observer;
};
