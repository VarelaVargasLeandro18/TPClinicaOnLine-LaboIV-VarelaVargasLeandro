import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input() color : string = "";
  private defaultColor : string = "rgb(230, 230, 230)";
  private previousColor : string = "";

  constructor(
    private el : ElementRef
  ) {
    this.previousColor = this.el.nativeElement.style.backgroundColor;
  }

  @HostListener('click')
  onClick () {
    this.setBg( this.color || this.defaultColor );
  }

  @HostListener('blur')
  onBlur() {
    this.setBg( this.previousColor );
  }

  private setBg( bg : string ) {
    this.el.nativeElement.style.backgroundColor = bg;
  }

}
