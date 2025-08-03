<script setup lang="ts">
interface Props {
  value: any, 
  activeValue: any, 
  color?: string,
  css?: string
}

withDefaults(defineProps<Props>(),{
    color: 'primary'
})
defineEmits<{
  clicked: [any]
}>()


</script>

<template>
  <button class="btn waves-light"
    :class="[ css,`btn-outline-${color}` ,{ [`btn-${color}`]: activeValue == value}]"
    @click="$emit('clicked', value)"
  >
    <slot/>
  </button>
</template>