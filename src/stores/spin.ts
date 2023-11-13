import { defineStore } from 'pinia';

export const useSpinStore = defineStore('spin', () => {
    const isSpining = ref(false);
    const spinText = ref('Marking the essay...');

    return {
        isSpining,
        spinText
    };
});