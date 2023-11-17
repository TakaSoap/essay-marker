<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/tabs/marking" :disabled="isLoading"></ion-back-button>
                </ion-buttons>
                <ion-title>Essay</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <n-h2>
                <n-text type="primary"> {{ newEssayStore.title }} </n-text>
            </n-h2>
            <n-space>
                <n-text depth="3"> {{ newEssayStore.studentName }} </n-text>
                <n-text depth="3"> {{ newEssayStore.submitTime }} </n-text>
            </n-space>
            <n-p style="font-size: medium;" v-for="(line, index) in essayLines" :key="index">
                {{ line }}
            </n-p>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { DocumentOnePage20Regular, ChevronRight16Regular } from '@vicons/fluent';
const router = useRouter();
const isLoading = ref(false);

const feedbackStore = useFeedbackStore();
const newEssayStore = useNewEssayStore();

const essayLines = computed(() => {
    return newEssayStore.content.split('\n');
});

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

function handleEssayClick() {
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
