import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutControlService {

  constructor() {
    this.showNavbarSubject.next(false);
  }

  private showNavbarSubject = new Subject<boolean>();
  showsNavbar = this.showNavbarSubject.asObservable();

  private currentPageSubject = new Subject<number>();
  currentPage = this.currentPageSubject.asObservable();

  showNavbar(): void {
    this.showNavbarSubject.next(true);
  }

  hideNavbar(): void {
    this.showNavbarSubject.next(false);
  }

  changeCurrentPage(page: number): void {
    this.currentPageSubject.next(page);
  }

}
