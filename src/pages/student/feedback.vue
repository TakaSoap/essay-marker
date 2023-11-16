<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/student" :disabled="isLoading"></ion-back-button>
                </ion-buttons>
                <ion-title>Feedback</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <n-spin :show="isLoading">
                <n-space vertical size="large">
                    <div>
                        <n-space vertical size="small">
                            <n-space v-if="studentsStore.currentEssay.ieltsTopic" justify="space-between">
                                <n-text depth="3">Score</n-text>
                                <n-button text type="primary" @click="showEditIeltsScore"> Edit </n-button>
                            </n-space>
                            <n-grid v-if="studentsStore.currentEssay.ieltsTopic" :cols="11" x-gap="6">
                                <n-gi span="3">
                                    <n-card content-style="padding: 6px" hoverable>
                                        <div class="card-content">
                                            <n-statistic label="Overall">
                                                <n-number-animation :from="0" :to="ieltsOverallScore" :precision="1" />
                                                <template #suffix>
                                                    <n-text class="max-score" depth="3"> / 9 </n-text>
                                                </template>
                                            </n-statistic>
                                        </div>
                                    </n-card>
                                </n-gi>
                                <n-gi span="2">
                                    <n-card content-style="padding: 6px" hoverable>
                                        <div class="card-content">
                                            <n-statistic label="TR">
                                                <n-number-animation :from="0" :to="(studentsStore.currentEssay.feedback as IeltsFeedback).TR" />
                                                <template #suffix>
                                                    <n-text class="max-score" depth="3"> / 9 </n-text>
                                                </template>
                                            </n-statistic>
                                        </div>
                                    </n-card>
                                </n-gi>
                                <n-gi span="2">
                                    <n-card content-style="padding: 6px" hoverable>
                                        <div class="card-content">
                                            <n-statistic label="CC">
                                                <n-number-animation :from="0" :to="(studentsStore.currentEssay.feedback as IeltsFeedback).CC" />
                                                <template #suffix>
                                                    <n-text class="max-score" depth="3"> / 9 </n-text>
                                                </template>
                                            </n-statistic>
                                        </div>
                                    </n-card>
                                </n-gi>
                                <n-gi span="2">
                                    <n-card content-style="padding: 6px" hoverable>
                                        <div class="card-content">
                                            <n-statistic label="LR">
                                                <n-number-animation :from="0" :to="(studentsStore.currentEssay.feedback as IeltsFeedback).LR" />
                                                <template #suffix>
                                                    <n-text class="max-score" depth="3"> / 9 </n-text>
                                                </template>
                                            </n-statistic>
                                        </div>
                                    </n-card>
                                </n-gi>
                                <n-gi span="2">
                                    <n-card content-style="padding: 6px" hoverable>
                                        <div class="card-content">
                                            <n-statistic label="GRA">
                                                <n-number-animation :from="0" :to="(studentsStore.currentEssay.feedback as IeltsFeedback).GRA" />
                                                <template #suffix>
                                                    <n-text class="max-score" depth="3"> / 9 </n-text>
                                                </template>
                                            </n-statistic>
                                        </div>
                                    </n-card>
                                </n-gi>
                            </n-grid>

                            <n-statistic v-else label="Grade">
                                <n-space justify="space-between">
                                    <n-gradient-text :type="gradeType">{{ tempFeedback.grade }}</n-gradient-text>
                                    <n-button-group>
                                        <n-button secondary @click="Downgrade" :disabled="isDowngradeDisabled">
                                            <template #icon> <Subtract16Regular /> </template>
                                        </n-button>
                                        <n-button secondary @click="Upgrade" :disabled="isUpgradeDisabled">
                                            <template #icon> <Add16Regular /> </template>
                                        </n-button>
                                    </n-button-group>
                                </n-space>
                            </n-statistic>
                        </n-space>
                    </div>
                    <div>
                        <n-space vertical size="small">
                            <n-text depth="3">AI Assessment</n-text>

                            <n-input
                                type="textarea"
                                :autosize="{
                                    minRows: 3,
                                    maxRows: 20
                                }"
                                v-model:value="tempComment"
                            />
                        </n-space>
                    </div>
                    <n-button @click="onSavingFeedback" class="button" type="primary" block secondary strong> Save </n-button>
                </n-space>
            </n-spin>
        </ion-content>

        <n-drawer v-model:show="isEditIeltsScoreShown" placement="bottom" :height="400">
            <n-drawer-content
                title="Overall Score"
                body-content-style="padding: 0 16px"
                header-style="padding: 16px; display: flex; justify-content: center;"
            >
                <n-space vertical>
                    <n-list>
                        <n-list-item>
                            <div style="min-width: 126.56px; display: flex; justify-content: center; align-items: baseline">
                                <n-text style="font-size: xx-large">{{ tempIeltsOverallScore }}</n-text>
                                <n-text depth="3" style="font-size: large">/9</n-text>
                            </div>
                        </n-list-item>
                        <n-list-item>
                            <n-space justify="space-between" style="align-items: center" size="large">
                                <n-text>Task Response</n-text>
                                <n-space>
                                    <n-button circle secondary type="primary" size="small" @click="deductTRScore" :disabled="isDeductTRScoreDisabled">
                                        <template #icon>
                                            <Subtract16Regular />
                                        </template>
                                    </n-button>
                                    <n-text class="score">{{ tempIeltsFeedback.TR }}</n-text>
                                    <n-button circle secondary type="primary" size="small" @click="addTRScore" :disabled="isAddTRScoreDisabled">
                                        <template #icon>
                                            <Add16Regular />
                                        </template>
                                    </n-button>
                                </n-space>
                            </n-space>
                        </n-list-item>
                        <n-list-item>
                            <n-space justify="space-between" style="align-items: center" size="large">
                                <n-text>Conherence and Cohesion</n-text>
                                <n-space>
                                    <n-button circle secondary type="primary" size="small" @click="deductCCScore" :disabled="isDeductCCScoreDisabled">
                                        <template #icon>
                                            <Subtract16Regular />
                                        </template>
                                    </n-button>
                                    <n-text class="score">{{ tempIeltsFeedback.CC }}</n-text>
                                    <n-button circle secondary type="primary" size="small" @click="addCCScore" :disabled="isAddCCScoreDisabled">
                                        <template #icon>
                                            <Add16Regular />
                                        </template>
                                    </n-button>
                                </n-space>
                            </n-space>
                        </n-list-item>
                        <n-list-item>
                            <n-space justify="space-between" style="align-items: center" size="large">
                                <n-text class="edit-label">Lexical Resource</n-text>
                                <n-space>
                                    <n-button circle secondary type="primary" size="small" @click="deductLRScore" :disabled="isDeductLRScoreDisabled">
                                        <template #icon>
                                            <Subtract16Regular />
                                        </template>
                                    </n-button>
                                    <n-text class="score">{{ tempIeltsFeedback.LR }}</n-text>
                                    <n-button circle secondary type="primary" size="small" @click="addLRScore" :disabled="isAddLRScoreDisabled">
                                        <template #icon>
                                            <Add16Regular />
                                        </template>
                                    </n-button>
                                </n-space>
                            </n-space>
                        </n-list-item>
                        <n-list-item>
                            <n-space justify="space-between" style="align-items: center" size="large">
                                <n-text>Grammatical Range and Accuracy</n-text>
                                <n-space>
                                    <n-button
                                        circle
                                        secondary
                                        type="primary"
                                        size="small"
                                        @click="deductGRAScore"
                                        :disabled="isDeductGRAScoreDisabled"
                                    >
                                        <template #icon>
                                            <Subtract16Regular />
                                        </template>
                                    </n-button>
                                    <n-text class="score">{{ tempIeltsFeedback.GRA }}</n-text>
                                    <n-button circle secondary type="primary" size="small" @click="addGRAScore" :disabled="isAddGRAScoreDisabled">
                                        <template #icon>
                                            <Add16Regular />
                                        </template>
                                    </n-button>
                                </n-space>
                            </n-space>
                        </n-list-item>
                    </n-list>
                    <n-grid x-gap="6" cols="2">
                        <n-gi>
                            <n-button type="error" block secondary @click="CancelIeltsScoreEdit"> Cancel </n-button>
                        </n-gi>
                        <n-gi>
                            <n-button type="primary" block @click="SaveIeltsScore"> Save </n-button>
                        </n-gi>
                    </n-grid>
                </n-space>
            </n-drawer-content>
        </n-drawer>
    </ion-page>
