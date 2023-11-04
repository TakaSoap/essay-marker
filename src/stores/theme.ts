import { darkTheme, useOsTheme } from 'naive-ui';
import type { BuiltInGlobalTheme } from 'naive-ui/lib/themes/interface';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('themeController', () => {
    const osThemeRef = useOsTheme();

    console.log(osThemeRef.value);

    const theme: Ref<null | BuiltInGlobalTheme> = ref(osThemeRef.value === 'dark' ? darkTheme : null);
    const isDarkTheme: Ref<boolean> = ref(osThemeRef.value === 'dark');

    function toggleTheme() {
        isDarkTheme.value = !isDarkTheme.value;
        theme.value = isDarkTheme.value ? darkTheme : null;
        document.body.classList.toggle('dark', isDarkTheme.value);
    }

    function initTheme() {
        document.body.classList.toggle('dark', isDarkTheme.value);
    }
    return { theme, isDarkTheme, toggleTheme, initTheme };
});
