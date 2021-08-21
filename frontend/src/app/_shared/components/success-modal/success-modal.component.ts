import { Component, Input, OnInit,  TemplateRef } from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent implements OnInit {
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {
  }

  openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template, {class: 'modal-dialog-centered'});
  }

  @Input() buttonText!: string;
  @Input() messageText!: string;
  @Input() acceptButtonText!: string;
  @Input() cancelButtonText!: string;

  confirm(): void {
    //this.message = 'You clicked the \'confirm\' action!';
    this.modalRef?.hide();
  }

  decline(): void {
      //this.message = 'You clicked the \'decline\' action!';
      this.modalRef?.hide();
  }

  ngOnInit(): void {
  }

}