</template>

<script setup lang="ts">
import { DocumentOnePage20Regular, ChevronRight16Regular, Add16Regular, Subtract16Regular } from '@vicons/fluent';
const router = useRouter();
const isLoading = ref(false);

const studentsStore = useStudentsStore();

const tempFeedback: Ref<Feedback> = ref({ ...(studentsStore.currentEssay.feedback as Feedback) });

const tempIeltsFeedback: Ref<IeltsFeedback> = ref({ ...(studentsStore.currentEssay.feedback as IeltsFeedback) });

const ieltsOverallScore = computed(() => {
    let score;
    score =
        (studentsStore.currentEssay.feedback as IeltsFeedback).TR +
        (studentsStore.currentEssay.feedback as IeltsFeedback).CC +
        (studentsStore.currentEssay.feedback as IeltsFeedback).LR +
        (studentsStore.currentEssay.feedback as IeltsFeedback).GRA;
    score /= 4;

    if (score % 1 >= 0.75) {
        score = Math.ceil(score);
    } else if (score % 1 >= 0.25) {
        score = Math.floor(score) + 0.5;
    } else {
        score = Math.floor(score);
    }

    return score;
});
const tempIeltsOverallScore = computed(() => {
    let score;
    score = tempIeltsFeedback.value.TR + tempIeltsFeedback.value.CC + tempIeltsFeedback.value.LR + tempIeltsFeedback.value.GRA;
    score /= 4;

    if (score % 1 >= 0.75) {
        score = Math.ceil(score);
    } else if (score % 1 >= 0.25) {
        score = Math.floor(score) + 0.5;
    } else {
        score = Math.floor(score);
    }

    return score;
});

