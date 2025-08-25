import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject, Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/all';
import { Start } from "../../components/start/start";
import { Aboutme } from "../../components/aboutme/aboutme";
import { Projects } from '../../components/projects/projects';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [Start, Aboutme, Projects],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {

  private platformId = inject(PLATFORM_ID);

  projects: boolean = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cdr.detectChanges();
      setTimeout(() => {
        const component = document.getElementById('projects');
          console.log("onComponent: ", component, "pointer events: ", component?.style.pointerEvents);
          if (component) {
            component.style.pointerEvents = 'none';
            component.style.cursor = 'not-allowed';
          }
        this.startAnimations();

      }, 0); //que espere a que Angular renderice el DOM
    }
  }


  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  startAnimations() {
    const timeline = gsap.timeline({
      ease: 'power3.out',
      scrollTrigger: {
        scrub: 1,
        onEnter: () => {
          const component = document.getElementById('projects');
          if (component) {
            component.style.pointerEvents = 'none';
            component.style.cursor = 'not-allowed';
          }
        }
        
      },
    });


    timeline.to('#start', { opacity: 0, duration: 1 })
      .to('#aboutme', { opacity: 100, duration: 1 }, '-=0.08')
      .to('#aboutme', { opacity: 0, duration: 1 })
      .to('#projects', {opacity: 100, duration: 1, pointerEvents: 'auto', cursor: 'auto', 
        onComplete: () => {
          const component = document.getElementById('projects');
          console.log("onComponent: ", component, "pointer events: ", component?.style.pointerEvents);
          if (component) {
            component.style.pointerEvents = 'none';
            component.style.cursor = 'not-allowed';
          }
        }, onReverseComplete: ()=>{
           const component = document.getElementById('projects');
          console.log("onComponent: ", component, "pointer events: ", component?.style.pointerEvents);
          if (component) {
            component.style.pointerEvents = 'none';
            component.style.cursor = 'not-allowed';
          }
        }
      });
  }

  onComponent(idComponent: string) {
    const component = document.getElementById(idComponent);
    console.log("onComponent: ", component, "pointer events: ", component?.style.pointerEvents);
    if (component) {
      component.style.pointerEvents = 'auto';
    }

  }


  onComponentLeave(idComponent: string) {
    const component = document.getElementById(idComponent);
    console.log("onComponentLeave: ", component, "pointer events: ", component?.style.pointerEvents);
    if (component) {
      component.style.pointerEvents = 'none';
    }

  }





}






