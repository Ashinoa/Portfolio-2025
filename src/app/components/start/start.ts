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
      /*const img = new Image(); // Creamos una imagen en memoria
      img.src = '/img/InicioRecortada.png';
      this.imageBackgorund = img.src; //asigno la imagen precargada a la variable global (la del html)

      if (this.imageBackgorund !== null && this.imageBackgorund !== '') {
        console.log("isLoading antes del cambio ", this.isLoading);
        this.isLoadingChange.emit(false);
        console.log("isLoading despues del cambio ", this.isLoading);
        setTimeout(() => {
          this.startAnimations();
        },0); //que espere a que Angular renderice el DOM

      } else {
        console.log("Error al cargar Imagen Back", this.imageBackgorund);
      }*/
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