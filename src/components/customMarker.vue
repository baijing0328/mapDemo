<script setup lang="ts">
import { useRegister } from '@vuemap/vue-amap'

defineProps({
  position: {
    type: Array,
    required: true
  }
})

const emits = defineEmits(['init'])
let $amapComponent: AMap.Marker

const { $$getInstance, parentInstance } = useRegister<AMap.Marker, any>(
  (options, parentComponent) => {
    return new Promise<AMap.Marker>((resolve) => {
      $amapComponent = new AMap.Marker(options)
      parentComponent.add($amapComponent)
      resolve($amapComponent)
    })
  },
  {
    emits,
    propsRedirect: {
      styles: 'style'
    },
    destroyComponent() {
      if ($amapComponent && parentInstance?.$amapComponent) {
        $amapComponent.setMap(null)
        $amapComponent = null as any
      }
    }
  }
)

defineExpose({
  $$getInstance
})
</script>

<template>
  <div></div>
</template>

<style scoped></style>
