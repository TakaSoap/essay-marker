<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        
        <ion-router-outlet />

        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="list" href="/tabs/list">
            <ion-icon :icon="ioniconsListOutline" />
            <ion-label>List</ion-label>
          </ion-tab-button>
          
          <ion-tab-button tab="add" href="/tabs/add">
            <ion-icon :icon="ioniconsAddOutline" />
            <ion-label>Add</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="my" href="/tabs/my">
            <ion-icon :icon="ioniconsPersonOutline" />
            <ion-label>My</ion-label>
          </ion-tab-button>

        </ion-tab-bar>
      </ion-tabs>
    </ion-content>  
  </ion-page>
</template>
