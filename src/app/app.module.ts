import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeadComponent } from './components/head/head.component';
import { TokenComponent } from './services/token/token.component';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChooseWarehouseComponent } from './components/choose-warehouse/choose-warehouse.component';
import { WarehouseLocationComponent } from './components/warehouse-location/warehouse-location.component';
import { WarehouseManagerComponent } from './components/warehouse-manager/warehouse-manager.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// Import angular-fusioncharts
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';

// Load FusionCharts Individual Charts
import * as Charts from 'fusioncharts/fusioncharts.charts';
import { WarehouseChartComponent } from './components/warehouse-chart/warehouse-chart.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { NotifyUsComponent } from './components/notify-us/notify-us.component';
import {ProgressBarModule} from "angular-progress-bar"
import { AgmCoreModule } from '@agm/core';
import { TrackingComponent } from './components/tracking/tracking.component';

// Use fcRoot function to inject FusionCharts library, and the modules you want to use
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme)

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeadComponent,
    TokenComponent,
    ChooseWarehouseComponent,
    WarehouseLocationComponent,
    WarehouseManagerComponent,
    WarehouseChartComponent,
    NotifyUsComponent,
    TrackingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToasterModule.forRoot(),
    NgxSpinnerModule,
    FusionChartsModule,
    NgxSmartModalModule.forRoot(),
    ProgressBarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBz9C1tv3LTEr0wMtf2WwcItx25u95eiU4Y'
    })
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
