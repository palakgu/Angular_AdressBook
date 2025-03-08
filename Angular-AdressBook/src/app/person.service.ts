import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private persons: any[] = [];
  private personsSubject = new BehaviorSubject<any[]>(this.persons);
  persons$ = this.personsSubject.asObservable();
  private editingIndex: number | null = null;

  getPersons() {
    return this.persons$;
  }

  addPerson(person: any) {
    this.persons.push(person);
    this.personsSubject.next([...this.persons]);
  }

  deletePerson(index: number) {
    this.persons.splice(index, 1);
    this.personsSubject.next([...this.persons]);
  }

  setEditingPerson(person: any, index: number) {
    this.editingIndex = index;
  }

  updatePerson(updatedPerson: any) {
    if (this.editingIndex !== null) {
      this.persons[this.editingIndex] = updatedPerson;
      this.personsSubject.next([...this.persons]);
      this.editingIndex = null;
    }
  }

  getEditingIndex(): number | null {
    return this.editingIndex;
  }
}