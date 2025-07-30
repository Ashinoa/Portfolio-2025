import {Component, ChangeDetectorRef } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/all';
import { Start } from "../../components/start/start";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [Start],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  isLoading = true;

  constructor(private cdr: ChangeDetectorRef) {}

  changeStateLoad(value: boolean){
    console.log("Cambio de valor isLoading");
    this.isLoading = value;
    this.cdr.detectChanges(); // fuerza a Angular a revisar los cambios después del cambio manual
  }

}

