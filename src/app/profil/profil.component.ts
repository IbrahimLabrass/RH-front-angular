import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UploadFileService } from '../shared/services/upload-file.service';
import { UserService } from '../shared/services/user.service';
import firebase from 'firebase';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: any;
  @ViewChild("img") img: ElementRef;
  public uploadTask: firebase.storage.UploadTask;
  updateForm:FormGroup;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  fileInfos: Observable<any>;
  image: string;

  constructor(private router: Router, private fb : FormBuilder,private userservice: UserService,private uploadService: UploadFileService) { }
   
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userinfo'));
    console.log(this.user);
    this.updateForm = this.fb.group({
      "nom":[this.user.nom,[Validators.required]],
      "prenom":[this.user.prenom,[Validators.required]],
      "email":[this.user.email,[Validators.required, Validators.email]],
      "username":[this.user.username,[Validators.required]],
      "cin":[this.user.cin,[Validators.required]],
      "telephone":[this.user.telephone,[Validators.required]],
      "skills":[this.user.skills,[Validators.required]],
      "cv":[this.user.cv,[Validators.required, Validators.email]],
      "aboutme":[this.user.aboutme,[Validators.required]],
      "adresse":[this.user.adresse,[Validators.required]],
      "photo":[this.user.photo],
    });
  }

  onSubmit(){
    console.log(this.updateForm.value);
    let record= {};
    record = this.updateForm.value;
    record['cv'] = this.image;
    this.userservice.updateuser( this.user.id,record)
    .subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/dashboard/profile']);
      },
      error => console.log(error));
  }

  up()
  {
    let record= {};
    record = this.updateForm.value;
    let photo = this.img.nativeElement.value;
   record['photo'] = photo;
    console.log(record);    
    this.userservice.updateuserphoto(this.user.id,record)
    .subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/profile'])
      },
      error => console.log(error));
  }

  upload(f, img) {

    const storageReference = firebase.storage().ref('/images/' + f.files[0].name);
    this.uploadTask = storageReference.put(f.files[0]);
    this.uploadTask.on('state_changed', function (snapshot) {

      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');

      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function (error) {
      // Handle unsuccessful uploads
    }, function () {

      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      storageReference.getDownloadURL().then(function (url) {
        // Insert url into an <img> tag to "download"
        //img.src = url;
        img.value = url;
        
       // this.photo = url;
        //this.img = url;
        console.log(img.value);
      });

    });
  }


}
