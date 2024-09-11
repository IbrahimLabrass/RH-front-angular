import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UploadFileService } from '../../../shared/services/upload-file.service';
import firebase from 'firebase/app';
import 'firebase/storage';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-postevent',
  templateUrl: './postevent.component.html',
  styleUrls: ['./postevent.component.css']
})
export class PostEventComponent implements OnInit {

  eventForm: FormGroup;
  user: any;
  selectedFiles: FileList;
  uploadTask: firebase.storage.UploadTask;
  @ViewChild("img") img: ElementRef;

  constructor(
    private fb: FormBuilder, 
    private eventService: EventService,
    private router: Router,
    private uploadService: UploadFileService
  ) {
    setInterval(() => {
      this.user = JSON.parse(localStorage.getItem('userinfo'));
    }, 5000);
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userinfo'));
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
        this.router.navigate(['/dashboard/event/manageevent']);
      },
      error => {
        console.error('Error creating event', error);
      }
    );
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
}
