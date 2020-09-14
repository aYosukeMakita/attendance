<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <router-link to="/">
        <v-icon>mdi-account-multiple</v-icon>
      </router-link>
    </v-app-bar>

    <v-main>
      <div class="d-flex flex-column">
        <div class="mt-5 col-4 offset-4">
          <v-text-field v-model="name" label="名前" hide-details="auto"></v-text-field>
          <v-btn class="mt-5" color="primary" rounded :disabled="buttonDisabled" @click="handleClick">追加</v-btn>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  name: 'UserAdd',

  data: () => ({
    name: '',
  }),

  computed: {
    buttonDisabled() {
      return this.name.length === 0
    },
  },

  methods: {
    ...mapActions(['addUser']),

    handleClick() {
      this.addUser(this.name).then(() => this.$router.push('/'))
    },
  },
})
</script>
