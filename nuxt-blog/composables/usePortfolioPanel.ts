import { useMainStore } from '~/stores';
import { storeToRefs } from 'pinia';

export const usePortfolioPanel = () => {
  const mainStore = useMainStore();
  const { isPortfolioPanelVisible } = storeToRefs(mainStore);
  
  const toggle = () => {
    mainStore.togglePortfolioPanel();
  };
  
  const show = () => {
    mainStore.showPortfolioPanel();
  };
  
  const hide = () => {
    mainStore.hidePortfolioPanel();
  };
  
  return {
    isVisible: isPortfolioPanelVisible,
    toggle,
    show,
    hide
  };
}; 