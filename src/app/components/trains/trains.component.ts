// trains.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trains',
  templateUrl: './trains.component.html',
  styleUrls: ['./trains.component.css']
})
export class TrainsComponent implements OnInit {
  trainResults: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve search results from the route parameters
    this.route.queryParams.subscribe(params => {
      const results = params['results'];
      if (results) {
        this.trainResults = JSON.parse(results);
      } else {
        // Handle the case when results are not available
      }
    });
  }
}
