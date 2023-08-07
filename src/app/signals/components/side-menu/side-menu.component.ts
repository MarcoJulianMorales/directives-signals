import { Component, signal } from '@angular/core';

interface IMenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'signals-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  public menuItems = signal<IMenuItem[]>([
    { title: 'Counter', route: 'counter' },
    { title: 'User', route: 'user-info' },
    { title: 'Mutations', route: 'properties' },
  ]);

  
  // public menuItems: IMenuItem[] = [
  //   {title: 'Counter', route: 'counter' },
  //   {title: 'User', route: 'user-info' },
  //   {title: 'Mutations', route: 'properties' },
  // ]
}
