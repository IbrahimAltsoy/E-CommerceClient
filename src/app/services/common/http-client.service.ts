import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpclient: HttpClient,@Inject("baseUrl") private baseUrl:string) { }


  private url (requestParameter:Partial< RequestParameter>):string{
    return `${requestParameter.baseUrl? requestParameter.baseUrl: this.baseUrl}/${requestParameter.controller}${requestParameter.action?`/${requestParameter.action}`:""}`
  }
//
get<T>(requestParameters: Partial<RequestParameter>, id?: string): Observable<T>{
  let url: string ="";
  if(requestParameters.fullEndPoint)
  url = requestParameters.fullEndPoint;
  else
  url = `${this.url(requestParameters)}${id ? `/${id}` : ""}${requestParameters.querystring?`?${requestParameters.querystring}`:""}`;
  return this.httpclient.get<T>(url, {headers:requestParameters.headers})
}

//
post<T>(requestParameters: Partial<RequestParameter>, body: Partial<T>) :Observable<T>{

  let url:string = "";
  if(requestParameters.fullEndPoint)
  url = requestParameters.fullEndPoint;
  else
  url = `${this.url(requestParameters)}${requestParameters.querystring?`?${requestParameters.querystring}`:""}`;
  return this.httpclient.post<T>(url, body,{ headers: requestParameters.headers});

}
put<T>(requestParameters: Partial<RequestParameter>, body: Partial<T>):Observable<T>{
  let url:string = "";
  if(requestParameters.fullEndPoint)
  url = requestParameters.fullEndPoint;
  else
  url = `${this.url(requestParameters)}${requestParameters.querystring?`?${requestParameters.querystring}`:""}`;

  return this.httpclient.put<T>(url,body,{headers: requestParameters.headers});

}

delete<T>(requestParameters:Partial<RequestParameter>,id: string): Observable<T>{
  let url : string = "";
  if(requestParameters.fullEndPoint)
    url = requestParameters.fullEndPoint;
  else
    url = `${this.url(requestParameters)}/${id}${requestParameters.querystring?`?${requestParameters.querystring}`:""}`;
  return this.httpclient.delete<T>(url, {headers: requestParameters.headers});
    }




  }


export class RequestParameter{
  controller?: string;
  action?: string;
  // id?:string;
  headers?: HttpHeaders;
  baseUrl?:string;
  fullEndPoint?: string;
  querystring?:string;

}
