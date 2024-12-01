import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignalService } from '../services/signal.service';
import { ChartDataService, CandleData } from '../services/chart-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent implements OnInit {
  botForm: FormGroup;
  symbols: string[] = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AAPL', 'GOOGL', 'MSFT'];
  timeframes: string[] = ['1m', '5m', '15m', '1h', '4h', '1d'];
  signal: string = '';
  chartData: CandleData[] = [];

  constructor(
    private fb: FormBuilder,
    private signalService: SignalService,
    private chartDataService: ChartDataService
  ) {
    this.botForm = this.fb.group({
      symbol: ['EUR/USD'],
      timeframe: ['15m'],
      confidence: [90]
    });
  }

  ngOnInit() {
    this.onSubmit();
  }

  onSubmit() {
    if (this.botForm.valid) {
      const { symbol, timeframe, confidence } = this.botForm.value;
      this.signalService.getSignal(symbol, timeframe, confidence).subscribe(
        signal => this.signal = signal
      );
      this.chartDataService.getChartData(symbol, timeframe).subscribe(
        data => this.chartData = data
      );
    }
  }
}

