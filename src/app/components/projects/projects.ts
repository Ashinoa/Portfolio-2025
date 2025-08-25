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

  showDimaia: boolean = false;
  showPortfolio: boolean = false;
  showRefri: boolean = false;

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
        scrub: 1
      }
    });

    tl.to('#container-cards', { y: 0,  duration: 1})
      .to('#container-cards img', { opacity: 1, duration: 1},'<')
      .to('#container-cards img', {duration: 2 })
      .to('#container-cards', { y: 200, opacity: 0, duration: 1});
  }


  showDescription(name: string): void {
    if (name == 'diamia') {
      this.showDimaia = true;

    } else if (name == 'portfolio') {
      this.showPortfolio = true;

    } else {
      this.showRefri = true;
    }
  }

  closePopup(name: string): void {
    if (name == 'diamia') {
      this.showDimaia = false;

    } else if (name == 'portfolio') {
      this.showPortfolio = false;

    } else {
      this.showRefri = false;
    }
  }


}
