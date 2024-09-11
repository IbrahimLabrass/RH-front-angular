import { OffresService } from '../../../shared/services/offres.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UploadFileService } from '../../../shared/services/upload-file.service';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Component({
  selector: 'app-updatestage',
  templateUrl: './updatestage.component.html',
  styleUrls: ['./updatestage.component.css']
})
export class UpdateStageComponent implements OnInit {
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
  post: any;

  constructor(
    private fb: FormBuilder,
    private offreservice: OffresService,
    private router: Router,
    private uploadService: UploadFileService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userinfo'));
    this.fileInfos = this.uploadService.getFiles();
    this.post = JSON.parse(localStorage.getItem('post'));

    this.postForm = this.fb.group({
      "titre": [this.post.title],
      "min": [this.post.min],
      "max": [this.post.max],
      "date_debut": [this.post.start_date],
      "date_fin": [this.post.end_date],
      "description": [this.post.description],
      "company": [this.post.company],
      "user": [{ 'id': this.user.id }],
      "document": ['']
    });
  }

  addPost() {
    if (this.postForm.invalid) {
      return;
    }

    const photo = this.img.nativeElement.value;
    this.postForm.get("document").setValue(photo);

    this.offreservice.updateOffre(this.post.id, this.postForm.value).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/dashboard/stage/managestage']);
      },
      error => console.log(error)
    );
  }

  upload(event) {
    const file = event.target.files[0];
    if (file) {
      const storageReference = firebase.storage().ref('/images/' + file.name);
      this.uploadTask = storageReference.put(file);

      this.uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Upload failed:', error);
        },
        () => {
          storageReference.getDownloadURL().then((url) => {
            this.img.nativeElement.value = url;
            console.log('File available at', url);
          });
        }
      );
    }
  }
}
