import { defineStore } from 'pinia';

interface Feedback {
    TR: number;
    CC: number;
    LR: number;
    GRA: number;
    comment: string;
}

export const useFeedbackStore = defineStore('feedback', () => {
    const feedback: Ref<Feedback> = ref({
        TR: 0,
        CC: 0,
        LR: 0,
        GRA: 0,
        comment: ''
    });

    const overallScore = computed(() => {
        let score = feedback.value.TR + feedback.value.CC + feedback.value.LR + feedback.value.GRA;
        score /= 4;
        return score;
    });

    function setFeedback(newFeedback: Feedback) {
        feedback.value = newFeedback;
    }

    return {
        feedback,
        setFeedback,
        overallScore
    };
});
