import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CondidatureService } from 'src/app/shared/services/condidature.service';

@Component({
  selector: 'app-stage-details',
  templateUrl: './stage-details.component.html',
  styleUrls: ['./stage-details.component.css']
})
export class StageDetailComponent implements OnInit {
  stage: any;
  skills: string[];
  candidatures: any[];
  user: any;
  candidatureForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private candidatureService: CondidatureService
  ) {}

  ngOnInit(): void {
    // Retrieve and parse stored stage and user information from localStorage
    this.stage = this.getStoredData('stage');
    this.user = this.getStoredData('userinfo');

    // Check if stage and user information is available
    if (this.stage) {
      this.skills = this.stage.skills.split(";");
    } else {
      console.error("Stage data is not available.");
    }

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
      prix: ['', Validators.required],
      description: ['', Validators.required],
      temps: ['', Validators.required],
      stage: [{ id: this.stage?.id }],
      user: [{ id: this.user?.id }],
      etat: ['En attente', Validators.required],
    });
  }

  // Fetch candidatures for the specific stage
  getCandidatures() {
    this.candidatureService.getcondidatureList().subscribe(
      data => {
        this.candidatures = data.filter(c => c.stage.id === this.stage.id);
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
