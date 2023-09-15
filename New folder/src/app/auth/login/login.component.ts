import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router,private auth:ProductService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log(formData);
      // Store data in localhost
      localStorage.setItem('user', JSON.stringify(formData));
      this.router.navigate(['/dashboard'])
      
    } else {
    // Show an alert if the form is not valid
    alert('Please fill in both username and password fields.');
  }
  }
}
