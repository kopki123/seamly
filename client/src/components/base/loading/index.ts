import { createVNode, render } from 'vue';
import Loading from './Loading.vue';

function useGlobalLoading () {
  const vNode = createVNode(Loading);

  const container = document.createElement('div');
  document.body.appendChild(container);
  render(vNode, container);
  vNode.component?.exposed!.toggleVisible(true);

  return {
    destroy () {
      vNode.component?.exposed!.toggleVisible(false);

      setTimeout(() => {
        render(null, container);
        document.body.removeChild(container);
      }, 500);
    },
  };
}

export default useGlobalLoading;
