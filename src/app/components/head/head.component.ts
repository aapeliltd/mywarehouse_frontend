import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { TokenService } from "../../services/token.service";
import { AuthenticationService } from "../../services/authentication.service";
import { ToasterService } from "angular2-toaster";
import { NgxSpinnerService } from "ngx-spinner";
import { NgxSmartModalService } from "ngx-smart-modal";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";


@Component({
  selector: "app-head",
  templateUrl: "./head.component.html",
  styleUrls: ["./head.component.css"]
})
export class HeadComponent implements OnInit {
  public hasLoggedin: boolean;
  public showSignUpForm: boolean;
  public termandcondition: boolean;
  public userExist: boolean;
  public boxListings = null;
  public box_message: boolean;
  public selected_warehouse_list = null;
  public boxes = null;
  public qtyPurchase = 0;
  public payButton: boolean;
  public userPrice = null;
  public userPrice2 = null;
  public user = {
    name: null,
    email: null
  };

  public signUpForm = {
    name: null,
    email: null,
    company: null,
    password: null
  };

  public loginForm = {
    email: null,
    password: null
  };

  public box = {
    qty: 1,
    cost: 0,
    total_cost: 0
  };

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

  public charge2 = {
    email: null,
    amount: 1000,
    card: {
      cvv: null,
      number: null,
      expiry_month: null,
      expiry_year: null
    }
  };

  public charge3 = {
    email: null,
    amount: 1000,
    card: {
      cvv: null,
      number: null,
      expiry_month: null,
      expiry_year: null
    }
  };

  public charge4 = {
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
    box: [],
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
    useraccount: null,
    accountName: null,
    monthCount: 1,
    subscriptionId: null
  };
  today = new Date();
  public walletDebit = {
    reference: null,
    debit: 0,
    date_in: null,
    auth_code: null,
    card_type: "MyWarehouse_PAY",
    ip_address: null,
    bank: "Wallet",
    company: null,
    box: []
  };

  public profile = {
    name:null,
    email:null,
    phone:null,
    website:null,
    logo:null,
    address:null,
  }

  public grand_total = 0;
  public line_qty = 0;
  public total_qty = 0;
  public charge_key_hold = null;
  public walletTransactions = null;
  public walletTotal = 0;
  public totalWalletCredit = 0;
  public totalWalletDebit = 0;
  public otherTransactions = null;
  public totalOtherTransaction = 0;
  public transactionReferece = null;
  public singleTransactions = null;
  public transactionPaidDay = null;
  public rowTotal = 0;
  public payFromMyWallet: boolean;
  public subscriptions = null;
  public openTrackings = null;
  public count_log = 0;
  public logs = null;


  constructor(
    private auth: AuthService,
    private token: TokenService,
    private authenticate: AuthenticationService,
    private toast: ToasterService,
    private spinner: NgxSpinnerService,
    public ngxSmartModalService: NgxSmartModalService,
    private router: Router
  ) {
    this.hasLoggedin = false;
    this.authenticate.authStatus.subscribe(value => (this.hasLoggedin = value));
    this.user.name = this.token.getName();
    this.user.email = this.token.getEmail();
    this.charge.email = this.token.getEmail();
    this.charge2.email = this.token.getEmail();
    this.purchaseBox.company = this.token.getCompany();
    this.getUserWarehouseChoice(this.token.getCompany());
    this.profile.email = this.token.getEmail();
  }

  ngOnInit() {
    this.getWalletTransactions();
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
    this.userPackagePrice();
    this.getOpenTracking(0);
    this.getlogs();
  }

  //support
  supports(event) {
    event.preventDefault();
    alert('Support on the way....');
  }

  //get open tracking
  getOpenTracking(status) {
    this.spinner.show();
    this.auth.getOpenTracking(this.token.getCompany(), status).subscribe(
      data => this.handleOpenTracking(data),
      error => console.log(error)
    )
  }

  handleOpenTracking(data) {
    this.spinner.hide();
    this.openTrackings = data.result;
  }

