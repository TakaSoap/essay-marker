<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/"></ion-back-button>
                </ion-buttons>
                <ion-title>Edit Requirement</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="ion-margin-bottom">
                <ion-select placeholder="Select Requirement" v-model="selectedRequirement" @ionChange="updateRequirement">
                    <ion-select-option v-for="req in requirements" :key="req.title" :value="req">
                        {{ req.title }}
                    </ion-select-option>
                </ion-select>
            </div>
            <ion-label>
                {{ selectedRequirement ? selectedRequirement.title : 'No requirement selected' }}
            </ion-label>
            <ion-textarea
                :placeholder="selectedRequirement ? 'Edit requirement content here...' : 'Please select a requirement'"
                v-model="currentRequirementContent"
            />
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-row>
                    <ion-col>
                        <ion-button color="danger" expand="full" @click="goBack">Cancel</ion-button>
                    </ion-col>
                    <ion-col>
                        <ion-button expand="full">Submit</ion-button>
                    </ion-col>
                </ion-row>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
const router = useRouter();

const goBack = () => {
    router.back();
};

const requirements = ref([
    { title: 'Requirement 1', content: 'Content 1' },
    { title: 'Requirement 2', content: 'Content 2' }
    // ...
]);

const selectedRequirement = ref(null);
const currentRequirementContent = ref('');

const updateRequirement = (event) => {
    selectedRequirement.value = event.detail.value;
    currentRequirementContent.value = selectedRequirement.value ? selectedRequirement.value.content : '';
};
</script>

<style scoped>
/* Styles go here */
</style>
