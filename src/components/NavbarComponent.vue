<template>
    <nav
        class="navbar navbar-expand-lg navbar-light p-3"
        style="background-color: #e9ecef"
        >
        <div class="container-fluid">
            
            <router-link to="/" class="nav-link mx-2">
                <img
                    class="navbar-brand"
                    src="../assets/logo.png"
                    style="height: 60px; width: auto"
                />
            </router-link>

            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <span class="navbar-toggler-icon"> </span>
            </button>
    
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link v-if="user" to="/tasks" class="nav-link mx-2">My tasks</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="!user" to="/login" class="nav-link mx-2">Sign In</router-link>
                    </li>
                    <li class="nav-item">
                        <a v-if="user" class="nav-link mx-2" role="button" @click="logout">Sign Out</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
    import { useRouter } from "vue-router";
    import { useUserStore } from "../stores/user.js";
    import { storeToRefs } from "pinia";
    import 'bootstrap';
    
    const userStore = useUserStore();
    const router = useRouter();
    const { user } = storeToRefs(userStore);
    
    const logout = async () => {
        try {
        await userStore.signOut();
        await router.push({ name: "home" });
        } catch (e) {
        console.log(e);
        }
    };
</script>

<style scoped>
    .nav-item:hover {
        transform: scale(1.1);
    }
    
    .navbar-nav {
        display: flex;
        flex-direction: column;
    }
    .nav-link {
        color: #000;
        margin: 10px;
        text-align: center;
    }
    @media (max-width: 991.98px) {
        .navbar-collapse {
            background-color: #e9ecef;
            padding: 10px;
            position: absolute;
            z-index: 1000;
            width: 100%;
            top: 75px;
            left: 0;
        }
    }
    @media (min-width: 992px) {
        .navbar-nav {
            flex-direction: row;
        }
    }
</style>