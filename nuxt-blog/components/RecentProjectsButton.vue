<template>
  <div class="row">
    <div class="col-sm-8 offset-sm-2">
      <nav class="btn-transition d-none d-sm-block">
        <a 
          href="#"
          id="show-portfolio"
          data-hover="PROGETTI RECENTI"
          @click.prevent="$emit('toggle-portfolio')"
          :aria-label="ariaLabel"
        >
          <span>{{ buttonText }}</span>
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup>
defineEmits(['toggle-portfolio']);

defineProps({
  buttonText: {
    type: String,
    default: 'PROGETTI RECENTI'
  },
  ariaLabel: {
    type: String,
    default: 'Visualizza i lavori recenti'
  }
});
</script>

<style lang="scss" scoped>
.btn-transition {
  // Stili per il pulsante se necessari
}
</style>