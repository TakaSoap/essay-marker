<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="icon-container">
                <ion-icon :icon="ioniconsLogoIonic" size="large" color="primary"></ion-icon>
                <h1 style="margin: 0 0 0 1em">Essay Marker</h1>
            </div>
            <n-spin :show="spinStore.isSpining" size="large">
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
                            <n-input clearable :disabled="isInputsDisabled" v-model:value="newEssayStore.title" />
                        </n-form-item-row>
                        <n-form-item-row
                            v-if="newEssayStore.requirementTitle === 'IELTS Writing Task 2 Grading Criteria'"
                            label="IELTS Writing Task 2 Topic"
                        >
                            <n-input
                                type="textarea"
                                :status="topicStatus"
                                :disabled="isInputsDisabled"
                                v-model:value="newEssayStore.ieltsTopic"
                                :autosize="{
                                    minRows: 3,
                                    maxRows: 20
                                }"
                            />
                        </n-form-item-row>
                        <n-form-item-row label="Content">
                            <n-space vertical style="width: 100%">
                                <n-input
                                    type="textarea"
                                    :status="essayStatus"
                                    :disabled="isInputsDisabled"
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
                        <n-button class="button" type="info" block secondary strong @click="submitEssay"> Submit </n-button>
                    </div>
                </n-space>
                <template #description> {{ spinStore.spinText }} </template>
            </n-spin>
            <div style="margin-top: 2em">
                {{ newEssayStore }}
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { useNewEssayStore } from '@/stores/newEssay';
import { useMessage } from 'naive-ui';
import openaiRequest from '@/composables/useOpenaiAPI';
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
const spinStore = useSpinStore();
const router = useRouter();
const message = useMessage();

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
    // router.push('/ai/student');
}

const essayStatus = ref('');
const topicStatus = ref('');
const isInputsDisabled = ref(false);

function submitEssay() {
    let errorFlag = false;

    // Validate form
    if (newEssayStore.content === '') {
        message.error('Please enter the content of the essay');
        essayStatus.value = 'error';
        errorFlag = true;
    } else if (newEssayStore.content.length > 2000) {
        message.error('The content of the essay should be less than 2000 characters');
        essayStatus.value = 'error';
        errorFlag = true;
    }

    if (newEssayStore.requirementTitle === 'IELTS Writing Task 2 Grading Criteria') {
        if (newEssayStore.ieltsTopic === '') {
            message.error('Please enter the topic of the essay');
            topicStatus.value = 'error';
            errorFlag = true;
        } else if (newEssayStore.ieltsTopic.length > 1000) {
            message.error('The topic of the essay should be less than 1000 characters');
            topicStatus.value = 'error';
            errorFlag = true;
        }
    }

    if (errorFlag) {
        return;
    }

    essayStatus.value = '';
    isInputsDisabled.value = true;

    spinStore.isSpining = true;

    const feedbackStore = useFeedbackStore();

    openaiRequest(newEssayStore.requirementContent, newEssayStore.content, newEssayStore.ieltsTopic)
        .then((response) => {
            if (response) {
                spinStore.isSpining = false;

                newEssayStore.submitTime = new Date().toLocaleString('en-HK').toUpperCase();

                // response is a string of JSON
                feedbackStore.setFeedback(JSON.parse(response), newEssayStore.requirementTitle === 'IELTS Writing Task 2 Grading Criteria');
                router.push('/ai/results');
            }
        })
        .catch((error) => {
            message.error('Error\n', error);
            console.error(error);
        })
        .finally(() => {
            isInputsDisabled.value = false;
            spinStore.isSpining = false;
        });
}
</script>

<style>
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

.n-list-item__prefix {
    max-height: 24px;
}
.n-thing-header{
    margin-bottom: 0 !important;
}

</style>
