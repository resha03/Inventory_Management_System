import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Product } from '../../services/product.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  template: `
    <div class="min-h-screen bg-slate-50">
      <app-navbar />

      <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-wide text-emerald-700">{{ auth.isAdmin() ? 'Admin Dashboard' : 'Dashboard' }}</p>
            <h1 class="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Welcome back, {{ firstName }}</h1>
            <p class="mt-2 text-sm text-slate-600">Monitor products, stock levels, and categories from one place.</p>
          </div>

          <a *ngIf="auth.isAdmin()" routerLink="/products/new"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            Add product
          </a>
        </header>

        <section class="mb-8 grid gap-4 md:grid-cols-3">
          <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.5 8.5 12 4l7.5 4.5v7L12 20l-7.5-4.5v-7Z" />
                  <path d="M4.8 8.7 12 13l7.2-4.3" />
                  <path d="M12 13v7" />
                </svg>
              </div>
              <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Total</span>
            </div>
            <p class="mt-5 text-4xl font-bold text-slate-950">{{ totalProducts }}</p>
            <p class="mt-1 text-sm font-medium text-slate-600">Products</p>
          </article>

          <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M10.3 4.2 2.7 17.5A2 2 0 0 0 4.4 20h15.2a2 2 0 0 0 1.7-2.5L13.7 4.2a2 2 0 0 0-3.4 0Z" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
              </div>
              <span class="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">Alert</span>
            </div>
            <p class="mt-5 text-4xl font-bold text-red-600">{{ lowStock }}</p>
            <p class="mt-1 text-sm font-medium text-slate-600">Low stock items</p>
          </article>

          <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 5h16v14H4z" />
                  <path d="M4 10h16" />
                  <path d="M9 5v14" />
                  <path d="M15 5v14" />
                </svg>
              </div>
              <span class="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Active</span>
            </div>
            <p class="mt-5 text-4xl font-bold text-slate-950">{{ categories }}</p>
            <p class="mt-1 text-sm font-medium text-slate-600">Categories</p>
          </article>
        </section>

        <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 class="text-base font-semibold text-slate-950">Recent products</h2>
              <p class="mt-1 text-sm text-slate-600">Latest additions to inventory</p>
            </div>
            <a routerLink="/products" class="inline-flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              View all
            </a>
          </div>

          <div *ngIf="loading" class="flex flex-col items-center justify-center px-6 py-16 text-slate-600">
            <div class="mb-4 h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-emerald-700"></div>
            <p class="text-sm font-medium">Loading products...</p>
          </div>

          <div *ngIf="!loading && recentProducts.length === 0" class="px-6 py-16 text-center">
            <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.5 8.5 12 4l7.5 4.5v7L12 20l-7.5-4.5v-7Z" />
                <path d="M4.8 8.7 12 13l7.2-4.3" />
                <path d="M12 13v7" />
              </svg>
            </div>
            <p class="text-sm font-semibold text-slate-950">No products yet</p>
            <p class="mt-1 text-sm text-slate-600">Add your first product to start tracking inventory.</p>
          </div>

          <div *ngIf="!loading && recentProducts.length > 0" class="overflow-x-auto">
            <table class="min-w-full divide-y divide-slate-200">
              <thead class="bg-slate-50">
                <tr class="text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  <th class="px-5 py-3">Product</th>
                  <th class="px-5 py-3">Category</th>
                  <th class="px-5 py-3 text-right">Price</th>
                  <th class="px-5 py-3 text-right">Qty</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 bg-white">
                <tr *ngFor="let p of recentProducts" class="hover:bg-slate-50">
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-3">
                      <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 text-slate-500">
                        <img *ngIf="p.imageUrl" [src]="backendUrl + p.imageUrl" class="h-full w-full object-cover" />
                        <svg *ngIf="!p.imageUrl" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M4.5 8.5 12 4l7.5 4.5v7L12 20l-7.5-4.5v-7Z" />
                          <path d="M4.8 8.7 12 13l7.2-4.3" />
                        </svg>
                      </div>
                      <div class="min-w-0">
                        <p class="truncate text-sm font-semibold text-slate-950">{{ p.name }}</p>
                        <p class="truncate text-xs text-slate-500" style="max-width: 220px;">{{ p.description }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-4">
                    <span class="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{{ p.category }}</span>
                  </td>
                  <td class="px-5 py-4 text-right text-sm font-semibold text-slate-950">₱{{ p.price | number:'1.0-0' }}</td>
                  <td class="px-5 py-4 text-right">
                    <span [ngClass]="p.quantity <= 5 ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'" class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold">
                      {{ p.quantity }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  totalProducts = 0;
  lowStock = 0;
  categories = 0;
  recentProducts: Product[] = [];
  loading = true;
  backendUrl = environment.apiUrl.replace(/\/api$/, '');
  get firstName(): string { return this.auth.getCurrentUser()?.name?.split(' ')?.[0] ?? 'there'; }

  constructor(public auth: AuthService, private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts({ page: 1, limit: 100 }).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: (res) => {
        this.totalProducts = res?.pagination?.total ?? res.data.length;
        this.lowStock = res.data.filter(p => p.quantity <= 5).length;
        this.recentProducts = res.data.slice(0, 5);
      },
      error: (err) => {
        console.error('Failed to load products:', err);
      },
    });
    this.productService.getCategories().subscribe({
      next: (cats) => { this.categories = cats.length; },
      error: (err) => { console.error('Failed to load categories:', err); },
    });
  }
}
