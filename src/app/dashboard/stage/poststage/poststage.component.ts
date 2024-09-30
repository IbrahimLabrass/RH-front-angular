import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/storage';

import { UploadFileService } from 'src/app/shared/services/upload-file.service';
import { StageService } from 'src/app/shared/services/stage.sevice';

@Component({
  selector: 'app-poststage',
  templateUrl: './poststage.component.html',
  styleUrls: ['./poststage.component.css']
})
export class PostStageComponent implements OnInit {
  public uploadStage: firebase.storage.UploadTask;
  
  stageForm: FormGroup;
  user: any;
  selectedFiles: FileList;
  uploadTask: firebase.storage.UploadTask;
  @ViewChild("doc") doc: ElementRef;
  fileInfos: Observable<any>;

  constructor(
    private fb: FormBuilder, 
    private stageService: StageService,  
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

    // Initialize form for Stage
    this.stageForm = this.fb.group({
      title: [''],
      startDate: [''],
      endDate: [''],
      company: [''],
      description: [''],
      skills: [''],
      document: [''],  // File URL
      user: [{ id: this.user.id }]
    });
  }

  addStage(): void {
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
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      error => {
        console.error('Upload failed', error);
      },
      () => {
        storageRef.getDownloadURL().then(url => {
          this.stageForm.patchValue({ document: url });
          this.submitForm();
        });
      }
    );
  }

  private submitForm(): void {
    this.stageService.createstage(this.stageForm.value).subscribe(
      data => {
        console.log('Stage created successfully', data);
        this.router.navigate(['/stage']);
      },
      error => {
        console.error('Error creating stage', error);
      }
    );
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(f, doc) {
    const storageReference = firebase.storage().ref('/images/' + f.files[0].name);
    this.uploadStage = storageReference.put(f.files[0]);

    this.uploadStage.on('state_changed', function (snapshot) {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, function (error) {
      console.error('Error during upload', error);
    }, function () {
      storageReference.getDownloadURL().then(function (url) {
        doc.value = url;
        console.log(doc.value);
      });
    });
  }
}
