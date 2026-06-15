<script setup lang="ts">
import { ref } from 'vue';
import { Copy as CopyIcon, Check as CheckIcon } from '@lucide/vue';
import type { NoReason } from '../data/reasons';

const props = defineProps<{
  reason: NoReason | null;
}>();

const copied = ref(false);

const copyText = async () => {
  if (!props.reason) return;
  try {
    await navigator.clipboard.writeText(props.reason.reason);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Clipboard copy failed:', err);
  }
};
</script>

<template>
  <div class="terminal-card sharp-border">
    <!-- Terminal Title Bar -->
    <div class="terminal-header">
      <div class="window-controls">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
      </div>
      <div class="window-title font-mono">
        excuse_id_{{ reason?.id || 'null' }}.json
      </div>
      <button 
        class="copy-btn-header" 
        @click="copyText" 
        :disabled="!reason"
        :title="copied ? 'Copied!' : 'Copy excuse'"
      >
        <component :is="copied ? CheckIcon : CopyIcon" class="icon-small" />
      </button>
    </div>

    <!-- Terminal Content Area -->
    <div class="terminal-body">
      <div class="meta-row font-mono">
        <span class="meta-label">ID:</span>
        <span class="meta-value text-accent">#{{ reason?.id ?? '???' }}</span>
        
        <span class="meta-label separator">|</span>
        
        <span class="meta-label">CAT:</span>
        <span class="meta-value">{{ reason?.category ?? 'ANY' }}</span>

        <span class="meta-label separator">|</span>

        <span class="meta-label">SEV:</span>
        <span :class="['severity-badge', reason?.severity ?? 'gentle']">
          {{ reason?.severity ?? 'gentle' }}
        </span>
      </div>

      <div class="reason-display-area font-mono">
        <div class="prompt-arrow">&gt;</div>
        <p class="reason-text">{{ reason?.reason || 'Click "Give me a No" to generate.' }}</p>
      </div>

      <!-- Copied toast inline -->
      <div class="toast-area font-mono" :class="{ show: copied }">
        <span class="text-success">&gt; COPIED TO CLIPBOARD SUCCESSFULLY</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.terminal-card {
  background-color: var(--panel-bg);
  width: 100%;
  display: flex;
  flex-direction: column;
}

.terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #161616;
  border-bottom: 1px solid var(--border-color);
  padding: 0.6rem 1rem;
}

.window-controls {
  display: flex;
  gap: 0.4rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot.red { background-color: #FF5F56; }
.dot.yellow { background-color: #FFBD2E; }
.dot.green { background-color: #27C93F; }

.window-title {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.copy-btn-header {
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
}

.copy-btn-header:hover:not(:disabled) {
  color: var(--accent-color);
}

.copy-btn-header:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.icon-small {
  width: 14px;
  height: 14px;
}

.terminal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  min-height: 220px;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  border-bottom: 1px dashed var(--border-color);
  padding-bottom: 0.8rem;
}

.text-accent {
  color: var(--accent-color);
}

.separator {
  opacity: 0.3;
}

.severity-badge {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
}

.severity-badge.gentle {
  border: 1px solid var(--text-muted);
  color: var(--text-muted);
}

.severity-badge.firm {
  border: 1px solid var(--warning-color);
  color: var(--warning-color);
}

.severity-badge.nuclear {
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
  background-color: rgba(255, 51, 51, 0.05);
}

.reason-display-area {
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
  flex-grow: 1;
}

.prompt-arrow {
  color: var(--accent-color);
  font-weight: bold;
  font-size: 1.4rem;
  line-height: 1.2;
}

.reason-text {
  font-size: 1.35rem;
  font-weight: 500;
  line-height: 1.4;
  color: var(--text-primary);
}

.toast-area {
  font-size: 0.75rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all var(--transition-normal);
}

.toast-area.show {
  opacity: 1;
  transform: translateY(0);
}

.text-success {
  color: var(--success-color);
}
</style>
