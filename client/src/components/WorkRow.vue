<template>
  <v-row class="border-bottom" align="center">
    <div class="column-name text-center">{{ work.name }}</div>
    <div class="column-start text-center">{{ startedAtValue }}</div>
    <div class="column-end text-center">{{ finishedAtValue }}</div>
    <div class="column-location d-flex justify-center">
      <v-switch :input-value="work.atOffice" :label="atOfficeValue"></v-switch>
    </div>
    <div class="column-on-work d-flex justify-center">
      <v-switch :input-value="work.onWork" :label="onWorkValue"></v-switch>
    </div>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import dayjs from 'dayjs'
import { Work } from '@/store/types'

export default Vue.extend({
  name: 'WorkRow',

  props: {
    work: {
      type: Object as PropType<Work>,
      default: {
        name: '',
        startedAt: '',
        finishedAt: null,
        atOffice: false,
        onWork: false,
      },
      required: true,
    },
  },

  computed: {
    startedAtValue(): string {
      if (this.work.startedAt === null) {
        return '-'
      }
      const time = dayjs(this.work.startedAt)
      if (time.startOf('day').isSame(dayjs().startOf('day'))) {
        return time.format('HH:mm:ss')
      } else {
        return '-'
      }
    },
    finishedAtValue(): string {
      if (this.work.finishedAt === null) {
        return '-'
      }
      const time = dayjs(this.work.finishedAt)
      if (time.startOf('day').isSame(dayjs().startOf('day'))) {
        return time.format('HH:mm:ss')
      } else {
        return '-'
      }
    },
    atOfficeValue(): string {
      return this.work.atOffice ? '社内勤務　' : 'テレワーク'
    },
    onWorkValue(): string {
      return this.work.onWork ? '勤務中' : '休憩中'
    },
  },

  data: () => ({}),
})
</script>
