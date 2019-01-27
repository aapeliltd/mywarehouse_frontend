import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { TokenService } from "../../services/token.service";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-choose-warehouse",
  templateUrl: "./choose-warehouse.component.html",
  styleUrls: ["./choose-warehouse.component.css"]
})
export class ChooseWarehouseComponent implements OnInit {
  public message: boolean;
  public choice = {
    mywarehouse: null,
    userwarehouse: null
  };
  public grand_total = 0;
  public payFromMyWallet: boolean;
  public charge = {
    email: null,
    amount: null,
    card: {
      cvv: null,
      number: null,
      expiry_month: null,
      expiry_year: null
    }
  };
  purchaseBox = {
    email: null,
    amount: null,
    qty: null,
    warehouse: null,
    package: null,
    authorization_code: null,
    bank: null,
    card_type: null,
    exp_month: null,
    exp_year: null,
    last4: null,
    brand: null,
    customer_code: null,
    ip_address: null,
    domain: null,
    first_name: null,
    last_name: null,
    paidAt: null,
    reference: null,
    charge_key: null,
    company: null,
    wallet: 0,
    bin: null,
    user: null
  };

  public walletDebit = {
    reference: null,
    debit: 0,
    date_in: null,
    auth_code: null,
    card_type: "MyWarehouse_PAY",
    ip_address: null,
    bank: "Wallet",
    company: null,
    user: null
  };

  public walletTotal = 0;
  public userPrice = 0;
  public charge_key_hold = 0;
  today = new Date();

  constructor(
    private auth: AuthService,
    private loading: NgxSpinnerService,
    private token: TokenService,
    private router: Router
  ) {}

  getIpAddress() {
    this.auth
      .getIpAddress()
      .subscribe(
        data => this.handleIpAddress(data),
        error => console.log(error)
      );
  }

  handleIpAddress(data) {
    this.walletDebit.ip_address = data.ip;
  }

  ngOnInit() {
    this.getChartData();
    this.userPackagePrice();
    this.charge.email = this.token.getEmail();
    this.walletDebit.company = this.token.getCompany();
    this.walletDebit.date_in = formatDate(
      this.today,
      "dd-MM-yyyy hh:mm:ss a",
      "en-US",
      "+1"
    );
    this.walletDebit.reference = Math.random()
      .toString(36)
      .replace("0.", "");
    this.walletDebit.auth_code =
      "Auth_" +
      Math.random()
        .toString(36)
        .replace("0.", "");
    this.getIpAddress();
    this.getWalletBalance();
    this.walletDebit.user = this.token.getEmail();
  }

  userPackagePrice() {
    this.auth
      .userPackagePrice()
      .subscribe(
        data => this.handleUserPackageData(data),
        error => console.log(error)
      );
  }

  handleUserPackageData(data) {
    this.userPrice = data.cost.cost;
    this.charge.amount = this.userPrice * 100;
  }

  payFromWallet2() {
    this.walletDebit.debit = this.userPrice;

    if (this.grand_total > this.walletTotal) {
      alert(
        "Insufficient wallet balance. Kindly fund you wallet to continue or pay directly instead !"
      );
      this.payFromMyWallet = false;
    } else {
      this.loading.show();
      this.auth
        .payFromWallet3(this.walletDebit)
        .subscribe(
          data => this.handlePayFromWallet(data),
          error => console.log(error)
        );
    }
  }

  handlePayFromWallet(data) {
    this.loading.hide();
    alert("Transaction successful");
    window.location.reload();
  }

  //pay for box
  payForBox() {
    //console.log(this.charge);
    //return false;
    this.charge_key_hold = Math.floor(Math.random() * 1000000 + 1);
    this.loading.show();
    //console.log(this.charge);
    this.auth
      .pay(this.charge)
      .subscribe(data => this.handlePayData(data), error => console.log(error));
  }
  handlePayData(data) {
    //this.spinner.hide();
    //console.log(data);
    if (data.status == true) {
      //save charges
      this.purchaseBox.email = data.data.customer.email;
      this.purchaseBox.amount = data.data.amount;
      this.purchaseBox.qty = 1;
      this.purchaseBox.authorization_code =
        data.data.authorization.authorization_code;
      this.purchaseBox.bank = data.data.authorization.bank;
      this.purchaseBox.card_type = data.data.authorization.card_type;
      this.purchaseBox.exp_month = data.data.authorization.exp_month;
      this.purchaseBox.exp_year = data.data.authorization.exp_year;
      this.purchaseBox.last4 = data.data.authorization.last4;
      this.purchaseBox.brand = data.data.authorization.brand;
      this.purchaseBox.customer_code = data.data.customer.customer_code;
      this.purchaseBox.ip_address = data.data.ip_address;
      this.purchaseBox.domain = data.data.domain;
      this.purchaseBox.first_name = data.data.customer.first_name;
      this.purchaseBox.last_name = data.data.customer.last_name;
      this.purchaseBox.paidAt = data.data.paidAt;
      this.purchaseBox.reference = data.data.reference;
      this.purchaseBox.bin = data.data.authorization.bin;
      this.purchaseBox.charge_key = this.charge_key_hold;
      this.purchaseBox.company = this.token.getCompany();
      this.purchaseBox.user = this.token.getEmail();
      //console.log(this.purchaseBox);
      this.auth
        .addReturnCardCharges4(this.purchaseBox)
        .subscribe(
          data => this.handleReturnCardData(data),
          error => console.log(error)
        );
    } else {
      this.loading.hide();
      alert("Transaction unsuccessful, Please try again !");
    }
  }
  handleReturnCardData(data) {
    this.loading.hide();
    alert("Transaction Successful");
    window.location.reload();
  }

  Onlynumber(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  selectWarehouse(choice) {
    //check if user has choosen a package before.
    if (this.token.getWarehouseChoice()) {
      this.message = true;
    } else {
      this.message = false;
      this.loading.show();
      this.auth
        .selectWarehouse(choice, this.token.getCompany())
        .subscribe(data => this.handleData(data), error => console.log(error));
    }
  }

  handleData(data) {
    this.loading.hide();
    alert("You have successfully chooses a package.");
    window.location.reload();
    //console.log(data);
    /*if (data.data == 1) {
      this.token.setWarehouseChoice(1);
      this.router.navigate(["./warehouse-location"]);
      //window.location.reload();
    } else {
      this.token.setWarehouseChoice(1);
      this.router.navigate(["./warehouse-manager"]);
      //window.location.reload();
    }
    */
  }

  getWalletBalance() {
    this.auth
      .getWalletBalance(this.token.getCompany())
      .subscribe(
        data => this.handleWalletBalance(data),
        error => console.log(error)
      );
  }

  handleWalletBalance(data) {
    this.walletTotal = data.total.walletBal;
    // console.log(data);
    //for (let i = 0; i < data.result.lenth; i++) {

    // }
  }

  //get the data
  getChartData() {
    this.auth
      .getChartData()
      .subscribe(
        data => this.handleChartData(data),
        error => console.log(error)
      );
  }

  handleChartData(data) {
    this.choice.mywarehouse = data.result[0]["total_in"];
    this.choice.userwarehouse = data.result[0]["total_out"];
  }
}
