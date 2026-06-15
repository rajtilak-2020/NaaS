<script setup lang="ts">
import { ref, computed } from 'vue';
import { Play, Copy, Check, Search } from '@lucide/vue';
import { SNIPPETS } from '../data/snippets';
import type { Category } from '../data/reasons';

const props = defineProps<{
  category: Category | null;
  activeLanguage: string;
}>();

const emit = defineEmits<{
  (e: 'update:activeLanguage', lang: string): void;
  (e: 'tryIt'): void;
}>();

const searchQuery = ref('');
const copied = ref(false);

// Filter snippets based on search query
const filteredSnippets = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return SNIPPETS;
  return SNIPPETS.filter(s => 
    s.name.toLowerCase().includes(query) || 
    s.key.toLowerCase().includes(query) ||
    s.extension.toLowerCase().includes(query)
  );
});

// Currently active snippet definition
const currentSnippetDef = computed(() => {
  return SNIPPETS.find(s => s.key === props.activeLanguage) || SNIPPETS[0];
});

// Compute target URL to display in snippet code
const apiUrl = computed(() => {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://no.krajtilak.in';
  if (props.category) {
    return `${origin}/api/no?category=${props.category}`;
  }
  return `${origin}/api/no`;
});

// Code text to display
const generatedCode = computed(() => {
  return currentSnippetDef.value.generator(apiUrl.value);
});

// Basic code highlighter
const highlightedCode = computed(() => {
  let escaped = generatedCode.value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Highlight double quoted strings
  escaped = escaped.replace(/"([^"\\]|\\.)*"/g, '<span class="token string">$&</span>');
  // Highlight single quoted strings
  escaped = escaped.replace(/'([^'\\]|\\.)*'/g, '<span class="token string">$&</span>');

  // Highlight comments starting with // or -- or # or WORKING-STORAGE (in COBOL)
  escaped = escaped.replace(/(^\s*(\/\/|#|--).*$)/gm, '<span class="token comment">$&</span>');
  // COBOL specific comments (area A lines, etc.)
  if (props.activeLanguage === 'cobol') {
    escaped = escaped.replace(/(^\s*[0-9A-Z-]+\s+DIVISION\b.*$)/gm, '<span class="token keyword">$&</span>');
    escaped = escaped.replace(/(^\s*[0-9A-Z-]+\s+SECTION\b.*$)/gm, '<span class="token keyword">$&</span>');
  }

  // Keywords highlighting
  const keywords = /\b(import|from|require|package|func|def|fn|function|class|return|let|const|var|struct|impl|use|async|await|try|except|catch|case|of|do|end|object|type|main|using|namespace|public|static|void|string|int|float|double|bool|boolean|true|false|nil|null|if|else|for|while|foreach|in|as|select|stop|run|call|program-id|working-storage|procedure|division|string|delimited|into)\b/gi;
  
  escaped = escaped.replace(keywords, (match) => {
    // Avoid replacing inside HTML tags
    return `<span class="token keyword">${match}</span>`;
  });

  return escaped;
});

const selectLanguage = (key: string) => {
  emit('update:activeLanguage', key);
};

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(generatedCode.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy code snippet:', err);
  }
};
</script>

<template>
  <div class="code-snippet-container">
    <!-- Language Search and Filter Tabs -->
    <div class="tabs-header-section sharp-border">
      <div class="search-box">
        <Search class="search-icon" />
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Filter language (e.g., Python, Rust, Go)..." 
          class="search-input font-mono"
        />
      </div>

      <!-- Language Buttons Grid -->
      <div class="languages-pills">
        <button
          v-for="s in filteredSnippets"
          :key="s.key"
          :class="['lang-pill', 'font-mono', { active: activeLanguage === s.key }]"
          @click="selectLanguage(s.key)"
        >
          {{ s.name }}
        </button>
        <div v-if="filteredSnippets.length === 0" class="no-results font-mono">
          No languages found.
        </div>
      </div>
    </div>

    <!-- Code Block and Actions -->
    <div class="code-block-wrapper sharp-border">
      <div class="code-header font-mono">
        <span class="file-name">example.{{ currentSnippetDef.extension }}</span>
        <div class="code-actions">
          <button @click="copyCode" class="action-btn font-mono" :title="copied ? 'Copied!' : 'Copy Code'">
            <component :is="copied ? Check : Copy" class="icon-btn-size" />
            <span>{{ copied ? 'COPIED' : 'COPY' }}</span>
          </button>
          
          <button @click="$emit('tryIt')" class="action-btn run-btn font-mono" title="Test endpoint">
            <Play class="icon-btn-size" />
            <span>TRY IT</span>
          </button>
        </div>
      </div>

      <!-- Syntax Highlighted Snippet -->
      <pre class="code-content font-mono"><code v-html="highlightedCode"></code></pre>
    </div>
  </div>
</template>

<style scoped>
.code-snippet-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tabs-header-section {
  background-color: var(--panel-bg);
  display: flex;
  flex-direction: column;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  border-bottom: 1px solid var(--border-color);
  padding: 0.6rem 0.8rem;
}

.search-icon {
  width: 14px;
  height: 14px;
  color: var(--text-muted);
}

.search-input {
  width: 100%;
  font-size: 0.75rem;
  color: var(--text-primary);
  background: transparent;
  border: none;
}

.search-input::placeholder {
  color: var(--text-muted);
}

.languages-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  padding: 0.8rem;
  max-height: 120px;
  overflow-y: auto;
  background-color: #0E0E0E;
}

.lang-pill {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  background-color: transparent;
}

.lang-pill:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
}

.lang-pill.active {
  border-color: var(--accent-color);
  color: var(--accent-color);
  background-color: rgba(255, 51, 51, 0.05);
}

.no-results {
  font-size: 0.7rem;
  color: var(--text-muted);
  width: 100%;
  text-align: center;
  padding: 0.5rem;
}

.code-block-wrapper {
  background-color: var(--code-bg);
  display: flex;
  flex-direction: column;
}

.code-header {
  background-color: #080808;
  border-bottom: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  font-size: 0.7rem;
  color: var(--text-muted);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-name {
  color: var(--text-primary);
  font-weight: 500;
}

.code-actions {
  display: flex;
  gap: 0.8rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.65rem;
  color: var(--text-muted);
  padding: 0.2rem 0.4rem;
  border: 1px solid var(--border-color);
}

.action-btn:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
}

.run-btn {
  border-color: var(--success-color);
  color: var(--success-color);
  background-color: rgba(0, 255, 136, 0.02);
}

.run-btn:hover {
  border-color: var(--success-color);
  background-color: rgba(0, 255, 136, 0.1);
  box-shadow: 0 0 6px var(--success-glow);
}

.icon-btn-size {
  width: 10px;
  height: 10px;
}

.code-content {
  padding: 1.2rem;
  font-size: 0.8rem;
  line-height: 1.5;
  overflow-x: auto;
  color: var(--text-primary);
  max-height: 250px;
  overflow-y: auto;
}

/* Syntax colors */
:deep(.token.keyword) {
  color: #FF3333; /* Hard red for programming keywords */
  font-weight: 600;
}
:deep(.token.string) {
  color: #00FF88; /* Success green for strings */
}
:deep(.token.comment) {
  color: #555555;
  font-style: italic;
}
</style>
