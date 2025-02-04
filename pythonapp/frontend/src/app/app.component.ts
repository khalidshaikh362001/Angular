import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Data from Backend:</h1>
    <div *ngIf="data">
      <pre>{{ data | json }}</pre>
    </div>
  `
})
export class AppComponent implements OnInit {
  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((response: any) => {
      this.data = response;
    });
  }
}
