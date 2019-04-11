<template>
  <div class="list">
    <b-container fluid>
      <b-row class="mt-1 ml-1">
        <div>
          <input type="text" v-model="person.name" placeholder="Type your name...">
          <input type="text" v-model="person.fone" placeholder="Type your fone...">
          <input type="text" v-model="person.email" placeholder="Type your email...">
          <input type="button" value="Add" @click="add()">
        </div>
        <div>
          <div v-for="item in persons" :key="item.id">
            <div>
              <strong>ID:</strong>
              <span>{{item.id}}</span>
              <strong>Name:</strong>
              <span>{{item.name}}</span>
              <strong>Fone:</strong>
              <span>{{item.fone}}</span>
              <strong>e-mail:</strong>
              <span>{{item.email}}</span>
              <strong>LocationGeo:</strong>
              <span>{{item.locationGeo}}</span>
              <input type="button" value="Delete" @click="del(item.id)">
            </div>
          </div>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import api from "../api";

export default {
  name: "list",
  data() {
    return {
      person: { name: "", fone: "", email: "", locationGeo: {} },
      persons: []
    };
  },
  created() {
    var self = this;
    this.list = api.getAll(person => {
      if (self.persons.length) {
        var isAdd = false;
        self.persons.forEach((item, index) => {
          if (item.id === person.id) {
            isAdd = true;
            item.name = person.name;
            item.fone = person.fone;
            item.email = person.email;
            item.locationGeo = person.locationGeo;
          }
        });
        if (!isAdd) self.persons.push(person);
      } else {
        self.persons.push(person);
      }
    });
  },
  methods: {
    add() {
      api.post(this.person);
    },
    del(id) {
      api.del(id);
    }
  }
};
</script>

<style>
</style>
