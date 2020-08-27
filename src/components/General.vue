<template lang="html">
<section class="general">
    <h2>{{ $t("general.title")  }} </h2>

    <line-chart v-if="loaded" :chartdata="chartData" :options="chartOptions"></line-chart>
    <bar-chart />
</section>
</template>

<script lang="js">
import LineChart from './charts/LineChart.js'
import BarChart from './charts/BarChart.js'

export default {
    name: 'general',
    components: {
        LineChart,
        BarChart
    },
    props: [],
    mounted() {
        this.getLineChartData();
    },
    data() {
        return {
            loaded: false,
            chartData: {

                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'My First dataset',
                    data: [
                        10, 11, 123, 123, 12, 23, 13
                    ],
                    fill: true,
                }]

            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        getLineChartData() {
            this.loaded = false;
            // request data
            this.loaded = true;
        }
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
.general {}
</style>
