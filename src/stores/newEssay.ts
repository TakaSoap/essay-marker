import { defineStore } from 'pinia';

export const useNewEssayStore = defineStore('newEssay', () => {
    const title = ref('');
    const content = ref('');

    const requirementTitle = ref('');
    const requirementContent = ref('');

    const studentId = ref('');
    const studentName = ref('');

    function reset () {
        title.value = '';
        content.value = '';
        requirementTitle.value = '';
        requirementContent.value = '';
        studentId.value = '';
        studentName.value = '';
    } 

    return {
        title,
        content,
        requirementTitle,
        requirementContent,
        studentId,
        studentName,
        reset
    };
});