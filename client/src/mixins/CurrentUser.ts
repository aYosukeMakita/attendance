import Vue from 'vue'

declare global {
  interface Window {
    userId: number
  }
}

export default Vue.extend({
  computed: {
    currentUserId(): number {
      return window.userId
    },
  },
})
