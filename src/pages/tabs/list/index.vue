<template>
    <ion-page>
        <ion-content>
            <n-tabs default-value="students" justify-content="space-evenly" type="line">
                <n-tab-pane name="students" tab="Students">
                    <n-space vertical>
                        <n-input v-model:value="searchStudentInput" @update:value="onSearchInputUpdate" />
                        <n-grid cols="2">
                            <n-gi>
                                <n-select v-model:value="selectedGroup" size="small" :options="groupOptions" @update:value="onGroupOptionChange" />
                            </n-gi>
                            <n-gi>
                                <n-select v-model:value="selectedState" size="small" :options="stateOptions" />
                            </n-gi>
                        </n-grid>
                        <n-list hoverable clickable>
                            <n-list-item v-for="student in searchedOptions" @click="handleStudentClick(student)">
                                <template #prefix>
                                    <n-avatar round size="medium" :src="avatarPlaceholder+student.name" />
                                </template>
                                <n-thing>
                                    <template #header>
                                        <div>
                                            {{ student.name }}
                                        </div>
                                    </template>
                                </n-thing>
                                <template #suffix>
                                    <n-icon size="24"><ChevronRight16Regular /></n-icon>
                                </template>
                            </n-list-item>
                        </n-list>
                    </n-space>
                </n-tab-pane>
                <n-tab-pane name="requirements" tab="Requirements"> </n-tab-pane>
            </n-tabs>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ChevronRight16Regular } from '@vicons/fluent';
import type { Student } from '@/stores/students';

const avatarPlaceholder = 'https://i.pravatar.cc/100?u=';

const studentsStore = useStudentsStore();
const router = useRouter();

const selectedGroupStudents = computed(() => {
    if (selectedGroup.value !== 'all') {
        return studentsStore.students.filter(student => student.group === selectedGroup.value);
    } else {
        return studentsStore.students;
    }
});

// searched based on selectedGroupStudents
const searchedOptions = computed(() => {
    return selectedGroupStudents.value.filter((student) => {
        return student.name.includes(searchStudentInput.value);
    });
});

const searchStudentInput = ref('');

const selectedGroup = ref('all');
const selectedState = ref('all');

// need an 'all' option
const groupOptions = computed(() => {
    return [
        { label: 'All Groups', value: 'all' },
        ...studentsStore.groups.map((group) => {
            return {
                label: group,
                value: group
            };
        })
    ];
});



const stateOptions = [
    { label: 'All', value: 'all' },
    { label: 'Waiting for grading', value: 'toGrade' },
    { label: 'Graded', value: 'graded' }
];

function onSearchInputUpdate(value: string) {
    console.log(value);
}

function onGroupOptionChange(value: string) {
    console.log(value);
}

const studentOptions = computed(() => {
    return studentsStore.students.map((student) => {
        return {
            label: student.name,
            value: student.id
        };
    });
});

const value = ref(null);

function handleStudentClick(student: Student) {
    studentsStore.currentStudent = student;
    router.push('/student/essays')
}

</script>
