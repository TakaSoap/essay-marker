import { defineStore } from 'pinia';

export interface Feedback {
    grade: string;
    comment: string;
}

export interface IeltsFeedback {
    TR: number;
    CC: number;
    LR: number;
    GRA: number;
    comment: string;
}

export const useFeedbackStore = defineStore('feedback', () => {
    const ieltsFeedback: Ref<IeltsFeedback> = ref({
        TR: 0,
        CC: 0,
        LR: 0,
        GRA: 0,
        comment: ''
    });

    const feedback: Ref<Feedback> = ref({
        grade: '',
        comment: ''
    });

    const ieltsOverallScore = computed(() => {
        let score = ieltsFeedback.value.TR + ieltsFeedback.value.CC + ieltsFeedback.value.LR + ieltsFeedback.value.GRA;
        score /= 4;

        if (score % 1 >= 0.75) {
            score = Math.ceil(score);
        } else if (score % 1 >= 0.25) {
            score = Math.floor(score) + 0.5;
        } else {
            score = Math.floor(score);
        }
    
        return score;
    });

    const isIeltsEssay = ref(false);

    function setFeedback(newFeedback: Feedback | IeltsFeedback, isIelts: boolean) {
        isIeltsEssay.value = isIelts;
        if (isIelts) {
            ieltsFeedback.value = newFeedback as IeltsFeedback;
        } else {
            feedback.value = newFeedback as Feedback;
        }
    }

    return {
        isIeltsEssay,
        ieltsFeedback,
        feedback,
        setFeedback,
        ieltsOverallScore
    };
});
