import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-emerald-100 flex items-center justify-center px-4 py-10">
      <div class="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.6)] sm:p-10">
        <div class="mb-8 text-center">
          <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-700/20">
            <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.5 8.5 12 4l7.5 4.5v7L12 20l-7.5-4.5v-7Z" />
              <path d="M4.8 8.7 12 13l7.2-4.3" />
              <path d="M12 13v7" />
              <path d="M8.5 6.4 16 10.8" />
            </svg>
          </div>
          <p class="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700">Inventrack</p>
          <h1 class="mt-7 text-3xl font-bold text-slate-950">Create Account</h1>
          <p class="mt-2 text-sm text-slate-500">Start tracking products, stock, and categories in one workspace.</p>
        </div>

        <div *ngIf="error" class="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
          <svg class="mt-0.5 h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10.3 4.2 2.7 17.5A2 2 0 0 0 4.4 20h15.2a2 2 0 0 0 1.7-2.5L13.7 4.2a2 2 0 0 0-3.4 0Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
          <p class="text-sm font-medium">{{ error }}</p>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-5">
          <label class="block group">
            <span class="mb-2 block text-sm font-medium text-slate-700 transition-colors group-focus-within:text-emerald-600">Full name</span>
            <div class="relative">
              <svg class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input formControlName="name" type="text" placeholder="Juan dela Cruz"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 hover:border-slate-300" />
            </div>
            <p *ngIf="form.get('name')?.touched && form.get('name')?.invalid" class="mt-2 text-xs text-red-500">Full name is required.</p>
          </label>

          <label class="block group">
            <span class="mb-2 block text-sm font-medium text-slate-700 transition-colors group-focus-within:text-emerald-600">Email address</span>
            <div class="relative">
              <svg class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 6h16v12H4z" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              <input formControlName="email" type="email" placeholder="you@example.com"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 hover:border-slate-300" />
            </div>
            <p *ngIf="form.get('email')?.touched && form.get('email')?.invalid" class="mt-2 text-xs text-red-500">Please enter a valid email.</p>
          </label>

          <label class="block group">
            <span class="mb-2 block text-sm font-medium text-slate-700 transition-colors group-focus-within:text-emerald-600">Role</span>
            <select formControlName="role"
              class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 hover:border-slate-300">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <p *ngIf="form.get('role')?.touched && form.get('role')?.invalid" class="mt-2 text-xs text-red-500">Please select a role.</p>
          </label>

          <label class="block group">
            <span class="mb-2 block text-sm font-medium text-slate-700 transition-colors group-focus-within:text-emerald-600">Password</span>
            <div class="relative">
              <svg class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="5" y="10" width="14" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
              <input formControlName="password" [type]="showPassword ? 'text' : 'password'" placeholder="Min. 6 characters"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-11 text-sm text-slate-900 outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 hover:border-slate-300" />
              <button type="button" (click)="togglePasswordVisibility()" class="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700">
                <svg *ngIf="!showPassword" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg *ngIf="showPassword" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2 2l20 20" />
                  <path d="M8.5 8.7A9.6 9.6 0 0 1 12 8c6 0 9.5 4 9.5 4a13.4 13.4 0 0 1-3 3.1" />
                  <path d="M15 15.5a3 3 0 0 1-4-4" />
                  <path d="M6 6.8C3.7 8.2 2.5 12 2.5 12s3.5 6 9.5 6c1.2 0 2.3-.2 3.3-.6" />
                </svg>
              </button>
            </div>
            <p *ngIf="form.get('password')?.touched && form.get('password')?.invalid" class="mt-2 text-xs text-red-500">Password must be at least 6 characters.</p>
          </label>

          <button type="submit" [disabled]="loading"
            class="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-700/20 disabled:cursor-not-allowed disabled:bg-emerald-400">
            <svg *ngIf="loading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            {{ loading ? 'Creating account...' : 'Create account' }}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-slate-500">
          Already have an account?
          <a routerLink="/login" class="font-semibold text-emerald-700 transition-colors duration-200 hover:text-emerald-800 hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  form: any;
  loading = false;
  error = '';
  showPassword = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.error = '';
    const { name, email, password, role } = this.form.value;
    this.auth.register({ name, email, password, role }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (e) => {
        this.error = e?.error?.message || e?.message || 'Registration failed.';
        this.loading = false;
      },
    });
  }
}
