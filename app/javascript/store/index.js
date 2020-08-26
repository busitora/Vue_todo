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
		set_Tasks: (state, tasks) => {
			state.tasks = tasks
		},
		add_Task: (state, task) => {
			state.tasks.push(task)
		},
		delete_Task: (state, deleteTask) => {
			state.tasks = state.tasks.filter(task => {
				return task.id != deleteTask.id
			})
		},
		update_Task: (state, updateTask) => {
			const index = state.tasks.findIndex(task => {
				return task.id == updateTask.id
			})
			state.tasks.splice(index, 1, updateTask)
		},
	},

	actions: {
		fetchTasks({commit}) {
			axios.get('tasks')
				.then(res => {
					// baseURLでapiまで指定してある
					commit('set_Tasks', res.data)
					// .then(res => console.log(res)) //でデバッグ
				})
				.catch(err => console.log(err.response));
		},
		createTask({commit}, task) {
			return axios.post('tasks', task)
				.then(res => {
					commit('add_Task', res.data)
				})
		},
		deleteTask({commit}, task) {
			return axios.delete(`tasks/${task.id}`)
				.then(res => {
					commit('delete_Task', res.data)
				})
		},
		updateTask({commit}, task) {
			return axios.patch(`tasks/${task.id}`, task)
				.then(res => {
					commit('update_Task', res.data)
				})
		}
	},
})
