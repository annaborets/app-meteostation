import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WeatherOutputComponent } from './components/weather-output/weather-output.component';
import { WeatherService } from './services/weather.service';

@NgModule({
  declarations: [AppComponent, WeatherOutputComponent],
  imports: [BrowserModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (service: WeatherService) => () => {
        return service.init();
      },
      deps: [WeatherService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
