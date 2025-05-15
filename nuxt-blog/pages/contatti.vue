<template>
  <div>
    <section class="page-header">
      <div class="container">
        <h1>Contatti</h1>
        <p>Hai un progetto in mente? Parliamone!</p>
      </div>
    </section>

    <section class="contatti-section">
      <div class="container">
        <div class="contatti-content">
          <div class="contatti-info">
            <h2>Informazioni di Contatto</h2>
            <p>Puoi raggiungermi tramite i seguenti canali o utilizzando il modulo di contatto qui a fianco.</p>
            
            <div class="info-item">
              <strong>Email:</strong>
              <a href="mailto:info@joshuarte.it">info@joshuarte.it</a>
            </div>
            
            <div class="info-item">
              <strong>Telefono:</strong>
              <span>+39 123 456 7890</span>
            </div>
            
            <div class="info-item">
              <strong>Social:</strong>
              <div class="social-links">
                <a href="https://linkedin.com/in/joshuarte" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/joshuarte" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://instagram.com/joshuarte" target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </div>
          </div>

          <div class="contatti-form">
            <h2>Inviami un Messaggio</h2>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="nome">Nome</label>
                <input 
                  type="text" 
                  id="nome" 
                  v-model="form.nome" 
                  required
                  placeholder="Il tuo nome"
                >
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  required
                  placeholder="La tua email"
                >
              </div>
              
              <div class="form-group">
                <label for="oggetto">Oggetto</label>
                <input 
                  type="text" 
                  id="oggetto" 
                  v-model="form.oggetto"
                  placeholder="Oggetto del messaggio"
                >
              </div>
              
              <div class="form-group">
                <label for="messaggio">Messaggio</label>
                <textarea 
                  id="messaggio" 
                  v-model="form.messaggio" 
                  required
                  placeholder="Il tuo messaggio"
                  rows="5"
                ></textarea>
              </div>
              
              <button type="submit" class="btn" :disabled="isSubmitting">
                {{ isSubmitting ? 'Invio in corso...' : 'Invia Messaggio' }}
              </button>
              
              <div v-if="formSubmitted" class="form-success">
                Grazie per il tuo messaggio! Ti risponderò al più presto.
              </div>
              
              <div v-if="formError" class="form-error">
                Si è verificato un errore durante l'invio del messaggio. Per favore riprova più tardi.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// SEO metadata
useHead({
  title: 'Contatti | Joshua Rte.',
  meta: [
    { 
      name: 'description', 
      content: 'Contatta Joshua Rte., sviluppatore web e designer. Disponibile per collaborazioni e nuovi progetti.'
    }
  ]
});

// State per il form
const form = ref({
  nome: '',
  email: '',
  oggetto: '',
  messaggio: ''
});

const isSubmitting = ref(false);
const formSubmitted = ref(false);
const formError = ref(false);

// Gestione invio form (simulata)
const submitForm = async () => {
  isSubmitting.value = true;
  formError.value = false;
  formSubmitted.value = false;
  
  try {
    // Qui andrebbe l'integrazione con un servizio di invio email
    // Per ora simuliamo un invio con successo dopo 1 secondo
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset del form
    form.value = {
      nome: '',
      email: '',
      oggetto: '',
      messaggio: ''
    };
    
    // Mostra messaggio di successo
    formSubmitted.value = true;
  } catch (error) {
    console.error('Errore durante l\'invio del form:', error);
    formError.value = true;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.page-header {
  background-color: #333;
  color: #fff;
  padding: 60px 0;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.page-header p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.8;
}

.contatti-section {
  padding: 80px 0;
}

.contatti-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
}

.contatti-info, .contatti-form {
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 8px;
}

.contatti-info h2, .contatti-form h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.info-item {
  margin-bottom: 20px;
}

.info-item strong {
  display: block;
  margin-bottom: 5px;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-links a {
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  font-size: 0.9rem;
}

.social-links a:hover {
  background-color: #45a049;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
}

.form-group textarea {
  resize: vertical;
}

.form-success {
  margin-top: 20px;
  padding: 10px;
  background-color: #dff0d8;
  color: #3c763d;
  border-radius: 4px;
}

.form-error {
  margin-top: 20px;
  padding: 10px;
  background-color: #f2dede;
  color: #a94442;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .contatti-content {
    grid-template-columns: 1fr;
  }
  
  .contatti-info {
    order: 2;
  }
  
  .contatti-form {
    order: 1;
  }
}
</style> 