<script setup lang="ts">
import { provide, onMounted } from 'vue';
import { useNoApi } from './composables/useNoApi';
import LeftPanel from './components/LeftPanel.vue';
import RightPanel from './components/RightPanel.vue';

const state = useNoApi();
provide('naasState', state);

onMounted(() => {
  // Unregister existing Service Workers to prevent API interception/exposure
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().then((unregistered) => {
          if (unregistered) {
            console.log('✓ Service worker unregistered successfully');
          }
        });
      }
    });
  }

  // Load first excuse automatically
  state.fetchRandomReason();
});
</script>

<template>
  <div class="app-layout">
    <div class="panel-container left-container">
      <LeftPanel />
    </div>
    
    <!-- Vertical neon divider line separating panels -->
    <div class="vertical-divider"></div>
    
    <div class="panel-container right-container">
      <RightPanel />
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-color);
}

.panel-container {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
}

.left-container {
  background-color: var(--bg-color);
}

.right-container {
  background-color: #0C0C0C;
}

.vertical-divider {
  width: 1px;
  background-color: var(--accent-color);
  box-shadow: 0 0 12px var(--accent-color);
  flex-shrink: 0;
  z-index: 10;
}

@media (max-width: 900px) {
  .app-layout {
    flex-direction: column;
  }
  
  .vertical-divider {
    width: 100%;
    height: 1px;
    box-shadow: 0 0 8px var(--accent-color);
  }
  
  .panel-container {
    flex: none;
    width: 100%;
  }
}
</style>
