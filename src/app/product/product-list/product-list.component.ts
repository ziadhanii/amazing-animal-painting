import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filterProducts: Product[] = [];
  sortOrders: string = "";
  constructor(private productService: ProductService, private cartService: CartService, private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filterProducts = this.products;
    });
  }
  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe(
      () => {
        this.snackBar.open('Product added to cart!', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    );
  }

  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();

    this.filterProducts = this.products.filter(
      product => product.name.toLowerCase().includes(searchTerm)
    )
    this.sortProducts(this.sortOrders);
    }

  sortProducts(sortValue: string): void {
    this.sortOrders = sortValue;
    if (sortValue === 'priceLowHigh') {
      this.filterProducts = this.filterProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'priceHighLow') {
      this.filterProducts = this.filterProducts.sort((a, b) => b.price - a.price);
    }
  }

}
