<script setup lang="ts">
import { CATEGORIES } from '../data/categories';
import type { Category } from '../data/categories';

defineProps<{
  modelValue: Category | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Category | null): void;
}>();

const selectCategory = (category: Category | null) => {
  emit('update:modelValue', category);
};

</script>

<template>
  <div class="category-filter-container">
    <h3 class="label-header font-mono">FILTER BY CATEGORY</h3>
    <div class="pills-grid">
      <!-- 'All' Option -->
      <button 
        :class="['pill-button', 'font-mono', { active: modelValue === null }]"
        @click="selectCategory(null)"
      >
        ALL_REASONS
      </button>

      <!-- Category Options -->
      <button 
        v-for="cat in CATEGORIES" 
        :key="cat"
        :class="['pill-button', 'font-mono', { active: modelValue === cat }]"
        @click="selectCategory(cat)"
      >
        {{ cat.toUpperCase().replace('-', '_') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.category-filter-container {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.label-header {
  font-size: 0.8rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.pills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pill-button {
  font-size: 0.75rem;
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--border-color);
  background-color: transparent;
  color: var(--text-muted);
  transition: all var(--transition-fast);
}

.pill-button:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
}

.pill-button.active {
  border-color: var(--accent-color);
  color: var(--accent-color);
  box-shadow: 0 0 8px rgba(255, 51, 51, 0.15);
  background-color: rgba(255, 51, 51, 0.02);
}
</style>
