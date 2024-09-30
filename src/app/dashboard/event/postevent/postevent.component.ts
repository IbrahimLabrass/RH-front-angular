import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/storage';

import { EventService } from 'src/app/shared/services/event.service';
import { UploadFileService } from 'src/app/shared/services/upload-file.service';

@Component({
  selector: 'app-postevent',
  templateUrl: './postevent.component.html',
  styleUrls: ['./postevent.component.css']
})
export class PostEventComponent implements OnInit {
  public uploadEvent: firebase.storage.UploadTask;

  eventForm: FormGroup;
  user: any;
  selectedFiles: FileList;
  uploadTask: firebase.storage.UploadTask;
  @ViewChild("img") img: ElementRef;
  fileInfos: Observable<any>;

  constructor(
    private fb: FormBuilder, 
    private eventService: EventService,
    private router: Router,
    private uploadService: UploadFileService
  ) {
    setInterval(() => {
      this.user = JSON.parse(localStorage.getItem('userinfo'));
    }, 5000);
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBif6NBoBC2ySLZgt1HhVxEQ5Wb1GoegH8",
        authDomain: "edemti-f1cb4.firebaseapp.com",
        projectId: "edemti-f1cb4",
        storageBucket: "edemti-f1cb4.appspot.com",
        messagingSenderId: "629004329701",
        appId: "1:629004329701:web:1e70966abfa4a9c2992a0c",
        measurementId: "G-KK2TTXHM7L"
      });
  }
  }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userinfo'));
    this.fileInfos = this.uploadService.getFiles();
    this.eventForm = this.fb.group({
      title: [''],
      date: [''],
      location: [''],
      description: [''],
      document: [''],
      user: [{ id: this.user.id }]
    });
  }

  addPost(): void {
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const file = this.selectedFiles.item(0);
      this.uploadFileAndSubmitForm(file);
    } else {
      this.submitForm();
    }
  }

  private uploadFileAndSubmitForm(file: File): void {
    const storageRef = firebase.storage().ref(`/images/${file.name}`);
    this.uploadTask = storageRef.put(file);

    this.uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        // Upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      error => {
        // Handle upload errors
        console.error('Upload failed', error);
      },
      () => {
        // Handle successful uploads
        storageRef.getDownloadURL().then(url => {
          this.eventForm.patchValue({ document: url });
          this.submitForm();
        });
      }
    );
  }

  private submitForm(): void {
    this.eventService.createevent(this.eventForm.value).subscribe(
      data => {
        console.log('Event created successfully', data);
        this.router.navigate(['/event']);
      },
      error => {
        console.error('Error creating event', error);
      }
    );
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(f, img) {

    const storageReference = firebase.storage().ref('/images/' + f.files[0].name);
    this.uploadEvent = storageReference.put(f.files[0]);
    this.uploadEvent.on('state_changed', function (snapshot) {

      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');

   
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
