<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/tabs"></ion-back-button>
                </ion-buttons>
                <ion-title>Edit Requirement</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <n-form>
                <n-form-item-row label="Saved Requirements">
                    <n-select v-model:value="selectedRequirementTitle" :options="options" @update:value="handleUpdateSelect"> </n-select>
                </n-form-item-row>
                <n-form-item-row label="Content">
                    <n-space vertical style="width: 100%">
                        <n-input
                            type="textarea"
                            v-model:value="newEssayStore.requirementContent"
                            :autosize="{
                                minRows: 3,
                                maxRows: 20
                            }"
                        />
                        <n-text depth="3" italic>Edits to the content are valid for this time only and do not affect saved requirements.</n-text>
                    </n-space>
                </n-form-item-row>
            </n-form>
        </ion-content>
        <ion-footer>
            <n-card content-style="padding: 1em" :bordered="false" embedded>
                <n-button block type="info" @click="goBack">
                    <template #icon>
                        <n-icon><Checkmark16Regular /></n-icon>
                    </template>
                    Confirm
                </n-button>
            </n-card>
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import { Checkmark16Regular } from '@vicons/fluent';

interface SelectBaseOption {
    label: string;
    value: string;
}

const router = useRouter();
const newEssayStore = useNewEssayStore();
const requirementsStore = useRequirementsStore();


// interface Requirement {
//     title: string;
//     content: string;
// }

// interface RequirementItem extends Requirement {
//     id: number;
// }

const requirements = requirementsStore.requirements;

const options = ref(
    requirements.map((requirement) => {
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
