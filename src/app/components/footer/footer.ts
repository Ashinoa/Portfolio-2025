import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  private platformId = inject(PLATFORM_ID);

  constructor(private router: Router) { }

  goTo(page: string): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        if (page === 'github') {
          window.location.href = 'https://github.com/Ashinoa'; // O utiliza this.router.navigate si estás manejando rutas internas de Angular
        } else if (page === 'linkedin') {
          window.location.href = 'https://www.linkedin.com/in/guadalupe-arroyo-610593267/';
        } else {
          window.location.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=guadalupenicolearroyo@gmail.com';
        }
      }, 0);
    }
  }

}
