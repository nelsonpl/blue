<template>
  <div class="list">
      <b-modal id="modal" @ok="handleOk" title="Task">
        <b-input type="text" class="mb-2" v-model="taskModal.title"  required placeholder="Type your title..."></b-input>
        <b-textarea type="text" class="mb-2" v-model="taskModal.description" placeholder="Type your description..."></b-textarea>
        <b-input type="date" class="mb-2" v-model="taskModal.dueDate" placeholder="Type your dueDate..."></b-input>
        <b-input type="text" v-model="taskModal.tag" placeholder="Type your tag..."></b-input>
      </b-modal>

    <b-container>

      <b-row align-h="end" class="m-1">
        <b-button v-b-modal.modal variant="success" @click="modalEdit()">Add</b-button>
      </b-row>

      <b-row class="m-1">
        <b-table striped hover :items="tasks" :fields="fields">
          <template slot="index" slot-scope="data">
            {{ data.index + 1 }}
          </template>
          <template slot="actions" slot-scope="data">
            <b-button variant="danger" @click="del(data.item.id)">Del</b-button>
            <b-button variant="primary" v-b-modal.modal @click="modalEdit(data.item)">Edit</b-button>
          </template>
        </b-table>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import api from "../api";

export default {
  description: "list",
  data() {
    return {
      fields: [
        { key: 'index', label: '' }, 
        { key: 'title', label: 'Title' }, 
        { key: 'description', label: 'Description' }, 
        { key: 'dueDate', label: 'Due Date' }, 
        { key: 'tag', label: 'Tag' }, 
        { key: 'actions', label: '' }],
      tasks: [],
      taskModal: { title:"", description: "", dueDate: "", tag: ""}
    };
  },
  created() {
    var self = this;
    this.list = api.getAll(task => {
      if (self.tasks.length) {
        var isAdd = false;
        self.tasks.forEach((item, index) => {
          if (item.id === task.id) {
            isAdd = true;
            item.title = task.title;
            item.description = task.description;
            item.dueDate = task.dueDate;
            item.tag = task.tag;
          }
        });
        if (!isAdd) self.tasks.push(task);
      } else {
        self.tasks.push(task);
      }
    });
  },
  methods: {
    del(id) {
      var self = this;
      api.del(id)
        .catch((reason)=>{
        })
        .then((value) => {
          for(var i = 0;i < self.tasks.length; i++){
            var item = self.tasks[i];
            if(item.id == id){
              self.tasks.splice(i, 1);
              break;
            }
          }
        }, (reason) => {
        })
        .finally(()=>{
        });
    },
    modalEdit(task){
      if(task)
      {
        this.taskModal.id = task.id;
        this.taskModal.title = task.title;
        this.taskModal.description = task.description;
        this.taskModal.dueDate = task.dueDate;
        this.taskModal.tag = task.tag;
      }
      else {
        this.taskModal.id = null;
        this.taskModal.title = "";
        this.taskModal.description = "";
        this.taskModal.dueDate = "";
        this.taskModal.tag = "";
      }
    },
    handleOk(bvModalEvt){
     api.post(this.taskModal);
    }
  }
};
</script>

<style>
</style>
