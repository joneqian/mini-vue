import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from './baseHandlers';

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
}

function createReactiveObject(raw: any, baseHandlers: any) {
  return new Proxy(raw, baseHandlers);
}

export function reactive(raw: any) {
  return createReactiveObject(raw, mutableHandlers);
}

export function readonly(raw: any) {
  return createReactiveObject(raw, readonlyHandlers);
}

export function shallowReadonly(raw: any) {
  return createReactiveObject(raw, shallowReadonlyHandlers);
}

export function isReactive(value: any) {
  return !!value[ReactiveFlags.IS_REACTIVE];
}

export function isReadonly(value: any) {
  return !!value[ReactiveFlags.IS_READONLY];
}

export function isProxy(value: any) {
  return isReadonly(value) || isReactive(value);
}
