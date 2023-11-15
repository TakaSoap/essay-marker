<template>
    <ion-app>
        <n-config-provider
            :theme="themeStore.theme"
            :theme-overrides="themeStore.theme === null ? lightThemeOverrides : darkThemeOverrides"
            :locale="enUS"
            :date-locale="dateEnUS"
        >
            <n-loading-bar-provider>
                <n-message-provider>
                    <n-notification-provider>
                        <n-dialog-provider>
                                <ion-router-outlet />
                        </n-dialog-provider>
                    </n-notification-provider>
                </n-message-provider>
            </n-loading-bar-provider>
        </n-config-provider>
    </ion-app>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import '@/theme/variables.css';

const themeStore = useThemeStore();
const spinStore = useSpinStore();

/**
 * @type import('naive-ui').GlobalThemeOverrides
 */
const lightThemeOverrides = {
    Layout: {}
    // ...
};

const darkThemeOverrides = {
    Layout: {}
    // ...
};

onMounted(() => {
    themeStore.initTheme();
});
</script>

<style>
.main-content {
    min-height: 80vh;
}


</style>
