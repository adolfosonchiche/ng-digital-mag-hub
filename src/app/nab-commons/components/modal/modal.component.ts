import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{

  @ViewChild('content') content!: NgbModal;

  @Input() title = 'Title';
  @Input() btnText = 'Action'
  @Input() btnClass = 'btn btn-primary'
  @Input() size = 'lg'
  @Input() centered = true;
  @Input() keyboard = false;
  @Input() backdrop: boolean | 'static' = 'static';
  @Output() confirmationAction = new EventEmitter();

  @Input() template: TemplateRef<any> | null = null;
  value!: any;
  modalRef!: NgbModalRef;

  constructor(
    public modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
  }

  open(value: any) {
    this.value = value;
    this.modalRef = this.modalService.open(this.content, { size: this.size, centered: this.centered, keyboard: this.keyboard, backdrop: this.backdrop });
  }

  executeAction() {
    this.confirmationAction.emit(this.value);
    this.modalRef.close('confirm');// do not change this
  }

  close() {
    this.modalRef.close('close');// do not change this
  }



}