  //get logs
  getlogs() {
    this.auth.getlogs(this.token.getCompany()).subscribe(
      data => this.handleLogs(data),
      error => console.log(error)
    )
  }

  handleLogs(data) {
   // console.log(data);
    this.count_log = data.log_count.total_count;
    this.logs = data.result;
  }

  updatelogs() {
    //update to zero;
    this.auth.updateLogs(this.token.getCompany()).subscribe(
      data => this.handleUpdateLogs(data),
      error => console.log(error)
    )
  }

  handleUpdateLogs(data) {
    this.count_log = data.log_count.total_count;
  }


  extendUserAccount(id, user) {
    this.purchaseBox.subscriptionId = id;
    this.purchaseBox.useraccount = user;
    this.charge4.email = this.token.getEmail();
  }

  openTracking(event) {
    event.preventDefault();
    this.ngxSmartModalService.getModal('tracking').open();
  }

  payForBox4() {
    this.charge4.amount = this.userPrice2 * 100;
    if (this.charge4.amount <= 0) {
      alert("Amount can not be zero");
    } else {
    }
  }

  getCompanyProfile(){
    this.spinner.show();
    this.auth.getCompanyProfile(this.token.getCompany()).subscribe(
      data => this.handleCompanyData(data),
      error => console.log(error)
    )
  }

  handleCompanyData(data){
    this.spinner.hide();
    this.profile.email=data.profile.email;
    this.profile.name=data.profile.name;
    this.profile.phone=data.profile.phone;
    this.profile.website=data.profile.website;
    this.profile.logo=data.profile.logo;
    this.profile.address = data.profile.address;
  }
  updateCompanyProfile() {
    this.spinner.show();
    this.auth.updateCompanyProfile(this.token.getCompany(), this.profile).subscribe(
      data => this.handleUpdateCompanyProfile(data),
      error => console.log(error)
     )
  }

  handleUpdateCompanyProfile(data){
    this.spinner.hide();
    alert('Company profile updated successfully');
    this.ngxSmartModalService.getModal('companyprofile').close();
  }

  updateMonthCount() {
    var total = this.purchaseBox.monthCount * this.userPrice;
    this.userPrice2 = total;
  }

  //get system ip addres

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

  notifyUs() {
    this.router.navigate(["./choose-warehouse"]);
  }

