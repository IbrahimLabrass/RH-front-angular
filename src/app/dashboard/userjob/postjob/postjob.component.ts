import { OffresService } from '../../../shared/services/offres.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UploadFileService } from '../../../shared/services/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { JobsService } from 'src/app/shared/services/jobs.service';

@Component({
  selector: 'app-postjob',
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.css']
})
export class PostjobComponent implements OnInit {

  public uploadTask: firebase.storage.UploadTask;
  postForm: FormGroup;
  user: any;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  photo: any;
  @ViewChild("img") img: ElementRef;

  fileInfos: Observable<any>;
  image: string;

  constructor(private fb:FormBuilder, private jobservice: JobsService,private router:Router,
    private uploadService: UploadFileService) { 
    setInterval(() => {
      this.user = JSON.parse(localStorage.getItem('userinfo'));
      }, 5000);
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userinfo'));
    this.fileInfos = this.uploadService.getFiles();
    this.postForm = this.fb.group({
      "titre":[''],
      "date_publication":[''],
      "prix":[''],
      "document":[''],
      "description":[''],
      "user":[{'id':this.user.id}]

    })
  }

  addPost(){
    console.log(JSON.stringify(this.postForm.value));
    let record= {};
    record = this.postForm.value;
    let photo = this.img.nativeElement.value;
   this.postForm.get("document").setValue(photo);
    console.log(record);
    
    this.jobservice.createJob(this.postForm.value)
    .subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/dashboard/tasks/managejobs'])
      },
      error => console.log(error));


      
  }


  selectFile(event) {
    this.selectedFiles = event.target.files;
    //console.log(event.target.files);
  }
/*
  upload() {
  
    this.currentFile = this.selectedFiles.item(0);
    console.log(this.currentFile);
    this.image = this.currentFile.name;
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
        console.log(err);
      });
  
    this.selectedFiles = undefined;
  }
  */
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
