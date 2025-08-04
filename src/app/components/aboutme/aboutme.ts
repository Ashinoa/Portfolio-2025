import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject, Component, OnInit } from '@angular/core';
import { gsap } from 'gsap/gsap-core';
import { ScrollTrigger } from 'gsap/all';
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrambleTextPlugin);

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
    
    tl.to('#text-aboutme', { duration: 2, scale: 1, x: 0, y: 0 })
      .to('#brujita', { zIndex: 11 })
      .to('#container-description', { y: 150, duration: 1 })
      .to('#text-description', {
        duration: 2,
        scrambleText: {
          text: "{original}",
          chars: "^(?=.*[a-zñÑ])(?=.*[A-ZÑñ])(?=.*\d)[a-zA-Z0-9ñÑ]*$",
          revealDelay: 1,
          speed: 0.8
        }
      }, '<');


    const flyPath = gsap.timeline({ repeat: -1, yoyo: true });
    flyPath.to('#brujita', { x: 300, y: -30, duration: 2, ease: 'power1.inOut' })
      .to('#brujita', { x: 600, y: 100, duration: 3, ease: 'power1.inOut' })
      .to('#brujita', { x: 900, y: -30, duration: 2.5, ease: 'power1.inOut' })
      .to('#brujita', { x: 1500, y: 30, duration: 2.5, ease: 'power1.inOut' });
  }

}
