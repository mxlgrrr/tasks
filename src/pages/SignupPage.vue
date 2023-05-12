<template>
    <section class="background-radial-gradient overflow-hidden d-flex align-items-center">
        <div class="container px-4 py-4 px-md-5 text-center text-lg-start my-5">
            <div class="row gx-lg-5 align-items-center">
                <div class="col-lg-6 mb-lg-0" style="z-index: 10">
                <h1
                class="my-5 display-5 fw-bold ls-tight"
                style="color: hsl(218, 81%, 95%)"
                >
                Are you ready to tackle your tasks and give it your all? <br />
                <span style="color: hsl(218, 81%, 75%)">May the force be with you!</span>
                </h1>
            </div>
    
            <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
                <div class="card bg-glass">
                <div class="card-body px-4 py-5 px-md-5">
                    <form @submit.prevent="signup">
                    <div class="form-outline mb-4">
                        <input
                        type="email"
                        id="email"
                        class="form-control"
                        required
                        placeholder="Email Address"
                        v-model="email"
                        />
                    </div>
    
                    <div class="form-outline mb-4">
                        <input
                        type="password"
                        id="password"
                        class="form-control"
                        required
                        placeholder="Password"
                        v-model="password"
                        />
                    </div>
    
                    <div class="form-outline mb-4">
                        <input
                        type="password"
                        id="confirmPassword"
                        class="form-control"
                        required
                        placeholder="Confirm password"
                        v-model="confirmPassword"
                        />
                    </div>
                    <div id="error-message" class= "alert text-danger text-center animate__animated animate__swing" v-if="errorMsg" role="alert">
        <p><i class="bi bi-exclamation-circle"></i>
            {{ errorMsg }}</p>
        </div>
    
                    <button type="submit" class="btn btn-primary btn-block mb-4">
                        Register
                    </button>
    
                    <div class="text-center">
                        <p>
                        Already have an account?
                        <router-link class="signin-btn" to="/login">
                            Sign In
                        </router-link>
                        </p>
                    </div>
    
                    </form>
    
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import { useUserStore } from "../stores/user.js";
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';
    
    const email = ref(null);
    const password = ref(null);
    const confirmPassword = ref(null);
    const errorMsg = ref(null);
    const router = useRouter();
    const userStore = useUserStore();
    
    const signup = async () => {
        if (password.value === confirmPassword.value) {
            try {
                await userStore.signUp(email.value, password.value);
                await userStore.fetchUser(); // Actualizar el estado del usuario
                toast.success("Success! To verify your identity, we need you to confirm your email", { timeout: 5000 });
                setTimeout(() => {
                router.push({ name: "home" });
                }, 6000);
            } 
            catch (error) {
                console.log(error);
            }
            return;
        }
        toast.error("Error: Passwords do not match", { timeout: 5000 });
    };
</script>

<style scoped>
    .background-radial-gradient {
        background-color: hsl(218, 41%, 15%);
    }
    
    .bg-glass {
        background-color: hsla(0, 0%, 100%, 0.9) !important;
        backdrop-filter: saturate(200%) blur(25px);
    }
    
    .signin-btn {
        text-decoration: none;
        color: #82C0CC;
    }
    .btn{
        background-color: #82C0CC;
        border:none;
    }
    
    .btn:hover {
        background-color: #53b0c2;
    }
    @media (min-width: 992px) {
        section{
            max-height: 90.4vh;
            min-height: 90.4vh;
        }
    }
    @media (max-width: 991.98px) {
        section{
            max-height: 90.4vh;
            min-height: 90.4vh;
        }
    }
    
    @media (max-width: 426px) {
        section{
            padding-top:0;
            margin-bottom: 0;
            max-height: 89.1vh;
        }
    }
</style>