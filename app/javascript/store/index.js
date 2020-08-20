import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../plugins/axios'

Vue.use(Vuex)

export default new Vuex.Store({
	// hello_vue.js でimportしている
	state: {
		// vue全体で使えるグローバルストア?
		tasks: []
	},

	getters: {
		tasks: state => state.tasks
		// tasks: state => return state.tasks とも書けるが returnを省略できる?
		// 全体で定義して、どこでもtasksを取得できるようにしている
	},

	mutations: {
		// mutationsでしかstateの変更を出来ないようにしている。どのコンポートでもstateを変更できると、どこでstate が変わるか予測できなくなるので危ない
		// 第1引数は state 第2引数 は 任意
		// mutationは同期的にしか書けない
		setTasks: (state, tasks) => {
			state.tasks = tasks
		},
		addTask: (state, task) => {
			state.tasks.push(task)
		}
	},

	actions: {
		fetchTasks({commit}) {
			axios.get('tasks')
				.then(res => {
					// baseURLでapiまで指定してある
					commit('setTasks', res.data)
					// .then(res => console.log(res)) //でデバッグ
				})
				.catch(err => console.log(err.response));
		},
		createTask({commit}, task) {
			return axios.post('tasks', task)
				.then(res => {
					commit('addTask', res.data)
				})
		}
	},
})
