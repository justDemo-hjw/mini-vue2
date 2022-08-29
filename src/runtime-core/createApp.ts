import { render } from './render';
import { createVNode } from './vnode';

export function creatApp(rootComponent) {
  return {
    mount(rootContainer) {
      // vnode
      const vnode = createVNode(rootComponent);
      render(vnode, rootComponent);
    },
  };
}
