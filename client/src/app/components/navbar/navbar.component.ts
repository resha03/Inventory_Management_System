import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <!-- Logo -->
        <div class="flex items-center gap-8">
          <a routerLink="/dashboard" class="flex items-center gap-3 no-underline">
            <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 text-white">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.5 8.5 12 4l7.5 4.5v7L12 20l-7.5-4.5v-7Z" />
                <path d="M4.8 8.7 12 13l7.2-4.3" />
                <path d="M12 13v7" />
                <path d="M8.5 6.4 16 10.8" />
              </svg>
            </div>
            <span class="text-base font-bold tracking-tight text-slate-950">Inventrack</span>
          </a>

          <!-- Nav Links -->
          <div class="hidden md:flex items-center gap-1">
            <a routerLink="/dashboard" routerLinkActive="bg-emerald-50 text-emerald-700"
               class="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors no-underline hover:bg-slate-100 hover:text-slate-950">
              Dashboard
            </a>
            <a routerLink="/products" routerLinkActive="bg-emerald-50 text-emerald-700"
               class="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors no-underline hover:bg-slate-100 hover:text-slate-950">
              Products
            </a>
          </div>
        </div>

        <!-- Right side -->
        <div class="flex items-center gap-3">
          <a *ngIf="auth.isAdmin()" routerLink="/products/new"
             class="hidden items-center gap-1.5 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white transition-colors no-underline hover:bg-emerald-800 sm:flex">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 8.5 12 4l7 4.5v7L12 20l-7-4.5v-7Z" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
            Add Product
          </a>

          <!-- User badge -->
          <div class="flex items-center gap-2.5 border-l border-slate-200 pl-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
              <span class="text-xs font-bold text-emerald-700">{{ initials }}</span>
            </div>
            <div class="hidden sm:block">
              <p class="text-sm font-semibold leading-none text-slate-950">{{ userName }}</p>
              <p class="mt-0.5 text-xs capitalize text-slate-500">{{ auth.getCurrentUser()?.role }}</p>
            </div>
            <button (click)="logout()"
              class="ml-1 rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {}
  get userName() { return this.auth.getCurrentUser()?.name ?? ''; }
  get initials() {
    return this.userName.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();
  }
  logout() { this.auth.logout(); this.router.navigate(['/login']); }
}
