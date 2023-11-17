<template>
    <ion-page>
        <div class="swiper">
            <swiper
                :modules="modules"
                :pagination="{
                    type: 'progressbar'
                }"
                :navigation="true"
            >
                <swiper-slide>
                    <div class="welcome-banner" ref="welcomeBanner">
                        <h1 style="text-align: center; margin: 0rem 0 10rem 0">Writing Marker</h1>
                        <ul>
                            <li>
                                <img alt="rhino standing near grass" src="/public/p1 3x.png" style="text-align: center width:500px; height:500px;;" />
                            </li>
                        </ul>

                        <ion-button router-link="/">
                            <!-- Start Button -->
                            <ion-icon :icon="ioniconsGameControllerOutline" />
                            <ion-label>Start</ion-label>
                        </ion-button>
                    </div>
                </swiper-slide>
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
