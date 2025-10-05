import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// Simple Dish interface - matches backend PlatsDto
interface SimpleDish {
  id?: number;
  name: string;
  description: string;
  prix: number;
  available: boolean;
  category: string; // Will be converted to Category enum on backend
  photo?: string;
  allergenes?: string;
  restaurant?: any; // Optional restaurant reference
}

@Component({
  selector: 'app-simple-dish-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './simple-dish-manager.component.html',
  styleUrls: ['./simple-dish-manager.component.css']
})
export class SimpleDishManagerComponent implements OnInit {
  
  // Simple properties
  dishes: SimpleDish[] = [];
  currentDish: SimpleDish = this.getEmptyDish();
  isEditing = false;
  message = '';
  showMessage = false;
  
  // Simple categories list
  categories = ['VEGETARIEN', 'VEGAN', 'VIANDE', 'POISSON', 'DESSERT', 'BOISSON'];
  
  // Use proxy path instead of direct URLs
  private apiUrl = '/api/plats';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Add timeout and error handling to prevent SSR timeout
    setTimeout(() => {
      this.testBackendConnection();
      this.loadDishes();
    }, 100);
  }

  // Test backend connection
  testBackendConnection(): void {
    console.log(`Testing backend connection to: ${this.apiUrl}/list`);
    
    // Test current port
    this.http.get(`${this.apiUrl}/list`)
      .pipe(
        timeout(3000),
        catchError((error) => {
          console.log(`❌ Backend connection failed:`, error.status || 'Connection refused');
          this.showTemporaryMessage('Backend not found. Please check if your Spring Boot server is running on port 8081.', 8000);
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          if (response !== null) {
            console.log(`✅ Backend connected successfully`);
            this.showTemporaryMessage(`Connected to backend`, 2000);
          }
        },
        error: (error) => {
          console.log(`❌ Subscription error:`, error);
        }
      });
  }

  // Method to show message temporarily
  showTemporaryMessage(msg: string, duration: number = 3000): void {
    this.message = msg;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.message = '';
    }, duration);
  }

  // Simple method to get empty dish
  getEmptyDish(): SimpleDish {
    return {
      name: '',
      description: '',
      prix: 0,
      available: true,
      category: 'VEGETARIEN',
      photo: '',
      allergenes: ''
    };
  }

  // Load all dishes - Simple with timeout handling
  loadDishes(): void {
    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      this.dishes = [];
      this.message = '';
      return;
    }

    console.log('Attempting to load dishes from:', `${this.apiUrl}/list`);

    this.http.get<SimpleDish[]>(`${this.apiUrl}/list`)
      .pipe(
        timeout(10000), // Increase timeout
        catchError((error) => {
          console.error('Backend connection failed:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          
          let errorMessage = 'Unable to load dishes. ';
          if (error.status === 0) {
            errorMessage += 'Cannot connect to backend.';
          } else if (error.status === 404) {
            errorMessage += 'API endpoint not found.';
          } else {
            errorMessage += `Server error (${error.status}).`;
          }
          
          this.showTemporaryMessage(errorMessage, 6000);
          return of([]);
        })
      )
      .subscribe({
        next: (dishes) => {
          console.log('Received dishes:', dishes);
          console.log('Number of dishes:', dishes.length);
          this.dishes = dishes;
          // Don't show success message for loading dishes
          this.showMessage = false;
          this.message = '';
        },
        error: (error) => {
          console.error('Subscription error:', error);
          this.showTemporaryMessage('Error loading dishes', 4000);
          this.dishes = [];
        }
      });
  }

  // Add new dish - Simple
  addDish(): void {
    if (!this.isFormValid()) {
      this.showTemporaryMessage('Please fill all required fields', 2000);
      return;
    }

    if (typeof window === 'undefined') {
      this.showTemporaryMessage('Cannot add dish during server rendering', 2000);
      return;
    }

    // Prepare the dish data to match backend DTO structure
    const dishData = {
      name: this.currentDish.name,
      description: this.currentDish.description,
      prix: this.currentDish.prix,
      available: this.currentDish.available,
      category: this.currentDish.category,
      photo: this.currentDish.photo || null,
      allergenes: this.currentDish.allergenes || null,
      restaurant: null // Will be set by backend based on authentication
    };

    console.log('Sending dish data to backend:', dishData);
    console.log('API URL:', `${this.apiUrl}/add`);

    this.http.post<SimpleDish>(`${this.apiUrl}/add`, dishData, { 
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .pipe(
        timeout(10000), // Increase timeout to 10 seconds
        catchError((error) => {
          console.error('Failed to add dish:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          console.error('Error response:', error.error);
          
          let errorMessage = 'Failed to add dish. ';
          if (error.status === 403) {
            errorMessage += 'Access denied. You may need to be authenticated as a restaurateur or admin.';
          } else if (error.status === 404) {
            errorMessage += 'API endpoint not found. Check if backend is running.';
          } else if (error.status === 400) {
            errorMessage += 'Invalid data format.';
          } else if (error.status === 0) {
            errorMessage += 'Cannot connect to backend. Check if server is running.';
          } else {
            errorMessage += `Server error (${error.status}).`;
          }
          
          this.showTemporaryMessage(errorMessage, 6000);
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Add dish response:', response);
          if (response) {
            this.showTemporaryMessage('Dish added successfully!');
            this.loadDishes();
            this.resetForm();
          }
        },
        error: (error) => {
          console.error('Subscription error:', error);
          this.showTemporaryMessage('Error adding dish', 4000);
        }
      });
  }

  // Update dish - Simple
  updateDish(): void {
    if (!this.isFormValid() || !this.currentDish.id) {
      this.showTemporaryMessage('Please fill all required fields', 2000);
      return;
    }

    this.http.put(`${this.apiUrl}/update/${this.currentDish.id}`, this.currentDish)
      .pipe(
        timeout(5000),
        catchError((error) => {
          console.error('Failed to update dish:', error);
          this.showTemporaryMessage('Failed to update dish. Please try again.', 4000);
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.showTemporaryMessage('Dish updated successfully!');
            this.loadDishes();
            this.resetForm();
          }
        },
        error: (error) => {
          this.showTemporaryMessage('Error updating dish', 4000);
          console.error('Error:', error);
        }
      });
  }

  // Delete dish - Simple
  deleteDish(id: number): void {
    if (confirm('Are you sure you want to delete this dish?')) {
      this.http.delete(`${this.apiUrl}/${id}`)
        .pipe(
          timeout(5000),
          catchError((error) => {
            console.error('Failed to delete dish:', error);
            this.showTemporaryMessage('Failed to delete dish. Please try again.', 4000);
            return of(null);
          })
        )
        .subscribe({
          next: (response) => {
            this.showTemporaryMessage('Dish deleted successfully!');
            this.loadDishes();
          },
          error: (error) => {
            this.showTemporaryMessage('Error deleting dish', 4000);
            console.error('Error:', error);
          }
        });
    }
  }

  // Edit dish - Simple
  editDish(dish: SimpleDish): void {
    this.currentDish = { ...dish }; // Copy the dish
    this.isEditing = true;
    this.message = 'Editing dish...';
  }

  // Submit form - Simple logic
  onSubmit(): void {
    if (this.isEditing) {
      this.updateDish();
    } else {
      this.addDish();
    }
  }

  // Reset form - Simple
  resetForm(): void {
    this.currentDish = this.getEmptyDish();
    this.isEditing = false;
  }

  // Simple form validation
  isFormValid(): boolean {
    return this.currentDish.name.length > 0 && 
           this.currentDish.description.length > 0 && 
           this.currentDish.prix > 0;
  }
}