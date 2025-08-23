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

  projects !: boolean;

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
    const timeline = gsap.timeline({
      ease: 'power2.out',
      scrollTrigger: {
        scrub: 1
      },
    });


    timeline.to('#start', { opacity: 0, duration: 1 })
      .to('#aboutme', { opacity: 100, duration: 2 }, '-=0.08')
      .to('#aboutme', { opacity: 0, duration: 1 })
      .to('#projects', { opacity: 100, duration: 1, display: "block", pointerEvents: "auto", 
        onComplete:() =>{
        this.onComponentLeave("projects");
      }, 
      onReverseComplete:() =>{
         this.onComponentLeave("projects");
      } });
  }

  onComponent(idComponent: string) { 
    const component = document.getElementById(idComponent);
    console.log("onComponent: ", component, "pointer events: ", component?.style.pointerEvents);
    if(component){
      component.style.pointerEvents = 'auto';
      component.style.display = 'block';
    }
    
  }

  
  onComponentLeave(idComponent: string) { 
    const component = document.getElementById(idComponent);
    console.log("onComponentLeave: ", component, "pointer events: ", component?.style.pointerEvents);
    if(component){
      component.style.pointerEvents = 'none';
      component.style.display = 'none';
    }
    
  }



  projectsAnimate() {
    const tl = gsap.timeline({
      ease: 'power2.out',
      scrollTrigger: {
        scrub: 1,
        onEnter: () => {
          tl.set('#projects', { display: "block" });
        },
        onLeaveBack: () => {
          tl.set('#projects', { display: "none" });
        }
      },
    });



  }



}






