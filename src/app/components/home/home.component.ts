import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Hotel, HotelsService } from '../../services/hotels.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  hotels: Observable<Hotel[]> = this.hotelsService.hotels$;
  searchInput: FormControl;

  constructor(private hotelsService: HotelsService) {
    this.searchInput = new FormControl('');
  }

  ngOnInit(): void {
    this.hotelsService.getAllHotels();
  }
}
