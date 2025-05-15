<script setup>
const { token, documentId } = useRoute().query;
const prismic = usePrismic();

if (token) {
  await prismic.client.enableAutoPreviewsFromReq({ token, documentId });
}

// Redirect to the homepage by default
await navigateTo('/');
</script>

<template>
  <div>Redirecting...</div>
</template> 