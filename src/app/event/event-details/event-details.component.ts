import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Participation } from 'src/app/shared/classes/participation';
import { ParticipationService } from 'src/app/shared/services/participation.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailComponent implements OnInit {
  event: any;
  skills: any;
  participations: Participation[] = [];
  user: any;
  participationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private participationService: ParticipationService
  ) {}

  ngOnInit(): void {
    this.event = JSON.parse(localStorage.getItem('event'));
    this.skills = this.event.skills.split(";");
    this.user = JSON.parse(localStorage.getItem('userinfo'));

    this.participationForm = this.fb.group({
      prix: [],
      description: [],
      temps: [],
      event: { id: this.event.id },
      user: { id: this.user.id },
      etat: "En attent",
    });

    this.getParticipations();
  }

  getParticipations() {
    this.participationService.getAllParticipations().subscribe(
      data => {
        this.participations = data.filter(p => p.event.id === this.event.id);
      },
      error => {
        console.log(error);
      }
    );
  }

  submitParticipation() {
    const newParticipation: Participation = this.participationForm.value;
    newParticipation.id = this.participations.length + 1; // Simulate ID generation

    this.participationService.createParticipation(newParticipation);
    this.getParticipations(); // Refresh the list after adding
  }

  acceptParticipation(participation: Participation) {
    const updatedParticipation = { ...participation, etat: "accepter" };
    this.participationService.updateParticipation(updatedParticipation);
    this.getParticipations(); // Refresh the list after updating
  }
}
