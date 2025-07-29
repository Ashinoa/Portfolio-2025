import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject, Component, OnInit } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  isLoading = true;
  imageBackgorund: string = '';
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      const img = new Image(); // Creamos una imagen en memoria
      img.src = '/img/InicioRecortada.png';
      this.imageBackgorund = img.src; //asigno la imagen precargada a la variable global (la del html)

      if (this.imageBackgorund !== null && this.imageBackgorund !== '') {
        this.isLoading = false;
        setTimeout(() => {
          this.startAnimations();
        },0); //que espere 100milisegundos a que Angular renderice el DOM


      } else {
        console.log("Error al cargar Imagen Back", this.imageBackgorund);
      }
    }

  }


  startAnimations() {
    const tl = gsap.timeline({
      ease: 'power2.out',
      scrollTrigger: {
        scrub: 1,
      },
    });

    tl.to('#picture-id', { duration: 1, scale: 15 })
      .to('#container-font', { opacity: 0 }, '<');
  }

}
