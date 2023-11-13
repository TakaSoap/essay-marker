<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/tabs/marking" :disabled="isLoading"></ion-back-button>
                </ion-buttons>
                <ion-title>Results</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <n-spin :show="isLoading">
                <n-space vertical size="large">
                    <n-list hoverable clickable bordered>
                        <n-list-item @click="handleEssayClick">
                            <template #prefix>
                                <n-icon size="24">
                                    <DocumentOnePage20Regular />
                                </n-icon>
                            </template>
                            <n-thing>
                                <template #header>
                                    <div style="margin-bottom: 0">Essay</div>
                                </template>
                                <template #description>
                                    {{ "essay title" }}
                                </template>
                            </n-thing>
                            <template #suffix>
                                <n-icon size="24"><ChevronRight16Regular /></n-icon>
                            </template>
                        </n-list-item>
                    </n-list>
                    <div>
                        <n-space vertical size="small">
                            <n-text>Score</n-text>
                            <n-grid :cols="5">
                                <n-gi>
                                    <div class="light-green">
                                        <n-statistic label="Overall">
                                            <n-number-animation :from="0" :to="feedbackStore.overallScore" />
                                            <template #suffix>
                                                <n-text class="max-score" depth="3"> / 9 </n-text>
                                            </template>
                                        </n-statistic>
                                    </div>
                                </n-gi>
                                <n-gi>
                                    <div class="green">
                                        <n-statistic label="TR">
                                            <n-number-animation :from="0" :to="feedbackStore.feedback.TR" />
                                            <template #suffix>
                                                <n-text class="max-score" depth="3"> / 9 </n-text>
                                            </template>
                                        </n-statistic>
                                    </div>
                                </n-gi>
                                <n-gi>
                                    <div class="light-green">
                                        <n-statistic label="CC">
                                            <n-number-animation :from="0" :to="feedbackStore.feedback.CC" />
                                            <template #suffix>
                                                <n-text class="max-score" depth="3"> / 9 </n-text>
                                            </template>
                                        </n-statistic>
                                    </div>
                                </n-gi>
                                <n-gi>
                                    <div class="green">
                                        <n-statistic label="LR">
                                            <n-number-animation :from="0" :to="feedbackStore.feedback.LR" />
                                            <template #suffix>
                                                <n-text class="max-score" depth="3"> / 9 </n-text>
                                            </template>
                                        </n-statistic>
                                    </div>
                                </n-gi>
                                <n-gi>
                                    <div class="light-green">
                                        <n-statistic label="GRA">
                                            <n-number-animation :from="0" :to="feedbackStore.feedback.GRA" />
                                            <template #suffix>
                                                <n-text class="max-score" depth="3"> / 9 </n-text>
                                            </template>
                                        </n-statistic>
                                    </div>
                                </n-gi>
                            </n-grid>
                        </n-space>
                    </div>
                    <div>
                        <n-space vertical size="small">
                            <n-text>AI Assessment</n-text>

                            <n-input
                                type="textarea"
                                :autosize="{
                                    minRows: 3,
                                    maxRows: 20
                                }"
                                v-model:value="feedbackStore.feedback.comment"
                            />
                        </n-space>
                    </div>
                    <n-button class="button" type="info" block secondary strong> Save </n-button>
                </n-space>
            </n-spin>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { DocumentOnePage20Regular, CompassNorthwest16Regular, ChevronRight16Regular } from '@vicons/fluent';
const router = useRouter();
const isLoading = ref(false);

const feedbackStore = useFeedbackStore();

function handleEssayClick() {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
        router.push('/tabs/marking/essay');
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
