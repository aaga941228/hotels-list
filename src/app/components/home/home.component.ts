import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Hotel, HotelsService } from '../../core/services/hotels.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  hotels: Observable<Hotel[]> = this.hotelsService.hotels$;
  searchInput: FormControl;

  constructor(private hotelsService: HotelsService) {
    this.searchInput = new FormControl('');
  }

  searchHotelsByName(name: string): void {
    this.hotelsService.searchHotelsByName(name);
  }

  ngOnInit(): void {
    this.hotelsService.getAllHotels();

    this.searchInput.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value) => this.searchHotelsByName(value));
  }
}
