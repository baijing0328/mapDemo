<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String
  }
})
</script>
<template>
  <add-user v-if="props.type === 'user'" />
  <add-material v-if="props.type === 'material'" />
</template>
