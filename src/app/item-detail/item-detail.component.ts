import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
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

  // Inizializza il form
  detailForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    keys: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private siteService: SitesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
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

  onSubmit() {}

  //con il tasto cancel lo reindirizzo alla pagina precedente

  onCancel() {}
}
