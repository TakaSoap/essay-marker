import { defineStore } from 'pinia';
import { defaultRequirement } from './requirements';


export const useNewEssayStore = defineStore('newEssay', () => {
    const title = ref('');
    const content = ref('');

    const ieltsTopic = ref('');

    const requirementTitle = ref('Default Grading Criteria');
    const requirementContent = ref(defaultRequirement);

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
        ieltsTopic,
        requirementTitle,
        requirementContent,
        studentId,
        studentName,
        reset
    };
});