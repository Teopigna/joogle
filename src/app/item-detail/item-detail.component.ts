import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';
import { SitesService } from '../services/sites.service';
import { Site } from '../shared/site.model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements OnInit {
  editMode: boolean = false;
  index?: number;
  site?: Site;
  isEditMode: boolean = false;

  // Inizializza il form
  detailForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    keys: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private siteService: SitesService,
    private storageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.isEditMode = true;
      this.index = +params['index'];
      this.site = this.siteService.getSite(this.index);
      this.initForm();
    });
  }

  initForm() {
    let title = this.site?.title;
    let description = this.site?.description;
    let url = this.site?.url;
    let keys = this.site?.keys;

    this.detailForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
      url: new FormControl(url, Validators.required),
      keys: new FormControl(keys, Validators.required),
    });
  }

  onSubmit() {
    if (this.editMode) {
      return;
    } else {
      let sito: Site = {
        title: this.detailForm.value.title,
        id: 10,
        description: this.detailForm.value.description,
        keys: this.detailForm.value.keys,
        url: this.detailForm.value.url,
      };
      this.storageService.addData(sito);
    }
    this.router.navigate(['']);
  }

  onCancel() {
    this.router.navigate(['']);
  }
}
