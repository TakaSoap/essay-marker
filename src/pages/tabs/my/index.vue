<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Tab 3</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-button router-link="/">
                <ion-icon :icon="ioniconsLogOutOutline" />
                <ion-label>Logout</ion-label>
            </ion-button>
        </ion-content>
        
        <n-button @click="OnLogoutBtnClick" type="error">Logout</n-button>
        <n-button quaternary @click="themeStore.toggleTheme">
                <template #icon>
                    <n-icon>
                        <Sunny v-if="themeStore.isDarkTheme" />
                        <Moon v-else />
                    </n-icon>
                </template>
                Toggle Theme
            </n-button>
    </ion-page>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { Sunny, Moon } from '@vicons/ionicons5';

const themeStore = useThemeStore();
const router = useRouter();

function OnLogoutBtnClick() {
    router.push('/');
}

</script>
