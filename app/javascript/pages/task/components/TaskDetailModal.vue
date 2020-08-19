<template>
  <div :id="'task-detail-modal-' + task.id">
    <div class="modal" @click.self="handleCloseModal">
      <!-- event.targetが自分自身の場合のみハンドラが呼び出される / modal-dialogの外をクリックしたときに閉じるため -->
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ task.title }}</h5>
            <button type="button" class="close" @click="handleCloseModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="task.description">
            <p>{{ task.description }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="handleCloseModal">閉じる</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show"></div>
  </div>
</template>

<script>
	export default {
		name: "TaskDetailModal",
		props: {
			task: {
				title: {
					type: String,
					required: true
				},
				description: {
					type: String,
					required: true
				}
			}
		},
		methods: {
			handleCloseModal() {
				this.$emit('close-modal')
				// $emitを使って親の@closeModalに設定されているメソッドを実行させることができる。スネークケースとキャメルケースの変換は自動で行ってくれる。
			}
		}
	}
</script>

<style scoped>
  .modal {
    display: block;
    /* 表示/非表示はvueで制御するので最初から表示状態にする */
  }
</style>
