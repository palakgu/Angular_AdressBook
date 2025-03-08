import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../person.service';
import { PersonFormComponent } from "../person-form/person-form.component";

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, PersonFormComponent],
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent {

  showForm = false;
  persons: any[] = [];

  constructor(private personService: PersonService) {
    this.personService.persons$.subscribe(data => {
      this.persons = data;
    });
  }

  editPerson(person: any, index: number) {
    this.personService.setEditingPerson(person, index);
    this.showForm = true;
  }
  deletePerson(index: number) {
    this.personService.deletePerson(index);
  }
  openForm() {
    this.showForm = true;
  }
  closeForm() {
    this.showForm = false;
  }
}