import { PLATFORM_ID, Component, HostListener, OnInit, inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { debounceTime, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, OnDestroy {

  private platformId = inject(PLATFORM_ID);
  showMenuButton !: boolean;
  showHeader !: boolean;

  private resizeSubscription!: Subscription;

  constructor(private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.showHeader = true;
        this.showMenuButton = false;
        this.checkScreenWidth();

      }, 0);

      this.resizeSubscription = fromEvent(window, 'resize')
        .pipe(debounceTime(200)) // Espera 200ms después de que se deje de redimensionar
        .subscribe(() => {
          this.checkScreenWidth();
        });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.resizeSubscription?.unsubscribe();
    }
  }

 

  checkScreenWidth() {
    if (window.innerWidth <= 767.5 || window.innerHeight <= 600) {
      this.showMenuButton = true;
      this.showHeader = false;
      console.log("ShowHeader: ", this.showHeader);
      console.log("ShowMenuGatito: ", this.showMenuButton);
    } 
  }

  toggleSidebar() {
    this.showHeader = true;
    this.showMenuButton = false;
    console.log("Click en gatito menu")
    console.log("ShowHeader: ", this.showHeader);
    console.log("ShowMenuGatito: ", this.showMenuButton);
    this.cdr.detectChanges();
  }



}
