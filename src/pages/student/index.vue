<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button @click="router.back" default-herf="/tabs/list" :disabled="isLoading"></ion-back-button>
                </ion-buttons>
                <ion-title>Student Details</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <n-space vertical>
                <div style="padding: 6px 6px">
                    <n-list clickable hoverable bordered>
                        <n-list-item @click="showEditStudentForm">
                            <template #prefix>
                                <n-avatar round size="medium" :src="avatarPlaceholder + studentsStore.currentStudent.id" />
                            </template>
                            <n-thing>
                                <template #header>
                                    <div>
                                        {{ studentsStore.currentStudent.name }}
                                    </div>
                                </template>
                            </n-thing>
                            <template #suffix>
                                <n-icon size="24">
                                    <PersonEdit20Regular />
                                </n-icon>
                            </template>
                        </n-list-item>
                    </n-list>
                </div>

                <n-tabs justify-content="space-evenly" default-value="graded" type="line">
                    <n-tab-pane tab="Graded" name="graded">
                        <n-list clickable hoverable v-if="gradedEssays.length != 0">
                            <n-list-item @click="showEssay(essay)" v-for="essay in gradedEssays">
                                <n-thing>
                                    <template #header>
                                        {{ essay.title }}
                                    </template>
                                    <template #header-extra>
                                        <n-text depth="3">
                                            {{ dayjs(essay.submitTime).fromNow() }}
                                        </n-text>
                                    </template>
                                    <template #description>
                                        <n-ellipsis style="max-width: 90vw" line-clamp="2" :tooltip="false">
                                            {{ essay.content.split('\n')[0] }}
                                        </n-ellipsis>
                                    </template>
                                </n-thing>
                            </n-list-item>
                        </n-list>

                        <n-result
                            v-else
                            style="padding-top: 2em"
                            status="404"
                            title="Empty"
                            :description="'How about grading an essay for ' + studentsStore.currentStudent.name + '?'"
                        >
                            <template #footer>
                                <n-button @click="router.push('/tabs/marking')">
                                    <template #icon>
                                        <ClipboardTextLtr20Regular />
                                    </template>
                                    Go to Marking</n-button
                                >
                            </template>
                        </n-result>
                    </n-tab-pane>
                    <n-tab-pane tab="Pending" name="pending"
                        ><n-list clickable hoverable v-if="pendingEssays.length != 0">
                            <n-list-item @click="showEssay(essay)" v-for="essay in pendingEssays">
                                <n-thing>
                                    <template #header>
                                        {{ essay.title }}
                                    </template>
                                    <template #header-extra>
                                        <n-text depth="3">
                                            {{ essay.submitTime }}
                                        </n-text>
                                    </template>
                                    <template #description>
                                        <n-ellipsis style="max-width: 90vw" line-clamp="2" :tooltip="false">
                                            {{ essay.content.split('\n')[0] }}
                                        </n-ellipsis>
                                    </template>
                                </n-thing>
                            </n-list-item>
                        </n-list>

                        <n-result
                            v-else
                            style="padding-top: 2em"
                            status="success"
                            title="Well Done"
                            :description="studentsStore.currentStudent.name + ' has no pending essays!'"
                        >
                            <template #footer>
                                <n-button @click="router.back()">
                                    <template #icon>
                                        <ArrowLeft16Regular />
                                    </template>
                                    Go Back</n-button
                                >
                            </template>
                        </n-result>
                    </n-tab-pane>
                </n-tabs>
            </n-space>
        </ion-content>

        <n-drawer v-model:show="isEditStudentShown" placement="bottom" :height="301">
            <n-drawer-content title="Edit Student">
                <n-space vertical size="large">
                    <n-input placeholder="Name" :status="nameStatus" clearable v-model:value="tempName" />
                    <n-select placeholder="Group" :status="groupStatus" clearable v-model:value="tempGroup" :options="studentGroupOptions">
                    </n-select>
                    <n-input placeholder="Custom Info" :status="customInfoStatus" type="textarea" clearable v-model:value="tempCustomInfo" />
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
import { DocumentOnePage20Regular, ChevronRight16Regular, PersonEdit20Regular, ClipboardTextLtr20Regular, ArrowLeft16Regular } from '@vicons/fluent';
import { useMessage } from 'naive-ui';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
const router = useRouter();
const message = useMessage();
const isLoading = ref(false);

const avatarPlaceholder = 'https://i.pravatar.cc/100?u=';
const studentsStore = useStudentsStore();

const gradedEssays = computed(() => {
    //essay.feedback is not empty or null
    return studentsStore.currentStudent.essays.filter((essay) => essay.feedback);
});
const pendingEssays = computed(() => {
    //essay.feedback is empty or null
    return studentsStore.currentStudent.essays.filter((essay) => !essay.feedback);
});

function showStudentDetails() {}

function showEssay(essay: Essay) {
    studentsStore.currentEssay = essay;
    router.push('/student/essay');
}

const isEditStudentShown = ref(false);
const currentStudentInfo = {
    name: studentsStore.currentStudent.name,
    group: studentsStore.currentStudent.group,
    customInfo: studentsStore.currentStudent.customInfo
};

const nameStatus = ref('');
const groupStatus = ref('');
const customInfoStatus = ref('');

const tempName = ref(currentStudentInfo.name);
const tempGroup = ref(currentStudentInfo.group);
const tempCustomInfo = ref(currentStudentInfo.customInfo);

const studentGroupOptions = computed(() => {
    return studentsStore.groups.map((group) => {
        return {
            label: group,
            value: group
        };
    });
});

function showEditStudentForm() {
    isEditStudentShown.value = true;
}
function editStudent() {
    if (tempName.value === '') {
        message.error('Please enter the name of the student');
        nameStatus.value = 'error';
        return;
    }

    // can not conflict with other students
    if (tempName.value !== currentStudentInfo.name && studentsStore.students.some((student) => student.name === tempName.value)) {
        message.error('The name of the student already exists');
        nameStatus.value = 'error';
        return;
    }

    if (tempGroup.value === null) {
        message.error('Please select the group of the student');
        groupStatus.value = 'error';
        return;
    }

    if (tempCustomInfo.value === '') {
        message.error('Please enter the custom info of the student');
        customInfoStatus.value = 'error';
        return;
    }

    studentsStore.currentStudent.name = tempName.value;
    studentsStore.currentStudent.group = tempGroup.value as string;
    studentsStore.currentStudent.customInfo = tempCustomInfo.value;

    isEditStudentShown.value = false;

    nameStatus.value = '';
    groupStatus.value = '';
    customInfoStatus.value = '';
}
</script>

<style>
.n-list-item__prefix {
    max-height: 34px;
}
.n-list-suffix {
    max-height: 24px;
}
.n-thing-header {
    margin-bottom: 0 !important;
}
</style>
