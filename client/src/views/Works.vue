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
            <div class="column-name text-center">名前</div>
            <div class="column-start text-center">開始時刻</div>
            <div class="column-end text-center">終了時刻</div>
            <div class="column-location text-center">勤務場所</div>
            <div class="column-on-work text-center">休憩</div>
          </v-row>

          <div v-for="item in works" :key="item.name">
            <work-row :work="item" />
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { RootState, Work } from '@/store/types'
import WorkRow from '@/components/WorkRow.vue'

export default Vue.extend({
  name: 'Works',

  components: {
    WorkRow,
  },

  computed: {
    ...mapState({
      works(state: RootState): Work[] {
        return state.works.works
      },
    }),
  },

  async mounted() {
    await this.getWorks()
  },

  methods: {
    ...mapActions(['getWorks']),
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
.column-name {
  width: 12rem;
}
.column-start {
  width: 8rem;
}
.column-end {
  width: 8rem;
}
.column-location {
  width: 12rem;
}
.column-on-work {
  width: 12rem;
}
</style>
