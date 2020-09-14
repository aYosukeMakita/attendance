<template>
  <v-row class="border-bottom" align="center">
    <div class="column-icon text-right">
      <v-icon large>mdi-ribbon</v-icon>
    </div>
    <div class="column-name text-center">{{ item.name }}</div>
    <div class="column-changes">
      {{ presenceText(item.oldPresence) }}<v-icon>mdi-arrow-right</v-icon> {{ presenceText(item.newPresence) }}
    </div>
    <div class="column-timestamp">{{ localCreatedAt }}</div>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import dayjs from 'dayjs'
import { History, Presence } from '@/store/types'

export default Vue.extend({
  name: 'HistoryRow',

  props: {
    item: {
      type: Object as PropType<History>,
      default: {
        name: '',
        userId: 0,
        oldPresence: 'finished' as Presence,
        newPresence: 'finished' as Presence,
        createdAt: '',
      },
      required: true,
    },
  },

  computed: {
    localCreatedAt() {
      return dayjs(this.item.createdAt).format('YYYY-MM-DD HH:mm:ss')
    },
  },

  methods: {
    presenceText(presence: Presence) {
      return presence === 'working' ? '勤務中' : presence === 'finished' ? '退勤　' : '休憩中'
    },
  },
})
</script>
<style>
.column-changes {
  width: 18rem;
}
.column-timestamp {
  width: 14rem;
}
</style>
