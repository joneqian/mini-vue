import { isTracking, trackEffects, triggerEffects } from './effect';

class RefIml {
  private _value: any;
  public dep;
  constructor(value: any) {
    this._value = value;
    this.dep = new Set();
  }
  get value() {
    if (isTracking()) {
      trackEffects(this.dep);
    }
    return this._value;
  }
  set value(newValue: any) {
    this._value = newValue;
    triggerEffects(this.dep);
  }
}

export function ref(value: any) {
  return new RefIml(value);
}
