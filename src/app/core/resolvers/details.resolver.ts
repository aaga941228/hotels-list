import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { HotelsService } from '../services/hotels.service';

@Injectable({ providedIn: 'root' })
export class DetailsResolver implements Resolve<void> {
  constructor(private hotelsService: HotelsService) {}

  getHotelDetails(code: string): void {
    this.hotelsService.searchHotelByCode(code);
  }

  resolve(route: ActivatedRouteSnapshot): void {
    const { code } = route.params;
    this.getHotelDetails(code);
  }
}
