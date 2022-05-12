import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { hotels } from '../../../assets/hotel-list';

interface Country {
  code: string;
  name: string;
}

interface State {
  code: string;
  name: string;
}

interface Address {
  city: string;
  country: Country;
  state: State;
  zip: string;
  street1: string;
}
export interface Hotel {
  name: string;
  code: string;
  contact: string;
  address: Address;
  description: string;
  price: number;
  currency: string;
}

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  private _hotels: BehaviorSubject<Hotel[] | null>;
  private _hotel: BehaviorSubject<Hotel | null>;

  constructor() {
    this._hotels = new BehaviorSubject(null);
    this._hotel = new BehaviorSubject(null);
  }

  get hotels$(): Observable<Hotel[]> {
    return this._hotels.asObservable();
  }

  get hotel$(): Observable<Hotel> {
    return this._hotel.asObservable();
  }

  getAllHotels(): void {
    this._hotels.next(hotels);
  }

  searchHotelByCode(code: string): void {
    let hotels = this._hotels.getValue();
    if (!hotels) {
      this.getAllHotels();
    }
    const hotelFound = this._hotels.getValue().find((h) => h.code === code);
    this._hotel.next(hotelFound ? hotelFound : null);
  }

  searchHotelsByName(name: string): void {
    if (name === '') {
      this.getAllHotels();
      return;
    }
    let hotels = this._hotels.getValue();
    if (!hotels.length) {
      this.getAllHotels();
    }
    hotels = this._hotels
      .getValue()
      .filter(
        (h) => h.name.toLowerCase().search(name.toLowerCase().trim()) !== -1
      );
    this._hotels.next(hotels);
  }
}
