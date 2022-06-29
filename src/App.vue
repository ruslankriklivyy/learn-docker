<template>
  <div class="q-pa-md">
    <q-btn @click="openAddForm" class="bg-green text-white" flat>Add New Todo</q-btn>

    <div class="text-h4" style="margin-top: 20px">Total: {{ getTodosTotal }}</div>
  </div>

  <div class="q-pa-md items-start q-gutter-md">
    <q-card :key="todo.id" v-for="todo in todos" class="my-card bg-white text-dark">
      <q-card-section>
        <div class="text-h6">{{ todo.title }}</div>
        <q-checkbox v-model="todo.completed"/>
      </q-card-section>

      <q-card-actions>
        <q-btn class="bg-blue text-white" flat>Edit</q-btn>
        <q-btn @click="deleteTodo(todo.id)" class="bg-red text-white" flat>Delete</q-btn>
      </q-card-actions>
    </q-card>

    <q-inner-loading
      :showing="isFetching"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </div>

  <q-dialog v-model="isOpenAddForm">
    <q-card>
      <q-form
        @submit.prevent="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-card-section class="row items-center">
          <div class="q-pa-md" style="max-width: 400px">
            <q-input
              filled
              v-model="title"
              label="Todo title *"
              hint="Title"
              lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']"
            />

            <q-checkbox v-model="completed" label="Is completed?"/>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Cancel" type="reset" color="primary" flat class="q-ml-sm" v-close-popup/>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref, watch,
} from 'vue';
import { useTodoStore } from 'stores/example-store';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useTodoStore();
    const {
      getTodos,
      addTodo,
      deleteTodo,
    } = store;

    const {
      todos,
      getTodosTotal,
      isFetching,
    } = storeToRefs(store);
    const title = ref(null);
    const completed = ref(false);
    const isOpenAddForm = ref(false);

    const onSubmit = () => {
      addTodo({
        title: title.value || '',
        completed: completed.value || false,
      });
      isOpenAddForm.value = false;
    };

    const onReset = () => {
      title.value = null;
      completed.value = false;
    };

    const openAddForm = () => {
      isOpenAddForm.value = true;
    };

    onMounted(() => {
      getTodos();
    });

    watch(title, (currentValue, oldValue) => {
      console.log(currentValue, oldValue);
    });

    return {
      todos,
      isFetching,
      title,
      completed,
      isOpenAddForm,
      openAddForm,
      onSubmit,
      onReset,
      deleteTodo,
      getTodosTotal,
    };
  },
});
</script>

<style lang="scss">
.box {
  padding: 40px
}
</style>
