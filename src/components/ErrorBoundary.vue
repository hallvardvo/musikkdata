<script setup>
import { onErrorCaptured } from 'vue'

onErrorCaptured((err) => {
  console.error('Component error:', err)
  return false // Prevent error propagation
})
</script>

<template>
  <slot />
</template>
