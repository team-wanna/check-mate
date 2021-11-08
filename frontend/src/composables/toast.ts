import { useStore } from 'vuex';
import { computed, ComputedRef } from 'vue';
import { Toast } from '@/store/modules/toast';

const useToast = () => {
  const store = useStore();
  const toasts: ComputedRef<Toast[]> = computed(
    () => store.getters['toast/getToasts'],
  );

  const triggerToast = async (message: string) => {
    const toast: Toast = {
      id: Date.now(),
      message,
      type: 'success',
    };
    await store.dispatch('toast/triggerToast', toast);
  };

  return {
    toasts,
    triggerToast,
  };
};

export default useToast;
