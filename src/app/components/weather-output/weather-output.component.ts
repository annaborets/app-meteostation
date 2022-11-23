import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, merge, take } from 'rxjs';

import { WeatherService } from 'src/app/services/weather.service';
import { meteostationOutput } from 'src/app/models/meteostation-output';

@Component({
  selector: 'app-weather-output',
  templateUrl: './weather-output.component.html',
  styleUrls: ['./weather-output.component.scss']
})
export class WeatherOutputComponent implements OnInit, OnDestroy {
  public meteostationOutput: meteostationOutput = {
    temperature: 0,
    humidity: 0,
    airPressure: 0
  };
  private subscriptions: Subscription[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather();
  }

  private getWeather() {
    this.subscriptions.push(
      this.weatherService.generateResult().subscribe((items) => {
        this.meteostationOutput = items;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
