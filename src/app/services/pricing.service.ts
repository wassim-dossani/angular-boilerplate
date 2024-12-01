import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PricingService {
  private prices: { [key: string]: BehaviorSubject<number> } = {};
  
  constructor() {
    this.initializePrices();
    this.startPriceUpdates();
  }
  
  private initializePrices() {
    const initialPrices: { [key: string]: number } = {
      'EUR/USD': 1.1850,
      'GBP/USD': 1.3750,
      'USD/JPY': 110.50,
      'AAPL': 145.50,
      'GOOGL': 2680.00,
      'MSFT': 285.00,
      'OTC1': 50.00,
      'OTC2': 75.00,
      'OTC3': 100.00
    };
    
    Object.keys(initialPrices).forEach(symbol => {
      this.prices[symbol] = new BehaviorSubject<number>(initialPrices[symbol]);
    });
  }
  
  private startPriceUpdates() {
    interval(1000).subscribe(() => {
      Object.keys(this.prices).forEach(symbol => {
        const currentPrice = this.prices[symbol].value;
        const change = (Math.random() - 0.5) * 0.002 * currentPrice;
        this.prices[symbol].next(currentPrice + change);
      });
    });
  }
  
  getPrice(symbol: string): number {
    return this.prices[symbol]?.value || 0;
  }
  
  getPriceUpdates(symbol: string) {
    return this.prices[symbol].asObservable();
  }
  
  getHistoricalPrices(symbol: string, timeframe: string): number[] {
    // This is a mock implementation. In a real scenario, you would fetch historical data from an API.
    const currentPrice = this.getPrice(symbol);
    const priceCount = this.getDataPointsForTimeframe(timeframe);
    return Array(priceCount).fill(0).map((_, i) => 
      currentPrice * (1 + (Math.random() - 0.5) * 0.01 * (i + 1))
    ).reverse();
  }
  
  private getDataPointsForTimeframe(timeframe: string): number {
    switch (timeframe) {
      case '1m': return 60;
      case '3m': return 180;
      case '5m': return 300;
      case '15m': return 900;
      case '30m': return 1800;
      case '1h': return 3600;
      case '4h': return 14400;
      case '1d': return 86400;
      default: return 100;
    }
  }
}

