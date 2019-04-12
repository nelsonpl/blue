<template>
  <div class="list">
    <b-container fluid>
        <b-form class="m-1" inline>
          <b-input type="text" v-model="person.name" placeholder="Type your name..."></b-input>
          <b-input type="text" class="ml-1" v-model="person.fone" placeholder="Type your fone..."></b-input>
          <b-input type="text" class="ml-1" v-model="person.email" placeholder="Type your email..."></b-input>
          <b-button variant="primary" class="ml-1" @click="add()">Add</b-button>
        </b-form>
      <b-row class="m-1">
        <b-table striped hover :items="persons" :fields="fields">
          <template slot="index" slot-scope="data">
            {{ data.index + 1 }}
          </template>
          <template slot="actions" slot-scope="data">
            <b-button @click="del(data.Id)">Del</b-button>
          </template>
        </b-table>
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
      fields: [
        { key: 'index', label: '' }, 
        { key: 'name', label: 'Name' }, 
        { key: 'fone', label: 'Fone' }, 
        { key: 'email', label: 'e-mail' }, 
        { key: 'LocationGeo', label: 'Location Geo' },
        { key: 'actions', label: '' }],
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
