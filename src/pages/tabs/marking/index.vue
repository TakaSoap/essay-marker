<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="icon-container">
                <ion-icon :icon="ioniconsLogoIonic" size="large" color="primary"></ion-icon>
                <h1 style="margin: 0 0 0 1em">Essay Marker</h1>
            </div>

            <n-space vertical size="large">
                <n-list hoverable clickable bordered>
                    <n-list-item @click="handleRequirementClick">
                        <template #prefix>
                            <n-icon size="24"><CompassNorthwest16Regular /></n-icon>
                        </template>
                        <n-thing>
                            <template #header>
                                <div style="margin-bottom: 0">Requirement</div>
                            </template>
                            <template #description> {{ requirementTitle }} </template>
                        </n-thing>
                        <template #suffix>
                            <n-icon size="24"><ChevronRight16Regular /></n-icon>
                        </template>
                    </n-list-item>
                    <n-list-item @click="handleStudentClick">
                        <template #prefix>
                            <n-icon size="24"><Person16Regular /></n-icon>
                        </template>
                        <n-thing title="Student">
                            <template #description> {{ studentName }} </template>
                        </n-thing>
                        <template #suffix>
                            <n-icon size="24"><ChevronRight16Regular /></n-icon>
                        </template>
                    </n-list-item>
                </n-list>
                <n-form style="margin-top: 1em">
                    <n-form-item-row label="Title">
                        <n-input clearable v-model:value="newEssayStore.title" />
                    </n-form-item-row>
                    <n-form-item-row label="Content">
                        <n-space vertical style="width: 100%">
                            <n-input
                                type="textarea"
                                v-model:value="newEssayStore.content"
                                :autosize="{
                                    minRows: 3,
                                    maxRows: 20
                                }"
                            />
                            <n-space justify="space-between">
                                <n-button-group>
                                    <n-button ghost>
                                        <template #icon>
                                            <n-icon><Camera16Regular /></n-icon>
                                        </template>
                                    </n-button>
                                    <n-button ghost>
                                        <template #icon>
                                            <n-icon><Image16Regular /></n-icon>
                                        </template>
                                    </n-button>
                                    <n-button>
                                        <template #icon>
                                            <n-icon><FolderAdd16Regular /></n-icon>
                                        </template>
                                    </n-button>
                                </n-button-group>
                                <n-button :secondary="!confirmingDelete" type="error">
                                    <template #icon>
                                        <n-icon><Delete16Regular /></n-icon>
                                    </template>
                                </n-button>
                            </n-space>
                        </n-space>
                    </n-form-item-row>
                </n-form>
                <div class="button-container">
                    <n-button class="button" type="error" block secondary strong> Clear All </n-button>
                    <n-button class="button" type="info" block secondary strong> Submit </n-button>
                </div>
            </n-space>
            <div style="margin-top: 2em">
                {{ newEssayStore }}
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { useNewEssayStore } from '@/stores/newEssay';
import {
    CompassNorthwest16Regular,
    ChevronRight16Regular,
    Person16Regular,
    Camera16Regular,
    Image16Regular,
    FolderAdd16Regular,
    Delete16Regular
} from '@vicons/fluent';

const newEssayStore = useNewEssayStore();
const router = useRouter();

// If requirement title is '', then show 'Requirement' instead
const requirementTitle = computed(() => {
    return newEssayStore.requirementTitle || 'Select an requirement';
});

const studentName = computed(() => {
    return newEssayStore.studentName || 'Select a student';
});

const confirmingDelete = ref(false);

function handleRequirementClick() {
    router.push('/ai/requirement');
}

function handleStudentClick() {
    router.push('/ai/student');
}
</script>

<style scoped>
.icon-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 5em;
    margin-bottom: 5em;
}

.button {
    margin: 0;
}

.button-container {
    display: flex;
    justify-content: space-between;
}

.button-container > * {
    flex: 1;
    margin: 0;
}

.button-container > *:not(:last-child) {
    margin-right: 1em;
}

.n-thing-header {
    margin-bottom: 0;
}

ion-fab-button {
    margin-top: 1em;
}
</style>
