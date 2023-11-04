<template>
    <ion-page>
        <ion-header>
            <div ref="ionHeaderWelcome">
                <ion-toolbar>
                    <ion-title> Welcome </ion-title>
                </ion-toolbar>
            </div>
        </ion-header>
        <ion-content>
            <div class="welcome-banner" ref="welcomeBanner">
                <h1 style="text-align: center; margin: 10rem 0 10rem 0">Welcome to Essay Marker</h1>

                <ion-button router-link="/tabs/list" expand="block" shape="round" class="welcome-button">
                    <ion-icon :icon="ioniconsLogInOutline" />
                    <ion-label>Login</ion-label>
                </ion-button>
                <ion-button expand="block" shape="round" class="welcome-button">
                    <ion-icon :icon="ioniconsPersonAddOutline" />
                    <ion-label>Register</ion-label>
                </ion-button>
                <ion-button router-link="/welcome" expand="block" shape="round" class="welcome-button">
                    <ion-icon :icon="ioniconsCafeOutline" />
                    <ion-label>Welcome</ion-label>
                </ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
const ionHeaderWelcome = ref<HTMLElement | null>(null);
const welcomeBanner = ref<HTMLElement | null>(null);

onMounted(() => {
    // 计算剩余可用高度
    const calculateRemainingHeight = () => {
        if (welcomeBanner.value && ionHeaderWelcome.value) {
            const windowHeight = window.innerHeight;
            const headerHeight = ionHeaderWelcome.value.clientHeight;
            const remainingHeight = windowHeight - headerHeight;
            welcomeBanner.value.style.minHeight = `${remainingHeight}px`;
        }
    };

    setTimeout(() => {
        console.log('timeout');
        calculateRemainingHeight();
    }, 1);

    // 当窗口大小变化时重新计算高度
    window.addEventListener('resize', calculateRemainingHeight);
});
</script>

<style scoped>
.welcome-banner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.welcome-button {
    width: 20rem !important;
}
</style>
