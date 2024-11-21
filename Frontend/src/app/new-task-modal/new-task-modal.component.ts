import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { ModalService } from '../modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-task-modal.component.html',
  styleUrl: './new-task-modal.component.css'
})
export class NewTaskModalComponent implements OnInit {
  task = {
    entityName: '',
    date: '',
    type: '',
    phoneNumber: '',
    contactPerson: '',
    notes: ''
  };

  isModalOpen = false;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.modalState$.subscribe((state) => {
      this.isModalOpen = state;
    });
  }

  onCancel() {
    this.modalService.closeModal();
  }

  onSave() {
    // Add save logic here
    this.modalService.closeModal();
  }
}
