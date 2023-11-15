<template>
    <ion-page>
        <ion-content>
            <n-tabs default-value="students" justify-content="space-evenly" type="line">
                <n-tab-pane style="padding-top: 6px" name="students" tab="Students">
                    <n-space vertical>
                        <div style="padding: 0px 6px">
                            <n-grid x-gap="6" cols="14">
                                <n-gi span="2">
                                    <n-button
                                        block
                                        style="padding: 0"
                                        quaternary
                                        :type="!isStudentsEditMode ? 'primary' : 'error'"
                                        @click="toggleEditMode"
                                    >
                                        {{ isStudentsEditMode ? 'Done' : 'Edit' }}
                                    </n-button>
                                </n-gi>
                                <n-gi span="10">
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
                            <n-checkbox-group v-model:value="checkedStudents">
                                <n-collapse-transition :show="isStudentsEditMode">
                                    <n-list-item v-if="isStudentsEditMode" @click="showAddStudentForm">
                                        <template style="margin: 0" #prefix>
                                            <n-icon size="34"><Add16Regular /></n-icon>
                                        </template>
                                        <n-thing>
                                            <template #header>
                                                <n-text type="primary">Add Student</n-text>
                                            </template>
                                        </n-thing>
                                    </n-list-item>
                                    <div class="n-list-item__divider"></div>
                                </n-collapse-transition>
                                <n-list-item v-for="student in searchedOptions" @click="handleStudentClick(student)">
                                    <template #prefix>
                                        <n-avatar round size="medium" :src="avatarPlaceholder + student.name" />
                                    </template>
                                    <n-thing>
                                        <template #header>
                                            <div>
                                                {{ student.name }}
                                            </div>
                                        </template>
                                    </n-thing>
                                    <template #suffix>
                                        <n-icon size="24" v-if="!isStudentsEditMode">
                                            <ChevronRight16Regular />
                                        </n-icon>
                                        <n-checkbox v-else :value="student.id" />
                                    </template>
                                </n-list-item>
                            </n-checkbox-group>
                        </n-list>
                    </n-space>
                </n-tab-pane>
                <n-tab-pane :disabled="isStudentsEditMode || isRequirementsEditMode" name="requirements" tab="Requirements"> </n-tab-pane>
            </n-tabs>
        </ion-content>
        <ion-footer v-if="isStudentsEditMode || isRequirementsEditMode">
            <div style="margin: 6px">
                <n-grid x-gap="6" cols="2">
                    <n-gi>
                        <n-button block size="large" type="error" @click="deleteStudents">
                            <template #icon>
                                <Delete16Regular />
                            </template>
                            Remove
                        </n-button>
                    </n-gi>
                    <n-gi>
                        <n-button block :disabled="isEditBtnDisabled" size="large" type="primary" @click="showEditStudentForm">
                            <template #icon>
                                <PersonEdit20Regular />
                            </template>
                            Edit
                        </n-button>
                    </n-gi>
                </n-grid>
            </div>
        </ion-footer>

        <n-drawer v-model:show="isAddStudentShown" placement="bottom" :height="301">
            <n-drawer-content title="Add Student">
                <n-space vertical size="large">
                    <n-input placeholder="Name" :status="nameStatus" clearable v-model:value="studentsStore.newStudent.name" />
                    <n-select placeholder="Group" :status="groupStatus" clearable v-model:value="newStudentGroup" :options="newStudentGroupOptions">
                    </n-select>
                    <n-input
                        placeholder="Custom Info"
                        :status="customInfoStatus"
                        type="textarea"
                        clearable
                        v-model:value="studentsStore.newStudent.customInfo"
                    />
                    <n-grid x-gap="6" cols="2">
                        <n-gi>
                            <n-button block secondary type="error">Cancel</n-button>
                        </n-gi>
                        <n-gi>
                            <n-button block type="primary" @click="addStudent">Add</n-button>
                        </n-gi>
                    </n-grid>
                </n-space>
            </n-drawer-content>
        </n-drawer>

        <n-drawer v-model:show="isEditStudentShown" placement="bottom" :height="301">
            <n-drawer-content title="Edit Student">
                <n-space vertical size="large">
                    <n-input placeholder="Name" :status="nameStatus" clearable v-model:value="studentsStore.currentStudent.name" />
                    <n-select
                        placeholder="Group"
                        :status="groupStatus"
                        clearable
                        v-model:value="studentsStore.currentStudent.group"
                        :options="newStudentGroupOptions"
                    >
                    </n-select>
                    <n-input
                        placeholder="Custom Info"
                        :status="customInfoStatus"
                        type="textarea"
                        clearable
                        v-model:value="studentsStore.currentStudent.customInfo"
                    />
                    <n-grid x-gap="6" cols="2">
                        <n-gi>
                            <n-button block secondary type="error">Cancel</n-button>
                        </n-gi>
                        <n-gi>
                            <n-button block type="primary" @click="editStudent">Confirm</n-button>
                        </n-gi>
                    </n-grid>
                </n-space>
            </n-drawer-content>
        </n-drawer>
    </ion-page>
