import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject, Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnInit {

  private platformId = inject(PLATFORM_ID);
 
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.animationsCards();

      }, 0);
    }

  }

  animationsCards() {
    const tl = gsap.timeline({
      ease: 'power2.out',
      scrollTrigger: {
        scrub: 1,
      onEnter: () => {
        const cards = document.querySelectorAll<HTMLImageElement>('#container-cards img');
        cards.forEach(card => {
          card.style.pointerEvents = 'auto';
          card.classList.add('hover-enabled');
        });
      },
      onLeaveBack: () => {
        const cards = document.querySelectorAll<HTMLImageElement>('#container-cards img');
        cards.forEach(card => {
          card.style.pointerEvents = 'none'; // los desactivo al volver arriba
          card.classList.remove('hover-enabled');
        });
      }
    },
  });

  tl.to('#container-cards', { opacity: 1, duration: 1 });
  tl.to('#container-cards', { y: 0, duration: 1 }, '<');
}


}
