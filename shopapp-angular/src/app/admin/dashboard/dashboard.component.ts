import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  totalOrders = 0;
  totalProducts = 0; 
  totalUsers = 0;
  totalInStock = 0;
  totalOutStock = 0;
  showInStockCount = false;
  inStockProducts: any[] = [];
  outOfStockProducts: any[] = [];
  showOutOfStockCount = false;
  products: any[] = [];
  showOrderList = false;
  orders: any[] = [];
  selectedOrder: any = null;
  showUserList = false;
  users: any[] = [];
  processingOrder: any = null;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.orderService.getTotalOrders().subscribe(res => {
      this.totalOrders = res.total_orders; 
    });
  
    this.userService.getTotalUsers().subscribe(res => {
      this.totalUsers = res.total;
    });
  
    this.productService.getInStockCount().subscribe(res => {
      this.totalInStock = res.total;
    });

    this.productService.getOutStockCount().subscribe(res => {
      this.totalOutStock = res.total;
    });


    this.userService.getUsers().subscribe(users => {
      this.totalUsers = users.length;
    });
    
  }
  onShowOrders() {
    if (!this.showOrderList) {
      this.orderService.getOrders().subscribe(res => {
        this.orders = res;
        this.showOrderList = true;
      });
    } else {
      this.showOrderList = false;
    }
  }

  viewOrderDetail(order: any) {
    this.orderService.getOrderDetail(order.order_id).subscribe(detail => {
      this.selectedOrder = detail;
    });
  }

  onShowUsers() {
  if (!this.showUserList) {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.showUserList = true;
    });
  } else {
    this.showUserList = false;
  }
}

onShowInStockCount() {
  if (!this.showInStockCount) {
    this.productService.getInStockCount().subscribe(res => {
      this.inStockProducts = res.products;
      this.showInStockCount = true;
    });
  } else {
    this.showInStockCount = false;
  }
}

onShowOutOfStockCount() {
    if (!this.showOutOfStockCount) {
      this.productService.getOutStockCount().subscribe(res => {
        this.outOfStockProducts = res.products;
        this.showOutOfStockCount = true;
      });
    } else {
      this.showOutOfStockCount = false;
    }
  }

showStatusMenu(order: any) {
  this.processingOrder = order;
}

updateOrderStatus(order: any, status: string) {
  this.orderService.updateOrderStatus(order.order_id, status).subscribe(() => {
    order.status = status; // Cập nhật lại trạng thái trên FE
    this.processingOrder = null;
  });
}
}