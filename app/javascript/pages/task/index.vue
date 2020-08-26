<template>
  <div>
    <div class="d-flex">
      <div class="col-4 bg-light rounded shadow m-3 p-3">
        <div class="h4">TODO</div>
        <div
          v-for="task in tasks"
          :key="task.id"
          :id="'task-' + task.id"
          class="bg-white border shadow-sm rounded my-2 p-4 d-flex align-items-center"
          @click="handleShowTaskDetailModal(task)"
        >
          <span>{{ task.title }}</span>
        </div>
        <button class="btn btn-secondary" @click="handleShowTaskCreateModal">タスクを追加</button>
      </div>
    </div>
    <div class="text-center">
      <router-link :to="{ name: 'TopIndex' }" class="btn btn-dark mt-5">戻る</router-link>
    </div>
    <transition name="fade">
      <TaskDetailModal v-if="isVisibleTaskDetailModal" :task="taskDetail" @close-modal="handleCloseTaskDetailModal"
                       @delete-task="handleDeleteTask"
                       @show-edit-modal="handleShowTaskEditModal"/>
      <!-- :task="taskDetail" で 子にtaskを渡してる-->
    </transition>
    <!-- トランジションで管理 nameをつけて管理、今回はfade。nameをつけないと、v-という名前になるが非推奨-->
    <transition name="fade">
      <TaskCreateModal
        v-if="isVisibleTaskCreateModal"
        @close-modal="handleCloseTaskCreateModal"
        @create-task="handleCreateTask"
      />
    </transition>
    <TaskEditModal
      v-if="isVisibleTaskEditModal"
      :task="taskEdit"
      @close-modal="handleCloseTaskEditModal"
      @update-task="handleUpdateTask"
    />
  </div>
</template>

<script>
	import TaskDetailModal from "./components/TaskDetailModal"
	import {mapGetters, mapActions} from "vuex"
	import TaskCreateModal from "./components/TaskCreateModal"
	import TaskEditModal from "./components/TaskEditModal"

	export default {
		name: "TaskIndex",
		components: {
			TaskDetailModal,
			TaskCreateModal,
      TaskEditModal
		},
		data() {
			return {
				title: "タスク管理アプリ",
				taskDetail: {},
				isVisibleTaskDetailModal: false,
				isVisibleTaskCreateModal: false,
				isVisibleTaskEditModal: false,
        taskEdit: {}
			}
		},
		computed: {
			...mapGetters(["tasks"]),
			//  ... はスプレット演算子 this.$store.getters['tasks'] と書かずに取得できるので楽
		},
		created() {
			// 最初のリロード時、インスタンスが生成され、データが初期化された後
			this.fetchTasks();
		},
		methods: {
			// fetchTasks() {
			// 	this.$axios.get("tasks")
			// 	// baseURLでapiまで指定してある
			// 		.then(res => this.tasks = res.data)
			// 		// .then(res => console.log(res)) //でデバッグ
			// 		// 成功した処理 (ES6のpromise?)を返す
			// 		.catch(err => console.log(err.status));
			// },
			...mapActions([
				"fetchTasks",
				"createTask",
        "deleteTask",
        "updateTask"
			]),
			handleShowTaskDetailModal(task) {
				this.isVisibleTaskDetailModal = true;
				this.taskDetail = task;
			},
			handleCloseTaskDetailModal() {
				this.isVisibleTaskDetailModal = false;
				this.taskDetail = {};
			},
			handleShowTaskCreateModal() {
				this.isVisibleTaskCreateModal = true;
			},
			handleCloseTaskCreateModal() {
				this.isVisibleTaskCreateModal = false;
			},
			handleShowTaskEditModal(task) {
				this.taskEdit = Object.assign({}, task)
				this.handleCloseTaskDetailModal();
				this.isVisibleTaskEditModal = true;
			},
			handleCloseTaskEditModal() {
				this.isVisibleTaskEditModal = false;
				this.taskEdit = {};
			},
			async handleCreateTask(task) {
				try {
					await this.createTask(task);
					this.handleCloseTaskCreateModal();
				} catch (error) {
					console.log(error);
				}
			},
			async handleDeleteTask(task) {
				try {
					await this.deleteTask(task);
					this.handleCloseTaskDetailModal();
				} catch (error) {
					console.log(error);
				}
			},
			async handleUpdateTask(task) {
				try {
					await this.updateTask(task);
					this.handleCloseTaskEditModal();
				} catch (error) {
					console.log(error);
				}
			},
		}
	}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    /* 現れる時のトランジションの状態 / 消える時のトランジションの状態 */
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    /* 現れる時の最初の状態 / 消える時の最後の状態*/
    opacity: 0;
  }
</style>

<!--

モーダルの動き
1. 各タスク名をクリックする → @click="handleShowTaskDetailModal(task) が引数にtaskを持ち発火し

2. this.isVisibleTaskDetailModal = true; に変更

3. 2により、<TaskDetailModal v-if="isVisibleTaskDetailModal" :task="taskDetail" @close-modal="handleCloseTaskDetailModal"/>
が発火し、TaskDetailModalのコンポーネントが呼ばれモーダルが表示される (:task="taskDetail" で代入されたtaskを子に渡す)

4. 閉じる→ 子の handleCloseModal()  がclickされ、親に渡され@close-modalが発火

5. handleCloseTaskDetailModal がfalseになり、modalが非表示になる

-->
