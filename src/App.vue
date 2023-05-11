<script setup>
  import { onMounted, watch } from "vue";
  import { storeToRefs } from "pinia";
  import { useUserStore } from "./stores/user.js";
  import { useRouter } from "vue-router";
  import NavBar from "./components/NavbarComponent.vue";

  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);
  const router = useRouter();
  const isAuthenticated = Boolean(user.value);
  watch(isAuthenticated, () => {
    
    if (!isAuthenticated && router.currentRoute.name !== "home") {
      router.push({ name: "home" });
    } else if (isAuthenticated && router.currentRoute.name !== "tasks") {
      router.push({ name: "tasks" });
    }
  });

  onMounted(async () => {
    try {
      await userStore.fetchUser();
      if (!isAuthenticated) {
        router.push({ name: "home" });
      } else {
        router.push({ name: "tasks" });
      }
    } catch (e) {
      console.log(e);
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

<template>
  <NavBar></NavBar>
  <router-view />
</template>
