import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    private apiUrl = 'http://localhost:3000/api/users';

    constructor(private http: HttpClient) { }

    getTotalUsers(): Observable<{ total: number }> {
        return this.http.get<{ total: number }>(`${this.apiUrl}/count`);
    }

    getUsers() {
        return this.http.get<any[]>(this.apiUrl);
    }

    addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}