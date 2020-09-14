<template>
  <v-row class="border-bottom" align="center">
    <div class="column-icon text-right">
      <v-icon :color="userColor" large>mdi-account</v-icon>
    </div>
    <div class="column-name text-center">
      <router-link :to="`/users/${user.id}/histories`">
        {{ user.name }}
      </router-link>
    </div>
    <div class="column-toggle">
      <v-switch :input-value="attendant" :label="attendantText" @change="handleAttendantChange"></v-switch>
    </div>
    <div class="column-toggle">
      <v-switch
        :input-value="breakValue"
        :label="breakText"
        :disabled="!attendant"
        @change="handleBreakChange"
      ></v-switch>
    </div>
    <div class="column-toggle">
      <v-switch :input-value="user.atOffice" :label="atOfficeValue" @change="handleLocationChange"></v-switch>
    </div>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions } from 'vuex'
import { User, Presence } from '@/store/types'

export default Vue.extend({
  name: 'UserRow',

  props: {
    user: {
      type: Object as PropType<User>,
      default: {
        id: 0,
        name: '',
        presence: 'finished' as Presence,
        atOffice: false,
      },
      required: true,
    },
  },

  computed: {
    attendant(): boolean {
      return this.user.presence !== 'finished'
    },
    attendantText(): string {
      return this.attendant ? '勤務中' : '退勤　'
    },
    breakValue(): boolean {
      return this.user.presence === 'working'
    },
    breakText(): string {
      return this.attendant ? (this.breakValue ? '勤務中' : '休憩中') : '退勤　'
    },
    atOfficeValue(): string {
      return this.user.atOffice ? '社内勤務　' : 'テレワーク'
    },
    userColor(): string {
      return this.attendant ? (this.breakValue ? 'primary' : 'warning') : ''
    },
  },

  methods: {
    ...mapActions(['setUserPresence', 'setUserLocation']),

    handleAttendantChange(value: boolean) {
      this.setUserPresence({
        id: this.user.id,
        presence: value ? 'working' : 'finished',
      })
    },

    handleBreakChange(value: boolean) {
      this.setUserPresence({
        id: this.user.id,
        presence: value ? 'working' : 'break',
      })
    },

    handleLocationChange(value: boolean) {
      this.setUserLocation({
        id: this.user.id,
        atOffice: value,
      })
    },
  },
})
</script>
