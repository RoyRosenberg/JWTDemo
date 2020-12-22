import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    userName: string = "Roy";
    password: string = "123";
    token: string = "";
    sensitiveDataResult: string;
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        //http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
        //    this.forecasts = result.json() as WeatherForecast[];
        //}, error => console.error(error));
    }

    loginClick() {
        console.log(this.userName);
        console.log(this.password);
        var body = {
            email: this.userName,
            password: this.password
        };
        console.log(body);
        var url = this.baseUrl + 'api/Account/Login';
        console.log(url);
        this.http.post(url, body).subscribe(result => {
            //console.log(result);
            console.log(result.text());
            this.token = result.text();
            //console.log(result.json());
        }, error => console.error(error));

        //this.http.get(this.baseUrl + 'api/Account/Login').subscribe(result => {
        //    //this.forecasts = result.json() as WeatherForecast[];
        //    console.log(result.json());
        //}, error => console.error(error));
    }

    getDataClick() {

        if (this.token.length == 0) {
            console.error("no token");
            return;
        }

        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.token);

        var url = this.baseUrl + "Home/Protected";
        this.http.get(url, { headers: headers }).subscribe(result => {
            console.log(result);
            this.sensitiveDataResult = result.text();
        }, error => {
            console.error(error);
        });
    }
}
