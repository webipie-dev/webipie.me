import {Component, OnInit} from '@angular/core';
import { PortfolioModel } from 'src/app/_shared/models/portfolio.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  portfolio : PortfolioModel = {} as PortfolioModel;
  showEllipsis = true;
  newPasswordForm = this.formBuilder.group({
    old_password: ['', Validators.required],
    new_password: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });
  old_password: any;
  new_password: any;
  password: any;
  username!: string;
  picture?: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.portfolio = JSON.parse(localStorage.getItem('portfolio')!);
    this.picture = this.portfolio.picture ?? 'assets/SVG/avatar.svg';
    this.getUsername();
  }

  getUsername() {
    this.username = JSON.parse(localStorage.getItem('portfolio')!).userName;
  }

  onSubmit(){
    this.spinner.show();
    this.authService.changePassword({newPassword: this.new_password, oldPassword: this.old_password}).subscribe(
      result =>{
        this.spinner.hide();
        console.log(result);
      },
      error => {
        this.spinner.hide();
      }
    )

  }
}
