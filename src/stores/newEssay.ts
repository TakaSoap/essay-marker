import { defineStore } from 'pinia';
import { defaultRequirement } from './requirements';


export const useNewEssayStore = defineStore('newEssay', () => {
    const title = ref('');
    const content = ref('');

    const ieltsTopic = ref('');

    const requirementTitle = ref('');
    const requirementContent = ref('');

    const submitTime = ref('');

    const studentId = ref(0);
    const studentName = ref('');
    const studentCustomInfo = ref('');

    function reset () {
        title.value = '';
        content.value = '';
        requirementTitle.value = '';
        requirementContent.value = '';
        studentId.value = 0;
        studentName.value = '';
    } 

    return {
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