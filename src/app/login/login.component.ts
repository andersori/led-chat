import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../login.service';
import { HttpResponse } from '@angular/common/http';
import { MainNavComponent } from '../main-nav/main-nav.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    username: string = '';
    password: string = '';

    error: Boolean = false;

    constructor(private dialogRef: MatDialogRef<LoginComponent>, private loginService: LoginService) { }

    ngOnInit() {
    }

    login(): void {
        this.loginService.logar(this.password, this.username).subscribe((res: HttpResponse<void>) => {
            this.error = false;
            sessionStorage.setItem('token', res.headers.get('Authorization'));
            this.dialogRef.close();
        }, error => this.error = true);
    }

}
