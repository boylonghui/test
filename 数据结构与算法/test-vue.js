Vue.component('test', {
    data() {
        return {
            a: 123
        }
    },
    template: `<div>{{ a }}</div>`
})

console.log(Vue.component)

new Vue({
    el: '#app'
})