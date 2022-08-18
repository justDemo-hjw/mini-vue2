import { mutableHandlers, readonlyHandlers } from './baseHandlers';

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
}

export const reactive = (raw: any) => {
  return createActiveObject(raw, mutableHandlers);
};

export const isReactive = (value: any) => {
  return !!value[ReactiveFlags.IS_REACTIVE];
};

export const isReadonly = (value: any) => {
  return !!value[ReactiveFlags.IS_READONLY];
};

export const readonly = (raw: any) => {
  return createActiveObject(raw, readonlyHandlers);
};

function createActiveObject(raw, baseHandler) {
  return new Proxy(raw, baseHandler);
}
