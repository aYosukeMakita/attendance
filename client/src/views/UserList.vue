<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <a href="/users/sign-out">
        <v-icon>mdi-logout-variant</v-icon>
      </a>
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

          <div v-for="item in users" :key="item.id">
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
import { AxiosError } from 'axios'
import { RootState, User } from '@/store/types'
import UserRow from '@/components/UserRow.vue'

export default Vue.extend({
  name: 'UserList',

  components: {
    UserRow,
  },

  computed: {
    ...mapState({
      users(state: RootState): User[] {
        return state.users.users
      },
      error(state: RootState): AxiosError | null {
        return state.users.error
      },
    }),
  },

  watch: {
    error(err) {
      if (err && err.response && err.response.status === 401) {
        window.location.href = '/users/sign_in'
        return
      }
    },
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
</style>
