import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.animationsCards();

      }, 0);
    }

  }

  animationsCards() {
    const dimaia = document.getElementById('dimaia');
    const portfolio = document.getElementById('portfolio');
    const refri = document.getElementById('refri');
    let tl = gsap.timeline({
      ease: 'power2.out',
      scrollTrigger: {
        scrub: 1,

      }, onStart: () => {
        if (dimaia && portfolio && refri) {
          dimaia.classList.add('none-events');
          portfolio.classList.add('none-events');
          refri.classList.add('none-events');
          console.log("No se puede tocar las cartas");

        }
      }
    });


    tl.to('#container-cards', { y: 0, duration: 1 })
      .to('#container-cards img', {
        opacity: 1, duration: 1, onComplete: () => {
          if (dimaia && portfolio && refri) {
            dimaia.classList.remove('none-events');
            portfolio.classList.remove('none-events');
            refri.classList.remove('none-events');
            console.log("Se puede tocar las cartas");

          }
        }
      }, '<')
      .to('#container-cards img', {
        duration: 2, onComplete: () => {
          if (dimaia && portfolio && refri) {
            dimaia.classList.add('none-events');
            portfolio.classList.add('none-events');
            refri.classList.add('none-events');
            console.log("No se puede tocar las cartas");

          }
        }, onReverseComplete: () => {
          if (dimaia && portfolio && refri) {
            dimaia.classList.add('none-events');
            portfolio.classList.add('none-events');
            refri.classList.add('none-events');
            console.log("No se puede tocar las cartas");

          }

        }
      })
      .to('#container-cards', {
        y: 200, opacity: 0, duration: 1, onReverseComplete: () => {
          if (dimaia && portfolio && refri) {
            dimaia.classList.remove('none-events');
            portfolio.classList.remove('none-events');
            refri.classList.remove('none-events');
            console.log("Se puede tocar las cartas");

          }

        }
      });
  }


  showDescription(name: string): void {
    this.showDimaia = this.showPortfolio = this.showRefri = false; // PARA QUE NO SE SOLAPEN LOS POPUP
    if (name == 'dimaia') {
      this.showDimaia = true;

    } else if (name == 'portfolio') {
      this.showPortfolio = true;

    } else if (name == 'refri') {
      this.showRefri = true;
    }

    this.cdr.detectChanges();

    // fuerza GSAP a recalcular inmediatamente
    setTimeout(() => ScrollTrigger.refresh(), 0);
  }

  closePopup(name: string): void {
    if (name == 'dimaia') {
      this.showDimaia = false;

    } else if (name == 'portfolio') {
      this.showPortfolio = false;

    } else if (name == 'refri') {
      this.showRefri = false;
    }
    this.cdr.detectChanges();

    // fuerza GSAP a recalcular inmediatamente
    setTimeout(() => ScrollTrigger.refresh(), 0);
  }


}
