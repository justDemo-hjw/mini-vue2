import { hasChanged } from '../shared';
import { isTracking, trackEffect, triggerEffect } from './effect';
import { isObject } from '../shared/index';
import { reactive } from './reactive';

class Refimpl {
  private _value: any;
  private _rawValue: any;
  public dep;
  public __v_isRef = true;
  constructor(value) {
    this._rawValue = value;
    this._value = covert(value);
    // value -> reactive
    // value is object?
    // reactive or return value
    this.dep = new Set();
  }

  get value() {
    trackRefValue(this);
    return this._value;
  }

  set value(newValue) {
    if (hasChanged(this._rawValue, newValue)) {
      this._rawValue = newValue;
      this._value = covert(newValue);
      triggerEffect(this.dep);
    }
  }
}

function covert(value) {
  return isObject(value) ? reactive(value) : value;
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffect(ref.dep);
  }
}

export function ref(value) {
  return new Refimpl(value);
}

export function isRef(ref) {
  return !!ref.__v_isRef;
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref;
}

export function proxyRefs(refObj) {
  return new Proxy(refObj, {
    get: (target, key) => {
      return unRef(Reflect.get(target, key));
    },
    set: (target, key, value) => {
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value);
      } else {
        return Reflect.set(target, key, value);
      }
    },
  });
}
