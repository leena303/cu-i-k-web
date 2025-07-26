import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule]
})
export class DetailProductComponent {

  product: Product = new Product({});
  productImages: string[] = [];
  selectedImage: string = '';
  currentImageIndex: number = 0;
  quantity: number = 1;

  constructor(
    private cartService: CartService,
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe(product => {
      this.product = product;

      // Xử lý images: luôn trả về mảng các chuỗi URL
      if (Array.isArray(this.product.images)) {
        this.productImages = this.product.images;
      } else if (typeof this.product.images === 'string') {
        try {
          this.productImages = JSON.parse(this.product.images);
        } catch {
          this.productImages = [];
        }
      } else {
        this.productImages = [];
      }

      // Nếu phần tử đầu tiên vẫn là chuỗi JSON, parse tiếp (fix dữ liệu lồng)
      while (
        this.productImages.length === 1 &&
        typeof this.productImages[0] === 'string' &&
        this.productImages[0].trim().startsWith('[')
      ) {
        try {
          this.productImages = JSON.parse(this.productImages[0]);
        } catch {
          this.productImages = [];
          break;
        }
      }

      // Nếu không có images, dùng image làm ảnh duy nhất
      if (!this.productImages.length && this.product.image) {
        this.productImages = [this.product.image];
      }

      // Đảm bảo selectedImage là chuỗi URL
      this.currentImageIndex = 0;
      this.selectedImage = this.productImages.length > 0 ? this.productImages[0] : '';

      // Debug
      console.log('productImages:', this.productImages);
      console.log('selectedImage:', this.selectedImage);
    });
  }

  selectImage(img: string) {
    this.selectedImage = img;
    this.currentImageIndex = this.productImages.indexOf(img);
  }

  prevImage() {
    if (this.productImages.length === 0) return;
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.productImages.length) % this.productImages.length;
    this.selectedImage = this.productImages[this.currentImageIndex];
  }

  nextImage() {
    if (this.productImages.length === 0) return;
    this.currentImageIndex = (this.currentImageIndex + 1) % this.productImages.length;
    this.selectedImage = this.productImages[this.currentImageIndex];
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    for (let i = 0; i < this.quantity; i++) {
      this.cartService.addItem(this.product);
    }
    alert('Đã thêm vào giỏ hàng');
  }

  buyNow() {
    this.addToCart();
    this.router.navigate(['/order']);
  }
}