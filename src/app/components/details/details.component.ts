import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Hotel, HotelsService } from '../../core/services/hotels.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void>;
  hotel: Hotel;

  constructor(private hotelsService: HotelsService) {
    this.unsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this.hotelsService.hotel$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((hotel) => (this.hotel = hotel));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
