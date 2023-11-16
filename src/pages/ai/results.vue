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
                        <n-grid v-if="feedbackStore.isIeltsEssay" :cols="5">
                            <n-gi>
                                <div class="light-green">
                                    <n-statistic label="Overall">
                                        <n-number-animation :from="0" :to="feedbackStore.ieltsOverallScore" />
                                        <template #suffix>
                                            <n-text class="max-score" depth="3"> / 9 </n-text>
                                        </template>
                                    </n-statistic>
                                </div>
                            </n-gi>
                            <n-gi>
                                <div class="green">
                                    <n-statistic label="TR">
                                        <n-number-animation :from="0" :to="feedbackStore.ieltsFeedback.TR" />
                                        <template #suffix>
                                            <n-text class="max-score" depth="3"> / 9 </n-text>
                                        </template>
                                    </n-statistic>
                                </div>
                            </n-gi>
                            <n-gi>
                                <div class="light-green">
                                    <n-statistic label="CC">
                                        <n-number-animation :from="0" :to="feedbackStore.ieltsFeedback.CC" />
                                        <template #suffix>
                                            <n-text class="max-score" depth="3"> / 9 </n-text>
                                        </template>
                                    </n-statistic>
                                </div>
                            </n-gi>
                            <n-gi>
                                <div class="green">
                                    <n-statistic label="LR">
                                        <n-number-animation :from="0" :to="feedbackStore.ieltsFeedback.LR" />
                                        <template #suffix>
                                            <n-text class="max-score" depth="3"> / 9 </n-text>
                                        </template>
                                    </n-statistic>
                                </div>
                            </n-gi>
                            <n-gi>
                                <div class="light-green">
                                    <n-statistic label="GRA">
                                        <n-number-animation :from="0" :to="feedbackStore.ieltsFeedback.GRA" />
                                        <template #suffix>
                                            <n-text class="max-score" depth="3"> / 9 </n-text>
                                        </template>
                                    </n-statistic>
                                </div>
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
                                v-model:value="feedback"
                            />
                        </n-space>
                    </div>
                    <n-button @click="onSavingFeedback" class="button" type="info" block secondary strong> Save </n-button>
                </n-space>
            </n-spin>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { DocumentOnePage20Regular, ChevronRight16Regular } from '@vicons/fluent';
const router = useRouter();
const isLoading = ref(false);

const feedbackStore = useFeedbackStore();
const newEssayStore = useNewEssayStore();

const computedFeedback = computed(() => {
    if (feedbackStore.isIeltsEssay) {
        return feedbackStore.ieltsFeedback.comment;
    } else {
        return feedbackStore.feedback.comment;
    }
});

const feedback = ref(computedFeedback.value);

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
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
        router.push('/ai/essay');
    }, 1000);
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
