import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  constructor(public router: Router) { }

  public goBack(): void {
      let link: string[] = ['#/home'];
      this.router.navigate(link);
  }
}
