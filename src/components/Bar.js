import { Bar, mixins } from 'vue-chartjs'

export default {
    mixins: [mixins.reactiveProp],
    extends: Bar,
    props: {
        data: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
    },
    mounted () {
        this.renderChart(this.data, this.options)
    }
}