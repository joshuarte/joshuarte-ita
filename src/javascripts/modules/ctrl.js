import "velocity-animate";

export default class Ctrl {
  constructor(el) {
    this.el = el;
    console.log("Controller module loaded");

    // Blocca lo scrolling all'inizio
    document.body.style.overflow = 'hidden';

    // Elementi del loader
    const loader = document.getElementsByClassName("loader")[0];
    const leftMask = document.getElementById("left-mask");
    const rightMask = document.getElementById("right-mask");
    
    // Funzione per completare l'animazione di caricamento
    const completeLoading = () => {
      // Prima fase: riempi il loader
      window.Velocity(loader, { height: "100%" }, 300).then(() => {
        // Seconda fase: rimuovi le maschere
        window.Velocity(leftMask, { width: "0%" }, 400);
        window.Velocity(rightMask, { width: "0%" }, 400).then(() => {
          // Terza fase: nascondi il loader
          window.Velocity(loader, { width: 0 }, 300).then(() => {
            // Ripristina lo scrolling alla fine dell'animazione
            document.body.style.overflow = '';
            // Imposta il loader a display: none per non bloccare interazioni
            loader.style.display = 'none';
          });
        });
      });
    };

    // Array per tenere traccia delle risorse critiche
    const criticalResources = [];
    
    // Aggiungi le immagini critiche
    const criticalImages = [
      // Immagine di sfondo principale
      document.querySelector('link[rel="preload"][as="image"]')?.href,
      // Le prime due immagini dei progetti
      ...Array.from(document.querySelectorAll('.img-responsive'))
        .slice(0, 2)
        .map(img => img.src)
        .filter(src => src && !src.includes('data:image'))
    ].filter(Boolean);
    
    // Aggiungi i file CSS critici
    const criticalCSS = [
      ...Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        .map(link => link.href)
    ].filter(Boolean);
    
    // Monitora il caricamento di ogni risorsa critica
    [...criticalImages, ...criticalCSS].forEach(resourceUrl => {
      if (!resourceUrl) return;
      
      const resource = new Image();
      resource.onload = () => trackResourceLoad(resourceUrl);
      resource.onerror = () => trackResourceLoad(resourceUrl); // Considera anche errori come "caricato" per evitare blocchi
      resource.src = resourceUrl;
      
      // Aggiungi all'array di monitoraggio
      criticalResources.push({ url: resourceUrl, loaded: false });
    });
    
    // Funzione per tracciare il caricamento delle risorse
    const trackResourceLoad = (url) => {
      const resourceIndex = criticalResources.findIndex(r => r.url === url);
      if (resourceIndex !== -1) {
        criticalResources[resourceIndex].loaded = true;
        
        // Controlla se tutte le risorse critiche sono caricate
        const allLoaded = criticalResources.every(r => r.loaded);
        if (allLoaded) {
          completeLoading();
        }
      }
    };
    
    // Timeout di sicurezza in caso alcune risorse non si carichino
    // o non vengano rilevate correttamente
    setTimeout(() => {
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        completeLoading();
      } else {
        // Fallback su DOMContentLoaded se il readyState non è ancora completo
        window.addEventListener('DOMContentLoaded', completeLoading);
      }
    }, 2500); 
  }
}
