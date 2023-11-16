<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/tabs/marking"></ion-back-button>
                </ion-buttons>
                <ion-title>Select Student</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <n-space vertical>
                <div style="padding: 12px 1em 6px 1em">
                    <n-grid x-gap="6" cols="14">
                        <n-gi span="12">
                            <n-input round v-model:value="searchStudentInput" placeholder="Search" @update:value="onSearchInputUpdate">
                                <template #prefix> <n-icon :component="Search16Regular" /> </template>
                            </n-input>
                        </n-gi>
                        <n-gi span="2">
                            <n-popselect v-model:value="selectedGroup" :options="groupOptions">
                                <n-button block style="padding: 0" quaternary type="primary"> Filter </n-button>
                            </n-popselect>
                        </n-gi>
                    </n-grid>
                </div>

                <n-list hoverable clickable>
                    <n-list-item v-for="student in searchedOptions" @click="handleStudentClick(student)">
                        <template #prefix>
                            <n-avatar round size="medium" :src="avatarPlaceholder + student.id" />
                        </template>
                        <n-thing>
                            <template #header>
                                <div>
                                    {{ student.name }}
                                </div>
                            </template>
                        </n-thing>
                        <template #suffix>
                            <n-icon size="24">
                                <ChevronRight16Regular />
                            </n-icon>
                        </template>
                    </n-list-item>
                </n-list>
            </n-space>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ChevronRight16Regular, Search16Regular, PersonEdit20Regular, Checkmark16Regular, Add16Regular, Delete16Regular } from '@vicons/fluent';
import { useMessage } from 'naive-ui';
import type { Student } from '@/stores/students';

const avatarPlaceholder = 'https://i.pravatar.cc/100?u=';

const studentsStore = useStudentsStore();
const newEssayStore = useNewEssayStore();
const router = useRouter();
const message = useMessage();

const selectedGroupStudents = computed(() => {
    if (selectedGroup.value !== 'all') {
        return studentsStore.students.filter((student) => student.group === selectedGroup.value);
    } else {
        return studentsStore.students;
    }
});

// searched based on selectedGroupStudents
const searchedOptions = computed(() => {
    return selectedGroupStudents.value.filter((student) => {
        return student.name.toLowerCase().includes(searchStudentInput.value.toLowerCase());
    });
});

const searchStudentInput = ref('');

const selectedGroup = ref('all');

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

function onSearchInputUpdate(value: string) {
    console.log(value);
}

function handleStudentClick(student: Student) {
    newEssayStore.studentId = student.id;
    newEssayStore.studentName = student.name;

    router.back();
}
</script>

<style>
.n-list-item__prefix {
    max-height: 34px;
}
.n-list-item__suffix {
    max-height: 24px;
}
.n-thing-header {
    margin-bottom: 0 !important;
}
</style>
