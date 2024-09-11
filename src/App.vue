<template>
  <v-app>
    <v-main>
      <TaskBoard />
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue'
import TaskBoard from './components/TaskBoard.vue'

export default defineComponent({
  name: 'App',
  components: {
    TaskBoard
  }
})
</script>