  Onlynumber(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  //pay from wallet
  payFromWallet2() {
    this.walletDebit.debit = this.grand_total;
    if (this.grand_total > this.walletTotal) {
      alert(
        "Insufficient wallet balance. Kindly fund you wallet to continue or pay directly instead !"
      );
      this.payFromMyWallet = false;
      //console.log(this.walletDebit);
    } else {
      this.spinner.show();
      this.auth
        .payFromWallet2(this.walletDebit)
        .subscribe(
          data => this.handlePayFromWallet(data),
          error => console.log(error)
        );
    }
  }

  handlePayFromWallet(data) {
    this.spinner.hide();
    alert("Transaction successful");
    window.location.reload();
  }

  calculateTotalForOtherTransactions() {
    for (let i = 0; i < this.otherTransactions.length; i++) {
      this.totalOtherTransaction += +this.otherTransactions[i]["amount"];
    }
  }

  paymentFor2(id, reference, paidAt, cost) {
    this.transactionReferece = reference;
    this.transactionPaidDay = paidAt;
    this.rowTotal = cost;
    this.spinner.show();
    this.auth
      .getPaymentFor2(id)
      .subscribe(
        data => this.handlePaymentFor(data),
        error => console.log(error)
      );
  }
  //get the payment fetailsfor
  paymentFor(id, reference, paidAt, cost) {
    //alert(id);
    this.transactionReferece = reference;
    this.transactionPaidDay = paidAt;
    this.rowTotal = cost;
    this.spinner.show();
    this.auth
      .getPaymentFor(id)
      .subscribe(
        data => this.handlePaymentFor(data),
        error => console.log(error)
      );
  }

  handlePaymentFor(data) {
    this.spinner.hide();
    this.singleTransactions = data.result;
    console.log(data);
    this.ngxSmartModalService.getModal("singleWallet").open();
  }

  //get wallet total
  calculateWallet() {
    this.walletTotal = 0;
    this.totalWalletCredit = 0;
    this.totalWalletDebit = 0;

    for (let i = 0; i < this.walletTransactions.length; i++) {
      var diff =
        this.walletTransactions[i]["credit"] -
        this.walletTransactions[i]["debit"];
      this.totalWalletCredit += this.walletTransactions[i]["credit"];
      this.totalWalletDebit += this.walletTransactions[i]["debit"];
      this.walletTotal += diff;
    }
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
    this.userPrice2 = data.cost.cost;
    // this.charge3.amount = userPrice;
  }

  checkUserLoggedIn2(email) {
    this.auth
      .checkUserLoggedIn(email)
      .subscribe(
        data => this.handleUserLoggedIn2(data),
        error => console.log(error)
      );
  }
  handleUserLoggedIn2(data) {
    //console.log(data);
    if (data.result === undefined || data.result.length == 0) {
      this.payForSubscription();
      //this.userExist = false;
    } else {
      // this.userExist = true;
      alert("User already exist, Please use another email !");
    }
    //  console.log(this.userExist);
  }

  //pay for another user account
  //fund wallet
  payForBox3() {
    this.checkUserLoggedIn2(this.charge3.email);
  }

  payForSubscription() {
    this.spinner.show();
    this.charge3.amount = this.userPrice * 100;
    //console.log(this.charge3);
    // return false;
    this.auth
      .pay(this.charge3)
      .subscribe(
        data => this.handlePayUserAccount(data),
        error => console.log(error)
      );
  }
  handlePayUserAccount(data) {
    //this.spinner.hide();
    // console.log(data);
    //return false;
    if (data.status == true) {
      //save charges
      this.purchaseBox.email = data.data.customer.email;
      this.purchaseBox.amount = data.data.amount * 100;
      this.purchaseBox.qty = this.total_qty;
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
      this.purchaseBox.charge_key = Math.floor(Math.random() * 1000000 + 1);
      this.purchaseBox.useraccount = this.charge3.email;
      //console.log(this.purchaseBox);
      this.auth
        .addNewSubscriptionAccount(this.purchaseBox)
        .subscribe(
          data => this.handleReturnSubAccount(data),
          error => console.log(error)
        );
    } else {
      this.spinner.hide();
      alert("Transaction unsuccessful, Please try again !");
    }
  }

  handleReturnSubAccount(data) {
    this.spinner.hide();
    alert("Transaction Successful. Please close the payment window !");
    this.charge3.amount = 5000;
    this.charge3.card.cvv = null;
    this.charge3.card.number = null;
    this.charge3.card.expiry_month = null;
    this.charge3.card.expiry_year = null;
    //get the list of subscription here...
    this.subscriptions = data.result;
  }

  //fund wallet
  payForBox2() {
    this.spinner.show();
    console.log(this.charge2);
    this.auth
      .pay(this.charge2)
      .subscribe(
        data => this.handlePayDataWallet(data),
        error => console.log(error)
      );
  }
  handlePayDataWallet(data) {
    //this.spinner.hide();
    //console.log(data);
    if (data.status == true) {
      //save charges
      this.purchaseBox.email = data.data.customer.email;
      this.purchaseBox.amount = data.data.amount * 100;
      this.purchaseBox.qty = this.total_qty;
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
      this.purchaseBox.charge_key = Math.floor(Math.random() * 1000000 + 1);
      this.purchaseBox.wallet = 1;
      //console.log(this.purchaseBox);
      this.auth
        .addReturnCardChargesWallet(this.purchaseBox)
        .subscribe(
          data => this.handleReturnCardDataWallet(data),
          error => console.log(error)
        );
    } else {
      this.spinner.hide();
      alert("Transaction unsuccessful, Please try again !");
    }
  }

  handleReturnCardDataWallet(data) {
    this.spinner.hide();
    alert("Transaction Successful. Please close the payment window !");
    this.charge2.amount = 1000;
    this.charge2.card.cvv = null;
    this.charge2.card.number = null;
    this.charge2.card.expiry_month = null;
    this.charge2.card.expiry_year = null;
    this.walletTransactions = data.result3;
    this.calculateWallet();
    //console.log(data);
    // window.location.reload();
  }

  //get others transactions
  getOtherTransactions() {
    this.spinner.show();
    this.auth
      .getListOfOtherTransactions(this.token.getCompany())
      .subscribe(
        data => this.handleTransactionList(data),
        error => console.log(error)
      );
  }

  handleTransactionList(data) {
    this.spinner.hide();
    this.otherTransactions = data.result;
    this.calculateTotalForOtherTransactions();
  }

  //get wallet transactions
  getWalletTransactions() {
    this.spinner.show();
    this.auth
      .getWalletTransactions(this.token.getCompany())
      .subscribe(
        data => this.handleWalletData(data),
        error => this.handleWalletError(error)
      );
  }

  handleWalletData(data) {
    this.spinner.hide();
    this.walletTransactions = data.result3;
    this.calculateWallet();
  }

  handleWalletError(error) {
    this.spinner.hide();
    console.log(error);
  }

  //pay for box
  payForBox() {
    this.spinner.show();
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
      this.purchaseBox.qty = this.total_qty;
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
      //console.log(this.purchaseBox);
      this.auth
        .addReturnCardCharges(this.purchaseBox)
        .subscribe(
          data => this.handleReturnCardData(data),
          error => console.log(error)
        );
    } else {
      this.spinner.hide();
      alert("Transaction unsuccessful, Please try again !");
    }
  }
  handleReturnCardData(data) {
    this.spinner.hide();
    alert("Transaction Successful");
    window.location.reload();
  }
  //buy box
  buyBox(box_id, cost, item) {
    alert(item.line_qty);
  }
  calculateTotal() {
    //this.line_qty = event.target.value;
    this.charge_key_hold = Math.floor(Math.random() * 1000000 + 1);
    let sum = 0;
    this.purchaseBox.box = [];
    this.total_qty = 0;
    for (let i = 0; i < this.boxes.length; i++) {
      var qty = +this.boxes[i]["line_qty"];
      var line_total = qty * this.boxes[i]["cost"];
      //push to box line object
      var boxLine = {
        box_id: null,
        cost: null,
        qty: 1,
        charge_key: null,
        warehouse_id: null,
        company: null
      };

      for (let j = 0; j < +this.boxes[i]["line_qty"]; j++) {
        boxLine.box_id = this.boxes[i]["id"];
        boxLine.cost = this.boxes[i]["cost"];
        boxLine.charge_key = this.charge_key_hold;
        boxLine.warehouse_id = this.purchaseBox.warehouse;
        boxLine.company = this.token.getCompany();
        this.purchaseBox.box.push(boxLine);
        this.walletDebit.box.push(boxLine);
      }
      this.total_qty += qty;
      sum += line_total;
    }
    this.grand_total = sum;
    this.charge.amount = this.grand_total * 100;
    // console.log(this.purchaseBox);
  }
  clearChart(event) {
    event.preventDefault();
    this.grand_total = 0;
    this.qtyPurchase = 0;
  }
  payBox() {
    if (this.grand_total <= 0) {
      this.payButton = false;
    } else {
      this.payButton = true;
    }
  }

