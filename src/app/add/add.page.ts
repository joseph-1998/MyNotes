import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PictureService } from '../picture.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  private addForm:FormGroup;

  lat: any;
  lng: any;

  constructor( 
    private formBuilder: FormBuilder, 
    private modal: ModalController,
    public geo: Geolocation,
    private picture: PictureService 
  ) { 

  }

  ngOnInit() {
    this.locate();
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3) ] ],
      note: ['', [Validators.required, Validators.minLength(5) ] ]
    })
  }

  close() {
    this.modal.dismiss();
  }

  locate(){
    this.geo.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude,
      this.lng = resp.coords.longitude,
      console.log("lat" + resp.coords.latitude + "- long" + resp.coords.longitude)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  submit() {
    // get data from form
    let name = this.addForm.controls.name.value;
    let note = this.addForm.controls.note.value;
    let date = new Date();
    let latitude = this.lat;
    let longitude = this.lng
    let noteData = { name: name, date: date, note: note, latitude: latitude, longitude: longitude };
    this.modal.dismiss( noteData );
  }

  takePhoto() {
    this.picture.takePicture();
  }
}
