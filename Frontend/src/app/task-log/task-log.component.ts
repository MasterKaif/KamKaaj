import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import axios, { AxiosResponse } from 'axios';
import { NewTaskModalComponent } from '../new-task-modal/new-task-modal.component';
import { ModalService } from '../modal.service';
import { baseurl } from '../environment';

@Component({
  selector: 'app-task-log',
  templateUrl: './task-log.component.html',
  styleUrls: ['./task-log.component.css'],
  standalone: true,
  imports: [CommonModule, NewTaskModalComponent]
})
export class TaskLogComponent {

  constructor(
    private modalService: ModalService,
    private cdr: ChangeDetectorRef
  ) {} 
  tasks: any[] = [];

  filterOptions: { [key: string]: { id: string; name: string }[]} = {
    'Date': [],
    'Entity Name': [],
    'Task Type': [],
    'Time': [],
    'Contact Person': [],
    'Notes': [],
    'Status': [],
  };

  appliedFilters: {column: string, value: string}[] = [];

  visibleDropdown: string | null = null;

  openNewTaskModal() {
    this.modalService.openModal();
  }

  openEditModal(task: any) {
    this.modalService.openModalWithTask(task); // Pass task data to modal service
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
    await this.fetchTasks(); 
    await this.populateFilterOptions();
  }

  async fetchTasks(filterOptions: {column: string, value: string}[] = []): Promise<void> {
    try {
      let queryString = ''
      if(filterOptions.length > 0) {
        filterOptions.forEach(option => {
          queryString += `${option.column}=${option.value}&`
        })
        queryString = queryString.slice(0, -1);
      }

      const url = baseurl + 'tasks' + (queryString !== '' ? `?${queryString}` : '');

      const response = await axios.get(url, {
        headers: {
          'user_id': '6e27a7f3-961a-4b3e-90d9-6cc8773988ba',
          'Content-Type': 'application/json',
        }
      });
      this.tasks = response.data.tasks; 
      console.log(this.tasks[0])
      console.log('Tasks fetched:', this.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  async populateFilterOptions() {
    try {
      this.filterOptions['Date'] = await this.getFilterOptions('dates');
      this.filterOptions['Entity Name'] = await this.getFilterOptions('entities');
      this.filterOptions['Task Type'] = await this.getFilterOptions('task_types');
      this.filterOptions['Time'] = await this.getFilterOptions('time_slots');
      this.filterOptions['Contact Person'] = await this.getFilterOptions('users');
      this.filterOptions['Status'] = await this.getFilterOptions('statuses');
    } catch (error) {
      console.error('Error fetching filter options:', error); 
    }
  }

  async changeStatus(task_id: string, index: number) {
    try {
      const url = baseurl + '/tasks/change_status/'+ task_id

      const response = await axios.put(url, {
        headers: {
          'user_id': '6e27a7f3-961a-4b3e-90d9-6cc8773988ba',
          'Content-Type': 'application/json',
        }
      })

      const task = this.tasks[index];
      task.status = response.data.new_status;

      this.tasks[index] = task;

      this.cdr.detectChanges();

    } catch(error) {

      console.error('Error changing status:', error);
    }

  }

  async getFilterOptions(option: string): Promise<any> {
    try{
      const response: AxiosResponse<any> = await axios.get(`http://127.0.0.1:5000/${option}`, {
        headers: {
        'user_id': '6e27a7f3-961a-4b3e-90d9-6cc8773988ba',
        'Content-Type': 'application/json',
        }
      })
      
      return response.data[option]

      // this.filterOptions[option] = response.data[option]
    } catch(error) {
      console.error('Error fetching filter options:', error);
    }
  }

  showDropdown(column: string) {
    this.visibleDropdown = column;
  }

  hideDropdown(column: string) {
    if (this.visibleDropdown === column) {
      this.visibleDropdown = null;
    }
  }

  async applyFilter(column: string, option: { id: string; name: string } | string): Promise<void> {
    console.log(`Filter applied on ${column} with value ${option}`);
    let value
    if(typeof option == 'string') {
      value = option
    } else {
      value = option.id
    }
    this.appliedFilters.push({
      column,
      value
    })
    await this.fetchTasks(this.appliedFilters)
  }

  

}
