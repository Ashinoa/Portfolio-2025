import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject, Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/all';
import { Start } from "../../components/start/start";
import { Aboutme } from "../../components/aboutme/aboutme";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [Start, Aboutme, Header, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {

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


  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }


  startAnimations() {
    let timeline = gsap.timeline({
      ease: 'none',
      scrollTrigger: {
        scrub: 1,
       
      },
    });


    timeline.to('#start', { opacity: 0, duration: 1 })
            .to('#aboutme', { opacity: 100, duration: 1 }, '-=0.08');
     
  }


}






