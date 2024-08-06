import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { IpLookup } from "./ip.model";
import { tap } from "rxjs";

@Injectable({providedIn:"root"})
export class IpService{
    private http=inject(HttpClient);
    private searchedValue=signal<IpLookup>({})
    searchedValues=this.searchedValue.asReadonly();
    searchIpAddress(ip:string){
        return this.http.get<IpLookup>('https://weatherapi-com.p.rapidapi.com/ip.json?q='+ip).pipe(
            tap({
                next:(val)=>this.searchedValue.set(val)
            })
        )
    }
}