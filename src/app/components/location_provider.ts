import { Component } from '@angular/core';
import { UserLocation, DataService } from '../dataservices/dataservice'

@Component({
    selector: 'location_provider',
    templateUrl: './location_provider.html',
    styleUrls: ['./location_provider.css']
})
export class LocationProviderComponent {

    email: string
    password: string
    country: string
    city: string
    userLocation: object

    public constructor(private _dataservice: DataService) {

    }

    /**
     * 
     * Method is executed when the user form is submitted
     * @param  
     */
    public submitForm($event) {


        this.userLocation = {
            "email": this.email, "password": this.password,
            "country": this.country, "city": this.city
        }

        this.sendLocation()
        return false

    }

    /**
     * 
     * Method is used to check the response data and take the required action
     * 
     * @param respData response data received after sending request to add location 
     * info
     */
    private responseAction(respData) {
        switch (respData['status']) {
            case "pending":
                let geolist = respData['location_result'].map((geoElem, index) => {
                    return index + "> countryName:".concat(geoElem['countryName'])
                           .concat(", City:" + geoElem['name'])
                })
                geolist = geolist.join('\n')
    
                let promptResp = this.readPrompt("Select The City\n" + geolist)
                this.userLocation['geoname_info'] = respData['location_result'][promptResp]
             
                this.sendLocation()
                break;
            case "done": alert('You information is stored');
                break;
            case "error": alert("Error while saving location, Message from server:" + respData['message'])
        }
    }

    /**
     * methods is used handle the prompt message properly.
     * 
     * @param promptMessage Prompt message to show
     */
    public readPrompt(promptMessage) {
        let promptResp = prompt(promptMessage)
        if (promptResp == null || !promptResp.trim().length || isNaN(promptResp))
            return -1

        return parseInt(promptResp)

    }

    /**
     * Methods is used to invoke the location saving process by calling
     * provide_location() method of dataservice
     */
    private sendLocation() {
        this._dataservice.provide_location(this.userLocation).then((resp) => {
            let data = JSON.parse(resp['_body'])
            console.log(data['status'])
            this.responseAction(data)
        })
    }
}
