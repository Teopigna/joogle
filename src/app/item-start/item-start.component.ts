import { DataStorageService } from './../services/data-storage.service';
import { Component, OnInit } from '@angular/core';

import { faFileCirclePlus, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item-start',
  templateUrl: './item-start.component.html',
  styleUrls: ['./item-start.component.css']
})
export class ItemStartComponent implements OnInit {

  faCreate = faFileCirclePlus;

  faGet = faFileArrowDown;
  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  get(){
    this.dataStorageService.getData();
  }

}
