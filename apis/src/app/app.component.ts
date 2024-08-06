import { Component, isDevMode } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IpLookupComponent } from "./ip-lookup/ip-lookup.component";
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IpLookupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'apis';
  constructor(){
    console.log(environment.production)
  }
}
