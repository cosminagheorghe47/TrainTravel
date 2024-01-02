import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      id: [null, [Validators.required, this.idRangeValidator()]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { id, firstName,lastName,email,phone, password } = this.registerForm.value;
      this.authService.register(id, firstName,lastName,email,phone, password).subscribe(
        () => {
          // Redirect to home page upon successful login
          console.log('it works');
          this.router.navigate(['/']);
        },
        error => {
          // Handle login error
          console.error('Login failed', error);
        }
      );
    }
  }
  idRangeValidator() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const id = control.value;
      if (id !== null && (isNaN(id) || id < 1 || id > 198)) {
        return { 'idRange': true };
      }
      return null;
    };
  }
}
