<template>
  <v-row class="border-bottom" align="center">
    <div class="column-icon text-right">
      <v-icon :color="userColor" large>mdi-account</v-icon>
    </div>
    <div class="column-name text-center">
      <router-link v-if="isCurrentUser" :to="`/users/${user.userId}/histories`">{{
        user.nickname || user.username
      }}</router-link>
      <span v-else>{{ user.nickname || user.username }}</span>
    </div>
    <div class="column-toggle">
      <v-switch
        :input-value="attendantValue"
        :label="attendantLabel"
        :disabled="!isCurrentUser"
        @change="handleAttendantChange"
      ></v-switch>
    </div>
    <div class="column-toggle">
      <v-switch
        :input-value="breakValue"
        :label="breakLabel"
        :disabled="!isCurrentUser || !attendantValue"
        @change="handleBreakChange"
      ></v-switch>
    </div>
    <div class="column-toggle">
      <v-switch
        :input-value="location"
        :label="locationLabel"
        :disabled="!isCurrentUser"
        @change="handleLocationChange"
      ></v-switch>
    </div>
  </v-row>
</template>

<script lang="ts">
import Vue, { VueConstructor, PropType } from 'vue'
import { mapActions } from 'vuex'
import { User, Presence, Location } from '@/store/types'
import CurrentUser from '@/mixins/CurrentUser'

type MixinVue = VueConstructor<Vue & InstanceType<typeof CurrentUser>>

export default (Vue as MixinVue).extend({
  name: 'UserRow',

  mixins: [CurrentUser],

  props: {
    user: {
      type: Object as PropType<User>,
      default: {
        userId: 0,
        username: '',
        nickname: null,
        presence: 'finished' as Presence,
        location: 'home' as Location,
      },
      required: true,
    },
  },

  computed: {
    isCurrentUser(): boolean {
      return this.user.userId === this.currentUserId
    },
    attendantValue(): boolean {
      return this.user.presence !== 'finished'
    },
    attendantLabel(): string {
      return this.attendantValue ? '勤務中' : '退勤　'
    },
    breakValue(): boolean {
      return this.user.presence === 'working'
    },
    breakLabel(): string {
      return this.attendantValue ? (this.breakValue ? '勤務中' : '休憩中') : '退勤　'
    },
    location(): boolean {
      return this.user.location === 'office'
    },
    locationLabel(): string {
      return this.user.location === 'office' ? '社内勤務　' : 'テレワーク'
    },
    userColor(): string {
      return this.attendantValue ? (this.breakValue ? 'primary' : 'warning') : ''
    },
  },

  methods: {
    ...mapActions(['setUserPresence', 'setUserLocation']),

    handleAttendantChange(value: boolean) {
      this.setUserPresence({
        userId: this.user.userId,
        presence: value ? 'working' : 'finished',
      })
    },

    handleBreakChange(value: boolean) {
      this.setUserPresence({
        userId: this.user.userId,
        presence: value ? 'working' : 'break',
      })
    },

    handleLocationChange(value: boolean) {
      this.setUserLocation({
        userId: this.user.userId,
        location: value ? 'office' : 'home',
      })
    },
  },
})
</script>
