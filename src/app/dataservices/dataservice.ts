import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';




@Injectable()
export class DataService {

    constructor(private http: Http) {
  
      }

    /**
     * 
     * function sends the post request to save the user lcoation inforamation
     * @param user_location user location information
     */
    
    public provide_location(user_location): Promise<object>{
        let url = 'http://localhost:5000/user-location'
        let body = user_location
        return this.http.post(url, body).toPromise()
    }


}