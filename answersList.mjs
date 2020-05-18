export default {
  render (h) {
    return h('ul', {
      class: 'the-list',
    }, this.answersSync.map((answer, index) => {
      return h('li', {
        class: 'cursor-pointer',
        on: {
          click: () => {
            this.removeAnswer(index)
          }
        }
      }, `x: ${answer.x}; y: ${answer.y}`)
    }))
  },

  props: {
    answers: {
      type: Array,
      required: true
    }
  },

  watch: {
    answers (answers) {
      this.answersSync = answers
    }
  },

  data () {
    return {
      answersSync: this.answers
    }
  },

  methods: {
    removeAnswer (index) {
      const answers = [ ...this.answersSync ]

      answers.splice(index, 1)

      this.answersSync = answers

      this.$emit('update:answers', this.answersSync)
    }
  }
}
