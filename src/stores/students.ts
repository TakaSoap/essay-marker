import { defineStore } from 'pinia';
import type { Feedback, IeltsFeedback } from '@/stores/feedback';

export interface Student {
    id: number;
    name: string;
    group: string;
    customInfo: string;
    essays: Essay[];
}

export interface Essay {
    id: number;
    title: string;
    content: string;
    submitTime: string;
    ieltsTopic?: string;
    requirementTitle: string;
    feedback?: Feedback | IeltsFeedback;
}

export const useStudentsStore = defineStore('students', () => {

    const students: Ref<Student[]> = ref([
        {
            id: 1,
            name: 'John',
            group: 'Group A',
            customInfo: 'A naughty little boy whose writing needs more attention in terms of coherence',
            essays: [
                {
                    id: 1,
                    title: 'A Happy Day',
                    content: `Yesterday was the bestest day ever! I'm in middle school now. I woke up with sun shining in my room and Mom made pancakes that look like smiley faces! At school, my friend Joey shared his crayons and we drawed a dragon together in class. It was super cool! During lunch, I played tag and was super fast. No one could catch me! Then, the music teacher let me play the tambourine. I made lots of jingly sounds. When I got home, Dad let me help make cookies and I even got to lick the spoon! It was a happy, happy day!`,
                    ieltsTopic: undefined,
                    submitTime: '2021-09-01 12:00:00',
                    requirementTitle: 'Grading Criteria for Secondary First-Grader Essays',
                    feedback: {
                        grade: 'B+',
                        comment: `This essay vividly describes a joyful day, showing enthusiasm and excitement. The use of sensory details, such as the sun shining in the room and the smiley face-shaped pancakes, creates a lively and engaging narrative. The student effectively conveys their happiness through various activities, from drawing with crayons to playing tag and making jingly sounds with the tambourine. However, there are a few minor grammar and spelling errors that could be improved. Overall, the essay successfully captures the exuberance of the described day, but could benefit from some refinement in language usage and structure.`
                    }
                },
                {
                    id: 2,
                    title: 'A Sad Day',
                    content: `Today was super duper sad. It started all sunny, but then our teacher told us that Goldie, our class fishy, swam up to the sky pond. My heart felt like a heavy backpack. Every time I looked at the fishbowl, my eyes got all swimmy like there were fishies in them too. We made a circle and talked about Goldie's shiny scales and how he did the best fishy flips. I shared how Goldie wiggled his fins just for me. I miss him. We drew rainbow pictures to say goodbye. Today was the saddest day, but I won’t forget my little fishy friend.`,
                    ieltsTopic: undefined,
                    submitTime: '2021-09-01 12:00:00',
                    requirementTitle: 'Grading Criteria for Secondary First-Grader Essays',
                    feedback: {
                        grade: 'A',
                        comment: `This essay effectively conveys the emotions of the author in a descriptive and heartfelt manner. The use of vivid imagery, such as 'my eyes got all swimmy like there were fishies in them too' and 'Goldie's shiny scales', enhances the reader's understanding of the sadness experienced. The personal connection with Goldie is well articulated, creating a strong emotional impact. Additionally, the essay demonstrates a clear understanding of narrative structure and effectively communicates the sequence of events. Overall, a well-written and emotionally resonant piece.`
                    }
                }
            ]
        },
        {
            id: 2,
            name: 'Tina',
            group: 'Group B',
            customInfo: 'A girl that is very good at writing, but needs to pay more attention to grammar',
            essays: []
        }
    ]);

    const newStudent: Ref<Student> = ref({
        id: 0,
        name: '',
        group: '',
        customInfo: '',
        essays: []
    });

    const currentStudent: Ref<Student> = ref({
        id: 0,
        name: '',
        group: '',
        customInfo: '',
        essays: []
    });

    const currentEssay: Ref<Essay> = ref({
        id: 0,
        title: '',
        content: '',
        submitTime: '',
        ieltsTopic: undefined,
        requirementTitle: '',
        feedback: undefined
    });

    const groups = ref(['Group A', 'Group B']);
    
    function addStudent(student: Student) {
        student.id = students.value.length + 1;
        students.value.push(student);

        // If their group doesn't exist, add the new group to the groups array
        if (!groups.value.includes(student.group)) {
            groups.value.push(student.group);
        }

        resetNewStudent();
    }

    function editStudent(student: Student) {
        const index = students.value.findIndex((s) => s.id === student.id);
        students.value[index] = student;
    }

    function deleteStudents(id: number[]) {
        // delete by id
        students.value = students.value.filter((s) => !id.includes(s.id));

        // If a group is empty, remove it from the groups array
        groups.value = groups.value.filter((g) => students.value.some((s) => s.group === g));

    }

    function resetNewStudent() {
        newStudent.value = {
            id: 0,
            name: '',
            group: '',
            customInfo: '',
            essays: []
        };
    }

    function addEssay(student: Student, essay: Essay) {
        essay.id = student.essays.length + 1;
        const index = students.value.findIndex((s) => s.id === student.id);
        students.value[index].essays.push(essay);
    }

    function editEssay(student: Student, essay: Essay) {
        const index = students.value.findIndex((s) => s.id === student.id);
        const essayIndex = students.value[index].essays.findIndex((e) => e.id === essay.id);
        students.value[index].essays[essayIndex] = essay;
    }

    function deleteEssay(student: Student, essay: Essay) {
        const index = students.value.findIndex((s) => s.id === student.id);
        const essayIndex = students.value[index].essays.findIndex((e) => e.id === essay.id);
        students.value[index].essays.splice(essayIndex, 1);
    }

    return {
        students,
        newStudent,
        currentStudent,
        currentEssay,
        groups,
        addStudent,
        editStudent,
        deleteStudents,
        resetNewStudent,
        addEssay,
        editEssay,
        deleteEssay
    };
});
