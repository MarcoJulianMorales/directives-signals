import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent implements OnInit, OnDestroy{
  public user = signal<User>({
    id: 2,
    email: 'janet.waver@reqres.in',
    first_name: 'Janet',  
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg'
  })

  public counter = signal(10);
  public fullName = computed( () => `${this.user().first_name} ${this.user().last_name}`);
  public userChangedEffect = effect( () => {
    console.log(`${this.user().first_name} - ${this.counter()}`)
  });

  ngOnInit(): void {
    setInterval( () => {
      this.counter.update( current => current +1 );
      if(this.counter() === 15){
        this.userChangedEffect.destroy();
      }
    },1000);
  }

  ngOnDestroy(): void {
    this.userChangedEffect.destroy();
  }

  onFieldUpdated(field: keyof User, value: string) {
    //update via ...spread
    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // })

    //update via mutate
    this.user.mutate( current => {
      switch(field){
        case 'email':
          current.email = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
        case 'id':
          current.id = Number(value);
          break;
      }
    })

    //update via update
    // this.user.update(current => {
    //   return {
    //     ...current,
    //     [field]: value
    //   };
    // })
  }

  increaseBy(value: number ): void{
    this.counter.update(current => current + value);
  }
}
