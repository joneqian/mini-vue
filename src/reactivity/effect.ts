import { extend } from '../shared';

let activeEffect: any;
let shouldTrack: any;

class ReactiveEffect {
  private _fn: any;
  private active: boolean = true;
  deps = [];
  scheduler: Function | undefined;
  onStop: Function | undefined;
  constructor(fn: any) {
    this._fn = fn;
  }
  run() {
    if (!this.active) {
      return this._fn();
    }
    shouldTrack = true;
    activeEffect = this;
    const result = this._fn();
    shouldTrack = false;
    return result;
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      this.active = false;
      if (this.onStop) {
        this.onStop();
      }
    }
  }
}

function cleanupEffect(effect: any) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect);
  });
}

export function isTracking() {
  return activeEffect !== undefined && shouldTrack;
}

const targetMap = new WeakMap();
export function track(target: any, key: any) {
  if (!isTracking()) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  trackEffects(dep);
}

export function trackEffects(dep: any) {
  if (dep.has(activeEffect)) return;
  dep.add(activeEffect);
  activeEffect.deps.push(dep);
}

export function trigger(target: any, key: any) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const dep = depsMap.get(key);
  triggerEffects(dep);
}

export function triggerEffects(dep: any) {
  if (!dep) {
    return;
  }
  dep.forEach((effect: ReactiveEffect) => {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  });
}

export function effect(fn: any, options: any = {}) {
  const _effect = new ReactiveEffect(fn);
  extend(_effect, options);
  _effect.run();
  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}

export function stop(runner: any) {
  runner.effect.stop();
}
