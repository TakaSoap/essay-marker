<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/student" :disabled="isLoading"></ion-back-button>
                </ion-buttons>
                <ion-title>Essay</ion-title>
                <ion-buttons slot="end">
                    <n-popconfirm
                        @positive-click="deleteEssay"
                        :positive-button-props="{
                            type: 'error'
                        }"
                    >
                        <template #trigger>
                            <n-button text style="font-size: 24px; margin: 0 12px" type="error">
                                <n-icon>
                                    <Delete16Regular />
                                </n-icon>
                            </n-button>
                        </template>
                        <n-text>Are you sure to delete this essay?</n-text>
                    </n-popconfirm>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <n-h2>
                <n-text type="primary"> {{ studentsStore.currentEssay.title }} </n-text>
            </n-h2>
            <n-space>
                <n-text depth="3"> {{ studentsStore.currentStudent.name }} </n-text>
                <n-text depth="3"> {{ studentsStore.currentEssay.submitTime }} </n-text>
            </n-space>
            <n-p style="font-size: medium" v-for="(line, index) in essayLines" :key="index">
                {{ line }}
            </n-p>
        </ion-content>
        <ion-footer>
            <n-card content-style="padding: 1em" :bordered="false" embedded>
                <n-button v-if="studentsStore.currentEssay.feedback" block size="large" type="primary" secondary @click="toFeedback">
                    View & Edit Feedback
                </n-button>
                <n-button v-else block size="large" type="primary" secondary @click="toMarking">
                    Grade This Essay
                </n-button>
            </n-card>
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import { DocumentOnePage20Regular, ChevronRight16Regular, Delete16Regular } from '@vicons/fluent';
const router = useRouter();
const isLoading = ref(false);

const studentsStore = useStudentsStore();
const newEssayStore = useNewEssayStore();

const essayLines = computed(() => {
    return studentsStore.currentEssay.content.split('\n');
});

function toFeedback() {
    router.push('/student/feedback');
}

function toMarking() {
    newEssayStore.content = studentsStore.currentEssay.content;
    newEssayStore.title = studentsStore.currentEssay.title;
    newEssayStore.studentId = studentsStore.currentStudent.id;
    newEssayStore.studentName = studentsStore.currentStudent.name;
    router.push('/student/marking');
}

function deleteEssay() {
    studentsStore.deleteEssay(studentsStore.currentStudent.id, studentsStore.currentEssay);
    router.back();
}
</script>

<style scoped>
.light-green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.12);
}
.green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.24);
}

.score-label {
    text-align: center;
}
</style>
