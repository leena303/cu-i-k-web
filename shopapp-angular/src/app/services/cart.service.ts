import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    // Load cart items from localStorage on service initialization (chỉ trên trình duyệt)
    let savedCart: string | null = null;
    if (typeof window !== 'undefined') {
      savedCart = localStorage.getItem('cart');
    }
    if (savedCart) {
      const items = JSON.parse(savedCart).map((item: any) =>
        new CartItem(new Product(item.product), item.quantity)
      );
      this.cartItems.next(items);
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  addItem(product: Product): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.increaseQuantity();
    } else {
      currentItems.push(new CartItem(product));
    }

    this.cartItems.next([...currentItems]);
    this.saveToLocalStorage();
  }

  removeItem(productId: number): void {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItems.next(updatedItems);
    this.saveToLocalStorage();
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.product.id === productId);

    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.cartItems.next([...currentItems]);
        this.saveToLocalStorage();
      }
    }
  }

  getTotalPrice(): number {
    return this.cartItems.value.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  clearCart(): void {
    this.cartItems.next([]);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
    }
  }
}