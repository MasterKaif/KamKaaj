import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private taskSource = new BehaviorSubject<any>(null);
  private modalState = new BehaviorSubject<boolean>(false); 
  
  currentTask$ = this.taskSource.asObservable();
  modalState$ = this.modalState.asObservable();

  openModal() {
    this.modalState.next(true);
  }

  openModalWithTask(task: any) {
    this.taskSource.next(task);
    this.openModal()
  }

  closeModal() {
    this.modalState.next(false); // Close modal
    this.taskSource.next(null);
  }
}
