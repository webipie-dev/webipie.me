import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from 'src/app/_shared/theme-options';
import Swal from "sweetalert2";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public globals: ThemeOptions) {
  }

  ngOnInit(): void {
  }
}
