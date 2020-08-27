import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['January', 'February', 'aasd'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20, 10]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}