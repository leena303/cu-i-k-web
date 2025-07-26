import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart-item.model';
import { Order } from '../models/order.model';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
// Import AuthService nếu bạn dùng để lấy User ID
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs'; // Import Subscription

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;
  loading: boolean = false;
  error: string | null = null;
  couponCode: string = '';
  user_id: number = 0; // <-- Đảm bảo thuộc tính này được gán User ID thực
  orderPlaced: boolean = false;
  shipping_name: string = ''; // Added shipping name property
  shipping_phone: string = ''; // Added shipping phone property
  shipping_address: string = ''; // Added shipping address property
  selectedPaymentMethod: string = ''; // Added selected payment method property
  discountAmount: number = 0; // Property for discount amount
  shippingCost: number = 0; // Property for shipping cost (placeholder)
  finalTotalAmount: number = 0; // Property for final total amount
  agreeTerms: boolean = false; // Property for terms and conditions checkbox
  private userSubscription!: Subscription; // Subscription để quản lý việc hủy đăng ký

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService // <-- AuthService đã được inject
  ) { console.log('OrderComponent constructor'); }

  ngOnInit(): void {
    console.log('OrderComponent ngOnInit');
    // Logic để lấy User ID thực của người dùng đã đăng nhập và gán cho this.user_id
    // Đăng ký theo dõi currentUser từ AuthService
    this.userSubscription = this.authService.currentUser.subscribe(currentUser => {
      console.log('AuthService currentUser emitted:', currentUser);
      if (currentUser && currentUser.id) {
        this.user_id = currentUser.id;
        console.log("Đã lấy được User ID và gán vào this.user_id:", this.user_id);
      } else {
         this.user_id = 0; // Reset user_id nếu không có user (đăng xuất)
         console.warn("AuthService: Không tìm thấy thông tin người dùng đã đăng nhập hoặc ID.");
         // Có thể hiển thị thông báo hoặc điều hướng
         // this.error = "Bạn cần đăng nhập để đặt hàng."; 
         // this.router.navigate(['/login']);
      }
    });

    this.loadCartItems();
  }

  // Quan trọng: Hủy đăng ký khi component bị hủy để tránh memory leaks
  ngOnDestroy(): void {
    console.log('OrderComponent ngOnDestroy');
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => {
      const itemPrice = Number(item.product.price) || 0;
      const itemQuantity = Number(item.quantity) || 0;
      return total + (itemPrice * itemQuantity);
    }, 0);
    // Calculate final total (subtotal - discount + shipping)
    this.finalTotalAmount = this.totalAmount - this.discountAmount + this.shippingCost;
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
  }

  getItemTotalPrice(item: CartItem): number {
    return item.getTotalPrice();
  }

  // Getter to check if the order form is valid to enable placing the order
  get isOrderValid(): boolean {
    return this.cartItems.length > 0 &&
           !!this.user_id && // Check if user_id is set and not 0
           !!this.shipping_name &&
           !!this.shipping_phone &&
           !!this.shipping_address &&
           !!this.selectedPaymentMethod &&
           this.agreeTerms;
  }

  placeOrder(): void {
  // Kiểm tra hợp lệ
  if (this.cartItems.length === 0) {
    this.error = 'Giỏ hàng của bạn đang trống';
    alert(this.error);
    return;
  }

  if (!this.user_id || this.user_id <= 0) {
    this.error = 'Không lấy được thông tin người dùng đã đăng nhập. Vui lòng đăng nhập lại.';
    console.error('User ID không hợp lệ:', this.user_id);
    alert(this.error);
    return;
  }

  if (!this.shipping_name || !this.shipping_phone || !this.shipping_address || !this.selectedPaymentMethod) {
    this.error = 'Vui lòng điền đầy đủ thông tin giao hàng và chọn phương thức thanh toán.';
    alert(this.error);
    return;
  }

  if (!this.agreeTerms) {
    this.error = 'Bạn phải đồng ý với các điều khoản và điều kiện.';
    alert(this.error);
    return;
  }

  // Tạo body yêu cầu phù hợp với backend
const orderData = {
  user_id: this.user_id,
  items: this.cartItems.map(item => ({
    product_id: item.product.id,
    quantity: item.quantity
  })),
  shipping_name: this.shipping_name,
  shipping_phone: this.shipping_phone,
  shipping_address: this.shipping_address
};

  console.log('Dữ liệu đơn hàng gửi đi:', orderData); // Ghi log để debug

  this.loading = true;
  this.error = null;

  this.orderService.createOrder(orderData).subscribe({
    next: (response) => {
      this.loading = false;
      this.cartService.clearCart();
      alert(response.message || 'Đặt hàng thành công!');
      this.orderPlaced = true;
    },
    error: (error) => {
      this.loading = false;
      console.error('Phản hồi lỗi đầy đủ:', error);
      this.error = error.error?.error || 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.';
      alert(this.error);
    }
  });
}

  // Method để điều hướng đến trang chủ để tiếp tục mua sắm
  continueShopping(): void {
    this.router.navigate(['/']);
  }

  // Method để xem lịch sử đặt hàng
  viewOrderHistory(): void {
    this.router.navigate(['/order-history']);
  }
}
