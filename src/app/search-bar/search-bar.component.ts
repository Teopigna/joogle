import { DataStorageService } from './../services/data-storage.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  faIcon = faSearch;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){

    const research = form.value.search;

    this.dataStorageService.search(research);
  }
}
