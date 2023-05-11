<script setup>
  import { onMounted } from "vue";
  import { storeToRefs } from "pinia";
  import { useUserStore } from "./stores/user.js";
  import { useRouter, useRoute } from "vue-router";
  import NavBar from "./components/NavbarComponent.vue";

  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);
  const router = useRouter();
  const route = useRoute();

  onMounted(async () => {
    try {
      await userStore.fetchUser();
      const isAuthenticated = Boolean(user.value);
      if (!isAuthenticated && route.name !== "home") {
        router.push({ name: "home" });
      } else if (isAuthenticated && route.name !== "tasks") {
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
