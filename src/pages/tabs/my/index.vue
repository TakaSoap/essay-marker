<template>
    <ion-page>
        <ion-content>
            <n-space vertical>
                <n-card content-style="padding: 10" :bordered="false" style="padding-top: 2em">
                    <n-list clickable hoverable>
                        <n-list-item @click="showEditMyProfileForm">
                            <template #prefix>
                                <n-avatar round :size="large" :src="avatarPlaceholder + 'teacher'" />
                            </template>
                            <n-thing>
                                <template #header>
                                    <div>Amy</div>
                                </template>

                                <template #description>
                                    <n-text depth="3">Good Good Study, Day Day Up!</n-text>
                                </template>
                            </n-thing>
                            <template #suffix>
                                <n-icon size="24">
                                    <PersonEdit20Regular />
                                </n-icon>
                            </template>
                        </n-list-item>
                    </n-list>
                </n-card>
                <n-list clickable hoverable>
                    <n-list-item>
                        <template #prefix>
                            <n-icon size="24"><DataBarHorizontal20Regular /></n-icon>
                        </template>
                        <n-thing>
                            <template #header> Data Analysis </template>
                        </n-thing>
                        <template #suffix>
                            <n-icon size="24"><ChevronRight16Regular /></n-icon>
                        </template>
                    </n-list-item>
                    <n-list-item>
                        <template #prefix>
                            <n-icon size="24"><Settings20Regular /></n-icon>
                        </template>
                        <n-thing>
                            <template #header> Settings </template>
                        </n-thing>
                    </n-list-item>
                    <n-list-item @click="themeStore.toggleTheme">
                        <template #prefix>
                            <n-icon size="24">
                                <Sunny v-if="themeStore.isDarkTheme" />
                                <Moon v-else />
                            </n-icon>
                        </template>
                        <n-thing>
                            <template #header>Toggle Theme</template>
                        </n-thing>
                    </n-list-item>
                    <n-list-item>
                        <template #prefix>
                            <n-icon size="24"><Question20Regular /></n-icon>
                        </template>
                        <n-thing>
                            <template #header> About </template>
                        </n-thing>
                    </n-list-item>
                </n-list>
            </n-space>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { Sunny, Moon } from '@vicons/ionicons5';
import { PersonEdit20Regular, History20Regular, DataBarHorizontal20Regular, Settings20Regular, Question20Regular } from '@vicons/fluent';

const themeStore = useThemeStore();
const router = useRouter();

const avatarPlaceholder = 'https://i.pravatar.cc/100?u=';

function OnLogoutBtnClick() {
    router.push('/');
}
</script>

<style scoped>
.n-thing-header {
    margin-bottom: 0 !important;
}
</style>
