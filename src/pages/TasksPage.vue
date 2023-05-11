<template>
    <section class="bg d-flex justify-content-center align-items-center">
        <div class="container">
            <div class="padding-top">
                <div class="newTask">
                    <h4>Tasks</h4>
                </div>

                <div class="addTask input-group mb-3">
                    <form class="tasks__new input-group toDoAdd" method="post" @submit.prevent="handleSubmit">
                        <input type="text" id="btn-check-outlined" class="button input form-control border-end-0 rounded-0 addTask-text" v-model="title"
                            placeholder="New task" aria-describedby="button-addon4">
                        <button class="btn btn-outline-info button rounded-end fw-bold addTask-button" type="submit">
                            <i class="bi bi-plus-lg"></i> Add
                        </button>                      
                    </form>
                </div>
                <div class="newTask">
                    <ul class="toDoList list-group list-group-flush">
                        <li v-for="task in tasks" :key="task.id" class="list-group-item toDoLi text-center">

                            <div v-if="editId === task.id" class="row input-group d-flex align-items-center justify-content-center">
                                <div class="col-1">
                                    <div class="input-group order-checkbox">
                                        <input @click="changeIsComplete(task)" type="checkbox" v-model="task.is_complete">
                                    </div>
                                </div>
                                <div class="col-6 text-center">
                                    <input v-model="newTitle" type="text" class="input form-control text-center" placeholder="edit mode"
                                        aria-label="Edit mode" aria-describedby="button-emod">
                                </div>
                                <div class="col-3">
                                    <div class="input-group-append" id="button-emod">
                                        <button @click="disableEditing" class="btn btn-outline-dark myHover me-3"
                                            type="button">
                                            <i class="bi bi-x-lg"></i> Cancel
                                        </button>
                                        <button @click="saveEdit(task)" class="btn btn-outline-info me-sm-3 fw-bold addTask-save me-3"
                                            type="button">
                                            <i class="bi bi-check-lg"></i> Save
                                        </button>
                                        <button @click="deleteTasks(task)" class="btn btn-outline-dark myHover"
                                            type="button">
                                            <i class="bi bi-trash"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div v-else class="order row d-flex align-items-center justify-content-center">
                                <div class="col-1">
                                    <div class="input-group order-checkbox">
                                    <input @click="changeIsComplete(task)" type="checkbox" v-model="task.is_complete">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="order-title">
                                    <span v-if="task.is_complete" @click="enableEditing(task)"><del>{{task.title}}</del></span>
                                    <span v-else @click="enableEditing(task)">{{task.title}}</span>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="order-buttons">
                                    <button @click="deleteTasks(task)" class="btn btn-outline-danger myHover" type="button">
                                        <i class="bi bi-trash-fill"></i> Delete
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <hr>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { useTaskStore } from "../stores/task"
    import { ref } from "vue"
    import { useUserStore } from "../stores/user"
    import { storeToRefs } from "pinia"
    import "bootstrap"
    import 'bootstrap-icons/font/bootstrap-icons.css'

    const title = ref('');
    const is_complete = ref(false);
    const newTitle = ref('')
    const editId = ref(null)
    const taskStore = useTaskStore();
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);
    const { tasks } = storeToRefs(taskStore);

    const handleSubmit = async () => {
        try {
            console.log(user._object.id)
            await taskStore.createTasks(title.value, is_complete.value, user.value.id)
            title.value = ""
            is_complete.value = false
            await taskStore.fetchTasks();
        } catch (error) {
            console.error("Error al crear la tarea:", error)
        }
    };

    const fetchTasks = async () => {
        try {
            await taskStore.fetchTasks();
        } catch (error) {
            console.error("Error al obtener las tareas:", error)
        }
    }
    fetchTasks();

    const deleteTasks = async (task) => {
        try {
            await taskStore.deleteTasks(task.id)
            await taskStore.fetchTasks();
        } catch (error) {
            console.error("Error al eliminar la tarea:", error)
        }
    };

    const enableEditing = (task) => {
        newTitle.value = task.title
        editId.value = task.id
    };

    const disableEditing = () => {
        newTitle.value = ''
        editId.value = null
    };

    const saveEdit = async (task) => {
        try {
            task.title = newTitle.value
            await taskStore.updateTitle(newTitle.value, task.id)
            editId.value = null
            await taskStore.fetchTasks();
        } catch (error) {
            console.error("Error al guardar los cambios en la tarea:", error)
        }
    };

    const changeIsComplete = async (task) => {
        try {
            task.is_complete = !task.is_complete
            await taskStore.updateIsComplete(task.is_complete, task.id)
            await taskStore.fetchTasks();
        } catch (error) {
            console.error("Error al cambiar el estado de la tarea:", error)
        }
    };
</script>



<style scoped>
    h4{
        color: white;
    }
    .btn {
        border: none;
    }
    .container {
        margin: 0%;
        padding: 0%;
    }
    .bg {
        background-color: hsl(218, 41%, 15%);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100vh;
    }
    
    .trash {
        color: grey;
        font-size: 20px;
    }
    
    .trash:hover {
        color: red;
        transform: scale(1.1);
    }
    
    .btn-primary {
        background-color: #82c0cc;
        border: none;
    }
    
    p {
        color: 514D67;
    }
    
    .btn-primary:hover {
        background-color: #53b0c2;
    }
    
    .completed {
        text-decoration: line-through;
        color: grey;
        background-color: rgb(247, 247, 247);
    }
    .list-group-item {
        padding: 1rem;
    }

    .list-group-item .form-check {
        margin-right: 1rem;
    }

    .list-group-item .form-check-label {
        margin-right: 5px;
    }

    .list-group-item p {
        margin: 0;
    }

    .list-group-item .btn {
        cursor: pointer;
    }

    .list-group-item.completed {
        text-decoration: line-through;
        background-color: #f8f9fa;
    }
    .addTask {
        background-color: #f2f2f2;
        border-radius: 10px;
        padding: 10px;
    }

    .addTask input {
        border: none;
        border-radius: 5px;
        background-color: #f9f9f9;
        padding: 10px;
    }

    .addTask button {
        background-color: #007bff;
        color: #fff;
        border-radius: 5px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    }

    .addTask button:hover {
        background-color: #0056b3;
    }
    .task-item {
        margin-bottom: 10px;
        padding: 10px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
    }
    .title {
        font-weight: bold;
        font-size: 18px;
        cursor: pointer;
    }
    @media (min-width: 992px) {
        section{
            max-height: 88.3vh;
            min-height: 88.3vh;
        }
    }
    @media (max-width: 991.98px) {
        section{
            max-height: 88.3vh;
            min-height: 88.3vh;
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