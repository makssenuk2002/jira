<template>
  <v-card class="task-column">
    <v-card-title>{{ status }}</v-card-title>
    <v-card-text>
      <draggable
        :list="tasks"
        group="tasks"
        @change="onDragChange"
        class="drag-area"
      >
        <template #item="{ element }">
          <TaskCard :task="element" @edit="editTask" @delete="deleteTask" />
        </template>
      </draggable>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import draggable from 'vuedraggable'
import TaskCard from './TaskCard.vue'

export default defineComponent({
  name: 'TaskColumn',
  components: {
    draggable,
    TaskCard
  },
  props: {
    status: {
      type: String,
      required: true
    }
  },
  emits: ['edit-task'],
  setup(props, { emit }) {
    const store = useStore()
    const tasks = computed(() => store.getters.tasksByStatus(props.status))

    const onDragChange = (event) => {
      if (event.added) {
        const task = event.added.element
        store.dispatch('updateTask', { ...task, status: props.status })
      }
    }

    const editTask = (task) => {
      emit('edit-task', task)
    }

    const deleteTask = (taskId) => {
      store.dispatch('deleteTask', taskId)
    }

    return {
      tasks,
      onDragChange,
      editTask,
      deleteTask
    }
  }
})
</script>

<style scoped>
.task-column {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.drag-area {
  min-height: 200px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 8px;
  background-color: #f9f9f9;
}

.drag-area:empty {
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: italic;
  color: #999;
}

.drag-area:empty::after {
  content: 'Перетягніть завдання сюди';
}
</style>