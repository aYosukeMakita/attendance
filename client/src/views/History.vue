<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <router-link to="/">
        <v-icon>mdi-home</v-icon>
      </router-link>
    </v-app-bar>

    <v-main>
      <div v-for="user in users" :key="user.id">{{ user.id }}: {{ user.name }}</div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { RootState, User } from '@/store/types'

export default Vue.extend({
  name: 'History',

  computed: {
    ...mapState({
      users(state: RootState): User[] {
        return state.users.users
      },
    }),
  },

  mounted() {
    this.getUsers()
  },

  methods: {
    ...mapActions(['getUsers']),
  },
})
</script>
