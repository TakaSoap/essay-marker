import { defineStore } from 'pinia';
import { defaultRequirement } from './requirements';

export const useNewEssayStore = defineStore('newEssay', () => {
    const id = ref(0);
    const title = ref('');
    const content = ref('');

    const ieltsTopic = ref('');

    const requirementTitle = ref('');
    const requirementContent = ref('');

    const submitTime = ref('');

    const studentId = ref(0);
    const studentName = ref('');
    const studentCustomInfo = ref('');

    function reset() {
        id.value = 0;
        title.value = '';
        content.value = '';
        requirementTitle.value = '';
        requirementContent.value = '';
        studentId.value = 0;
        studentName.value = '';
    }

    return {
        id,
        title,
        content,
        ieltsTopic,
        requirementTitle,
        requirementContent,
        submitTime,
        studentId,
        studentName,
        studentCustomInfo,
        reset
    };
});
