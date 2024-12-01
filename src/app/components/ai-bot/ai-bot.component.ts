import { Component } from '@angular/core';

@Component({
  selector: 'app-ai-bot',
  template: `
    <mat-card class="ai-bot-card">
      <mat-card-header>
        <mat-card-title>AI BOT</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-form-field class="full-width">
          <input matInput #questionInput placeholder="Ask the AI BOT a question">
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="askBot(questionInput.value); questionInput.value = ''">Ask</button>
        <p *ngIf="botResponse">{{ botResponse }}</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .ai-bot-card {
      margin-top: 20px;
    }
    .full-width {
      width: 100%;
    }
    button {
      margin-top: 10px;
    }
    p {
      margin-top: 20px;
      padding: 10px;
      background-color: #f0f0f0;
      border-radius: 4px;
    }
  `]
})
export default class AiBotComponent {
  botResponse: string = '';

  askBot(question: string) {
    this.botResponse = `AI BOT: You asked "${question}". This is a simulated response.`;
  }
}

