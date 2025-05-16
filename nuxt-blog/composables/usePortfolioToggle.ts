import { useMainStore } from '~/stores';

export const usePortfolioToggle = () => {
  const vPortfolioToggle = {
    mounted: (el: HTMLElement) => {
      const mainStore = useMainStore();
      
      el.addEventListener('click', (event) => {
        event.preventDefault();
        mainStore.togglePortfolioPanel();
      });
    }
  };
  
  return {
    vPortfolioToggle
  };
}; 