import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../modal.service';
import { CommonModule } from '@angular/common';
import axios from 'axios'; // Assuming axios is being used for HTTP calls
import { baseurl } from '../environment';

@Component({
  selector: 'app-new-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-task-modal.component.html',
  styleUrl: './new-task-modal.component.css'
})
export class NewTaskModalComponent implements OnInit {

  constructor(private modalService: ModalService) {}
  @Output() taskCreated = new EventEmitter<any>();
  
  task: {
    id: string,
    entity_name: string,
    date: string,
    task_type: number | {
      id: string,
      type: string
      icon: string
    },
    contact_person: {
      email: string,
      name: string,
      id: string
    },
    note: string,
    status: number | {
      id: string,
      name: string,
    }
    hours: string,
    minutes: string,
    period: string
  } 
  = {
    id: '',
    entity_name: '',
    date: '',
    task_type: 10,
    contact_person: {
      id: "",
      name: "",
      email: ""
    },
    note: '',
    status: 10,
    hours: '12',
    minutes: '00',
    period: 'PM'
  };

  isModalOpen = false;

  hours = ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01'];
  minutes = ['00', '15', '30', '45'];

  contactPersons: any[] = []; 
  searchQuery: string = '';
  filteredContactPersons: any[] = []; 



  ngOnInit() {
    this.modalService.modalState$.subscribe((state) => {
      this.isModalOpen = state;
    });

    this.modalService.currentTask$.subscribe((taskData) => {
      if (taskData) {
        this.task = { ...taskData }; // Deep copy to avoid accidental updates
      }
    });

    this.fetchContactPersons()
  }

  onSearchChange() {
    if (this.searchQuery) {
      this.filteredContactPersons = this.contactPersons.filter((person) =>
        person.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredContactPersons = [];
    }
  }
  async fetchContactPersons() {
    try {
      let url = baseurl + 'users'; // Assuming this endpoint returns contact persons
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'user_id': '6e27a7f3-961a-4b3e-90d9-6cc8773988ba'
        }
      });

      this.contactPersons = response.data.users;
      this.filteredContactPersons = this.contactPersons
    } catch (error) {
      console.error('Error fetching contact persons:', error);
    }
  }

  selectContactPerson(person: any) {
    this.task.contact_person = person
    this.searchQuery = person.name
    this.filteredContactPersons = [];  // Clear suggestions after selection
  }

  // Function to set the task status to Open or Closed
  setStatus(status: number) {
    this.task.status = status;
  }

  setType(type: number) {
    this.task.task_type = type
  }

  // Function to cancel the modal
  onCancel() {
    this.modalService.closeModal();
  }

  // Function to save the task and make the API call
  async onSave() {
    try {
      if (this.task.id.length == 0) {
        const url = baseurl + 'tasks';
  
        const response = await axios.post(url, {
          entity_name: this.task.entity_name,
          date: this.task.date,
          task_type: this.task.task_type,
          contact_person: this.task.contact_person.id,
          note: this.task.note,
          status: this.task.status,
          hours: this.task.hours,
          minutes: this.task.minutes,
          period: this.task.period
        }, {
          headers: {
            'Content-Type': 'application/json',
            'user_id': '6e27a7f3-961a-4b3e-90d9-6cc8773988ba'
          }
        });
  
        console.log('Task created successfully:', response.data);
        this.taskCreated.emit(response.data); 
        this.modalService.closeModal();
      } else {
        const url = baseurl + 'tasks/' + this.task.id;
        console.log(this.task)
        const  response = await axios.put(url, {
          entity_name: this.task.entity_name,
          date: this.task.date,
          task_type: typeof this.task.task_type==='number' ? this.task.task_type : this.task.task_type.id,
          contact_person: this.task.contact_person.id,
          note: this.task.note,
          status: typeof this.task.status==='number' ? this.task.status : this.task.status.id,
          hours: this.task.hours,
          minutes: this.task.minutes,
          period: this.task.period
        }, {
          headers: {
            'Content-Type': 'application/json',
            'user_id': '6e27a7f3-961a-4b3e-90d9-6cc8773988ba'
          }
        })

        console.log('Task updated successfully:', response.data);


      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  }
}
