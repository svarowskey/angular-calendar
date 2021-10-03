import { Component, OnInit } from '@angular/core';
import {DateService} from "../../services/date.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-organaizer',
  templateUrl: './organaizer.component.html',
  styleUrls: ['./organaizer.component.scss']
})
export class OrganaizerComponent implements OnInit {
  form: FormGroup

  constructor(public dateService: DateService) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {

  }

  submit() {
    const {title} = this.form.value;
    console.log(title);
  }

}
