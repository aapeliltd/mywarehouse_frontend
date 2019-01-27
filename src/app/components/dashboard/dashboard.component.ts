import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { TokenService } from "../../services/token.service";
import { AuthenticationService } from "../../services/authentication.service";
import { ToasterService } from "angular2-toaster";
import { NgxSpinnerService } from "ngx-spinner";
import { NgxSmartModalService } from "ngx-smart-modal";
import { Router } from "@angular/router";


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  public total_product = 0;
  public total_customer = 0;
  public total_vendor = 0;
  public total_open_purchase_order = 0;
  public total_closed_purchase_order = 0;
  public total_open_sale = 0;
  public total_close_sale = 0;
  public sales = null;
  public total_sales = 0;
  public purchase_orders = null;
  public boxes = null;

  constructor(
    private auth: AuthService,
    private token: TokenService,
    private authenticate: AuthenticationService,
    private toast: ToasterService,
    private spinner: NgxSpinnerService,
    public ngxSmartModalService: NgxSmartModalService,
    private router: Router,

  ) {
    this.getTotalDashboard();
    this.getSalesDashboard();
  }

  ngOnInit() {}

  getTotalDashboard() {
    this.auth.getTotalDashboard(this.token.getCompany()).subscribe(
      data => this.handleTotalDashboard(data),
      error => console.log(error)
    )
  }

  getSalesDashboard() {
    this.auth.getSalesDashboard(this.token.getCompany()).subscribe(
      data => this.handleDashboardSales(data),
      error => console.log(error)
    )
  }

  handleDashboardSales(data) {
    console.log(data);
    this.sales = data.orders;
    this.total_sales = data.total_sales.total;
    this.purchase_orders = data.purchase_orders;
    this.boxes = data.boxes;
    //console.log(this.total_sales);
  }

  handleTotalDashboard(data) {
    //console.log(data);
    this.total_product = data.total_product.total_product;
    this.total_customer = data.total_customers.total_customer;
    this.total_vendor = data.total_supplier.total_supplier;
    this.total_open_purchase_order = data.total_open_purchase.total_open_purchase;
    this.total_closed_purchase_order = data.total_closed_purchase.total_closed_purchase;
    this.total_open_sale = data.total_open_sale.total_open_sale;
    this.total_close_sale = data.total_closed_sale.total_closed_sale;
  }

}
