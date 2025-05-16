import { useMainStore } from '~/stores';
import { storeToRefs } from 'pinia';

export const usePortfolioPanel = () => {
  const mainStore = useMainStore();
  const { isPortfolioPanelVisible, portfolioPanelClass } = storeToRefs(mainStore);
  
  const toggle = () => {
    console.log('Portfolio panel toggle called, current state:', mainStore.isPortfolioPanelVisible);
    mainStore.togglePortfolioPanel();
    console.log('State after toggle:', mainStore.isPortfolioPanelVisible);
  };
  
  const show = () => {
    mainStore.showPortfolioPanel();
  };
  
  const hide = () => {
    mainStore.hidePortfolioPanel();
  };
  
  return {
    isVisible: isPortfolioPanelVisible,
    panelClass: portfolioPanelClass,
    toggle,
    show,
    hide
  };
}; 