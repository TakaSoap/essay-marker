<template>
    <ion-page>
        <ion-content>
            <n-tabs default-value="students" v-model:value="currentTab" justify-content="space-evenly" type="line">
                <n-tab-pane style="padding-top: 6px" :disabled="isEditMode && currentTab != 'students'" name="students" tab="Students">
                    <n-space vertical>
                        <div style="padding: 0px 6px">
                            <n-grid x-gap="6" cols="14">
                                <n-gi span="2">
                                    <n-button block style="padding: 0" quaternary :type="!isEditMode ? 'primary' : 'error'" @click="toggleEditMode">
                                        {{ isEditMode ? 'Done' : 'Edit' }}
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
                                <n-collapse-transition :show="isEditMode">
                                    <n-list-item v-if="isEditMode" @click="toggleAddStudentForm">
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
                                <n-list-item v-for="student in searchedStudentOptions" @click="handleStudentClick(student)">
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
                                        <n-icon size="24" v-if="!isEditMode">
                                            <ChevronRight16Regular />
                                        </n-icon>
                                        <n-checkbox v-else :value="student.id" />
                                    </template>
                                </n-list-item>
                            </n-checkbox-group>
                        </n-list>
                    </n-space>
                </n-tab-pane>
                <n-tab-pane style="padding-top: 6px" :disabled="isEditMode && currentTab != 'requirements'" name="requirements" tab="Requirements">
                    <n-space vertical>
                        <div style="padding: 0px 6px">
                            <n-grid x-gap="6" cols="28">
                                <n-gi span="4">
                                    <n-button block style="padding: 0" quaternary :type="!isEditMode ? 'primary' : 'error'" @click="toggleEditMode">
                                        {{ isEditMode ? 'Done' : 'Edit' }}
                                    </n-button>
                                </n-gi>
                                <n-gi span="23">
                                    <n-input round v-model:value="searchRequirementInput" placeholder="Search" @update:value="onSearchInputUpdate">
                                        <template #prefix> <n-icon :component="Search16Regular" /> </template>
                                    </n-input>
                                </n-gi>
                            </n-grid>
                        </div>

                        <n-list hoverable clickable>
                            <n-checkbox-group v-model:value="checkedRequirements">
                                <n-collapse-transition :show="isEditMode">
                                    <n-list-item v-if="isEditMode" @click="toggleAddRequirementForm">
                                        <template style="margin: 0" #prefix>
                                            <n-icon size="34"><Add16Regular /></n-icon>
                                        </template>
                                        <n-thing>
                                            <template #header>
                                                <n-text type="primary">Add Requirement</n-text>
                                            </template>
                                        </n-thing>
                                    </n-list-item>
                                    <div class="n-list-item__divider"></div>
                                </n-collapse-transition>
                                <n-list-item v-for="requirement in searchedRequirementOptions" @click="handleRequirementClick(requirement)">
                                    <n-thing>
                                        <template #header>
                                            <div>
                                                {{ requirement.title }}
                                            </div>
                                        </template>
                                    </n-thing>
                                    <template v-if="isEditMode" #suffix>
                                        <n-checkbox v-if="requirement.title !=='IELTS Writing Task 2 Grading Criteria'" :value="requirement.id" />
                                        <n-text v-else italic depth="3">Preset</n-text>
                                    </template>
                                </n-list-item>
                            </n-checkbox-group>
                        </n-list>
                    </n-space>
                </n-tab-pane>
            </n-tabs>
        </ion-content>
        <ion-footer v-if="isEditMode">
            <div style="margin: 6px">
                <n-button block size="large" type="error" @click="deleteItems">
                    <template #icon>
                        <Delete16Regular />
                    </template>
                    Remove
                </n-button>
            </div>
        </ion-footer>

        <n-drawer v-model:show="isAddStudentShown" :on-after-leave="resetFormStatus" placement="bottom" :height="301">
            <n-drawer-content title="Add Student">
                <n-space vertical size="large">
                    <n-input placeholder="Name" :status="nameStatus" clearable v-model:value="studentsStore.newStudent.name" />
                    <n-select placeholder="Group" :status="groupStatus" clearable v-model:value="newStudentGroup" :options="newStudentGroupOptions">
                    </n-select>
                    <n-input
                        placeholder="Custom Info"
                        :status="customInfoStatus"
                        type="textarea"
                        v-model:value="studentsStore.newStudent.customInfo"
                    />
                    <n-grid x-gap="6" cols="2">
                        <n-gi>
                            <n-button block secondary type="error" @click="toggleAddStudentForm">Cancel</n-button>
                        </n-gi>
                        <n-gi>
                            <n-button block type="primary" @click="addStudent">Add</n-button>
                        </n-gi>
                    </n-grid>
                </n-space>
            </n-drawer-content>
        </n-drawer>

        <n-drawer v-model:show="isAddRequirementShown" :on-after-leave="resetFormStatus" placement="bottom" :height="635">
            <n-drawer-content title="Add Requirement">
                <n-space vertical size="large">
                    <n-input placeholder="Title" :status="titleStatus" clearable v-model:value="requirementsStore.newRequirement.title" />
                    <n-input
                        placeholder="Content"
                        :status="contentStatus"
                        type="textarea"
                        :rows="20"
                        v-model:value="requirementsStore.newRequirement.content"
                    />
                    <n-grid x-gap="6" cols="2">
                        <n-gi>
                            <n-button block secondary type="error" @click="toggleAddRequirementForm">Cancel</n-button>
                        </n-gi>
                        <n-gi>
                            <n-button block type="primary" @click="addRequirement">Add</n-button>
                        </n-gi>
                    </n-grid>
                </n-space>
            </n-drawer-content>
        </n-drawer>

        <n-drawer v-model:show="isEditRequirementShown" :on-after-leave="resetFormStatus" placement="bottom" :height="635" >
            <n-drawer-content title="Edit Requirement">
                <n-space vertical size="large">
                    <n-input placeholder="Title" :disabled="tempRequirement.title === 'IELTS Writing Task 2 Grading Criteria'" :status="titleStatus" clearable v-model:value="tempRequirement.title" />
                    <n-input
                        placeholder="Content"
                        :status="contentStatus"
                        type="textarea"
                        :rows="20"
                        v-model:value="tempRequirement.content"
                    />
                    <n-grid x-gap="6" cols="2">
                        <n-gi>
                            <n-button block secondary type="error" @click="toggleEditRequirementForm">Cancel</n-button>
                        </n-gi>
                        <n-gi>
                            <n-button block type="primary" @click="editRequirement">Confirm</n-button>
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
import type { Requirement } from '@/stores/requirements';

