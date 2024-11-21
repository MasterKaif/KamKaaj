import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import axios, { AxiosResponse } from 'axios';
import { NewTaskModalComponent } from '../new-task-modal/new-task-modal.component';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-task-log',
  templateUrl: './task-log.component.html',
  styleUrls: ['./task-log.component.css'],
  standalone: true,
  imports: [CommonModule, NewTaskModalComponent]
})
export class TaskLogComponent {

  constructor(private modalService: ModalService) {} 
  tasks: any[] = [];

  filterOptions: {
    "dates": string[],
    "time": string[],
    "type": string[],
    "entityName": string[],
    "contactPerson": string[],
    "notes": string[],
    "status": string[]
  } = {
    "dates": [],
    "time": [],
    "type": [],
    "entityName": [],
    "contactPerson": [],
    "notes": [],
    "status": []
  }

  openNewTaskModal() {
    this.modalService.openModal();
  }

  getStatusClass(status: Number): string {
    switch (status) {
      case 10:
        return 'open';
      case 20:
        return 'closed';
      default:
        return '';
    }
  }

  appliedFilters = [
    { key: 'Task Type', value: 'Call' }
  ];

  onFilterRemoved(index: number) {
    this.appliedFilters.splice(index, 1); 

  }

  getTaskTypeIconClass(taskType: string): string {
    switch (taskType.toLowerCase()) {
      case 'call':
        return 'fa fa-phone'; // Font Awesome class for phone icon
      case 'meeting':
        return 'fa fa-map-marker'; // Font Awesome class for location pin
      case 'video call':
        return 'fa fa-video-camera'; // Font Awesome class for video camera
      default:
        return 'fa fa-question'; // Fallback icon
    }
  }
  

  async ngOnInit(): Promise<void> {
    await this.fetchTasks(); // Fetch tasks when the component initializes
  }

  async fetchTasks(): Promise<void> {
    try {
      const response = await axios.get('http://127.0.0.1:5000/tasks', {
        headers: {
          'user_id': '2a527144-31ab-4f87-b1e0-74856e103ebc',
          'Content-Type': 'application/json',
        }
      });
      this.tasks = response.data.tasks; 
      console.log('Tasks fetched:', this.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  async getFilterOptions(option: string): Promise<void> {
    try{
      const response: AxiosResponse<any> = await axios.get(`http://127.0.0.1:5000/${option}`, {
        headers: {
        'user_id': '2a527144-31ab-4f87-b1e0-74856e103ebc',
        'Content-Type': 'application/json',
        }
      })

      // this.filterOptions[option] = response.data[option]
    } catch(error) {
      console.error('Error fetching filter options:', error);
    }
  }

}
