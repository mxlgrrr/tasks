<template>
    <section class="background-radial-gradient d-flex justify-content-center align-items-center">
        <div class="container-fluid">
            <div class= "row">
                <div class= "col  d-flex justify-content-center">
                    <div class= "text-center">
                        <h1
                        class="my-5 display-5 fw-bold ls-tight"
                        style="color: hsl(218, 81%, 95%)"
                        >
                        Classifying tasks is important<br />
                        <span style="color: hsl(218, 81%, 75%)"> but how do you classify the classification tasks??</span>
                        </h1>
                        <div class="row justify-content-evenly">
                        <router-link to="/login" class="btn btn-primary btn-block mb-4 p-2 col-3">
                            Sign in
                        </router-link>
                        <router-link to="/register" class="btn btn-primary btn-block mb-4 p-2 col-3">
                            Sign up
                        </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script></script>

<style scoped>
    .background-radial-gradient {
        background-color: hsl(218, 41%, 15%);
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
            min-height: 89.1vh;
            max-height: 89.1vh;
        }
    }

</style>