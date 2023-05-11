// /store/task.js

import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: null
    }),

    actions: {
        async fetchTasks() {
            try {
                const { data, error } = await supabase
                    .from('tasks')
                    .select()
                    .order('id', { ascending: false });
                if (error) {
                    throw error;
                }
                this.tasks = data;
            } catch (error) {
                console.error(error);
            }
        },
        async createTasks(title, is_complete, user_id) {
            try {
                const { error } = await supabase
                    .from('tasks')
                    .insert(
                        {
                            title: title,
                            is_complete: is_complete,
                            user_id: user_id,
                        },
                    );
                if (error) {
                    throw error;
                }
            } catch (error) {
                console.error(error);
            }
        },
        async deleteTasks(task_id) {
            try {
                const { error } = await supabase
                    .from('tasks')
                    .delete()
                    .eq('id', task_id);
                if (error) {
                    throw error;
                }
            } catch (error) {
                console.error(error);
            }
        },
        async updateTitle(title, task_id) {
            try {
                const { error } = await supabase
                    .from('tasks')
                    .update({ title: title})
                    .eq('id', task_id);
                if (error) {
                    throw error;
                }
            } catch (error) {
                console.error(error);
            }
        },
        async updateIsComplete(is_complete, task_id) {
            try {
                const { error } = await supabase
                    .from('tasks')
                    .update({ is_complete:is_complete })
                    .eq('id',task_id);
                if (error) {
                    throw error;
                }
            } catch (error) {
                console.error(error);
            }
        },
    }
});
