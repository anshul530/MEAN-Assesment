import { ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'newProjAngular';
  isLoader = false;
  constructor(private LoaderService: LoaderService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.LoaderService.isLoaderOb.subscribe((message) => {
      this.isLoader = message;
      this.cdRef.detectChanges();
    });
  }

}
