import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {
  private _color: string = 'red';
  private htmlElement?: ElementRef<HTMLElement>;
  private _errors?: ValidationErrors | null;

  @Input() set color(value: string){
    this._color=value;
    this.setStyle();
    //console.log({color: value})
  }

  @Input() set errors(value: ValidationErrors | null | undefined){
    this._errors = value;
    this.setErrorMessage();
    //console.log(value)
  }

  constructor(private element: ElementRef<HTMLElement>) {
    this.htmlElement = element;
  }

  ngOnInit(): void {
    this.setStyle();
  }

  setStyle(): void{
    if(!this.htmlElement) return;

    this.htmlElement!.nativeElement.style.color = this._color
  }

  setErrorMessage(): void{
    if(!this.htmlElement) return;
    if(!this._errors){
      this.htmlElement.nativeElement.innerText = 'OK';
      this.setColor('green');
      return;
    }

    const errors = Object.keys(this._errors);
    if(errors.includes('required')){
      this.htmlElement.nativeElement.innerText = 'This field is required';
      this.setColor('red');
      return;
    }

    if(errors.includes('minlength')){
      this.htmlElement.nativeElement.innerText = 'At least 6 characters';
      this.setColor('red');
      return;
    }

    if(errors.includes('email')){
      this.htmlElement.nativeElement.innerText = 'email@example format required';
      this.setColor('red');
      return;
    }
  }

  setColor(color: string): void{
    this._color = color;
    this.setStyle();
  }
}