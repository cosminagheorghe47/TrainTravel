// recent-search.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  recentSearch: any;

  setRecentSearch(search: any): void {
    this.recentSearch = search;
  }

  getRecentSearch(): any {
    return this.recentSearch;
  }
}
