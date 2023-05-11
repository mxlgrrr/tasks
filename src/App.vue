<template>
  <NavBar></NavBar>
  <RouterView />
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "./stores/user.js";
import { useRouter } from "vue-router";
import { RouterView } from "vue-router";
import NavBar from "./components/NavbarComponent.vue";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);


onMounted(async () => {
  try {
    await userStore.fetchUser()
    if (!user) {
      router.push({ name: "home" })
    } else {
      router.push({ name: "tasks" })
    }
  } catch (e) {
    console.log(e)
  }
});




</script>

<style>
    html {
      font-family: "Roboto", sans-serif;
    }
    body,
    html, 
    #app {
      height: 100%;
    }
</style>