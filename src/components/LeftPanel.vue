<script setup lang="ts">
import { inject } from 'vue';
import type { NaasState } from '../composables/useNoApi';
import ReasonCard from './ReasonCard.vue';
import CategoryFilter from './CategoryFilter.vue';
import { SNIPPETS } from '../data/snippets';
import { RefreshCw } from '@lucide/vue';

const state = inject<NaasState>('naasState');
if (!state) throw new Error('NaaS state is not provided');

const selectLanguage = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  state.activeLanguage.value = target.value;
};
</script>

<template>
  <div class="left-panel">
    <!-- Branding Header -->
    <header class="header-section">
      <div class="brand-wrapper">
        <img 
          src="/favicon.png" 
          alt="NaaS Logo" 
          :class="['brand-logo', { 'logo-pulse': state.pulseActive.value }]" 
        />
        <h1 class="app-title font-mono">
          <span :class="['brand-no', { 'pulse-glow': state.pulseActive.value }]">NO</span>_AS_A_SERVICE
        </h1>
      </div>
      <p class="app-tagline font-mono">
        &gt; Absenteeism, denial, and boundaries as a production-ready REST utility.
      </p>
    </header>

    <!-- Playground Interactive Area -->
    <main class="playground-section">
      <ReasonCard :reason="state.currentReason.value" />

      <!-- Primary Action Row -->
      <div class="actions-row">
        <!-- Fetch Button -->
        <button 
          @click="state.fetchRandomReason" 
          class="btn-primary font-mono sharp-border"
          :disabled="state.isFetching.value"
        >
          <RefreshCw :class="['icon-refresh', { spinning: state.isFetching.value }]" />
          <span>GIVE ME A NO</span>
        </button>

        <!-- Language Dropdown -->
        <div class="select-wrapper sharp-border font-mono">
          <label for="lang-select" class="select-label">CODE:</label>
          <select 
            id="lang-select" 
            :value="state.activeLanguage.value" 
            @change="selectLanguage"
            class="lang-select"
          >
            <option 
              v-for="s in SNIPPETS" 
              :key="s.key" 
              :value="s.key"
            >
              {{ s.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Categories Filter List -->
      <CategoryFilter v-model="state.selectedCategory.value" />
    </main>
  </div>
</template>

<style scoped>
.left-panel {
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  height: 100%;
}

.header-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.brand-wrapper {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.brand-logo {
  width: 38px;
  height: 38px;
  object-fit: contain;
  transition: all var(--transition-fast);
}

@keyframes logo-pulse {
  0% {
    transform: scale(1);
    filter: drop-shadow(0 0 0 rgba(255, 51, 51, 0));
  }
  50% {
    transform: scale(1.15) rotate(-5deg);
    filter: drop-shadow(0 0 12px var(--accent-color));
  }
  100% {
    transform: scale(1);
    filter: drop-shadow(0 0 0 rgba(255, 51, 51, 0));
  }
}

.logo-pulse {
  animation: logo-pulse 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.app-title {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: var(--text-primary);
}

.brand-no {
  color: var(--accent-color);
  transition: all var(--transition-fast);
}

.app-tagline {
  font-size: 0.8rem;
  color: var(--text-muted);
  max-width: 90%;
  line-height: 1.4;
}

.playground-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.actions-row {
  display: flex;
  gap: 1rem;
}

.btn-primary {
  flex-grow: 2;
  background-color: var(--accent-color);
  color: #FFFFFF;
  border-color: var(--accent-color);
  font-weight: 700;
  padding: 0.9rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  box-shadow: 0 0 15px rgba(255, 51, 51, 0.15);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--accent-hover);
  border-color: var(--accent-hover);
  box-shadow: 0 0 25px rgba(255, 51, 51, 0.35);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon-refresh {
  width: 16px;
  height: 16px;
  transition: transform var(--transition-normal);
}

.icon-refresh.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.select-wrapper {
  flex-grow: 1;
  background-color: var(--panel-bg);
  display: flex;
  align-items: center;
  padding: 0 0.8rem;
  position: relative;
}

.select-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-right: 0.4rem;
  pointer-events: none;
}

.lang-select {
  width: 100%;
  background-color: transparent;
  color: var(--text-primary);
  border: none;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.9rem 0;
  cursor: pointer;
  appearance: none;
}

/* Custom indicator in select options */
.lang-select option {
  background-color: var(--panel-bg);
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .left-panel {
    padding: 2rem 1.5rem;
  }
  
  .actions-row {
    flex-direction: column;
  }
}
</style>
