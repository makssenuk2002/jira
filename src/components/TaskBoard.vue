<template>
  <v-container fluid class="fill-height">
    <h1>Task Tracker</h1>
    <v-row class="fill-height">
      <v-col v-for="status in statuses" :key="status" cols="4" class="d-flex flex-column">
        <TaskColumn :status="status" @edit-task="openEditTaskDialog" />
      </v-col>
    </v-row>
    <v-btn @click="openCreateTaskDialog" color="primary" class="create-task-btn">Create Task</v-btn>
    <TaskDialog
      v-model="dialogVisible"
      :task="currentTask"
      @save="saveTask"
    />
  </v-container>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import TaskColumn from './TaskColumn.vue'
import TaskDialog from './TaskDialog.vue'

export default defineComponent({
  name: 'TaskBoard',
  components: {
    TaskColumn,
    TaskDialog
  },
  setup() {
    const store = useStore()
    const dialogVisible = ref(false)
    const currentTask = ref(null)
    const statuses = ['TODO', 'In Progress', 'Done']

    const openCreateTaskDialog = () => {
      currentTask.value = {
        title: '',
        description: '',
        assignee: '',
        executors: [],
        status: 'TODO',
        priority: 'Medium'
      }
      dialogVisible.value = true
    }

    const openEditTaskDialog = (task) => {
      currentTask.value = { ...task }
      dialogVisible.value = true
    }

    const saveTask = (task) => {
      if (task.id) {
        store.dispatch('updateTask', task)
      } else {
        store.dispatch('addTask', task)
      }
      dialogVisible.value = false
    }

    return {
      dialogVisible,
      currentTask,
      statuses,
      openCreateTaskDialog,
      openEditTaskDialog,
      saveTask
    }
  }
})
</script>

<style scoped>
.fill-height {
  height: calc(100vh - 64px); /* Відняти висоту верхньої панелі, якщо вона є */
}

.create-task-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>