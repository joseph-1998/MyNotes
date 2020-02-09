import { Component } from '@angular/core';

import {Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {



  lat: any;
  lng: any;

  constructor(public geo: Geolocation) {}

  ionViewDidLoad(){
    this.geo.getCurrentPosition().then( pos => {

      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;

    }).catch( err => console.log(err));
  } 

}
