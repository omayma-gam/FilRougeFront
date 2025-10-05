import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connection-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="connection-test">
      <h2>Frontend-Backend Connection Test</h2>
      <div class="status">
        <p>Backend Status: <span [class]="backendStatusClass">{{ backendStatus }}</span></p>
        <p>Connection Status: <span [class]="connectionStatusClass">{{ connectionStatus }}</span></p>
        <p>Data Exchange: <span [class]="dataStatusClass">{{ dataStatus }}</span></p>
      </div>
      <div class="test-results" *ngIf="testResults">
        <h3>Test Results:</h3>
        <pre>{{ testResults | json }}</pre>
      </div>
      <button (click)="runTest()" [disabled]="isTesting">Run Connection Test</button>
    </div>
  `,
  styles: [`
    .connection-test {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin: 20px;
      font-family: Arial, sans-serif;
    }
    .status p {
      font-size: 16px;
      margin: 10px 0;
    }
    .success {
      color: green;
      font-weight: bold;
    }
    .error {
      color: red;
      font-weight: bold;
    }
    .warning {
      color: orange;
      font-weight: bold;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    .test-results {
      margin-top: 20px;
      padding: 10px;
      background-color: #f8f9fa;
      border-radius: 5px;
    }
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  `]
})
export class ConnectionTestComponent implements OnInit {
  backendStatus = 'Unknown';
  backendStatusClass = '';
  connectionStatus = 'Unknown';
  connectionStatusClass = '';
  dataStatus = 'Unknown';
  dataStatusClass = '';
  testResults: any = null;
  isTesting = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.runTest();
  }

  runTest(): void {
    this.isTesting = true;
    this.backendStatus = 'Checking...';
    this.connectionStatus = 'Checking...';
    this.dataStatus = 'Checking...';
    this.backendStatusClass = '';
    this.connectionStatusClass = '';
    this.dataStatusClass = '';

    // Test 1: Check if backend is reachable
    this.http.get('http://localhost:8080/actuator/health')
      .subscribe({
        next: (response: any) => {
          this.backendStatus = 'Online';
          this.backendStatusClass = 'success';
          this.testConnection();
        },
        error: (error) => {
          this.backendStatus = 'Offline or Unreachable';
          this.backendStatusClass = 'error';
          this.connectionStatus = 'Failed';
          this.connectionStatusClass = 'error';
          this.dataStatus = 'Not Tested';
          this.dataStatusClass = 'warning';
          this.isTesting = false;
        }
      });
  }

  testConnection(): void {
    // Test 2: Check if we can access the dishes endpoint through proxy
    this.http.get('/api/plats/list')
      .subscribe({
        next: (response: any) => {
          this.connectionStatus = 'Successful';
          this.connectionStatusClass = 'success';
          this.testDataExchange(response);
        },
        error: (error) => {
          this.connectionStatus = 'Failed';
          this.connectionStatusClass = 'error';
          this.dataStatus = 'Skipped';
          this.dataStatusClass = 'warning';
          this.isTesting = false;
        }
      });
  }

  testDataExchange(data: any): void {
    // Test 3: Check if data is being exchanged properly
    if (Array.isArray(data)) {
      this.dataStatus = `Success - Received ${data.length} items`;
      this.dataStatusClass = 'success';
      this.testResults = data;
    } else {
      this.dataStatus = 'Unexpected response format';
      this.dataStatusClass = 'warning';
      this.testResults = data;
    }
    this.isTesting = false;
  }
}