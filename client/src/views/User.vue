<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <router-link to="users">
        <v-icon>mdi-account-multiple</v-icon>
      </router-link>
    </v-app-bar>

    <v-main>
      <div class="d-flex justify-center">
        <div>
          <v-row class="border-bottom py-5">
            <div class="column-icon"></div>
            <div class="column-name text-center">名前</div>
            <div class="column-toggle text-center">状態</div>
            <div class="column-toggle text-center">休憩</div>
            <div class="column-toggle text-center">勤務場所</div>
          </v-row>

          <div v-for="item in users" :key="item.name">
            <user-row :user="item" />
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { RootState, User } from '@/store/types'
import UserRow from '@/components/UserRow.vue'

export default Vue.extend({
  name: 'User',

  components: {
    UserRow,
  },

  computed: {
    ...mapState({
      users(state: RootState): User[] {
        return state.users.users
      },
    }),
  },

  async mounted() {
    await this.getUsers()
  },

  methods: {
    ...mapActions(['getUsers']),
  },
})
</script>

<style>
.column-container {
  width: 52rem;
}
.border-bottom {
  border-bottom: solid 1px silver;
}
.column-icon {
  width: 3rem;
}
.column-name {
  width: 12rem;
}
.column-toggle {
  width: 10rem;
  display: flex;
  justify-content: center;
}
</style>
