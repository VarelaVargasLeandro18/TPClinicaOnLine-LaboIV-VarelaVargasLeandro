import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appGrowText]'
})
export class GrowTextDirective {

  private previousSize : string = "";

  constructor(
    private el : ElementRef
  ) {
    this.previousSize = this.el.nativeElement.style.fontSize;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.setXXXLarge();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.setInitial();
  }

  private setInitial() {
    this.setFontSize( this.previousSize );
  }

  private setXXXLarge() {
    this.setFontSize( "large" );
  }
  
  private setFontSize( fontSize : string ) {
    this.el.nativeElement.style.fontSize = fontSize;
  }

}
