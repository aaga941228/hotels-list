import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { hotels } from '../../assets/hotel-list';

export interface Country {
  code: string;
  name: string;
}

export interface State {
  code: string;
  name: string;
}

export interface Address {
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

  constructor() {
    this._hotels = new BehaviorSubject(null);
  }

  get hotels$(): Observable<Hotel[]> {
    return this._hotels.asObservable();
  }

  getAllHotels(): void {
    this._hotels.next(hotels);
  }
}
