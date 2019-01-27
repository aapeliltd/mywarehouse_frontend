import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { TokenService } from "../../services/token.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-warehouse-location",
  templateUrl: "./warehouse-location.component.html",
  styleUrls: ["./warehouse-location.component.css"]
})
export class WarehouseLocationComponent implements OnInit {
  public warehouses = null;
  public message: boolean;
  public selectedWarehouses = null;
  public showEmpty: boolean;

  constructor(
    private auth: AuthService,
    private loading: NgxSpinnerService,
    private token: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.warehouseList();
    //get selected warehouses
    // this.getSelectedWarehouses();
  }

  //list of our warehouses...
  warehouseList() {
    this.loading.show();
    this.auth
      .getWarehouses(this.token.getCompany())
      .subscribe(data => this.handleData(data), error => console.log(error));
  }

  handleData(data) {
    this.loading.hide();
    if (data.result === undefined || data.result.length == 0) {
      this.showEmpty = true;
      this.warehouses = null;
    } else {
      this.showEmpty = false;
      this.warehouses = data.result;
      //console.log(data.result);
    }
  }

  chooseWarehouse() {
    this.router.navigate(["./choose-warehouse"]);
  }

  getSelectedWarehouses() {
    this.auth
      .getSelectedWarehouses(this.token.getCompany())
      .subscribe(
        data => this.handleSelected(data),
        error => console.log(error)
      );
  }

  handleSelected(data) {
    this.selectedWarehouses = data.result;
    // console.log(data);
  }

  handleWarehouseData(data) {
    this.loading.hide();
    this.warehouseList();

    // console.log(data);
  }

  selectWarehouse(warehouse_id) {
    //alert(warehouse_id);
    if (this.token.getWarehouseChoice() == "1") {
      this.message = false;
      //proceed...
      this.loading.show();
      this.auth
        .optForWarehouse(warehouse_id, this.token.getCompany())
        .subscribe(
          data => this.handleWarehouseData(data),
          error => console.log(error)
        );
    } else {
      this.message = true;
    }
  }
}
