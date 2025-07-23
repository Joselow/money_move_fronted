<script setup lang="ts">
import { ref, computed } from 'vue';
import SelectButton from './SelectButton.vue';

const props = defineProps<{
  items: { id: number, name: string, [key: string]: any }[];
  limit: number;
}>();

const emits = defineEmits<{
  selectedItem: [number]
  deselectedItem: [void]
}>()

const idClicked = ref(0)

let beforeIdClicked = 0

const handleClick = (value: number) => {
  if (beforeIdClicked === value) {
    idClicked.value = 0
    beforeIdClicked = 0
    emits('deselectedItem')
    return
  }
  
  idClicked.value = value
  beforeIdClicked = value
  emits('selectedItem', value)
}

const displayedItems = computed(() => {
  const start = currentPage.value * props.limit;
  const end = start + props.limit;
  return props.items.slice(start, end);
});

const currentPage = ref(0)

const totalPages = computed(() => Math.ceil(props.items.length / props.limit));

function nextPage() {
  currentPage.value++;
}

function previousPage() {
  currentPage.value--;
}

</script>

<template>
  <div>    
    <div class="d-flex gap-50 flex-wrap justify-content-center">
      <button class="btn btn-outline-primary btn-icon waves-effect" 
        :disabled="!(currentPage > 0)" 
        @click="previousPage">
        <i class="fas fa-arrow-left"></i>
      </button>

      <SelectButton
        v-for="item in displayedItems" :key="item.id+'-i-list'"
        :value="item.id"
        :activeValue="idClicked"
        @clicked="handleClick"
      >
        {{ item.name }}
      </SelectButton>     

      <button class="btn btn-outline-primary btn-icon waves-effect"  
        :disabled="!(currentPage < totalPages - 1)" 
        @click="nextPage">
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
    
    <div class="d-flex justify-content-around fw-bold mt-25 small text-muted">     
      <div>
        {{ currentPage+1 }} / {{ totalPages }}
      </div>
    </div>
  </div>
</template>