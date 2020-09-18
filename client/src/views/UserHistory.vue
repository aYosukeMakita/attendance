<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <router-link class="mr-3" to="/">
        <v-icon>mdi-account-multiple</v-icon>
      </router-link>
      <a href="/users/sign-out">
        <v-icon>mdi-logout-variant</v-icon>
      </a>
    </v-app-bar>

    <v-main>
      <div class="d-flex justify-center">
        <div>
          <div class="my-5">
            TODO: ニックネーム編集
          </div>
          <div v-for="history in histories" :key="history.newPresence + history.time">
            <history-row :name="name" :item="history" />
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { RootState, History } from '@/store/types'
import HistoryRow from '@/components/HistoryRow.vue'

export default Vue.extend({
  name: 'UserHistory',

  components: {
    HistoryRow,
  },

  data: () => ({
    dialog: false,
  }),

  computed: {
    ...mapState({
      name(state: RootState): string {
        return state.histories.nickname || state.histories.username
      },
      histories(state: RootState): History[] {
        return state.histories.histories
      },
    }),

    userId(): number {
      return Number(this.$route.params.userId)
    },
  },

  mounted() {
    this.getUserHistories(this.userId)
  },

  methods: {
    ...mapActions(['getUserHistories']),
  },
})
</script>
