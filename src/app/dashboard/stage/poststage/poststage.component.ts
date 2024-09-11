import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import firebase from 'firebase/app';
import 'firebase/storage';
import { StageService } from 'src/app/shared/services/stage.sevice';

@Component({
  selector: 'app-poststage',
  templateUrl: './poststage.component.html',
  styleUrls: ['./poststage.component.css']
})
export class PostStageComponent implements OnInit {

  @ViewChild("img") img: ElementRef;

  eventForm: FormGroup;
  user: any;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  image: string;
  fileInfos: Observable<any>;

  constructor(
    private fb: FormBuilder, 
    private stageService: StageService,
    private router: Router
  ) { 
    setInterval(() => {
      this.user = JSON.parse(localStorage.getItem('userinfo'));
    }, 5000);
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userinfo'));
    this.fileInfos = this.stageService.getstageList(); // Assuming the service fetches the stage list

    this.eventForm = this.fb.group({
      titre: [''],
      date_debut: [''],
      date_fin: [''],
      company: [''],
      description: [''],
      document: [''],
      skills: [''],
      user: [{'id': this.user.id}]
    });
  }

  addPost() {
    if (this.eventForm.valid) {
      this.eventForm.get("document").setValue(this.img.nativeElement.value);
      this.stageService.createstage(this.eventForm.value).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/dashboard/stage/managestage']);
        },
        error => console.log(error)
      );
    }
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload(f, img) {
    this.currentFile = this.selectedFiles.item(0);
    const storageReference = firebase.storage().ref(`/images/${this.currentFile.name}`);
    const uploadTask = storageReference.put(this.currentFile);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        console.error('Upload failed', error);
      }, 
      () => {
        storageReference.getDownloadURL().then((url) => {
          img.value = url;
          console.log('File available at', url);
        });
      }
    );
  }
}
