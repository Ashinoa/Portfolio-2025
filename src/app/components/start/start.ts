import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject, Component, OnInit } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-start',
  imports: [],
  templateUrl: './start.html',
  styleUrl: './start.css'
})
export class Start implements OnInit {

  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
          this.startAnimations();
        },0);
    }

  }

  startAnimations() {
    const tl = gsap.timeline({
      ease: 'power2.out',
      scrollTrigger: {
        scrub: 1,
      },
    });

    tl.to('#picture-id', { duration: 2, scale: 15 })
      .to('#container-font', { opacity: 0, duration: 2 }, '<');
  }

}