</template>

<script setup lang="ts">
import { ChevronRight16Regular, Search16Regular, PersonEdit20Regular, Checkmark16Regular, Add16Regular, Delete16Regular } from '@vicons/fluent';
import { useMessage } from 'naive-ui';
import type { Student } from '@/stores/students';

const avatarPlaceholder = 'https://i.pravatar.cc/100?u=';

const studentsStore = useStudentsStore();
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
        return student.name.includes(searchStudentInput.value);
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

const newStudentGroupOptions = computed(() => {
    return studentsStore.groups.map((group) => {
        return {
            label: group,
            value: group
        };
    });
});

function onSearchInputUpdate(value: string) {
    console.log(value);
}

function handleStudentClick(student: Student) {
    if (isStudentsEditMode.value) {
        return;
    } else {
        studentsStore.currentStudent = student;
        router.push('/student/essays');
    }
}

const isStudentsEditMode = ref(false);
const checkedStudents = ref([]);

function toggleEditMode() {
    isStudentsEditMode.value = !isStudentsEditMode.value;
    checkedStudents.value = [];
    resetNewStudentFormStatus();
    studentsStore.resetNewStudent();
}

const isRequirementsEditMode = ref(false);

const isAddStudentShown = ref(false);

const newStudentGroup: Ref<string | null> = ref(null);

const nameStatus = ref('');
const groupStatus = ref('');
const customInfoStatus = ref('');

function resetNewStudentFormStatus() {
    nameStatus.value = '';
    groupStatus.value = '';
    customInfoStatus.value = '';
}

function showAddStudentForm() {
    isAddStudentShown.value = true;
}

function addStudent() {
    // All fields are mandatory, name can not conflict with existing students
    if (studentsStore.newStudent.name === '') {
        message.error('Please enter the name of the student');
        nameStatus.value = 'error';
        return;
    }

    if (studentsStore.students.some((student) => student.name === studentsStore.newStudent.name)) {
        message.error('The name of the student already exists');
        nameStatus.value = 'error';
        return;
    }

    if (newStudentGroup.value === null) {
        message.error('Please select the group of the student');
        groupStatus.value = 'error';
        return;
    }

    if (studentsStore.newStudent.customInfo === '') {
        message.error('Please enter the custom info of the student');
        customInfoStatus.value = 'error';
        return;
    }

    studentsStore.newStudent.group = newStudentGroup.value as string;

    studentsStore.addStudent(studentsStore.newStudent);
    isAddStudentShown.value = false;
    resetNewStudentFormStatus();
    newStudentGroup.value = null;
}

function deleteStudents() {
    studentsStore.deleteStudents(checkedStudents.value);
}

const isEditStudentShown = ref(false);
function showEditStudentForm() {
    // checkedStudents array only contains id
    studentsStore.currentStudent = studentsStore.students.find((student) => student.id === checkedStudents.value[0]) as Student;
    isEditStudentShown.value = true;
}

const isEditBtnDisabled = computed(() => {
    return checkedStudents.value.length !== 1;
});
</script>

<style>
.n-list-item__prefix {
    max-height: 34px;
}
.n-thing-header {
    margin-bottom: 0 !important;
}
</style>
