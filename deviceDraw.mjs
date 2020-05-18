export default {
  render (h) {
    const { width, height } = this

    return h('div', [
      h('h3', 'device'),
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
      img: new Image
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
    drawImage () {
      this.ctx.drawImage(this.img, 0, 0, this.width, this.height)
    },
    handleClick (event) {
      const rect = this.el.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      this.verifyAnswer({ x, y })
    },
    verifyAnswer (givenAnswer) {
      let matches = []

      this.answers.forEach((answer) => {
        const hit = Math.sqrt((givenAnswer.x - answer.x) ** 2 + (givenAnswer.y - answer.y) ** 2) < this.radius

        if (hit) {
          matches.push(answer)
        }
      })

      alert(matches.length > 0 ? 'you hit the right spot' : 'not here. try again')

      console.log({ matches })
    }
  }
}