  //get subscription
  getOtherTransactions2() {
    this.spinner.show();
    this.auth
      .getOtherTransactions2(this.token.getCompany())
      .subscribe(data => this.handleSubData(data), error => console.log(error));
  }

  handleSubData(data) {
    this.spinner.hide();
    this.subscriptions = data.result;
  }

  //get boxes as per selected warehouse
  getBoxexAsPerWarehouse(warehouse_id) {
    this.purchaseBox.warehouse = warehouse_id;
    this.spinner.show();
    this.auth
      .getBoxesAsPerWarehouse(warehouse_id)
      .subscribe(
        data => this.handleWarehouseBoxes(data),
        error => console.log(error)
      );
  }

  handleWarehouseBoxes(data) {
    this.spinner.hide();
    this.boxes = data.result;
  }

  //get the selected warehouse
  getSelectedWarehouse() {
    this.auth
      .getSelectedWarehouses2(this.token.getCompany())
      .subscribe(
        data => this.handleSelectedWarehouseData(data),
        error => console.log(error)
      );
  }

  handleSelectedWarehouseData(data) {
    this.selected_warehouse_list = data.result;
  }

  openBoxList(event) {
    event.preventDefault();
    this.box_message = false;
    this.boxList();
    this.getSelectedWarehouse();
    if (this.token.getWarehouseChoice() == "1") {
      this.ngxSmartModalService.getModal("myModal2").open();
    } else {
      // show buy box message;
      this.box_message = true;
    }
  }

