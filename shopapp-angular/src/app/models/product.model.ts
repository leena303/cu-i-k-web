export class Product {
    id: number;
    name: string;
    price: string;
    category: string;
    trademark: string;
    status: string;
    image: string;
    images?: string[]; // Optional, can be an array of image URLs   
    description?: string;
    quantity?: string;

    constructor(data: any = {}) {
        this.id = data.id || 0;
        this.name = data.name || '';
        this.price = data.price || '';
        this.category = data.category || '';
        this.trademark = data.trademark || '';
        this.status = data.status || '';
        this.image = data.image || '';
        this.images = data.images ? (Array.isArray(data.images) ? data.images : [data.images]) : [];
        this.description = data.description || '';
        this.quantity = data.quantity || '';
    }

    // Helper method to get formatted price
    getFormattedPrice(): string {
        return `${this.price} VNĐ`;
    }

    // Helper method to get full image URL
    getFullImageUrl(): string {
        return this.image.startsWith('http') ? this.image : `http://localhost:3000${this.image}`;
    }

    // Helper method to get default image if main image fails
    getDefaultImage(): string {
        return 'https://via.placeholder.com/300x200?text=No+Image';
    }
} 