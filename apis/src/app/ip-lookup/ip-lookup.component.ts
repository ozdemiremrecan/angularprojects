import { Component, DestroyRef, ElementRef, input, OnInit, signal, viewChild } from '@angular/core';
import { IpService } from './ip.service';
import { FormsModule, NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-ip-lookup',
  standalone: true,
  imports: [FormsModule,KeyValuePipe],
  templateUrl: './ip-lookup.component.html',
  styleUrl: './ip-lookup.component.css'
})
export class IpLookupComponent {
  constructor(private ipService:IpService,private router: Router){
  }
  inputValue=viewChild.required<ElementRef<HTMLInputElement>>('input')
  objectKeys=Object.keys
  searchedValue=this.ipService.searchedValues;
  isFetching=signal(false);
  errorMessage=signal("");
  searchIpLookup(ip:string){
    this.ipService.searchIpAddress(ip).pipe(
       catchError((err:HttpErrorResponse)=>{
        return throwError(()=>{
          this.errorMessage.set(err.error.error.message)
        })
       })
    ).subscribe({
      complete:()=>{this.isFetching.set(true);this.baseTexts()}
    })
  }
  reload(){
    this.isFetching.set(false)
  }
  baseTexts(){
    this.inputValue().nativeElement.value="";
    this.errorMessage.set("")
  }
}