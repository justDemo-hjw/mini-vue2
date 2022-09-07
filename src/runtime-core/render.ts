import { createComponentInstance, setupComponent } from './component';
import { isObject } from '../shared/index';

export function render(vnode, container) {
  // patch
  //
  patch(vnode, container);
}

function patch(vnode, container) {
  console.log(vnode.type);
  if (isObject(vnode.type)) {
    processComponent(vnode, container);
  } else {
    processElement(vnode, container);
  }
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container);
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountElement(vnode, container: any) {
  const { type, props, children } = vnode;
  const el = document.createElement(type);
  if (typeof children === 'string') {
    el.textContent = children;
  } else {
    mountChildren(vnode, el);
  }
  for (const key in props) {
    const val = props[key];
    el.setAttribute(key, val);
  }
  container.append(el);
}

function mountChildren(vnode: any, container: any) {
  vnode.children.forEach((v) => {
    patch(v, container);
  });
}
function mountComponent(vnode: any, container) {
  const instance = createComponentInstance(vnode);
  setupComponent(instance);
  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance: any, container) {
  const subTree = instance.render();
  patch(subTree, container);
}
