import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { CartItem } from '../models/cart-item.model';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) { }

  // Tạo đơn hàng mới

  createOrder(orderData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, orderData);
  }
  // Lấy tất cả đơn hàng (admin hoặc cho mục đích thống kê)
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  // Lấy tổng số đơn hàng
  getTotalOrders(): Observable<{ total_orders: number }> {
    return this.http.get<{ total_orders: number }>(`${this.apiUrl}/count`);
  }

  // Lấy chi tiết đơn hàng theo orderId
  getOrderDetail(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/detail/${orderId}`);
  }

  // Lấy đơn hàng theo userId (lịch sử đơn hàng của 1 user)
  getUserOrdersById(userId: number): Observable<Order[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`).pipe(
      map(flatData => {
        const ordersMap = new Map<number, Order>();

        flatData.forEach(row => {
          const orderId = row.order_id;

          if (!ordersMap.has(orderId)) {
            ordersMap.set(orderId, new Order({
              id: row.order_id,
              order_code: row.order_code,
              user_id: row.user_id,
              createdAt: new Date(row.createdAt),
              total_price: 0,
              status: row.status || 'Đã xác nhận',
              items: []
            }));
          }

          const order = ordersMap.get(orderId)!;

          // Xử lý ảnh sản phẩm
          let imageName = row.image;
          if (imageName && typeof imageName === 'string') {
            const baseUrl = 'http://localhost:3000/uploads/';
            if (imageName.startsWith(baseUrl)) {
              imageName = imageName.substring(baseUrl.length);
            } else if (imageName.startsWith('uploads/')) {
              imageName = imageName.substring('uploads/'.length);
            }
          }

          const product = new Product({
            id: row.product_id,
            name: row.product_name,
            price: row.price,
            image: imageName || 'assets/images/default-product.jpg',
            description: row.product_description || ''
          });

          const cartItem = new CartItem(product, row.quantity);

          if (!order.items) {
            order.items = [];
          }
          order.items.push(cartItem);

          order.total_price = order.items.reduce((total, item) => {
            const itemPrice = Number(item.product.price) || 0;
            const itemQuantity = Number(item.quantity) || 0;
            return total + (itemPrice * itemQuantity);
          }, 0);
        });

        return Array.from(ordersMap.values());
      })
    );
  }

  // Lấy tất cả đơn hàng của user hiện tại (nếu backend hỗ trợ)
  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  // Lấy đơn hàng theo orderId (nếu backend hỗ trợ)
  getOrderById(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${orderId}`);
  }

  // Xóa đơn hàng
  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${orderId}`);
  }

  // Cập nhật trạng thái đơn hàng
  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${orderId}/status`, { status });
  }

  // Hủy đơn hàng
  cancelOrder(orderId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cancel/${orderId}`, {});
  }
}