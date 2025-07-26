import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FooterComponent, FormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  username: string = '';
  address: string = '';
  agreeTerms: boolean = false;
  role: string = 'customer';
  roles: string[] = ['customer', 'admin'];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  onRegister(): void {
    if (!this.email || !this.password || !this.confirmPassword || !this.username || !this.address || !this.agreeTerms) {
      alert('Vui lòng điền đầy đủ thông tin và đồng ý với điều kiện.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Mật khẩu nhập lại không khớp.');
      return;
    }

    const userData = {
      email: this.email,
      username: this.username,
      password: this.password,
      address: this.address,
      role: this.role
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        const errorMessage = error.error?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
        alert(errorMessage);
      }
    });
  }

  togglePasswordVisibility(fieldId: string): void {
    const input = document.getElementById(fieldId) as HTMLInputElement;
    const icon = input.nextElementSibling as HTMLElement;
    
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else {
      input.type = 'password';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  }

}
