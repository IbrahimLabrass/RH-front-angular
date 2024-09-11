import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Participation } from '../classes/participation';

@Injectable({
  providedIn: 'root',
})
export class ParticipationService {
  private participations: Participation[] = [];

  constructor() {}

  getAllParticipations(): Observable<Participation[]> {
    return of(this.participations);
  }

  getParticipationById(id: number): Observable<Participation | undefined> {
    const participation = this.participations.find(p => p.id === id);
    return of(participation);
  }

  createParticipation(participation: Participation): void {
    this.participations.push(participation);
  }

  updateParticipation(updatedParticipation: Participation): void {
    const index = this.participations.findIndex(p => p.id === updatedParticipation.id);
    if (index !== -1) {
      this.participations[index] = updatedParticipation;
    }
  }

  deleteParticipation(id: number): void {
    this.participations = this.participations.filter(p => p.id !== id);
  }
}
