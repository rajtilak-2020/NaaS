<script setup lang="ts">
import { inject } from 'vue';
import type { NaasState } from '../composables/useNoApi';
import CodeSnippet from './CodeSnippet.vue';
import JsonOutput from './JsonOutput.vue';
import { Terminal } from '@lucide/vue';

const state = inject<NaasState>('naasState');
if (!state) throw new Error('NaaS state is not provided');

const handleTryIt = () => {
  state.fetchRandomReason();
};
</script>

<template>
  <div class="right-panel">
    <!-- Console Headers and Metrics -->
    <header class="console-header sharp-border">
      <div class="header-left">
        <Terminal class="icon-terminal" />
        <span class="header-title font-mono">API_EXPLORER_CONSOLE</span>
      </div>
      
      <!-- Metrics Badges -->
      <div class="metrics-row font-mono">
        <!-- Status Code Badge -->
        <span 
          v-if="state.apiResponse.value"
          :class="['metric-badge', state.apiResponse.value.error ? 'status-error' : 'status-success']"
        >
          {{ state.apiResponse.value.error ? '500 ERROR' : '200 OK' }}
        </span>

        <!-- Latency/Response Time Badge -->
        <span 
          v-if="state.responseTime.value !== null"
          class="metric-badge latency-badge"
        >
          {{ state.responseTime.value }}ms
        </span>

        <!-- Protocol Badge -->
        <span class="metric-badge protocol-badge">HTTP/1.1</span>
      </div>
    </header>

    <!-- Main Explorer Console Body -->
    <main class="console-body">
      <!-- Code Snippet Module -->
      <CodeSnippet 
        :category="state.selectedCategory.value"
        v-model:activeLanguage="state.activeLanguage.value"
        @tryIt="handleTryIt"
      />

      <!-- JSON Preview Module -->
      <JsonOutput :response="state.apiResponse.value" />
    </main>
  </div>
</template>

<style scoped>
.right-panel {
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: #0c0c0c;
  height: 100%;
}

.console-header {
  background-color: var(--panel-bg);
  padding: 0.8rem 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.icon-terminal {
  width: 14px;
  height: 14px;
  color: var(--accent-color);
}

.header-title {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--text-primary);
}

.metrics-row {
  display: flex;
  gap: 0.5rem;
}

.metric-badge {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.15rem 0.4rem;
  background-color: #1A1A1A;
  color: var(--text-muted);
}

.status-success {
  background-color: rgba(0, 255, 136, 0.1);
  color: var(--success-color);
  border: 1px solid rgba(0, 255, 136, 0.2);
}

.status-error {
  background-color: rgba(255, 51, 51, 0.1);
  color: var(--accent-color);
  border: 1px solid rgba(255, 51, 51, 0.2);
}

.latency-badge {
  background-color: rgba(0, 255, 136, 0.05);
  color: var(--success-color);
  border: 1px solid var(--border-color);
}

.protocol-badge {
  border: 1px solid var(--border-color);
}

.console-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .right-panel {
    padding: 2rem 1.5rem;
  }
}
</style>
