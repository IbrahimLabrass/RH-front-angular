import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UploadFileService } from '../../../shared/services/upload-file.service';
import { EventService } from 'src/app/shared/services/event.service';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-updateevent',
  templateUrl: './updateevent.component.html',
  styleUrls: ['./updateevent.component.css']
})
export class UpdateEventComponent implements OnInit {

  public uploadTask: firebase.storage.UploadTask;
  postForm: FormGroup;
  user: any;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  @ViewChild("img") img: ElementRef;

  fileInfos: Observable<any>;
  image: string;
  post: any;

  constructor(
    private fb: FormBuilder, 
    private eventService: EventService, 
    private router: Router,
    private uploadService: UploadFileService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userinfo'));
    this.fileInfos = this.uploadService.getFiles();
    this.post = JSON.parse(localStorage.getItem('post'));
    
    this.postForm = this.fb.group({
      "title": [this.post.titre],
      "date": [this.post.date],
      "location": [this.post.location],
      "description": [this.post.description],
      "user": [{ 'id': this.user.id }],
      "document": ['']
    });
  }

  addPost(): void {
    if (this.postForm.valid) {
      this.eventService.updateevent(this.post.id, this.postForm.value)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['/dashboard/event/manageevents']);
          },
          error => console.log(error)
        );
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(f: any, img: any): void {
    const file = f.files[0];
    const storageReference = firebase.storage().ref('/images/' + file.name);
    this.uploadTask = storageReference.put(file);

    this.uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Upload failed:', error);
      },
      () => {
        storageReference.getDownloadURL().then((url) => {
          img.value = url;
          this.postForm.get("document").setValue(url);
          console.log('File available at', url);
        }).catch(error => {
          console.error('Failed to get download URL:', error);
        });
      }
    );
  }
}
