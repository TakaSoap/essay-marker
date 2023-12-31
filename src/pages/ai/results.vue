<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/tabs/marking" :disabled="isLoading"></ion-back-button>
                </ion-buttons>
                <ion-title>Feedback</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <n-spin :show="isLoading">
                <n-space vertical size="large">
                    <n-list hoverable clickable bordered>
                        <n-list-item @click="showEssay">
                            <template #prefix>
                                <n-icon size="24">
                                    <DocumentOnePage20Regular />
                                </n-icon>
                            </template>
                            <n-thing>
                                <template #header>
                                    <div>Essay</div>
                                </template>
                                <template #description>
                                    {{ newEssayStore.title }}
                                </template>
                            </n-thing>
                            <template #suffix>
                                <n-icon size="24"><ChevronRight16Regular /></n-icon>
                            </template>
                        </n-list-item>
                    </n-list>
                    <div>
                        <n-grid v-if="feedbackStore.isIeltsEssay" :cols="11" x-gap="6">
                            <n-gi span="3">
                                <n-card content-style="padding: 6px" hoverable>
                                    <div class="card-content">
                                        <n-statistic label="Overall">
                                            <n-number-animation :from="0" :to="feedbackStore.ieltsOverallScore" :precision="1" />
                                            <template #suffix>
                                                <n-text class="max-score" depth="3"> / 9 </n-text>
                                            </template>
                                        </n-statistic>
                                    </div>
                                </n-card>
                            </n-gi>
                            <n-gi span="2">
                                <n-card content-style="padding: 6px" hoverable>
                                    <div class="card-content">
                                        <n-statistic label="TR">
                                            <n-number-animation :from="0" :to="feedbackStore.ieltsFeedback.TR" />
                                            <template #suffix>
                                                <n-text class="max-score" depth="3"> / 9 </n-text>
                                            </template>
                                        </n-statistic>
                                    </div>
                                </n-card>
                            </n-gi>
                            <n-gi span="2">
                                <n-card content-style="padding: 6px" hoverable>
                                    <div class="card-content">
                                        <n-statistic label="CC">
                                            <n-number-animation :from="0" :to="feedbackStore.ieltsFeedback.CC" />
                                            <template #suffix>
                                                <n-text class="max-score" depth="3"> / 9 </n-text>
                                            </template>
                                        </n-statistic>
                                    </div>
                                </n-card>
                            </n-gi>
                            <n-gi span="2">
                                <n-card content-style="padding: 6px" hoverable>
                                    <div class="card-content">
                                        <n-statistic label="LR">
                                            <n-number-animation :from="0" :to="feedbackStore.ieltsFeedback.LR" />
                                            <template #suffix>
                                                <n-text class="max-score" depth="3"> / 9 </n-text>
                                            </template>
                                        </n-statistic>
                                    </div>
                                </n-card>
                            </n-gi>
                            <n-gi span="2">
                                <n-card content-style="padding: 6px" hoverable>
                                    <div class="card-content">
                                        <n-statistic label="GRA">
                                            <n-number-animation :from="0" :to="feedbackStore.ieltsFeedback.GRA" />
                                            <template #suffix>
                                                <n-text class="max-score" depth="3"> / 9 </n-text>
                                            </template>
                                        </n-statistic>
                                    </div>
                                </n-card>
                            </n-gi>
                        </n-grid>
                        <n-statistic v-else label="Grade">
                            <n-gradient-text :type="gradeType">{{ feedbackStore.feedback.grade }}</n-gradient-text>
                        </n-statistic>
                    </div>
                    <div>
                        <n-space vertical size="small">
                            <n-text depth="3">AI Assessment</n-text>

                            <n-input
                                type="textarea"
                                :autosize="{
                                    minRows: 3,
                                    maxRows: 20
                                }"
                                v-model:value="computedFeedback"
                            />
                        </n-space>
                    </div>
                    <n-button @click="saveEssay" class="button" type="info" block secondary strong> Save </n-button>
                </n-space>
            </n-spin>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { DocumentOnePage20Regular, ChevronRight16Regular } from '@vicons/fluent';
import { useMessage } from 'naive-ui';
const router = useRouter();
const isLoading = ref(false);
const message = useMessage();

const feedbackStore = useFeedbackStore();
const newEssayStore = useNewEssayStore();
const studentsStore = useStudentsStore();

const computedFeedback = computed(() => {
    if (feedbackStore.isIeltsEssay) {
        return ref(tempComment.comment);
    } else {
        return ref(tempComment.ieltsComment);
    }
});

const tempComment = {
    ieltsComment: feedbackStore.ieltsFeedback.comment,
    comment: feedbackStore.feedback.comment
}
const feedback = ref(tempComment.comment);
const ieltsFeedback = ref(tempComment.ieltsComment);

const gradeType = computed(() => {
    // A+ A -> 'success'
    // B+ B -> 'info'
    // C+ C -> 'warning'
    // F -> 'error'
    const grade = feedbackStore.feedback.grade;
    if (grade === 'F') {
        return 'error';
    } else if (grade === 'C' || grade === 'C+') {
        return 'warning';
    } else if (grade === 'B' || grade === 'B+') {
        return 'info';
    } else {
        return 'success';
    }
});

function showEssay() {
    router.push('/ai/essay');
}

function saveEssay() {
    if (feedbackStore.isIeltsEssay) {
        studentsStore.addEssay(newEssayStore.studentId, {
            id: newEssayStore.id,
            title: newEssayStore.title,
            content: newEssayStore.content,
            submitTime: newEssayStore.submitTime,
            ieltsTopic: newEssayStore.ieltsTopic,
            requirementTitle: newEssayStore.requirementTitle,
            feedback: {
                TR: feedbackStore.ieltsFeedback.TR,
                CC: feedbackStore.ieltsFeedback.CC,
                LR: feedbackStore.ieltsFeedback.LR,
                GRA: feedbackStore.ieltsFeedback.GRA,
                comment: feedback.value
            }
        });
    } else {
        studentsStore.addEssay(newEssayStore.studentId, {
            id: newEssayStore.id,
            title: newEssayStore.title,
            content: newEssayStore.content,
            submitTime: newEssayStore.submitTime,
            requirementTitle: newEssayStore.requirementTitle,
            feedback: {
                grade: feedbackStore.feedback.grade,
                comment: feedback.value
            }
        });
    }

    message.success('Saved');
    newEssayStore.reset();
    feedback.value = '';
    router.push('/tabs/marking');
}
</script>

<style scoped>
.max-score {
    font-size: 0.8em;
}

.score-label {
    text-align: center;
}
</style>
