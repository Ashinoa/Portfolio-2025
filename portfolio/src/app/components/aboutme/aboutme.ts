import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject, Component, OnInit } from '@angular/core';
import { gsap } from 'gsap/gsap-core';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-aboutme',
  imports: [],
  templateUrl: './aboutme.html',
  styleUrl: './aboutme.css'
})
export class Aboutme implements OnInit {


  private platformId = inject(PLATFORM_ID);


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.startAnimations();
      }, 0);
    }
  }

  startAnimations() {
    const tl = gsap.timeline({
      ease: 'power2.out',
      scrollTrigger: {
        scrub: 1,
      },
    });

    tl.to('#text-aboutme', { duration: 1, scale: 1, x: 0, y: 0, });

    const flyPath = gsap.timeline({ repeat: -1, yoyo: true });
    flyPath.to('#brujita', { x: 300, y: -30, duration: 2, ease: 'power1.inOut' })
            .to('#brujita', { x: 600, y: 100, duration: 3, ease: 'power1.inOut' })
            .to('#brujita', { x: 900, y: -30, duration: 2.5, ease: 'power1.inOut' })
            .to('#brujita', { x: 1500, y: 30, duration: 2.5, ease: 'power1.inOut' });
  }

}
