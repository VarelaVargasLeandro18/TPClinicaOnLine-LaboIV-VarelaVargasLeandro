import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBoldtext]'
})
export class BoldtextDirective {

  constructor( private el : ElementRef ) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.makeBold();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.makeNormal();
  }

  private makeBold() {
    this.el.nativeElement.style.fontWeight = "bold";
  }

  private makeNormal() {
    this.el.nativeElement.style.fontWeight = "normal";
  }

}
