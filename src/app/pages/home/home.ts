import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject, Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/all';
import { Start } from "../../components/start/start";
import { Aboutme } from "../../components/aboutme/aboutme";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [Start, Aboutme],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  private platformId = inject(PLATFORM_ID);

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
       this.cdr.detectChanges();
      setTimeout(() => {
        this.startAnimations();
      }, 0); //que espere a que Angular renderice el DOM
    }
  }


  startAnimations() {
    const timeline = gsap.timeline({
      ease: 'power2.out',
      scrollTrigger: {
        scrub: 1,
      },
    });

    timeline.to('#start', { opacity: 0, duration: 1})
            .to('#aboutme', { opacity: 100, duration: 1},'-=0.8');

  }
}



