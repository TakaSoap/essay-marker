<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/"></ion-back-button>
                </ion-buttons>
                <ion-title>Edit Requirement</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <n-form>
                <n-form-item-row label="Student">
                    <n-select v-model:value="selectedRequirementTitle" :options="options" @update:value="handleUpdateSelect"> </n-select>
                </n-form-item-row>
                <n-form-item-row label="Content">
                    <n-input type="textarea" v-model:value="newEssayStore.requirementContent" />
                </n-form-item-row>
            </n-form>
        </ion-content>
        <ion-footer class="ion-padding">
            <n-button block type="info" @click="goBack">
                <template #icon>
                    <n-icon><Save16Regular /></n-icon>
                </template>
                Save
            </n-button>
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import { Save16Regular } from '@vicons/fluent';

interface SelectBaseOption {
    label: string;
    value: string;
}

const router = useRouter();
const newEssayStore = useNewEssayStore();

const requirements = ref([
    { title: 'Auto', content: 'Auto' },
    { title: 'Requirement 1', content: 'Content 1' },
    { title: 'Requirement 2', content: 'Content 2' }
    // ...
]);

const options = ref(
    requirements.value.map((requirement) => {
        return {
            label: requirement.title,
            value: requirement.content
        };
    })
);

function handleUpdateSelect(value: string, option: SelectBaseOption) {
    newEssayStore.requirementTitle = option.label;
    newEssayStore.requirementContent = option.value;
    console.log(option);
}

function goBack() {
    router.back();
}

const selectedRequirementTitle = computed(() => {
    return newEssayStore.requirementTitle;
});
</script>

<style scoped>
/* Styles go here */
</style>
