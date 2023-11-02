<template>
    <ion-page>
        <div class="swiper">
            <swiper
                :modules="modules"
                :pagination="{
                    type: 'progressbar',
                }"
                :navigation="true"
            >
                <swiper-slide>Slide 1</swiper-slide>
                <swiper-slide>Slide 2</swiper-slide>
                <swiper-slide>
                    <div>
                        <ion-button router-link="/">
                            <!-- Start Button -->
                            <ion-icon :icon="ioniconsGameControllerOutline" />
                            <ion-label>Start</ion-label>
                        </ion-button>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </ion-page>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
const modules = [Pagination, Navigation];
</script>

<style>
.swiper {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
