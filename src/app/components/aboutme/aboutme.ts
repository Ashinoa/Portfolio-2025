import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject, Component, OnInit, OnDestroy } from '@angular/core';
import { gsap } from 'gsap/gsap-core';
import { ScrollTrigger } from 'gsap/all';
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { CommonModule } from '@angular/common';
import { debounceTime, fromEvent, Subscription } from 'rxjs';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrambleTextPlugin);

@Component({
  selector: 'app-aboutme',
  imports: [CommonModule],
  templateUrl: './aboutme.html',
  styleUrl: './aboutme.css'
})
export class Aboutme implements OnInit, OnDestroy {

  private viewportWidth!: any;
  private viewportHeight!: any;
  private platformId = inject(PLATFORM_ID);
  private resizeSubscription!: Subscription;
  viewportY!: any;
  private flyPath!: gsap.core.Timeline;



  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.defineViewports();
      setTimeout(() => {
        this.startAnimationsAboutMe();
        this.animationsWitch(this.viewportWidth, this.viewportHeight);
      }, 0);

      this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(200)) // Espera 200ms después de que se deje de redimensionar
      .subscribe(() => {
        this.defineViewports(); // Actualiza medidas
        this.animationsWitch(this.viewportWidth, this.viewportHeight); // Reinicia animación adaptada
      });

    }
  }

  defineViewports() {
    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;
    this.viewportY = (window.innerHeight * 100) / 100;
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.resizeSubscription?.unsubscribe();
      this.flyPath?.kill(); //  Detenemos la animación si está activa
    }
  }

  animationsWitch(widthScreen: any, heightScreen: any) {
    if (this.flyPath) {
      this.flyPath.kill(); // Evita animaciones duplicadas o errores al redimensionar
      this.flyPath = null!;
    }

    gsap.set('#brujita',{x: 0, y: 0});

    this.flyPath = gsap.timeline({ repeat: -1, yoyo: true });

    if (widthScreen !== null && heightScreen !== null && widthScreen >= 700) {
      this.flyPath.to('#brujita', {
        x: (widthScreen * 25) / 100, y: -(heightScreen * 5) / 100, duration: 2, ease: 'power1.inOut'})
        .to('#brujita', {
          x: (widthScreen * 50) / 100, y: (heightScreen * 10) / 100, duration: 3, ease: 'power1.inOut'})
        .to('#brujita', {
          x: (widthScreen * 75) / 100, y: -(heightScreen * 5) / 100, duration: 2.5, ease: 'power1.inOut'})
        .to('#brujita', {
          x: (widthScreen * 90) / 100, y: (heightScreen * 10) / 100, duration: 2.5, ease: 'power1.inOut'});

    } else if (widthScreen !== null && heightScreen !== null && widthScreen < 700) {
      this.flyPath.to('#brujita', {
        x: (widthScreen * 25) / 100, y: -(heightScreen * 2) / 100, duration: 2, ease: 'power1.inOut'})
        .to('#brujita', {
          x: (widthScreen * 50) / 100, y: (heightScreen * 5) / 100, duration: 3, ease: 'power1.inOut' })
        .to('#brujita', {
          x: (widthScreen * 90) / 100, y: -(heightScreen * 2) / 100, duration: 2.5, ease: 'power1.inOut'})
    } else {
      console.log("WidthScreen es Null o HeightScreen es null");
    }
  }

  startAnimationsAboutMe() {
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
        duration: 1,
        scrambleText: {
          text: "{original}",
          chars: "^(?=.*[a-zñÑ])(?=.*[A-ZÑñ])(?=.*\d)[a-zA-Z0-9ñÑ]*$",
          revealDelay: 0.9,
          speed: 0.8
        }
      }, '<');
  }

}
