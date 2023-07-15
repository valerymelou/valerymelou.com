import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@vmelou/shared/ui';

@Component({
  selector: 'blog-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('bubblesContainer') private bubblesContainer!: ElementRef;
  private numberOfBubbles = 100;
  private bubbleLifetime = 20;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.bubblesContainer) {
      for (let i = 0; i < this.numberOfBubbles; i++) {
        const bubble = this.createBubble();
        this.bubblesContainer.nativeElement.appendChild(bubble);
      }
    }
  }

  private createBubble(): HTMLElement {
    const container = this.renderer.createElement('div') as HTMLElement;
    container.classList.add('bubble-container');
    container.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
    container.appendChild(this.createCircle());

    return container;
  }

  private createCircle(): HTMLElement {
    const circle = this.renderer.createElement('div') as HTMLElement;
    circle.classList.add('bubble', 'bg-accent-base');
    circle.style.animationDelay = `${Math.random() * this.bubbleLifetime}s`;
    const radius = `${5 + Math.floor(Math.random() * 5)}px`;
    circle.style.width = radius;
    circle.style.height = radius;

    return circle;
  }
}
