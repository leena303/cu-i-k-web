import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  users: User[] = [];
  searchText: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  get filteredUsers(): User[] {
    return this.users.filter(u =>
      (u.username?.toLowerCase() || '').includes(this.searchText.toLowerCase()) ||
      (u.email?.toLowerCase() || '').includes(this.searchText.toLowerCase())
    );
  }

  deleteUser(id: number | undefined) {
    if (!id) return;
    if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
      this.userService.deleteUser(id).subscribe(() => this.fetchUsers());
    }
  }
}