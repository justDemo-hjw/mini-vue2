import { mutableHandlers, readonlyHandlers } from './baseHandlers';

export const reactive = (raw: any) => {
  return createActiveObject(raw, mutableHandlers);
};

export const readonly = (raw: any) => {
  return createActiveObject(raw, readonlyHandlers);
};

function createActiveObject(raw, baseHandler) {
  return new Proxy(raw, baseHandler);
}