const tempComment = ref(studentsStore.currentEssay.feedback?.comment);

const gradeType = computed(() => {
    // A+ A -> 'success'
    // B+ B -> 'info'
    // C+ C -> 'warning'
    // F -> 'error'
    const grade = tempFeedback.value.grade;
    if (grade === 'F') {
        return 'error';
    } else if (grade === 'C' || grade === 'C+') {
        return 'warning';
    } else if (grade === 'B' || grade === 'B+') {
        return 'info';
    } else {
        return 'success';
    }
});

// Grades: A+ A B+ B C+ C F
const grades = ['F', 'C', 'C+', 'B', 'B+', 'A', 'A+'];
const isDowngradeDisabled = ref(false);
const isUpgradeDisabled = ref(false);

function Downgrade() {
    const currentGradeIndex = grades.indexOf(tempFeedback.value.grade);
    if (currentGradeIndex > 0) {
        tempFeedback.value.grade = grades[currentGradeIndex - 1];
    }

    // if already F, disable
    if (tempFeedback.value.grade === 'F') {
        isDowngradeDisabled.value = true;
    } else {
        isDowngradeDisabled.value = false;
    }

    // enable upgrade
    isUpgradeDisabled.value = false;
}

function Upgrade() {
    const currentGradeIndex = grades.indexOf(tempFeedback.value.grade);
    if (currentGradeIndex < grades.length - 1) {
        tempFeedback.value.grade = grades[currentGradeIndex + 1];
    }

    // if already A+, disable
    if (tempFeedback.value.grade === 'A+') {
        isUpgradeDisabled.value = true;
    } else {
        isUpgradeDisabled.value = false;
    }

    // enable downgrade
    isDowngradeDisabled.value = false;
}

const isEditIeltsScoreShown = ref(false);
function showEditIeltsScore() {
    isEditIeltsScoreShown.value = true;
}

const isAddTRScoreDisabled = computed(() => {
    return tempIeltsFeedback.value.TR === 9;
});
function addTRScore() {
    if (tempIeltsFeedback.value.TR < 9) {
        tempIeltsFeedback.value.TR++;
    }
}

const isDeductTRScoreDisabled = computed(() => {
    return tempIeltsFeedback.value.TR === 1;
});
function deductTRScore() {
    if (tempIeltsFeedback.value.TR > 1) {
        tempIeltsFeedback.value.TR--;
    }
}

const isAddCCScoreDisabled = computed(() => {
    return tempIeltsFeedback.value.CC === 9;
});
function addCCScore() {
    if (tempIeltsFeedback.value.CC < 9) {
        tempIeltsFeedback.value.CC++;
    }
}

const isDeductCCScoreDisabled = computed(() => {
    return tempIeltsFeedback.value.CC === 1;
});
function deductCCScore() {
    if (tempIeltsFeedback.value.CC > 1) {
        tempIeltsFeedback.value.CC--;
    }
}

const isAddLRScoreDisabled = computed(() => {
    return tempIeltsFeedback.value.LR === 9;
});
function addLRScore() {
    if (tempIeltsFeedback.value.LR < 9) {
        tempIeltsFeedback.value.LR++;
    }
}

const isDeductLRScoreDisabled = computed(() => {
    return tempIeltsFeedback.value.LR === 1;
});
function deductLRScore() {
    if (tempIeltsFeedback.value.LR > 1) {
        tempIeltsFeedback.value.LR--;
    }
}

const isAddGRAScoreDisabled = computed(() => {
    return tempIeltsFeedback.value.GRA === 9;
});
function addGRAScore() {
    if (tempIeltsFeedback.value.GRA < 9) {
        tempIeltsFeedback.value.GRA++;
    }
}

const isDeductGRAScoreDisabled = computed(() => {
    return tempIeltsFeedback.value.GRA === 1;
});
function deductGRAScore() {
    if (tempIeltsFeedback.value.GRA > 1) {
        tempIeltsFeedback.value.GRA--;
    }
}

function SaveIeltsScore() {
    studentsStore.currentEssay.feedback = { ...tempIeltsFeedback.value };
    isEditIeltsScoreShown.value = false;
}
function CancelIeltsScoreEdit() {
    tempIeltsFeedback.value = { ...(studentsStore.currentEssay.feedback as IeltsFeedback) };
    isEditIeltsScoreShown.value = false;
}

function onSavingFeedback() {
    if (studentsStore.currentEssay.feedback) {
        studentsStore.currentEssay.feedback.comment = tempComment.value as string;
    }
    router.back();
}
</script>

<style scoped>
.light-green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.12);
}
.green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.24);
}

.score {
    font-size: large;
    padding: 0 1em;
}

.card-content {
    padding: 0px;
}
.max-score {
    font-size: 0.8em;
}

.edit-label {
    min-width: 1em;
}
</style>
