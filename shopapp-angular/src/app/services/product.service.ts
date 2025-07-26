import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/product';

  constructor(private http: HttpClient) { }

  // Lấy tất cả sản phẩm
  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(item => new Product(item)))
    );
  }

  // Lấy sản phẩm theo ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(data => new Product(data))
    );
  }

  // Tìm kiếm sản phẩm
  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`).pipe(
      map(data => data.map(item => new Product(item)))
    );
  }

  // Lọc sản phẩm theo danh mục
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${encodeURIComponent(category)}`).pipe(
      map(data => data.map(item => new Product(item)))
    );
  }

  // Thêm sản phẩm mới
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Cập nhật sản phẩm
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  // Xóa sản phẩm
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Upload ảnh sản phẩm (1 ảnh)
  uploadImage(formData: FormData) {
    return this.http.post<{ imageUrl: string }>('http://localhost:3000/upload', formData);
  }

  // Upload nhiều ảnh sản phẩm
  uploadImages(formData: FormData) {
    return this.http.post<{ imageUrls: string[] }>('http://localhost:3000/upload-multi', formData);
  }

  // Đếm sản phẩm còn hàng
  getInStockCount(): Observable<{ status: string, total: number, products: any[] }> {
    return this.http.get<{ status: string, total: number, products: any[] }>('http://localhost:3000/product/count/con-hang');
  }

  // Đếm sản phẩm hết hàng
  getOutStockCount(): Observable<{ status: string, total: number, products: any[] }> {
    return this.http.get<{ status: string, total: number, products: any[] }>('http://localhost:3000/product/count/het-hang');
  }
}