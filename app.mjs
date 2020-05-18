import answersList from './answersList.mjs'
import cmsDraw from './cmsDraw.mjs'
import deviceDraw from './deviceDraw.mjs'

export default async () => {
  Vue.component('answers-list', answersList)
  Vue.component('cms-draw', cmsDraw)
  Vue.component('device-draw', deviceDraw)

  new Vue({
    el: '#app',
    render (h) {
      const { answers, src, radius } = this

      return h('div', {
        attrs: {
          id: 'app'
        }
      }, [
        h('answers-list', {
          props: {
            answers
          },
          on: {
            'update:answers': ($event) => {
              this.answers = $event
            }
          }
        }),
        h('div', {
          class: 'canvas'
        }, [
          h('cms-draw', {
            props: {
              answers,
              src,
              radius
            },
            on: {
              'update:answers': ($event) => {
                this.answers = $event
              }
            }
          }),
          h('device-draw', {
            props: {
              answers,
              src,
              radius
            }
          })
        ])
      ])
    },
    data: {
      radius: 30,
      src: 'https://image.shutterstock.com/image-illustration/netherlands-map-flag-shadow-on-260nw-692679472.jpg',
      answers: []
    }
  })
}
