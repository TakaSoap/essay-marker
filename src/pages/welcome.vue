<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Tab 1</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <!-- add a placeholder ion input below -->
            <ion-input placeholder="Enter your name" class="ion-padding"></ion-input>
            <ion-input placeholder="Enter your name"></ion-input>
            <ion-button href="/tabs" class="" id="button1">
                <ion-icon :icon="ioniconsLogInOutline" />
                <ion-label>Login</ion-label>
            </ion-button>
            <ion-button>
                <ion-icon :icon="ioniconsPersonAddOutline" />
                <ion-label>Register</ion-label>
            </ion-button>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-title>Footer</ion-title>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts"></script>

<style scoped>
.ion-button{
    
}
</style>
