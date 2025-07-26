import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.scss'
})
export class OrderManagementComponent implements OnInit {
  orders: any[] = [];
  showOrderList = true;
  selectedOrder: any = null;
  processingOrder: any = null;
  searchText: string = '';

  // Phân trang
  currentPage: number = 1;
  pageSize: number = 7;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.onShowOrders();
  }

  onShowOrders() {
    this.orderService.getOrders().subscribe(res => {
      this.orders = res;
      this.showOrderList = true;
    });
  }

  viewOrderDetail(order: any) {
    this.orderService.getOrderDetail(order.order_id).subscribe(detail => {
      this.selectedOrder = detail;
    });
  }

  showStatusMenu(order: any) {
    this.processingOrder = order;
  }

  updateOrderStatus(order: any, status: string) {
    this.orderService.updateOrderStatus(order.order_id, status).subscribe(() => {
      order.status = status;
      this.processingOrder = null;
    });
  }

  filteredOrders() {
    if (!this.searchText) return this.orders;
    const txt = this.searchText.toLowerCase();
    return this.orders.filter(order =>
      (order.order_code && order.order_code.toLowerCase().includes(txt)) ||
      (order.customer_name && order.customer_name.toLowerCase().includes(txt)) ||
      (order.status && order.status.toLowerCase().includes(txt)) ||
      (
        order.order_date &&
        (
          new Date(order.order_date).toLocaleDateString('vi-VN').toLowerCase().includes(txt) ||
          new Date(order.order_date).toLocaleTimeString('vi-VN').toLowerCase().includes(txt) ||
          new Date(order.order_date).toLocaleString('vi-VN').toLowerCase().includes(txt)
        )
      )
    );
  }

// Phân trang cho đơn hàng
get pagedOrders() {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.filteredOrders().slice(start, start + this.pageSize);
}

get totalPages(): number {
  return Math.ceil(this.filteredOrders().length / this.pageSize);
}

goToPage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

}