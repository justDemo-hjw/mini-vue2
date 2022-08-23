import { hasChanged } from '../shared';
import { isTracking, trackEffect, triggerEffect } from './effect';
import { isObject } from '../shared/index';
import { reactive } from './reactive';

class Refimpl {
  private _value: any;
  private _rawValue: any;
  public dep;
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
