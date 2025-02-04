import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Data from Backend:</h1>
    <div *ngIf="data">
      <pre>{{ data | json }}</pre>
    </div>
  `
})
export class AppComponent {
  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe(response => {
      this.data = response;
    });
  }
}
