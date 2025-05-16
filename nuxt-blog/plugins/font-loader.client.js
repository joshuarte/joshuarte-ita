// Plugin per gestire il caricamento dei font anche quando JavaScript è disabilitato
// Questo plugin verrà eseguito solo lato client

export default defineNuxtPlugin(() => {
  // Per gli utenti con JavaScript abilitato, il font viene già caricato con media="print" e onload
  // Per gli utenti con JavaScript disabilitato, il noscript viene gestito tramite HTML statico
  
  // Verifichiamo se esiste già il noscript per i font
  if (!document.querySelector('noscript[data-font-loader]')) {
    // Creiamo un elemento noscript per gli utenti con JavaScript disabilitato
    const noscriptElement = document.createElement('noscript');
    noscriptElement.setAttribute('data-font-loader', 'true');
    
    // Creiamo un elemento link interno al noscript
    const linkHTML = '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600&display=swap">';
    noscriptElement.innerHTML = linkHTML;
    
    // Aggiungiamo il noscript al head
    document.head.appendChild(noscriptElement);
  }
}); 