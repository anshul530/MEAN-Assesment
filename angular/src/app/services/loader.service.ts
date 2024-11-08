import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }
  public isLoader = new BehaviorSubject<boolean>(false);
  isLoaderOb = this.isLoader.asObservable();

  showLoader() {
    this.resetLoader();
    this.isLoader.next(true);
  }

  hideLoader() {
    this.isLoader.next(false);
  }

  closeLoaderWithTimeout() {
    setTimeout(() => {
      this.isLoader.next(false);
    }, 2500);
  }

  resetLoader() {
    this.isLoader.next(false);
  }

}

