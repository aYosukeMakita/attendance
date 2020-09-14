<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <router-link to="/">
        <v-icon>mdi-account-multiple</v-icon>
      </router-link>
      <v-icon class="ml-3" @click="dialog = true">mdi-trash-can-outline</v-icon>
    </v-app-bar>

    <v-main>
      <div v-for="history in histories" :key="history.newPresence + history.createdAt">
        <history-row :item="history" />
      </div>
    </v-main>

    <v-dialog v-model="dialog" max-width="290">
      <v-card class="pt-5">
        <v-card-text> ユーザーを削除してよろしいですか？ </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="dialog = false">
            いいえ
          </v-btn>

          <v-btn color="primary darken-1" text @click="handleDialogClick">
            はい
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    ...mapActions(['getUserHistories', 'deleteUser']),

    async handleDialogClick() {
      await this.deleteUser(this.userId).then(() => this.$router.push('/'))
      this.dialog = false
    },
  },
})
</script>
