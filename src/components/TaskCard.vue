<template>
  <v-card class="ma-2">
    <v-card-title>{{ task.title }}</v-card-title>
    <v-card-text>
      <p>{{ task.description }}</p>
      <p>Assignee: {{ task.assignee }}</p>
      <p>Priority: {{ task.priority }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="$emit('edit', task)" text>Edit</v-btn>
      <v-btn @click="$emit('delete', task.id)" text color="error">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  emits: ['edit', 'delete']
})
</script>