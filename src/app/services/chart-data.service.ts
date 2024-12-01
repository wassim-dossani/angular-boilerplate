import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface CandleData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  private basePrice: { [key: string]: number } = {
    'EUR/USD': 1.1850,
    'GBP/USD': 1.3750,
    'USD/JPY': 110.50,
    'AAPL': 145.50,
    'GOOGL': 2680.00,
    'MSFT': 285.00
  };

  getChartData(symbol: string, timeframe: string): Observable<CandleData[]> {
    const data = this.generateChartData(symbol, timeframe);
    return of(data).pipe(delay(500)); // Simulate network delay
  }

  private generateChartData(symbol: string, timeframe: string): CandleData[] {
    const basePrice = this.basePrice[symbol] || 100;
    const candleCount = this.getCandleCountForTimeframe(timeframe);
    const volatility = 0.002; // 0.2% volatility

    const data: CandleData[] = [];
    let lastClose = basePrice;

    for (let i = 0; i < candleCount; i++) {
      const timestamp = Date.now() - (candleCount - i) * this.getTimeframeInMilliseconds(timeframe);
      const change = (Math.random() - 0.5) * 2 * volatility * lastClose;
      const open = lastClose;
      const close = open + change;
      const high = Math.max(open, close) * (1 + Math.random() * volatility);
      const low = Math.min(open, close) * (1 - Math.random() * volatility);

      data.push({ timestamp, open, high, low, close });
      lastClose = close;
    }

    return data;
  }

  private getCandleCountForTimeframe(timeframe: string): number {
    switch (timeframe) {
      case '1m': return 60;
      case '5m': return 60;
      case '15m': return 60;
      case '1h': return 24;
      case '4h': return 24;
      case '1d': return 30;
      default: return 60;
    }
  }

  private getTimeframeInMilliseconds(timeframe: string): number {
    switch (timeframe) {
      case '1m': return 60 * 1000;
      case '5m': return 5 * 60 * 1000;
      case '15m': return 15 * 60 * 1000;
      case '1h': return 60 * 60 * 1000;
      case '4h': return 4 * 60 * 60 * 1000;
      case '1d': return 24 * 60 * 60 * 1000;
      default: return 60 * 1000;
    }
  }
}

