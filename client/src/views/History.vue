<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <router-link to="/">
        <v-icon>mdi-account-multiple</v-icon>
      </router-link>
    </v-app-bar>

    <v-main>
      <div class="text-h4 ma-3">履歴</div>
      <div v-for="history in histories" :key="history.newPresence + history.createdAt">
        <history-row :item="history" />
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
  name: 'History',

  components: {
    HistoryRow,
  },

  computed: {
    ...mapState({
      histories(state: RootState): History[] {
        return state.histories.histories
      },
    }),
  },

  mounted() {
    this.getHistories()
  },

  methods: {
    ...mapActions(['getHistories']),
  },
})
</script>
