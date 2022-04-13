import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  
  editMode: boolean = false;

  // Inizializza il form
  detailForm: FormGroup = new FormGroup({
    'title': new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required),
    'url': new FormControl('', Validators.required),
    'keys': new FormControl('', Validators.required)
  });;

  constructor() { }

  ngOnInit(): void {
    //this.initForm();
  }

  initForm(){
    let title = '';
    let description = '';
    let url = '';
    let keys = '';

    this.detailForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'url': new FormControl(url, Validators.required),
      'keys': new FormControl(keys, Validators.required)
    });
  }

  onSubmit(){

  }

  onCancel(){

  }

}
