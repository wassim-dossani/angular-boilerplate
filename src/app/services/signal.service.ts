import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartDataService, CandleData } from './chart-data.service';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  constructor(private chartDataService: ChartDataService) {}

  getSignal(symbol: string, timeframe: string, confidence: number): Observable<string> {
    return this.chartDataService.getChartData(symbol, timeframe).pipe(
      map(data => this.analyzeData(data, confidence, symbol, timeframe))
    );
  }

  private analyzeData(data: CandleData[], confidence: number, symbol: string, timeframe: string): string {
    const closes = data.map(candle => candle.close);
    const sma = this.calculateSMA(closes, 14);
    const rsi = this.calculateRSI(closes, 14);
    const currentPrice = closes[closes.length - 1];

    let signal = '';
    if (currentPrice > sma && rsi < 70) {
      signal = 'BUY';
    } else if (currentPrice < sma && rsi > 30) {
      signal = 'SELL';
    } else {
      signal = 'HOLD';
    }

    // Adjust signal based on confidence level
    const randomFactor = Math.random() * 100;
    if (randomFactor > confidence) {
      signal = 'HOLD'; // Override signal if confidence threshold is not met
    }

    return `${signal} ${symbol} (${timeframe}, ${confidence}% confidence)`;
  }

  private calculateSMA(prices: number[], period: number): number {
    const sum = prices.slice(-period).reduce((a, b) => a + b, 0);
    return sum / period;
  }

  private calculateRSI(prices: number[], period: number): number {
    const changes = prices.slice(-period - 1).map((price, index, arr) => 
      index > 0 ? price - arr[index - 1] : 0
    ).slice(1);

    const gains = changes.filter(change => change > 0);
    const losses = changes.filter(change => change < 0).map(loss => -loss);

    const avgGain = gains.reduce((sum, gain) => sum + gain, 0) / period;
    const avgLoss = losses.reduce((sum, loss) => sum + loss, 0) / period;

    if (avgLoss === 0) return 100;

    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }
}

