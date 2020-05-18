export default {
  render (h) {
    const { width, height } = this

    return h('div', [
      h('h3', 'cms'),
      h('canvas', {
        ref: 'cmsDraw',
        attrs: {
          width,
          height
        }
      })
    ])
  },

  props: {
    src: {
      type: String,
      required: true
    },
    answers: {
      type: Array,
      required: true
    },
    radius: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      width: 400,
      height: 400,
      el: null,
      img: new Image,
      answersSync: this.answers
    }
  },

  watch: {
    answers (answers) {
      this.answersSync = answers
      this.draw()
    }
  },

  mounted () {
    this.el = this.$refs['cmsDraw']
    this.loadImage()

    this.el.addEventListener('mousedown', this.handleClick)
  },

  computed: {
    ctx () {
      return this.el.getContext('2d')
    }
  },

  methods: {
    loadImage () {
      this.img.src = this.src

      this.img.onload = this.drawImage
    },
    drawVoid () {
      this.ctx.clearRect(0, 0, this.width, this.height)
    },
    drawImage () {
      this.ctx.drawImage(this.img, 0, 0, this.width, this.height)
    },
    draw () {
      this.drawVoid()
      this.drawImage()

      this.answersSync.forEach((answer) => {
        this.ctx.beginPath()
        this.ctx.arc(answer.x, answer.y, this.radius, 0, 2 * Math.PI)
        this.ctx.stroke()
      })
    },
    handleClick (event) {
      const rect = this.el.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      this.addAnswer({ x, y })
    },
    addAnswer ({ x, y }) {
      const answer = { x, y }

      this.answersSync.push(answer)

      this.$emit('update:answers', this.answersSync)
    }
  }
}
