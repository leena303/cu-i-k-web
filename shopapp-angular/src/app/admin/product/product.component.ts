import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  searchText: string = '';
  editMode: boolean = false;
  editingProduct: Product | null = null;
  products: Product[] = [];
  viewingProduct: Product | null = null;
  page: number = 1;
  pageSize: number = 5;
  categories: Category[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.fetchProducts();

    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });

  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.map(p => ({
        ...p,
        image: p.image && !p.image.startsWith('http') ? `http://localhost:3000${p.image}` : p.image,
        images: Array.isArray(p.images)
          ? p.images.map((img: string) => img.startsWith('http') ? img : `http://localhost:3000${img}`)
          : [],
        getFormattedPrice: p.getFormattedPrice
          ? p.getFormattedPrice
          : function (this: Product) { return this.price ? Number(this.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : ''; },
        getFullImageUrl: p.getFullImageUrl
          ? p.getFullImageUrl
          : function (this: Product) { return this.image; },
        getDefaultImage: p.getDefaultImage
          ? p.getDefaultImage
          : function () { return 'assets/default-product.png'; }
      }));
    });
  }

  filteredProducts(): Product[] {
    const search = this.searchText.toLowerCase();
    return this.products.filter(p =>
      p.name.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search) ||
      p.trademark.toLowerCase().includes(search)
    );
  }


  get pagedProducts(): Product[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts().length / this.pageSize);
  }

  addProduct() {
    this.editingProduct = {
      id: 0,
      name: '',
      price: '',
      category: 'Điện thoại',
      trademark: '',
      status: 'Còn hàng',
      image: '',
      images: [],
      quantity: '',
      description: '',
      getFormattedPrice: () => '',
      getFullImageUrl: () => '',
      getDefaultImage: () => ''
    };
    this.editMode = true;
  }

  editProduct(id: number) {
    const product = this.products.find(p => p.id === id);
    if (product) {
      this.editingProduct = {
        ...product,
        images: Array.isArray(product.images) ? [...product.images] : [],
        getFormattedPrice: product.getFormattedPrice,
        getFullImageUrl: product.getFullImageUrl,
        getDefaultImage: product.getDefaultImage
      };
      this.editMode = true;
    }
  }

  saveEdit() {
    if (!this.editingProduct) return;
    const saveObs = this.editingProduct.id === 0
      ? this.productService.addProduct(this.editingProduct)
      : this.productService.updateProduct(this.editingProduct);

    saveObs.subscribe(() => {
      this.fetchProducts();
      this.cancelEdit();
    });
  }

  deleteProduct(id: number) {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.fetchProducts();
      });
    }
  }

  cancelEdit() {
    this.editingProduct = null;
    this.editMode = false;
  }

  // --- Image Upload ---
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Kiểm tra định dạng
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Chỉ cho phép ảnh JPG, PNG, WEBP, GIF!');
      return;
    }

      const formData = new FormData();
      formData.append('image', file);

      this.productService.uploadImage(formData).subscribe({
        next: (res) => {
          if (this.editingProduct) {
            const imageUrl = res.imageUrl && res.imageUrl.startsWith('http')
              ? res.imageUrl
              : `http://localhost:3000${res.imageUrl}`;
            this.editingProduct.image = imageUrl;
          }
        },
        error: (err) => {
          alert('Lỗi upload ảnh!');
          console.error(err);
        }
      });
    }
  }
  // --- Upload nhiều ảnh chi tiết ---
onMultiFileSelected(event: any) {
  const files: FileList = event.target.files;
  if (!this.editingProduct) return;
  if (!this.editingProduct.images) this.editingProduct.images = [];

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const formData = new FormData();
  let validFileCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (allowedTypes.includes(file.type)) {
      formData.append('images', file);
      validFileCount++;
    } else {
      alert(`File "${file.name}" không hợp lệ. Chỉ chấp nhận ảnh JPG, PNG, WEBP, GIF.`);
    }
  }

  if (validFileCount === 0) {
    alert('Không có ảnh hợp lệ để upload!');
    return;
  }

  this.productService.uploadImages(formData).subscribe({
    next: (res) => {
      const urls = (res.imageUrls || [])
        .filter((url: string) => !!url)
        .map((url: string) => url.startsWith('http') ? url : `http://localhost:3000${url}`);
      this.editingProduct!.images!.push(...urls);
    },
    error: (err) => {
      alert('Lỗi upload ảnh chi tiết!');
      console.error(err);
    }
  });
}


  // // Giả sử bạn đã có hàm uploadFile trả về Promise<string>
  // uploadFile(file: File): Promise<string> {
  //   const formData = new FormData();
  //   formData.append('images', file);
  //   return new Promise((resolve, reject) => {
  //     this.productService.uploadImage(formData).subscribe({
  //       next: (res) => {
  //         const imageUrl = res.imageUrl.startsWith('http')
  //           ? res.imageUrl
  //           : `http://localhost:3000${res.imageUrl}`;
  //         resolve(imageUrl);
  //       },
  //       error: (err) => {
  //         alert('Lỗi upload ảnh chi tiết!');
  //         reject(err);
  //       }
  //     });
  //   });
  // }


  removeDetailImage(index: number) {
    if (this.editingProduct && this.editingProduct.images) {
      this.editingProduct.images.splice(index, 1);
    }
  }

  // --- Modal Xem Chi Tiết ---
  viewDetail(product: Product) {
    this.viewingProduct = product;
  }

  closeDetail() {
    this.viewingProduct = null;
  }

  
}