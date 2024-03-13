import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NumericTextBoxModule, SliderModule } from '@syncfusion/ej2-angular-inputs';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { AccumulationChartModule, ChartModule } from '@syncfusion/ej2-angular-charts';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './home/input/input.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { StatementComponent } from './statement/statement.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { TreeGridAppComponent} from './grid-app/grid-app.component';

import { DataService } from './data-service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InputComponent,
    DashboardComponent,
    StatementComponent,
    BarChartComponent,
    TreeGridAppComponent
  ],
  imports: [
    BrowserModule,
    NumericTextBoxModule,
    SliderModule,
    RadioButtonModule,
    AccumulationChartModule,
    DatePickerModule,
    ChartModule,
    TreeGridModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
