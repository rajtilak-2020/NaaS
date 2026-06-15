import { ref, watch } from 'vue';
import type { Category, NoReason } from '../data/categories';


export function useNoApi() {
  const selectedCategory = ref<Category | null>(null);
  const currentReason = ref<NoReason | null>(null);
  const activeLanguage = ref<string>('curl');
  const apiResponse = ref<any>(null);
  const responseTime = ref<number | null>(null);
  const pulseActive = ref(false);
  const langSearchQuery = ref('');
  const isFetching = ref(false);

  // Trigger red logo glow animation in header
  const triggerPulse = () => {
    pulseActive.value = true;
    setTimeout(() => {
      pulseActive.value = false;
    }, 600); // matches CSS animation duration
  };

  const fetchRandomReason = async () => {
    isFetching.value = true;
    const startTime = performance.now();
    triggerPulse();

    try {
      let url = '/api/no';
      const params = new URLSearchParams();
      if (selectedCategory.value) {
        params.append('category', selectedCategory.value);
      }
      
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      const endTime = performance.now();
      responseTime.value = Math.round(endTime - startTime);

      // Ensure data has shape of reason
      currentReason.value = data;
      apiResponse.value = data;
    } catch (e) {
      console.error('API Error:', e);
      apiResponse.value = { error: 'Failed to connect to API endpoint' };
    } finally {
      isFetching.value = false;
    }
  };

  const fetchReasonById = async (id: number) => {
    isFetching.value = true;
    const startTime = performance.now();
    triggerPulse();

    try {
      const res = await fetch(`/api/no?id=${id}`);
      const data = await res.json();

      const endTime = performance.now();
      responseTime.value = Math.round(endTime - startTime);

      currentReason.value = data.error ? currentReason.value : data;
      apiResponse.value = data;
    } catch (e) {
      console.error('API Error by ID:', e);
      apiResponse.value = { error: `Failed to fetch ID ${id}` };
    } finally {
      isFetching.value = false;
    }
  };

  // Automatically fetch on category change
  watch(selectedCategory, () => {
    fetchRandomReason();
  });

  return {
    selectedCategory,
    currentReason,
    activeLanguage,
    apiResponse,
    responseTime,
    pulseActive,
    langSearchQuery,
    isFetching,
    fetchRandomReason,
    fetchReasonById
  };
}

export type NaasState = ReturnType<typeof useNoApi>;
