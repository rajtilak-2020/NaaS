<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  response: any;
}>();

const highlightedJson = computed(() => {
  if (!props.response) {
    return `<span class="token comment">// No active response. Run a request to preview JSON.</span>`;
  }
  
  try {
    const jsonStr = JSON.stringify(props.response, null, 2);
    
    // HTML escape
    const escaped = jsonStr
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
      
    // Highlight keys, strings, numbers, booleans, and nulls
    return escaped.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return `<span class="token ${cls}">${match}</span>`;
      }
    );
  } catch (e) {
    return `<span class="token comment">// Error rendering JSON: ${(e as Error).message}</span>`;
  }
});
</script>

<template>
  <div class="json-container sharp-border">
    <div class="json-header font-mono">
      <span :class="['dot-indicator', { inactive: !response }]"></span>
      RESPONSE_BODY (JSON)
    </div>
    <pre class="json-body font-mono"><code v-html="highlightedJson"></code></pre>
  </div>
</template>

<style scoped>
.json-container {
  background-color: var(--code-bg);
  width: 100%;
  display: flex;
  flex-direction: column;
}

.json-header {
  background-color: #080808;
  border-bottom: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  font-size: 0.7rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dot-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--success-color);
  box-shadow: 0 0 6px var(--success-color);
  transition: all var(--transition-normal);
}

.dot-indicator.inactive {
  background-color: var(--text-muted);
  box-shadow: none;
}

.json-body {
  padding: 1.2rem;
  font-size: 0.85rem;
  line-height: 1.5;
  overflow-x: auto;
  color: var(--text-primary);
  max-height: 350px;
  overflow-y: auto;
}

/* Local token override rules if required */
:deep(.token.key) {
  color: #FF5555;
  font-weight: 500;
}
:deep(.token.string) {
  color: #00FF88;
}
:deep(.token.number), :deep(.token.boolean), :deep(.token.null) {
  color: #FFB300;
}
:deep(.token.comment) {
  color: #555555;
  font-style: italic;
}
</style>
