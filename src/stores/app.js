import {createStore} from 'vuex'
import getRecipes from "../api/getRecipes";
import getUser from "../api/getUser";

// Create a new store instance.
const store = createStore({
    state() {
        return {
            //recipes list
            recipes: [],
            //user value
            user: {},
        }
    },
    getters: {
        emptyRecipesList(state) {
            return state.recipes.length > 0;
        }
    },
    mutations: {
        setRecipes(state, data) {
            state.recipes = data
        },
        setUser(state, data) {
            state.user = data;
        }
    },
    actions: {
        async getRecipes({commit}) {

            //fetch data from the api
            const recipes = await getRecipes();

            //saving the request result to the store
            commit('setRecipes', recipes)
        },
        async getUser({commit}) {
            const user = await getUser();

            //saving the request result to the store
            commit('setUser', user)
        }
    }
})

export default store;