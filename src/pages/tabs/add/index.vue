<template>
    <ion-page>
        <ion-content class="ion-padding" color="light">
            <div class="icon-container">
                <ion-icon :icon="ioniconsLogoIonic" size="large" color="primary"></ion-icon>
                <h1 style="margin: 0 0 0 1em">Essay Marker</h1>
            </div>

            <ion-list :inset="true">
                <ion-item button detail="true" router-link="/ai/requirement">
                    <ion-icon aria-hidden="true" :icon="ioniconsCompassOutline" slot="start" />
                    <ion-label>
                        <h3>Requirement</h3>
                        <p>I want to sleep</p>
                    </ion-label>
                </ion-item>
                <ion-item button detail="true" router-link="/ai/student">
                    <ion-icon aria-hidden="true" :icon="ioniconsPersonOutline" slot="start" />
                    <ion-label>
                        <h3>Student</h3>
                        <p>Crazy Alex</p>
                    </ion-label>
                </ion-item>
            </ion-list>

            <ion-list :inset="true" lines="none">
                <ion-item>
                    <ion-input label="Title" label-placement="floating" maxlength="20" :counter="true"> </ion-input>
                </ion-item>
                <ion-item>
                    <ion-textarea label="Essay" label-placement="floating" rows="3" :auto-grow="true" :counter="true" maxlength="3000">
                    </ion-textarea>
                </ion-item>
            </ion-list>
            <ion-fab slot="fixed" vertical="bottom" horizontal="end">
                <ion-fab-button color="danger">
                    <ion-icon :icon="ioniconsRefreshOutline"></ion-icon>
                </ion-fab-button>
                <ion-fab-button>
                    <ion-icon :icon="ioniconsCloudUploadOutline"></ion-icon>
                </ion-fab-button>
            </ion-fab>
        </ion-content>
    </ion-page>
</template>

<style scoped>
.icon-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 5em;
    margin-bottom: 5em;
}

ion-fab-button {
    margin-top: 1em;
}
</style>
