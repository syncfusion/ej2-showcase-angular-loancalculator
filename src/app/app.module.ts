import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NumericTextBoxModule, SliderModule } from '@syncfusion/ej2-angular-inputs';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { AccumulationChartModule, ChartModule } from '@syncfusion/ej2-angular-charts';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { GridModule } from '@syncfusion/ej2-angular-grids';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './home/input/input.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { StatementComponent } from './statement/statement.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { GridAppComponent } from './grid-app/grid-app.component';

import { DataService } from './data-service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InputComponent,
    DashboardComponent,
    StatementComponent,
    BarChartComponent,
    GridAppComponent
  ],
  imports: [
    BrowserModule,
    NumericTextBoxModule,
    SliderModule,
    RadioButtonModule,
    AccumulationChartModule,
    DatePickerModule,
    ChartModule,
    GridModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
