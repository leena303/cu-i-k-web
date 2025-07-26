import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  loading: boolean = true;
  error: string | null = null;
  private userSubscription!: Subscription;
  private userId: number = 0;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService
  ) {
    console.log('OrderHistoryComponent constructor called');
  }

  ngOnInit(): void {
    console.log('OrderHistoryComponent ngOnInit called');
    // Lấy thông tin user hiện tại
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      if (user && user.id) {
        this.userId = user.id;
        console.log('Current user ID:', this.userId);
        this.loadOrders();
      } else {
        console.log('No user logged in');
        this.error = 'Vui lòng đăng nhập để xem lịch sử đặt hàng';
        this.loading = false;
        // Có thể chuyển hướng về trang đăng nhập
        // this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  loadOrders(): void {
    console.log('Loading orders for user:', this.userId);
    this.loading = true;
    this.orderService.getUserOrdersById(this.userId).subscribe({
      next: (orders) => {
        console.log('Raw orders data from API:', orders);
        this.orders = orders;
        console.log('Processed orders:', this.orders);
        console.log('First order items:', this.orders[0]?.items);
        if (this.orders[0]?.items?.[0]) {
          console.log('First item product:', this.orders[0].items[0].product);
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Không thể tải lịch sử đặt hàng. Vui lòng thử lại sau.';
        this.loading = false;
        console.error('Error loading orders:', error);
      }
    });
  }

  // Hàm chuyển trạng thái sang tiếng Việt
  getStatusLabel(status: string): string {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'Đang xử lý';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  }

  // Hàm trả về class cho trạng thái
  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'confirmed':
        return 'status-confirmed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  }

  //Hủy đơn hàng
  getOrders() {
    this.orderService.getUserOrdersById(this.userId).subscribe(data => {
      this.orders = data;
    });
  }

  cancelOrder(orderId: number) {
    if (confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
      this.orderService.cancelOrder(orderId).subscribe({
        next: () => {
          // Sau khi hủy thành công, cập nhật lại danh sách đơn hàng
          this.getOrders(); // hoặc gọi lại API lấy đơn hàng của user
        },
        error: err => alert('Hủy đơn thất bại: ' + err.message)
      });
    }
  }


  // Optional: Method to view details of a specific order
  // viewOrderDetails(orderId: number): void {
  //   // Navigate to a detailed order view page
  //   this.router.navigate(['/order-details', orderId]);
  // }
} 