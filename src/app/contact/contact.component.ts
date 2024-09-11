import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmailService } from '../shared/services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private emailservice: EmailService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      "name":[''],
      "email":[''],
      "subject":[''],
      "comment":[''],
    })
  }

  enviarEmail() {
    this.emailservice.enviarEmail(this.contactForm.value)
      .subscribe(data => console.log(data));
  }

  onSubmit() {
    this.enviarEmail();
  }

}
