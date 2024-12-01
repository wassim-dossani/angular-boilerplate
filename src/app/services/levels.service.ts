import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LevelsService {
  getLevels(symbol: string): { support: number; resistance: number } {
    // This is a placeholder. Replace with actual calculation logic.
    const basePrice = this.getBasePrice(symbol);
    return {
      support: basePrice * 0.99,
      resistance: basePrice * 1.01
    };
  }

  private getBasePrice(symbol: string): number {
    // This is a mock implementation. Replace with actual price fetching logic.
    const prices: { [key: string]: number } = {
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
    return prices[symbol] || 100.00; // Default to 100 if symbol not found
  }
}

