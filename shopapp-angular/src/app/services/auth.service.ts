import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';
  private currentUserSubject: BehaviorSubject<any | null>;
  public currentUser: Observable<any | null>;

  constructor(private http: HttpClient) {
    // Load user from localStorage if exists (chỉ trên trình duyệt)
    let savedUser = null;
    if (typeof window !== 'undefined') {
      savedUser = localStorage.getItem('currentUser');
    }
    this.currentUserSubject = new BehaviorSubject<any | null>(savedUser ? JSON.parse(savedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any | null {
    return this.currentUserSubject.value;
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Store user details in localStorage (chỉ trên trình duyệt)
        if (response && response.user && typeof window !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      })
    );
  }

  logout(): void {
    // Remove user from localStorage (chỉ trên trình duyệt)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  // Kiểm tra đã đăng nhập chưa
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  // Lấy thông tin user hiện tại từ backend (nếu backend hỗ trợ)
  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }

  // Cập nhật thông tin user
  updateProfile(userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile`, userData).pipe(
      tap(updatedUser => {
        // Cập nhật lại localStorage và BehaviorSubject nếu cần (chỉ trên trình duyệt)
        if (typeof window !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }
        this.currentUserSubject.next(updatedUser);
      })
    );
  }
}