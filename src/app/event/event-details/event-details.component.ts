import { Component, OnInit } from '@angular/core';
import { CondidatureService } from './../../shared/services/condidature.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailComponent implements OnInit {
  event: any;
  candidatures: any[] = [];
  user: any;
  candidatureForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private candidatureService: CondidatureService
  ) {}

  ngOnInit(): void {
    // Retrieve and parse stored stage and user information from localStorage
    this.event = this.getStoredData('event');
    this.user = this.getStoredData('userinfo');

    // Initialize the form with validators
    this.initForm();

    // Load candidatures related to the stage
    this.getCandidatures();
  }

  // Method to safely retrieve and parse localStorage data
  getStoredData(key: string) {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }

  // Initialize the form with default values and validators
  initForm() {
    this.candidatureForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      description: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      event: [{ id: this.event.id }],
      user: [{ id: this.user.id }],
      etat: ['En attente'] // Default state is 'En attente'
    });
  }

  // Fetch candidatures for the specific stage
  getCandidatures() {
    this.candidatureService.getcondidatureList().subscribe(
      data => {
        this.candidatures = data.filter(c => c.event.id === this.event.id);
      },
      error => {
        console.error("Error fetching candidatures:", error);
      }
    );
  }

  // Handle form submission for new candidature
  submitCandidature() {
    if (this.candidatureForm.valid) {
      this.candidatureService.createcondidature(this.candidatureForm.value).subscribe(
        data => {
          console.log("Candidature submitted successfully:", data);
        },
        error => {
          console.error("Error submitting candidature:", error);
        }
      );
    } else {
      console.error("Form is invalid. Please fill out all required fields.");
    }
  }

  // Accept a candidature by updating its status
  acceptCandidature(candidature) {
    const updatedCandidature = { ...candidature, etat: 'accepter' };

    this.candidatureService.updatecondidature(candidature.id, updatedCandidature).subscribe(
      data => {
        console.log("Candidature accepted:", data);
        this.getCandidatures(); // Refresh the candidatures list
      },
      error => {
        console.error("Error accepting candidature:", error);
      }
    );
  }
}
