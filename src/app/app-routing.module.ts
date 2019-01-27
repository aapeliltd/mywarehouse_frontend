import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ChooseWarehouseComponent } from "./components/choose-warehouse/choose-warehouse.component";
import { WarehouseChoiceGuardService } from "./services/warehouse-choice-guard.service";
import { WarehouseLocationComponent } from "./components/warehouse-location/warehouse-location.component";
import { WarehouseManagerComponent } from "./components/warehouse-manager/warehouse-manager.component";
import { NotifyUsComponent } from "./components/notify-us/notify-us.component";
import { TrackingComponent } from "./components/tracking/tracking.component";

const routes: Routes = [
  { path: "", component: DashboardComponent },
  {
    path: "choose-warehouse",
    component: ChooseWarehouseComponent,
    canActivate: [WarehouseChoiceGuardService]
  },
  {
    path: "warehouse-location",
    component: WarehouseLocationComponent,
    canActivate: [WarehouseChoiceGuardService]
  },
  {
    path: "warehouse-manager",
    component: WarehouseManagerComponent,
    canActivate: [WarehouseChoiceGuardService]
  },
  { path: "notify-us", component: NotifyUsComponent },

  { path: "tracking", component: TrackingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
