<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title> Welcome </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="welcome-banner" style="background-color: aqua">

                <h1 style="text-align: center; margin: 10rem 0 10rem 0;">Welcome to Essay Marker</h1>

                <ion-button href="/tabs" expand="block" shape="round" class="welcome-button">
                    <ion-icon :icon="ioniconsLogInOutline" />
                    <ion-label>Login</ion-label>
                </ion-button>
                <ion-button expand="block" shape="round" class="welcome-button">
                    <ion-icon :icon="ioniconsPersonAddOutline" />
                    <ion-label>Register</ion-label>
                </ion-button>
            </div>
            <!-- A Welcome Title below -->
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
.welcome-banner {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.welcome-button{
    width: 20rem !important;
}
</style>
