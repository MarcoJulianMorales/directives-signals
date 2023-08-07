import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  private formBuilder = inject(FormBuilder);

  public color: string = 'green';

  public myForm: FormGroup = this.formBuilder.group({
    name: ['',[Validators.required, Validators.minLength(6), Validators.email]]
  })

  constructor(){}

  changeColor(): void{
    this.color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
  }
}