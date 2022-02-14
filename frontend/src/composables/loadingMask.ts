import { useStore } from 'vuex';

const useLoadingMask = () => {
  const store = useStore();
  const showLoadingMask = async () => {
    await store.dispatch('loadingMask/showLoadingMask');
  };
  const hideLoadingMask = async () => {
    await store.dispatch('loadingMask/hideLoadingMask');
  };

  return {
    showLoadingMask,
    hideLoadingMask,
  };
};

export default useLoadingMask;
