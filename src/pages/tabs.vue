<template>
    <ion-page>
        <ion-content>
                <ion-tabs>
                    <ion-router-outlet />

                    <ion-tab-bar slot="bottom">
                        <ion-tab-button :disabled="spinStore.isSpining" tab="list" href="/tabs/list">
                            <ion-icon :icon="ioniconsListOutline" />
                            <ion-label>List</ion-label>
                        </ion-tab-button>

                        <ion-tab-button :disabled="spinStore.isSpining" tab="marking" href="/tabs/marking">
                            <ion-icon :icon="ioniconsPencilOutline" />
                            <ion-label>Marking</ion-label>
                        </ion-tab-button>

                        <ion-tab-button :disabled="spinStore.isSpining" tab="my" href="/tabs/my">
                            <ion-icon :icon="ioniconsPersonOutline" />
                            <ion-label>My</ion-label>
                        </ion-tab-button>
                    </ion-tab-bar>
                </ion-tabs>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
const spinStore = useSpinStore();
</script>
