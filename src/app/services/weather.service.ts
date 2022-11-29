import { Injectable, EventEmitter } from '@angular/core';
import {
  throttleTime,
  map,
  timer,
  combineLatest,
  switchMap,
  concat,
  of
} from 'rxjs';

const onDormant = <T, V extends T>(delayMs: number, value: V) => {
  return switchMap((source: T) =>
    concat(of(source), timer(delayMs).pipe(map(() => value as T)))
  );
};

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  temperatureEmitter = new EventEmitter<number | string>();

  airPressureEmitter = new EventEmitter<number | string>();

  humidityEmitter = new EventEmitter<number | string>();

  constructor() {
    // this.emitTemperatureValue();
    // this.emitAirPressureValue();
    // this.emitHumidityValue();
  }

  public startEmitting() {
    this.emitTemperatureValue();
    this.emitAirPressureValue();
    this.emitHumidityValue();

    setTimeout(() => {
      this.emitTemperatureValue();
    }, 2000);
    setTimeout(() => {
      this.emitAirPressureValue();
    }, 8000);
    setTimeout(() => {
      this.emitHumidityValue();
    }, 10000);
  }

  public generateResult() {
    return combineLatest([
      this.temperatureEmitter.pipe(onDormant(5000, 'N/A')),
      this.airPressureEmitter.pipe(onDormant(5000, 'N/A')),
      this.humidityEmitter.pipe(onDormant(5000, 'N/A'))
    ]).pipe(
      // throttleTime(100),
      map(([temperature, airPressure, humidity]) => {
        return {
          temperature,
          airPressure,
          humidity
        };
      })
    );
  }

  private emitTemperatureValue() {
    this.temperatureEmitter.emit(
      Math.floor(Math.random() * 40 + 1) * (Math.round(Math.random()) ? 1 : -1)
    );

    // setTimeout(
    //   this.emitTemperatureValue.bind(this),
    //   this.generaterandomInterval()
    // );
  }

  private emitAirPressureValue() {
    const randomAirPressure = Math.floor(
      Math.random() * (1030 - 900 + 1) + 900
    );

    this.airPressureEmitter.emit(randomAirPressure);

    // setTimeout(
    //   this.emitAirPressureValue.bind(this),
    //   this.generaterandomInterval()
    // );
  }

  private emitHumidityValue() {
    const randomHumidity = Math.floor(Math.random() * (100 - 1 + 1) + 1);

    this.humidityEmitter.emit(randomHumidity);

    // setTimeout(
    //   this.emitHumidityValue.bind(this),
    //   this.generaterandomInterval()
    // );
  }

  private generaterandomInterval(): number {
    const randomIntervalMin = 100;
    const randomIntervalMax = 2000;
    return Math.floor(
      Math.random() * (randomIntervalMax - randomIntervalMin + 1) +
        randomIntervalMin
    );
  }
}
