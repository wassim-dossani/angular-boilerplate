import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-candlestick-chart',
  template: '<div class="chart-container"><canvas #chartCanvas></canvas></div>',
  styles: ['.chart-container { width: 100%; height: 400px; }']
})
export default class CandlestickChartComponent implements OnInit, OnChanges {
  @Input() data!: any[];
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef;
  chart?: Chart;

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.data.map(d => new Date(d.timestamp).toLocaleDateString()),
        datasets: [{
          label: 'Price',
          data: this.data.map(d => d.close),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    };
    this.chart = new Chart(ctx, config);
  }

  updateChart() {
    if (this.chart) {
      this.chart.data.labels = this.data.map(d => new Date(d.timestamp).toLocaleDateString());
      this.chart.data.datasets[0].data = this.data.map(d => d.close);
      this.chart.update();
    }
  }
}

