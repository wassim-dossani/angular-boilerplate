import { Component } from '@angular/core';

@Component({
  selector: 'app-ai-bot',
  templateUrl: './ai-bot.component.html',
  styleUrls: ['./ai-bot.component.css']
})
export default class AiBotComponent {
  botResponse: string = '';

  askBot(question: string) {
    this.botResponse = `AI BOT: You asked "${question}". This is a simulated response.`;
  }
}