import { ShapeFlags } from "../shared/ShapeFlags";

export function initSlots(instance, children) {
  const { vnode } = instance;
  if (vnode.shapeFlags & ShapeFlags.SLOTS_CHILDREN) {
    normalizeObjectSlots(children, instance.slots);
  }
}
function normalizeObjectSlots(children: any, slots: any) {
  for (const key in children) {
    if (Object.prototype.hasOwnProperty.call(children, key)) {
      const value = children[key];
      slots[key] = props => normalizeSlotValue(value(props));
    }
  }
}

function normalizeSlotValue(value: any): any {
  return Array.isArray(value) ? value : [value];
}
