import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: null,
    }),

    actions: {
        async fetchUser() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) this.user = user;
        },
        async signIn(email, password) {
            const { user, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if (error) throw error;
            if (user) this.user = user;
        },
        async signUp(email, password) {
            const { user, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });
            if (error) throw error;
            if (user) this.user = user;
        },
        async signOut() {
            try {
                const { error } = await supabase.auth.signOut();
                if (error) throw error;
                this.user = null;
                this.errors = null;
            } catch (error) {
                this.errors = error;
            }
        },
    },

    persist: {
        enabled: true,
        strategies: [
            {
                key: "user",
                storage: localStorage,
            },
        ],
    },
});