import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  emailOrUsername: string = '';
  password: string = '';
  role: string = '';
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

  onLogin(): void {
    if (!this.emailOrUsername || !this.password || !this.role) {
      alert('Vui lòng nhập đầy đủ Email/Username, mật khẩu và chọn quyền đăng nhập.');
      return;
    }

    this.authService.login({ 
      emailOrUsername: this.emailOrUsername,
      password: this.password,
      role: this.role
    }).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        alert('Đăng nhập thành công!');

        if (response && response.user && response.user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        const errorMessage = error.error?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.';
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

  onPaste(event: ClipboardEvent): void {
    const target = event.target as HTMLInputElement;
    // Allow the default paste to happen, then fix the background
    setTimeout(() => {
      target.style.backgroundColor = 'transparent';
    }, 0);
  }
}
