<template>
  <v-row class="border-bottom" align="center">
    <div class="column-name text-center py-2">{{ name }}</div>
    <div class="column-changes">
      {{ presenceText(item.oldPresence) }}
      <v-icon>mdi-arrow-right</v-icon>
      {{ presenceText(item.newPresence) }}
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
    name: {
      type: String,
      default: '',
      required: true,
    },
    item: {
      type: Object as PropType<History>,
      default: {
        newPresence: 'finished' as Presence,
        oldPresence: 'finished' as Presence,
        time: '',
      },
      required: true,
    },
  },

  computed: {
    localCreatedAt() {
      return dayjs(this.item.time).format('YYYY-MM-DD HH:mm:ss')
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
  width: 14rem;
}
.column-timestamp {
  width: 14rem;
}
</style>
