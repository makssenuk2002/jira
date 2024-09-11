import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: []
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(task)
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id)
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask)
      }
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId)
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    }
  },
  actions: {
    addTask({ commit }, task) {
      commit('addTask', { ...task, id: Date.now() })
    },
    updateTask({ commit }, task) {
      commit('updateTask', task)
    },
    deleteTask({ commit }, taskId) {
      commit('deleteTask', taskId)
    },
    setTasks({ commit }, tasks) {
      commit('setTasks', tasks)
    }
  },
  getters: {
    tasksByStatus: (state) => (status) => {
      return state.tasks.filter(task => task.status === status)
    }
  }
})