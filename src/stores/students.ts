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
                },
                {
                    id: 3,
                    title: 'A Little Trip',
                    content: `Last weekend, my family went on a little trip to the countryside. It was an exciting adventure because I love nature. We packed a picnic with my favorite sandwiches and fruit juice. The drive was fun, and we sang songs together. When we arrived, we spread a blanket under a big oak tree. The grass was green and soft. We saw butterflies and birds singing. I ran around playing with my little brother, and we found shiny pebbles by the stream. It was peaceful and beautiful. I wish every day could be like our little trip. I can't wait for the next one!`,
                    ieltsTopic: undefined,
                    submitTime: '2023-11-16 21:00:00',
                    requirementTitle: 'Grading Criteria for Secondary First-Grader Essays',
                    feedback: {
                        grade: 'A',
                        comment: `Hi John! It sounds like you had a fantastic time on your countryside trip! I really enjoyed reading about your adventurous weekend. Your essay shines with the joy and excitement you felt during the trip. Your vivid descriptions of the nature, like the green grass, butterflies, and birds, painted a beautiful picture in my mind. You also did a great job of expressing your love for nature. To make your essay even better, try adding more details about your favorite part of the trip and how it made you feel. This will make your writing even more engaging and help the reader experience your adventure with you. Keep up the great work, John! Your enthusiasm for nature really shines through your writing. I look forward to reading more of your adventures in the future!`
                    }
                }
            ]
        },
        {
            id: 2,
            name: 'Tina',
            group: 'Group B',
            customInfo: 'A girl that is very good at writing, but needs to pay more attention to grammar',
            essays: [
                {
                    id: 1,
                    title: 'IELTS Writing Task 2 Practice 1',
                    content: `There is a worldwide phenomenon that more and more people are using popular languages nowadays such as English and Spanish. In contrast, the number of people using other languages is dropping. In my opinion, this is a case that has both positive and negative aspects.

                    It must be admitted that the popularization of some specific languages did play a key role in the globalization, making millions of job opportunities while optimizing labour costs for enterprises. Take English as an example, by mastering such a popular language, skilled programmers in some Asia countries like China and India are able to not only write codes for local tech company, but also contribute to the world’s leading tech companies such as Apple and Microsoft. Besides, many countries in south-east Asia have taken English as their second official language, which led to a result that many manufacturing companies like Foxconn built factories there to better reduce their labour costs. This creates a win-win situation for both employees and employers.
                    
                    However, everything has its both sides. The popularity of a few languages is accompanied by the marginalization of other niche languages, causing the disappearance of some featured cultures. For instance, the promotion of Mandarin Chinese in China has made the number of dialects speaker there decreased. This has resulted in many young people in China not being able to get familiar with their home culture, since they can not understand the dialect used in their hometown. In addition, many works of literature and art are being lost, because they are in language that fewer and fewer people may understand.
                    
                    In conclusion, the increasement of people using several dominant languages do lead to further globalization, while marginalization and vanishment of languages be in the minority can also have negative impacts on human cultures.`,
                    ieltsTopic: 'Across the recent world, only a few languages are increasing in use, while some others decline. Is it a positive or negative development?',
                    submitTime: '2022-09-01 12:00:00',
                    requirementTitle: 'IELTS Writing Task 2 Grading Criteria',
                    feedback: {
                        TR: 7,
                        CC: 7,
                        LR: 7,
                        GRA: 7,
                        comment: `This essay effectively addresses the prompt and demonstrates a clear understanding of the topic. The author presents a well-structured argument with a clear introduction, body paragraphs, and conclusion. The essay is well-organized and easy to follow. The author uses a variety of vocabulary and sentence structures, and the essay is generally free of grammatical errors. However, there are a few minor spelling errors that could be improved. Overall, a well-written essay that demonstrates a strong command of the English language.`
                    }
                }
            ]
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

    function addEssay(studentId: number, essay: Essay) {
        const index = students.value.findIndex((s) => s.id === studentId);
        essay.id = students.value[index].essays.length + 1;
        students.value[index].essays.push(essay);
    }

    function editEssay(studentId: number, essay: Essay) {
        const index = students.value.findIndex((s) => s.id === studentId);
        const essayIndex = students.value[index].essays.findIndex((e) => e.id === essay.id);
        students.value[index].essays[essayIndex] = essay;
    }

    function deleteEssay(studentId: number, essay: Essay) {
        const index = students.value.findIndex((s) => s.id === studentId);
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