  //open wallet window
  openWallet(event) {
    event.preventDefault();
    this.getWalletTransactions();
    // this.calculateWallet();
    this.ngxSmartModalService.getModal("wallet").open();
  }

  //get list of boxes
  boxList() {
    this.spinner.show();
    this.auth
      .boxList()
      .subscribe(data => this.handleBoxData(data), error => console.log(error));
  }

  handleBoxData(data) {
    this.spinner.hide();
    this.boxListings = data.result;
  }

  // check if user is logged in
  checkUserLoggedIn(email) {
    this.auth
      .checkUserLoggedIn(email)
      .subscribe(
        data => this.handleUserLoggedIn(data),
        error => console.log(error)
      );
  }
  handleUserLoggedIn(data) {
    //console.log(data);

    if (data.result === undefined || data.result.length == 0) {
      this.signUpNow();
      this.userExist = false;
    } else {
      this.userExist = true;
    }
    //  console.log(this.userExist);
  }

  // sign up operation
  signUpAccount() {
    this.checkUserLoggedIn(this.signUpForm.email);
  }

  signUpNow() {
    this.auth
      .signUp(this.signUpForm)
      .subscribe(
        data => this.handleSignUpData(data),
        error => console.log(error)
      );
  }

  handleSignUpData(data) {
    // console.log(data);
    this.setDefaultToken(data);
    //alert("success");
    this.authenticate.changeAuthStatus(true);
    window.location.reload();
  }

  signUpLink(event) {
    event.preventDefault();
    this.showSignUpForm = !this.showSignUpForm;
  }

  //login
  login() {
    this.spinner.show();
    // console.log(this.loginForm);
    this.auth
      .login(this.loginForm)
      .subscribe(
        data => this.handleLoginData(data),
        error => this.loginErrorMessage(error)
      );
  }

  loginErrorMessage(error) {
    //alert(error.message);
  }

  handleLoginData(data) {
    console.log(data);
    if (data.message) {
      alert(data.message);
      this.spinner.hide();
    } else {
      this.spinner.hide();
      this.setDefaultToken(data);
      // alert("success");
      this.authenticate.changeAuthStatus(true);
      window.location.reload();
      // this.toast.pop("success", "success");
    }
  }

  logout(event) {
    event.preventDefault();
    this.token.remove();
    window.location.reload();
  }

  setDefaultToken(data) {
    this.token.setToken(data.token);
    this.token.setName(data.name);
    this.token.setEmail(data.email);
    this.token.setCompany(data.company);
    this.getUserWarehouseChoice(this.token.getCompany());
  }

  updateProfile() {
    this.getCompanyProfile();
    this.ngxSmartModalService.getModal('companyprofile').open();
  }

  //get user choice of warehouse
  getUserWarehouseChoice(company) {
    this.auth
      .getUserChoices(company)
      .subscribe(
        data => this.handleUserChoice(data),
        error => console.log(error)
      );
  }
  handleUserChoice(data) {
    //console.log(data.choice.choice);
    if (data.choice != undefined) {
      this.token.setWarehouseChoice(data.choice.choice);
    }

    // if (data.result === undefined || data.result.length == 0) {
    //  this.token.setWarehouseChoice(2);
    // } else {
    //  this.token.setWarehouseChoice(data.choice.choice);
    // }
  }
}
