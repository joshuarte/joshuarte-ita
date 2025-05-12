import './modules'

console.log(`
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,                                                                                   ,
,                                                           ;;                      ,
,          .      '#;            ##       ##: .##          ;;'                      ,
,       '##'      '#;            ##       ### ###          ;;        ##:            ,
,      ####,      '#;            ##       #######         ;;.        +###,          ,
,      ###.       '#;            ##       #######         ;;          ;##,          ,
,       ###'      '#',,.       #'##       ## # ##        ;;,         ###:           ,
,         .'      '####:      :####       ## ' ##        ;;          '              ,
,                               ,'                      ;;,                         ,
,                                                       ,,                          ,
,                                                                                   ,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

 `)

// Implementazione ottimizzata del caricamento progressivo delle immagini
document.addEventListener('DOMContentLoaded', function() {
  const portfolioContainer = document.querySelector('.right-portfolio');
  if (!portfolioContainer) return;
  
  // Seleziona tutte le immagini con classe lazy-image
  const lazyImages = Array.from(document.querySelectorAll('.lazy-image'));
  if (lazyImages.length === 0) return;
  
  // Crea un array delle immagini ancora da caricare
  let imagesToLoad = [...lazyImages];
  
  // Dimensione di ogni batch durante lo scroll (solo 1 alla volta per evitare caricamenti multipli)
  const scrollBatchSize = 1;
  
  // Flag per il debounce
  let isScrollProcessing = false;
  
  // Crea un Intersection Observer per gestire le immagini
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Se l'immagine è visibile e non è ancora stata caricata
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src && !img.dataset.loaded) {
          // Carica l'immagine
          img.src = img.dataset.src;
          img.classList.add('loaded');
          img.dataset.loaded = 'true';
          
          // Smetti di osservare questa immagine
          imageObserver.unobserve(img);
          
          // Rimuovi l'immagine dall'array da caricare
          imagesToLoad = imagesToLoad.filter(image => image !== img);
        }
      }
    });
  }, {
    root: portfolioContainer,
    rootMargin: '100px 0px',  // Carica le immagini che sono a 100px dal diventare visibili
    threshold: 0.1
  });
  
  // Inizia ad osservare tutte le immagini lazy
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
  
  // Aggiungi l'event listener per lo scroll come backup
  portfolioContainer.addEventListener('scroll', function() {
    if (!isScrollProcessing && imagesToLoad.length > 0) {
      isScrollProcessing = true;
      
      // Usa requestAnimationFrame per ottimizzare la performance
      requestAnimationFrame(() => {
        // Carica la prossima immagine nel batch
        loadNextBatch(scrollBatchSize);
        
        // Reimposta il flag dopo un breve periodo
        setTimeout(() => {
          isScrollProcessing = false;
        }, 150);
      });
    }
  });
  
  // Funzione per caricare il prossimo batch di immagini
  function loadNextBatch(batchSize) {
    if (imagesToLoad.length === 0) return;
    
    // Carica solo il numero specificato di immagini
    for (let i = 0; i < batchSize && i < imagesToLoad.length; i++) {
      const img = imagesToLoad[i];
      
      if (img.dataset.src && !img.dataset.loaded) {
        // Carica l'immagine
        img.src = img.dataset.src;
        img.classList.add('loaded');
        img.dataset.loaded = 'true';
        
        // Smetti di osservare questa immagine
        imageObserver.unobserve(img);
      }
    }
    
    // Aggiorna l'array delle immagini da caricare
    imagesToLoad = imagesToLoad.filter(img => !img.dataset.loaded);
  }
});