const avatarPlaceholder = 'https://i.pravatar.cc/100?u=';

const studentsStore = useStudentsStore();
const requirementsStore = useRequirementsStore();

const router = useRouter();
const message = useMessage();

const currentTab = ref('students');

const selectedGroupStudents = computed(() => {
    if (selectedGroup.value !== 'all') {
        return studentsStore.students.filter((student) => student.group === selectedGroup.value);
    } else {
        return studentsStore.students;
    }
});

const searchStudentInput = ref('');
// searched based on selectedGroupStudents
const searchedStudentOptions = computed(() => {
    return selectedGroupStudents.value.filter((student) => {
        return student.name.toLowerCase().includes(searchStudentInput.value.toLowerCase());
    });
});

const searchRequirementInput = ref('');
const searchedRequirementOptions = computed(() => {
    return requirementsStore.requirements.filter((requirement) => {
        return requirement.title.toLowerCase().includes(searchRequirementInput.value.toLowerCase());
    });
});

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
    if (isEditMode.value) {
        return;
    } else {
        studentsStore.currentStudent = student;
        router.push('/student');
    }
}

let tempRequirement: Ref<Requirement>;
let tempRequirementTitle = '';

function handleRequirementClick(requirement: Requirement) {
    if (isEditMode.value) {
        return;
    } else {
        tempRequirement = ref({ ...requirement })
        tempRequirementTitle = requirement.title;
        toggleEditRequirementForm();
    }
}

const isEditMode = ref(false);
const checkedStudents = ref([]);
const checkedRequirements = ref([]);

function toggleEditMode() {
    isEditMode.value = !isEditMode.value;
    checkedStudents.value = [];
    resetFormStatus();
    studentsStore.resetNewStudent();
}

// If router to other pages disable edit mode
watch(router.currentRoute, () => {
    isEditMode.value = false;
});

const isAddStudentShown = ref(false);
const isAddRequirementShown = ref(false);
const isEditRequirementShown = ref(false);

const newStudentGroup: Ref<string | null> = ref(null);

const nameStatus = ref('');
const groupStatus = ref('');
const customInfoStatus = ref('');
const titleStatus = ref('');
const contentStatus = ref('');

function resetFormStatus() {
    nameStatus.value = '';
    groupStatus.value = '';
    customInfoStatus.value = '';
    titleStatus.value = '';
    contentStatus.value = '';
}

function toggleAddStudentForm() {
    isAddStudentShown.value = !isAddStudentShown.value;
}

function toggleAddRequirementForm() {
    isAddRequirementShown.value = !isAddRequirementShown.value;
}

function toggleEditRequirementForm() {
    isEditRequirementShown.value = !isEditRequirementShown.value;
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
    resetFormStatus();
    newStudentGroup.value = null;
}

function addRequirement() {
    // All fields are mandatory
    if (requirementsStore.newRequirement.title === '') {
        message.error('Please enter the title of the requirement');
        titleStatus.value = 'error';
        return;
    }

    if (requirementsStore.requirements.some((requirement) => requirement.title === requirementsStore.newRequirement.title)) {
        message.error('The title of the requirement already exists');
        nameStatus.value = 'error';
        return;
    }

    if (requirementsStore.newRequirement.content === '') {
        message.error('Please enter the content of the requirement');
        contentStatus.value = 'error';
        return;
    }

    requirementsStore.addRequirement(requirementsStore.newRequirement);
    isAddRequirementShown.value = false;
    resetFormStatus();
}

function editRequirement(requirement: Requirement) {
    // All fields are mandatory
    if (tempRequirement.value.title === '') {
        message.error('Please enter the title of the requirement');
        titleStatus.value = 'error';
        return;
    }

    if (tempRequirement.value.title !== tempRequirementTitle && requirementsStore.requirements.some((requirement) => requirement.title === tempRequirement.value.title)) {
        message.error('The title of the requirement already exists');
        nameStatus.value = 'error';
        return;
    }

    if (tempRequirement.value.content === '') {
        message.error('Please enter the content of the requirement');
        contentStatus.value = 'error';
        return;
    }

    requirementsStore.editRequirement(tempRequirement.value);
    isEditRequirementShown.value = false;
    resetFormStatus();
}

function deleteItems() {
    if (currentTab.value === 'requirements') {
        requirementsStore.deleteRequirements(checkedRequirements.value);
    } else if (currentTab.value === 'students') {
        studentsStore.deleteStudents(checkedStudents.value);
    }
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
