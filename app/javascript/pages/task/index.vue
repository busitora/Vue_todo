<template>
  <div>
    <div class="d-flex">
      <div class="col-4 bg-light rounded shadow m-3 p-3">
        <div class="h4">TODO</div>
        <div v-for="task in tasks" :key="task.id" class="bg-white border shadow-sm rounded my-2 p-4">
          <span>{{ task.title }}</span>
        </div>
      </div>
    </div>
    <div class="text-center">
      <router-link :to="{ name: 'TopIndex' }" class="btn btn-dark mt-5">戻る</router-link>
    </div>
  </div>
</template>

<script>
	export default {
		name: "TaskIndex",
		data() {
			return {
				title: "タスク管理アプリ",
				tasks: []
			}
		},
		created() {
			// 最初のリロード時、インスタンスが生成され、データが初期化された後
			this.fetchTasks();
		},
		methods: {
			fetchTasks() {
				this.$axios.get("tasks")
          // baseURLでapiまで指定してある
					.then(res => this.tasks = res.data)
					// .then(res => console.log(res)) //でデバッグ
          // 成功した処理 (ES6のpromise?)を返す
					.catch(err => console.log(err.status));
			}
		}
	}
</script>

<style scoped>
</style>
