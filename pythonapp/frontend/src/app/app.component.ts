import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Items Management</h1>
      
      <!-- Create Form -->
      <div class="form-section">
        <input [(ngModel)]="newItem" placeholder="New item name">
        <button (click)="createItem()">Add Item</button>
      </div>

      <!-- Items List -->
      <div class="items-list">
        <div *ngFor="let item of items" class="item">
          <input [(ngModel)]="item.name" *ngIf="item.editing">
          <span *ngIf="!item.editing">{{ item.name }}</span>
          
          <div class="actions">
            <button *ngIf="!item.editing" (click)="toggleEdit(item)">Edit</button>
            <button *ngIf="item.editing" (click)="updateItem(item)">Save</button>
            <button (click)="deleteItem(item.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: any[] = [];
  newItem = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.dataService.getItems().subscribe(items => {
      this.items = items.map(item => ({ ...item, editing: false }));
    });
  }

  createItem() {
    if (this.newItem.trim()) {
      this.dataService.createItem({ name: this.newItem }).subscribe(() => {
        this.newItem = '';
        this.loadItems();
      });
    }
  }

  toggleEdit(item: any) {
    item.editing = !item.editing;
  }

  updateItem(item: any) {
    this.dataService.updateItem(item.id, { name: item.name }).subscribe(() => {
      item.editing = false;
      this.loadItems();
    });
  }

  deleteItem(id: number) {
    this.dataService.deleteItem(id).subscribe(() => {
      this.loadItems();
    });
  }
}