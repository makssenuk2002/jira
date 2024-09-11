<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        {{ task.id ? 'Edit Task' : 'Create Task' }}
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="editedTask.title" label="Title"></v-text-field>
        <v-textarea v-model="editedTask.description" label="Description"></v-textarea>
        <v-text-field v-model="editedTask.assignee" label="Assignee"></v-text-field>
        <v-select
          v-model="editedTask.executors"
          :items="['John', 'Jane', 'Bob']"
          label="Executors"
          multiple
        ></v-select>
        <v-select
          v-model="editedTask.status"
          :items="['TODO', 'In Progress', 'Done']"
          label="Status"
        ></v-select>
        <v-select
          v-model="editedTask.priority"
          :items="['Low', 'Medium', 'High']"
          label="Priority"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'TaskDialog',
  props: {
    modelValue: Boolean,
    task: Object
  },
  emits: ['update:modelValue', 'save'],
  setup(props, { emit }) {
    const dialog = ref(props.modelValue)
    const editedTask = ref({ ...props.task })

    watch(() => props.modelValue, (val) => {
      dialog.value = val
    })

    watch(() => props.task, (val) => {
      editedTask.value = { ...val }
    })

    const close = () => {
      emit('update:modelValue', false)
    }

    const save = () => {
      emit('save', editedTask.value)
      close()
    }

    return {
      dialog,
      editedTask,
      close,
      save
    }
  }
})
</script>