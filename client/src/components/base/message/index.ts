import type { VNode } from 'vue';
import { createVNode, render } from 'vue';
import Message from './Message.vue';

export type MessageType = 'info' | 'success' | 'error';

export interface MessageOption {
  id?: number
  type?: MessageType
  duration?: number
  message: string;
  offset?: number
  onDestroy?: () => void;
  onClose?: () => void;
}

const instances: VNode[] = [];
let seed = 0;

export function close (vNodeId: number) {
  const index = instances.findIndex((vNode) => vNode.props!.id === vNodeId);

  if (index === -1) {
    return;
  }

  const vNode = instances[index];
  const removedHeight = vNode.el!.offsetHeight;

  instances.splice(index, 1);

  const { length } = instances;
  if (length === 0) {
    return;
  }

  for (let i = 0; i < length; i += 1) {
    const top = parseInt(instances[i].el!.style.top, 10) - removedHeight - 16;
    instances[i].component!.props.offset = top;
  }
}

function useMessage (options: MessageOption) {
  seed += 1;
  const id = seed;

  const offset = (options.offset || 20) + instances.reduce((sum, instance) => {
    const newSum = sum + (instance.el?.offsetHeight || 0) + 16;
    return newSum;
  }, 0);

  const props = {
    ...options,
    id,
    offset,
    onClose: () => close(seed - 1),
  };

  const vNode = createVNode(Message, props);
  const container = document.createElement('div');
  document.body.appendChild(container);

  vNode.props!.onDestroy = () => {
    render(null, container);
    document.body.removeChild(container);
  };

  instances.push(vNode);
  render(vNode, container);

  return {
    close: () => close(vNode.props!.id as number),
  };
}

export default useMessage;
