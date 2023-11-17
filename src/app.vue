<template>
    <ion-app>
        <n-config-provider
            :theme="themeStore.theme"
            :theme-overrides="themeStore.theme === null ? lightThemeOverrides : darkThemeOverrides"
            :locale="enGB"
            :date-locale="dateEnGB"
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
import { enGB, dateEnGB } from 'naive-ui';
import '@/theme/variables.css';

const themeStore = useThemeStore();
const spinStore = useSpinStore();

/**
 * @type import('naive-ui').GlobalThemeOverrides
 */
const lightThemeOverrides = {
  "common": {
    "infoColor": "#18A058FF",
    "infoColorHover": "#36AD6AFF",
    "infoColorPressed": "#0C7A43FF",
    "infoColorSuppl": "#36AD6AFF",
    "primaryColor": "#2080F0FF",
    "primaryColorHover": "#4098FCFF",
    "primaryColorPressed": "#1060C9FF",
    "primaryColorSuppl": "#4098FCFF"
  }
};

const darkThemeOverrides = {
    "common": {
    "infoColor": "#63E2B7FF",
    "infoColorHover": "#7FE7C4FF",
    "infoColorPressed": "#5ACEA7FF",
    "infoColorSuppl": "#2A947DFF",
    "primaryColor": "#70C0E8FF",
    "primaryColorHover": "#8ACBECFF",
    "primaryColorPressed": "#66AFD3FF",
    "primaryColorSuppl": "#3889C5FF"
  }
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
