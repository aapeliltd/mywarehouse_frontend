import { Component, OnInit } from "@angular/core";
import { TokenService } from "../../services/token.service";
import { AuthService } from "../../services/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { NgxSmartModalService } from "ngx-smart-modal";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: "app-warehouse-manager",
  templateUrl: "./warehouse-manager.component.html",
  styleUrls: ["./warehouse-manager.component.css"]
})
export class WarehouseManagerComponent implements OnInit {
  public warehouses = null;
  public warehouseChoice: boolean;
  public subscribed_boxes = null;
  public show_max_result: boolean;
  public pickup_date = null;
  public aceprice: boolean;
  public acePriceList = null;
  public checkAcePrice = 0;
  public chargePrice = 0;
  public acePickup = 0;
  public payViaWallet: boolean;
  public invBox:boolean;
  public boxes_inventories = null;

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

  warehouse = {
    name: null,
    location: null,
    pic: null,
    sqm: null,
    remarks: null,
    company: null,
    lat: null,
    log: null,
    id: null
  };

  vendor = {
    name: null,
    phone: null,
    email: null,
    address: null,
    company: null,
    vendorCustomer: 1,
    id: null
  };

  Selectedvendor = {
    name: null,
    phone: null,
    email: null,
    address: null,
    company: null,
    vendorCustomer: 1,
    id: null
  };

  notification = {
    message: null,
    notification_id: null,
    created_by: null,
    status: 1
  };

  product = {
    code: null,
    name: null,
    description: null,
    single_unit: null,
    case_measure: null,
    qty_per_case: null,
    sqm: null,
    cost: null,
    sale_price: null,
    company: null,
    id: null
  };

  Ace = {
    name: null,
    amount: null,
    paid: null
  };

  max = {
    origin: {
      address: null,
      lat: null,
      lng: null
    },
    destination: {
      address: null,
      lat: null,
      lng: null
    },
    service_id: "e6f9a0b7-8f03-431f-a3da-7fbc914bbb72"
  };

  maxResult = {
    delivery: null,
    pickup: null,
    delivery_fee: null,
    distance: null,
    duration: null
  };

  maxPickup = {
    pickup_datetime: null,
    service_id: "e6f9a0b7-8f03-431f-a3da-7fbc914bbb72"
  };

  purchaseOrder = {
    expected_delivered_date: formatDate(new Date(), "yyyy-MM-dd", "en"),
    vendor_id: null,
    company: null,
    warehouse: null,
    box_id: null,
    order_no: null,
    created_by: null,
    total: null,
    id: null,
    status: 0
  };

  saleOrder = {
    expected_delivered_date: formatDate(new Date(), "yyyy-MM-dd", "en"),
    customer_id: null,
    company: null,
    warehouse: null,
    box_id: null,
    order_no: null,
    created_by: null,
    total: null,
    id: null,
    status: 0,
    tax: null,
    collectMoney: null,
    send_warehouse: null,
    logistics: 0
  };

  public profile = {
    name: null,
    email: null,
    phone: null,
    website: null,
    logo: null,
    address: null
  };

  public sales = {
    box: 0,
    product: 0,
    price: 0,
    quantity: 1,
    tax: 0,
    lineTotal: 0,
    stock: 0,
    selectedBox: null,
    selectedProduct: null
  };

  public grand_total = 0;
  public chargeId = null;
  public grand_total_constant = null;
  public month_value = 1;
  public vendorcustomers = null;
  public products = null;
  public vendors = null;
  public purchaseOrderNumbers = null;
  public purchaseOrderCreated = null;
  public order_remarks = null;
  public order_number = null;
  public clientmessages = null;
  public products2: Array<any> = [];
  public collectMoney: boolean;

  public purchaseListings: Array<any> = [];
  public saleListings: Array<any> = [];
  public newPurchaseListing: any = {};
  public newSaleListing: any = {};
  public purchaseGrandTotal = 0;
  public rowCount = 0;
  public pushToMywarehouse: boolean;
  public orderSentToWarehouse: boolean;
  public purchaseOrderList = null;
  public boxes = null;
  public warehouse_name = null;
  public warehouse_id = null;
  public vendor_id = null;
  public warehouse_address = null;
  public printPurchaseListings = null;
  public printPurchaseListingTotal = 0;
  public openTrackings = null;
  public message_text = "New message";
  public new_message: boolean;
  public saleOrderNumber = null;
  public saleOrderCreated = null;
  public salesTotal = 0;
  public saleTaxTotal = 0;
  public saleGrandTotal = 0;
  public applySaleTax: boolean;

  purchaseBox = {
    email: null,
    amount: null,
    qty: null,
    warehouse: null,
    charge_id: null,
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
    month1: null,
    bin: null
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
    month1: null,
    charge_id: null
  };

  public payFromMyWallet: boolean;
  public walletTotal = 0;
  public warehouseName = null;
  public warehouseLocation = null;
  public warehouseLat = null;
  public warehouseLog = null;
  public customers = null;
  public saleRow = 0;
  public logistics = 0;
  public saleLists = null;
  public inventories = null;

  constructor(
    private token: TokenService,
    private auth: AuthService,
    private loading: NgxSpinnerService,
    public ngxSmartModalService: NgxSmartModalService,
    private router: Router
  ) {
    this.charge.email = this.token.getEmail();
    this.purchaseBox.company = this.token.getCompany();
    this.getWalletBalance();
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
    this.warehouse.company = this.token.getCompany();
    this.vendor.company = this.token.getCompany();
    this.product.company = this.token.getCompany();
    this.purchaseOrder.company = this.token.getCompany();
    this.getVendors(1);
    this.getVendors(2);
    this.newPurchaseListing.product = 0;
    this.newPurchaseListing.cost = 0;
    this.newPurchaseListing.box = 0;

    this.sales.product = 0;
    this.sales.tax = 0;
    this.sales.box = 0;

    this.newPurchaseListing.created_by = this.token.getEmail();
    this.newSaleListing.created_by = this.token.getEmail();
    this.notification.created_by = this.token.getEmail();
    this.purchaseOrder.created_by = this.token.getEmail();
    this.newPurchaseListing.product_code = null;
    this.newPurchaseListing.order_id = null;
    this.newSaleListing.product_code = null;
    this.newSaleListing.order_id = null;
    this.rowCount = 0;
    this.saleRow = 0;
    this.applySaleTax = false;
    this.collectMoney = false;
    this.payViaWallet = true;
    this.Ace.paid = false;

    //this.getOpenTracking(0);
  }
  TrackingManager(event) {
    event.preventDefault();
    this.openTrackings(0);
  }

  printSaleOrder() {
    alert('Please check back... we are currently working on it.');
  }

  showBoxInventory(charge_id) {
  //  alert('ok');
    this.invBox = !this.invBox;
    //console.log(this.invBox);
    if(this.invBox) {
      //do this
      this.loading.show();
      this.auth.getListBox(charge_id).subscribe(
        data => this.handleListBox(data),
        error => console.log(error)
      )
    }
  }

  handleListBox(data) {
    this.loading.hide();
    //console.log(data);
    this.boxes_inventories = data.boxes_inventories;
  }

  gotoInventory(id, name, location) {
    this.warehouseName = name;
    this.warehouseLocation = location;
    this.getBoxInventory();
    this.ngxSmartModalService.getModal('warehouseInventory').open();
  }

  getBoxInventory() {
    this.loading.show();
    this.auth.getBoxInventory(this.token.getCompany()).subscribe(
      data => this.handleInventoryBox(data),
      error => console.log(error)
    )
  }

  handleInventoryBox(data) {
    this.loading.hide();
    //console.log(data);
    this.inventories = data.inventories;
  }

  getPickupDate() {
    if (this.maxPickup.pickup_datetime == null) {
      alert("Pleaase enter a pickup date");
    } else {
      this.loading.show();
      //console.log(this.pickup_date);
      this.auth
        .getPickupWindow(this.maxPickup)
        .subscribe(
          data => this.handlePickupWindow(data),
          error => console.log(error)
        );
    }
  }

  handlePickupWindow(data) {
    this.loading.hide();
    console.log(data);
  }

  getSelectedPrice(price, id, event) {
    // alert(price);
    this.chargePrice = price;
    this.acePickup = id;
  }

  confirmPersonalPickup() {
    if (this.pickup_date == null) {
      alert("Please enter pick up date");
      return false;
    }
    this.loading.show();
    let pickup = {
      company_id: this.token.getCompany(),
      warehouse_id: this.warehouse_id,
      order: this.saleOrderNumber,
      pick_up_type: this.saleOrder.logistics,
      created_by: this.token.getEmail(),
      pickup_date: this.pickup_date
    };
    this.auth
      .confirmPersonalpickup(pickup)
      .subscribe(
        data => this.handlePersonalPickup(data),
        error => console.log(error)
      );
  }

  handlePersonalPickup(data) {
    this.loading.hide();
    this.Ace.name = data.data.name;
    this.Ace.amount = data.data.amount;
    this.Ace.paid = data.data.paid;
    this.ngxSmartModalService.getModal("maxpickup").close();
  }

  getAcePriceList() {
    this.loading.show();
    this.auth
      .getAcePriceList()
      .subscribe(
        data => this.handleAcePriceList(data),
        error => console.log(error)
      );
  }

  handleAcePriceList(data) {
    this.loading.hide();
    this.aceprice = true;
    this.acePriceList = data.results;
    //console.log(data);
  }

  payNowPickup() {
    //pay now pick up....
    this.charge.amount = this.chargePrice;
    if (this.chargePrice == 0) {
      alert("Please select price first.");
      return false;
    }
    if (this.pickup_date == null) {
      alert("please enter pick up date");
      return false;
    }
    this.chargeCard(this.charge);
  }

  chargeCard(charge) {
    alert("Please check back...");
  }

  confirmAcePickup() {
    if (this.chargePrice == 0) {
      alert("Please select price first.");
      return false;
    }
    if (this.pickup_date == null) {
      alert("please enter pick up date");
      return false;
    }
    if (this.walletTotal == null) {
      alert("Please fund your wallet first or pay via card instead");
      this.payViaWallet = false;
      return false;
    }
    if (this.walletTotal < this.chargePrice) {
      alert(
        "Insufficient fund. please fund your wallet first or pay via card instead"
      );
      this.payViaWallet = false;
      return false;
    }
    this.acePickUpOperations();
  }

  acePickUpOperations() {
    this.loading.show();
    let pickup = {
      company_id: this.token.getCompany(),
      warehouse_id: this.warehouse_id,
      order: this.saleOrderNumber,
      pick_up_type: this.saleOrder.logistics,
      created_by: this.token.getEmail(),
      pickup_date: this.pickup_date,
      amount: this.chargePrice,
      acepickup: this.acePickup
    };
    this.auth
      .confirmAcepickup(pickup)
      .subscribe(
        data => this.handleAcePickup(data),
        error => console.log(error)
      );
  }

  handleAcePickup(data) {
    // console.log(data);
    alert("success");
    this.loading.hide();
    this.Ace.name = data.data.name;
    this.Ace.amount = data.data.amount;
    this.Ace.paid = data.data.paid;
    // console.log(this.Ace);
    this.ngxSmartModalService.getModal("maxpickup").close();
  }

  confirmPickupDate() {
    //alert(this.saleOrderNumber);
    //return false;
    this.loading.show();
    let pickup = {
      company_id: this.token.getCompany(),
      warehouse_id: this.warehouse_id,
      order: this.saleOrderNumber,
      pick_up_type: this.saleOrder.logistics,
      origin: this.max.origin.address,
      origin_lat: this.max.origin.lat,
      origin_lng: this.max.origin.lng,
      destination: this.max.destination.address,
      destination_lat: this.max.destination.lat,
      destination_lng: this.max.destination.lng,
      weight: null,
      distance: this.maxResult.distance,
      duration: this.maxResult.duration,
      created_by: this.token.getEmail(),
      pickup_date: this.pickup_date,
      amount: this.maxResult.delivery_fee
    };
    this.auth
      .confirmPickup(pickup)
      .subscribe(
        data => this.handleConfirmPickup(data),
        error => console.log(error)
      );
  }

  handleConfirmPickup(data) {
    this.loading.hide();
    alert("Operation was successful");
    this.Ace.name = data.data.name;
    this.Ace.amount = data.data.amount;
    this.Ace.paid = data.data.paid;
    this.ngxSmartModalService.getModal("maxpickup").close();
  }

  SendSalesToWarehouse() {
    if (this.saleOrder.id == null) {
      alert("Please update first before sending....");
      return false;
    }
    //sending to sales to warehouse
    this.loading.show();
    this.auth
      .sendWarehouse(this.saleOrder.id)
      .subscribe(
        data => this.handleWarehouse1(data),
        error => console.log(error)
      );
  }

  handleWarehouse1(data) {
    this.loading.hide();
    alert("success");
    this.saleOrder = data.result;
    console.log(this.saleOrder);
  }

  getPriceEstimate() {
    //console.log(this.max);
    if (this.max.destination.address == null) {
      alert("Please enter destination address");
      return false;
    }
    if (this.pickup_date == null) {
      alert("Please enter a pick up date");
      return false;
    }
    this.loading.show();
    this.auth
      .getGeometricLocation(this.max.destination.address)
      .subscribe(
        data => this.handleGoogleLocation(data),
        error => console.log(error)
      );
  }

  handleGoogleLocation(data) {
    //console.log(data.results);
    let results = data.results;
    for (let i = 0; i < results.length; i++) {
      this.max.destination.address = results[i]["formatted_address"];
      this.max.destination.lat = results[i]["geometry"]["location"]["lat"];
      this.max.destination.lng = results[i]["geometry"]["location"]["lng"];
    }
    if (data.status) {
      this.auth
        .getPriceWindow(this.max)
        .subscribe(
          data => this.handlePriceWindow(data),
          error => console.log(error)
        );
    } else {
      this.loading.hide();
      alert("Something went wrong, please try again !");
    }
  }

  handlePriceWindow(data) {
    this.loading.hide();
    if (data.status == "success") {
      this.show_max_result = true;
      this.maxResult.delivery = data.data.delivery;
      this.maxResult.pickup = data.data.pickup;
      this.maxResult.delivery_fee =
        data.data.delivery_fee + 0.1 * data.data.delivery_fee;
      this.maxResult.distance = data.data.distance;
      this.maxResult.duration = data.data.duration;
    } else {
      alert("Something went wrong !");
    }
  }

  getCollectMoney() {
    this.collectMoney = !this.collectMoney;
    //alert(this.collectMoney);
  }

  addsale() {
    this.saleRow = 0;
    if (this.sales.stock == 0) {
      alert("no product in stock, make purchase order and try again");
      return;
    }
    if (this.saleListings.length > 0) {
      for (let i = 0; this.saleListings.length; i++) {
        if (this.saleListings[i]["product"] == this.sales.product) {
          alert("Product already added, please delete and re-add");
          return false;
        }
      }
    }
    this.saleListings.push(this.sales);
    this.sales = {
      box: 0,
      product: 0,
      price: 0,
      quantity: 1,
      tax: 0,
      lineTotal: 0,
      stock: 0,
      selectedBox: null,
      selectedProduct: null
    };

    //get total
    this.calculateSaleTotal();
    //console.log(this.saleListings);
    //alert(this.logistics);
  }

  UpdateSalesChanges() {
    if (this.saleOrder.customer_id == null) {
      alert("Please enter customer");
      return false;
    }
    if (this.saleOrder.logistics == 0) {
      alert("Please select one pick up service");
      return false;
    }
    this.loading.show();
    this.saleOrder.total = this.saleGrandTotal;
    this.saleOrder.tax = this.applySaleTax;
    this.saleOrder.collectMoney = this.collectMoney;
    this.saleOrder.created_by = this.token.getName();
    this.saleOrder.status = 0;
    this.saleOrder.send_warehouse = 0;

    let data = {
      sale_order: this.saleOrder,
      purchase_order: this.saleListings
    };

    //console.log(data);
    //console.log(data);
    //return false;

    this.auth
      .makeOrderFulfilment(data)
      .subscribe(
        data => this.handleOrderFulfilment(data),
        error => console.log(error)
      );

    //console.log(data);
  }

  handleOrderFulfilment(data) {
    alert("success");
    this.loading.hide();
    // console.log(data);
    this.saleOrder = data.data;
    this.getOpenSaleOrders(0);
    // console.log(this.saleOrder);
  }

  calculateSaleTotal() {
    let total = 0;
    let tax = 0;
    if (this.saleListings.length > 0) {
      for (let i = 0; i < this.saleListings.length; i++) {
        //  this.purchaseGrandTotal += this.purchaseListings[i]["lineTotal"];
        var ts =
          this.saleListings[i]["quantity"] * this.saleListings[i]["price"];
        total += ts;
        this.saleRow++;
      }
    }
    // this.saleTaxTotal = tax;
    this.salesTotal = total;
    this.getAppliedTax();
  }

  getLogistic() {
    this.ngxSmartModalService.getModal("maxpickup").open();
  }

  getAppliedTax() {
    this.applySaleTax = !this.applySaleTax;
    if (this.applySaleTax) {
      this.saleTaxTotal = 0.05 * this.salesTotal;
    } else {
      this.saleTaxTotal = 0;
    }
    this.saleGrandTotal = this.salesTotal + this.saleTaxTotal;
  }

  //open new message
  openNewBox() {
    this.new_message = !this.new_message;
    if (this.new_message) {
      this.message_text = "Hide";
    } else {
      this.message_text = "New message";
    }
  }

  addNewMessage() {
    // console.log(this.notification);
    this.auth
      .sendMessage(this.notification)
      .subscribe(data => this.handleMessage(data), error => console.log(error));
  }

  handleMessage(data) {
    this.clientmessages = data.result;
    this.notification.message = null;
  }

  //get client message
  openClientMessage(notification_id, name, order_no, remarks, event) {
    this.warehouseName = name;
    this.order_remarks = remarks;
    this.order_number = order_no;
    this.notification.notification_id = notification_id;
    event.preventDefault();
    this.auth
      .getClientMessage(notification_id)
      .subscribe(
        data => this.handleClientMessage(data),
        error => console.log(error)
      );
  }

  handleClientMessage(data) {
    this.clientmessages = data.result;
    this.ngxSmartModalService.getModal("client_massage").open();
  }

  //get open tracking
  getOpenTracking(status) {
    this.rowCount = 0;
    this.loading.show();
    this.auth
      .getOpenTracking(this.token.getCompany(), status)
      .subscribe(
        data => this.handleOpenTracking(data),
        error => console.log(error)
      );
  }

  handleOpenTracking(data) {
    this.loading.hide();
    this.openTrackings = data.result;
    this.ngxSmartModalService.getModal("tracking").open();
  }

  productManager(event) {
    event.preventDefault();
    this.getproducts();
    console.log(this.products);
    this.ngxSmartModalService.getModal("productmanager1").open();
  }
  getproducts() {
    this.loading.show();
    this.auth
      .getproducts(this.token.getCompany())
      .subscribe(data => this.handleProds(data), error => console.log(error));
  }

  printPdf() {
    var data = document.getElementById("contentToConvert");
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save(this.purchaseOrder.order_no + ".pdf"); // Generated PDF
    });
  }

  addFieldValue() {
    if (this.newPurchaseListing.product == 0) {
      alert("Please select product first !");
      return false;
    }

    this.purchaseListings.push(this.newPurchaseListing);
    this.newPurchaseListing = {};
    this.newPurchaseListing.product = 0;
    this.newPurchaseListing.cost = 0;
    this.newPurchaseListing.box = 0;
    this.newPurchaseListing.serialno = null;
    this.rowCount = 0;
    this.purchaseGrandTotal = 0;

    for (let i = 0; i < this.purchaseListings.length; i++) {
      this.purchaseGrandTotal += this.purchaseListings[i]["lineTotal"];
      this.rowCount++;
    }
    this.purchaseOrder.total = this.purchaseGrandTotal;
    this.newPurchaseListing.product_code = this.purchaseOrder.order_no;
    this.newPurchaseListing.order_id = this.purchaseOrder.id;
    this.newPurchaseListing.created_by = this.token.getEmail();
  }

  addFieldValue2() {
    if (this.newSaleListing.box == 0) {
      alert("Please select box first !");
      return false;
    }

    this.saleListings.push(this.newSaleListing);
    this.newSaleListing = {};
    this.newSaleListing.product_list = null;
    //this.products2 = null;
    this.newSaleListing.product = 0;
    this.newSaleListing.tax = 0;
    this.newSaleListing.box = 0;
    this.rowCount = 0;
    // this.purchaseGrandTotal = 0;
    for (let i = 0; i < this.saleListings.length; i++) {
      // this.purchaseGrandTotal += this.saleListings[i]["lineTotal"];
      this.rowCount++;
    }
    // this.saleOrder.total = this.purchaseGrandTotal;
    this.newSaleListing.product_code = this.saleOrder.order_no;
    this.newSaleListing.order_id = this.saleOrder.id;
    this.newSaleListing.created_by = this.token.getEmail();

    console.log(this.saleListings);
  }

  deleteFieldValue(index) {
    this.rowCount = 0;
    this.purchaseListings.splice(index, 1);
    for (let i = 0; i < this.purchaseListings.length; i++) {
      //  this.purchaseGrandTotal += this.purchaseListings[i]["lineTotal"];
      this.rowCount++;
    }
  }

  deleteSaleRow(index) {
    this.saleRow = 0;
    this.saleListings.splice(index, 1);
    this.calculateSaleTotal();
  }

  getBoxProduct(selected: any) {
    //get the selected text of value

    if (this.boxes && this.sales.box) {
      let status = this.boxes.find(s => s.id == selected);
      if (status) {
        this.sales.selectedBox =
          status.name + "/" + status.boxid + "-" + status.charge_box_id;
      } else {
        this.sales.selectedBox = "";
      }
    }

    this.loading.show();
    this.auth
      .getBoxProduct(selected)
      .subscribe(
        data => this.handleBoxProducts(data),
        error => console.log(error)
      );
  }

  handleBoxProducts(data) {
    this.loading.hide();
    this.products2 = data.result;
    var selected_id = data.result.length;
    //alert(selected_id);
    if (selected_id == 0) {
      //this.sales.product = 0;
      alert("there are no products in the selected box");
    } else {
      // this.sales.product = data.result[0]['id'];
    }
  }

  getSelectedVendors() {
    this.auth
      .getSelectedVendors(this.purchaseOrder.vendor_id)
      .subscribe(
        data => this.handleVendorData(data),
        error => console.log(error)
      );
  }

  handleVendorData(data) {
    this.Selectedvendor.name = data.vendor.name;
    this.Selectedvendor.address = data.vendor.address;
    this.Selectedvendor.phone = data.vendor.phone;
    this.Selectedvendor.email = data.vendor.email;
  }

  getCompanyProfile() {
    this.loading.show();
    this.auth
      .getCompanyProfile(this.token.getCompany())
      .subscribe(
        data => this.handleCompanyData(data),
        error => console.log(error)
      );
  }

  handleCompanyData(data) {
    this.loading.hide();
    this.profile.email = data.profile.email;
    this.profile.name = data.profile.name;
    this.profile.phone = data.profile.phone;
    this.profile.website = data.profile.website;
    this.profile.logo = data.profile.logo;
    this.profile.address = data.profile.address;
  }

  getLineTotalTax() {
    if (this.purchaseListings.length > 0) {
      for (let i = 0; i < this.purchaseListings.length; i++) {
        if (this.purchaseListings[i]["tax"] > 0) {
          this.purchaseListings[i]["lineTotal"] =
            0.05 *
              this.purchaseListings[i]["quantity"] *
              this.purchaseListings[i]["cost"] +
            this.purchaseListings[i]["quantity"] *
              this.purchaseListings[i]["cost"];
        } else {
          this.purchaseListings[i]["lineTotal"] =
            this.purchaseListings[i]["quantity"] *
            this.purchaseListings[i]["cost"];
        }
      }
    } else {
      if (this.newPurchaseListing.tax > 0) {
        this.newPurchaseListing.lineTotal =
          0.05 *
            this.newPurchaseListing.quantity *
            this.newPurchaseListing.cost +
          this.newPurchaseListing.quantity * this.newPurchaseListing.cost;
      } else {
        this.newPurchaseListing.lineTotal =
          this.newPurchaseListing.quantity * this.newPurchaseListing.cost;
      }
    }
  }

  getLineTotal() {
    if (this.purchaseListings.length > 0) {
      for (let i = 0; i < this.purchaseListings.length; i++) {
        if (this.purchaseListings[i]["tax"] > 0) {
          this.purchaseListings[i]["lineTotal"] =
            0.05 *
              this.purchaseListings[i]["quantity"] *
              this.purchaseListings[i]["cost"] +
            this.purchaseListings[i]["quantity"] *
              this.purchaseListings[i]["cost"];
        } else {
          this.purchaseListings[i]["lineTotal"] =
            this.purchaseListings[i]["quantity"] *
            this.purchaseListings[i]["cost"];
        }
      }
    } else {
      if (this.newPurchaseListing.tax > 0) {
        this.newPurchaseListing.lineTotal =
          0.05 *
            this.newPurchaseListing.quantity *
            this.newPurchaseListing.cost +
          this.newPurchaseListing.quantity * this.newPurchaseListing.cost;
      } else {
        this.newPurchaseListing.lineTotal =
          this.newPurchaseListing.quantity * this.newPurchaseListing.cost;
      }
    }
  }

  getLineTotalTax2() {
    if (this.saleListings.length > 0) {
      for (let i = 0; i < this.saleListings.length; i++) {
        if (this.saleListings[i]["tax"] > 0) {
          this.saleListings[i]["lineTotal"] =
            0.05 *
              this.saleListings[i]["quantity"] *
              this.saleListings[i]["cost"] +
            this.saleListings[i]["quantity"] * this.saleListings[i]["cost"];
        } else {
          this.saleListings[i]["lineTotal"] =
            this.saleListings[i]["quantity"] * this.saleListings[i]["cost"];
        }
      }
    } else {
      if (this.newSaleListing.tax > 0) {
        this.newSaleListing.lineTotal =
          0.05 * this.newSaleListing.quantity * this.newSaleListing.cost +
          this.newSaleListing.quantity * this.newSaleListing.cost;
      } else {
        this.newSaleListing.lineTotal =
          this.newSaleListing.quantity * this.newSaleListing.cost;
      }
    }
  }

  getLineTotal2() {
    if (this.saleListings.length > 0) {
      for (let i = 0; i < this.saleListings.length; i++) {
        if (this.saleListings[i]["tax"] > 0) {
          this.saleListings[i]["lineTotal"] =
            0.05 *
              this.saleListings[i]["quantity"] *
              this.saleListings[i]["cost"] +
            this.saleListings[i]["quantity"] * this.saleListings[i]["cost"];
        } else {
          this.saleListings[i]["lineTotal"] =
            this.saleListings[i]["quantity"] * this.saleListings[i]["cost"];
        }
      }
    } else {
      if (this.newSaleListing.tax > 0) {
        this.newSaleListing.lineTotal =
          0.05 * this.newSaleListing.quantity * this.newSaleListing.cost +
          this.newSaleListing.quantity * this.newSaleListing.cost;
      } else {
        this.newSaleListing.lineTotal =
          this.newSaleListing.quantity * this.newSaleListing.cost;
      }
    }
  }

  UpdatePurchaseListings() {
    if (this.purchaseListings.length <= 0) {
      alert("Please at least add one row");
      return false;
    }
    this.UpdatePurchaseListings2();
    this.updatePurchaseOrder2();
  }

  sendToWarehouse() {
    if (this.token.getWarehouseChoice() == "1") {
      this.loading.show();
      this.auth
        .sendTowarehouse(this.purchaseOrder.id, this.purchaseGrandTotal)
        .subscribe(
          data => this.handleSendtoWarehouseData(data),
          error => console.log(error)
        );
    } else {
      alert(
        "You will need to subscribe to myWarehouse services before we manage your orders"
      );
    }
  }
  handleSendtoWarehouseData(data) {
    this.loading.hide();
    if (data.data == 1) {
      alert(
        "This orders has been received, therefore, changes will not be committed."
      );
    } else if (data.data == 2) {
      alert(
        "Orders has already been sent, however, you can still make changes to orders"
      );
      this.orderSentToWarehouse = true;
    } else {
      alert(
        "Orders has been sent to warehouse, you will be notified once we received them"
      );
      this.orderSentToWarehouse = true;
    }
  }

  warehouseOrder() {
    alert(
      "Orders has already been sent, however, you can still make changes to orders"
    );
  }

  UpdatePurchaseListings2() {
    //console.log(this.purchaseListings);
    //return false;
    this.loading.show();
    this.auth
      .addPurchaseListings(this.purchaseListings, this.purchaseOrder.id)
      .subscribe(
        data => this.handlePurchaselings(data),
        error => console.log(error)
      );
  }

  handlePurchaselings(data) {
    this.loading.hide();
    if (data.data) {
      this.pushToMywarehouse = true;
      alert("Changes committed successfully");
    }
    if (!data.data) {
      alert(
        "This orders has been received, therefore, changes will not be committed."
      );
    }
  }

  getCostPrice(product) {
    this.auth
      .getCostPrice(product)
      .subscribe(
        data => this.handleProductCost2(data),
        error => console.log(error)
      );
  }

  handleProductCost2(data) {}

  getCostPrice2(event) {
    var product = event.target.value;
    if (this.products2 && this.sales.product) {
      let status = this.products2.find(s => s.id == product);
      if (status) {
        this.sales.selectedProduct =
          status.name + "-" + status.product_row_code;
      } else {
        this.sales.selectedProduct = "";
      }
    }
    this.loading.show();
    this.auth
      .getCostPrice(product)
      .subscribe(
        data => this.handleProductCost(data),
        error => console.log(error)
      );
  }

  handleProductCost(data) {
    this.loading.hide();
    this.sales.price = data.product.sale_price;
    this.sales.stock = data.stock.total_stock;
  }

  handleProds(data) {
    this.loading.hide();
    this.products = data.result;
  }

  submitProduct() {
    this.loading.show();
    this.auth
      .addproduct(this.product)
      .subscribe(
        data => this.handleProductData(data),
        error => console.log(error)
      );
  }

  handleProductData(data) {
    this.loading.hide();
    this.products = data.result;
    if (!this.product.id) {
      this.product.code = null;
      this.product.name = null;
      this.product.description = null;
      this.product.single_unit = null;
      this.product.case_measure = null;
      this.product.qty_per_case = null;
      this.product.sqm = null;
      this.product.cost = null;
      this.product.sale_price = null;
      alert("success");
      this.ngxSmartModalService.getModal("productNew").close();
    }
  }

  addnewproduct() {
    this.product.code = null;
    this.product.name = null;
    this.product.description = null;
    this.product.single_unit = null;
    this.product.case_measure = null;
    this.product.qty_per_case = null;
    this.product.sqm = null;
    this.product.cost = null;
    this.product.sale_price = null;
    this.product.id = null;
    this.ngxSmartModalService.getModal("productNew").open();
  }

  editProduct(
    code,
    name,
    description,
    single_unit,
    case_measure,
    qty_per_case,
    sqm,
    cost,
    sale_price,
    id
  ) {
    this.product.code = code;
    this.product.name = name;
    this.product.description = description;
    this.product.single_unit = single_unit;
    this.product.case_measure = case_measure;
    this.product.qty_per_case = qty_per_case;
    this.product.sqm = sqm;
    this.product.cost = cost;
    this.product.sale_price = sale_price;
    this.product.id = id;
  }

  updatePurchaseOrder() {
    //console.log(this.purchaseOrder);
    this.purchaseOrder.total = this.purchaseGrandTotal;
    this.updatePurchaseOrder2();
  }

  updatePurchaseOrder2() {
    this.purchaseOrder.status = 0;
    // console.log(this.purchaseOrder);
    //return false;
    this.loading.show();
    this.auth
      .updatePurchaseOrder(this.purchaseOrder)
      .subscribe(
        data => this.handlePurchaseOrder(data),
        error => console.log(error)
      );
  }

  handlePurchaseOrder(data) {
    this.loading.hide();
    console.log(data);

    this.purchaseOrderNumbers = data.order.order_no + " - ";
    this.purchaseOrderCreated =
      " Expected: " + data.order.expected_delivered_date;

    this.purchaseOrder.warehouse = data.order.warehouse;
    this.purchaseOrder.vendor_id = data.order.vendor_id;
    this.purchaseOrder.expected_delivered_date =
      data.order.expected_delivered_date;
    this.purchaseOrder.box_id = data.order.box_id;
    this.purchaseOrder.order_no = data.order.order_no;
    this.purchaseOrder.id = data.order.id;
    this.newPurchaseListing.product_code = data.order.order_no;
    this.newPurchaseListing.order_id = data.order.id;
    this.purchaseOrder.status = data.order.status;
  }

  getVendorCustomers(event) {
    this.loading.show();
    var id = event.target.value;
    this.getVendors(id);
  }
  editVendor(name, phone, email, address, vendorCustomer, id) {
    this.vendor.name = name;
    this.vendor.phone = phone;
    this.vendor.address = address;
    this.vendor.email = email;
    this.vendor.vendorCustomer = vendorCustomer;
    this.vendor.id = id;
  }

  getVendors(id) {
    this.auth
      .getVendorCustomers(id)
      .subscribe(
        data => this.handleVendorCustomer(data),
        error => console.log(error)
      );
  }

  handleVendorCustomer(data) {
    this.loading.hide();
    this.vendorcustomers = data.result;
    this.vendors = data.result;
    this.customers = data.result;
  }

  submitVendor() {
    this.loading.show();
    this.auth
      .addVendor(this.vendor)
      .subscribe(data => this.handleVendor(data), error => console.log(error));
  }

  addvendorcustomer() {
    this.vendor.id = null;
    this.vendor.name = null;
    this.vendor.phone = null;
    this.vendor.email = null;
    this.vendor.address = null;
    //alert("Success");
    this.ngxSmartModalService.getModal("vendorMyForm").open();
  }

  handleVendor(data) {
    this.loading.hide();
    if (!this.vendor.id) {
      this.vendor.name = null;
      this.vendor.phone = null;
      this.vendor.email = null;
      this.vendor.address = null;
    }
    this.vendorcustomers = data.result;
    this.vendors = data.result;
    this.customers = data.result;
    alert("success");
    this.ngxSmartModalService.getModal("vendorMyForm").close();
  }

  editWarehouse(id, name, location, pic, lat, log, sqm, event) {
    event.preventDefault();
    this.warehouse.name = name;
    this.warehouse.location = location;
    this.warehouse.pic = pic;
    this.warehouse.lat = lat;
    this.warehouse.log = log;
    this.warehouse.sqm = sqm;
    this.warehouse.id = id;
    this.ngxSmartModalService.getModal("newwarehouse").open();
  }

  addNewWarehouse() {
    // this.warehouse.id = null;
    this.loading.show();
    this.auth
      .addNewWarehouse(this.warehouse)
      .subscribe(
        data => this.handleNewWarehouseData(data),
        error => console.log(error)
      );
  }

  handleNewWarehouseData(data) {
    this.loading.hide();
    alert("Operation was successful");
    if (!this.warehouse.id) {
      this.warehouse.name = null;
      this.warehouse.pic = null;
      this.warehouse.location = null;
      this.warehouse.remarks = null;
      this.warehouse.sqm = null;
      this.warehouse.lat = null;
      this.warehouse.log = null;
    }

    this.warehouses = data.result;
  }

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

  getWalletBalance() {
    this.auth
      .getWalletBalance(this.token.getCompany())
      .subscribe(
        data => this.handleWalletBalance(data),
        error => console.log(error)
      );
  }

  handleWalletBalance(data) {
    console.log("total wallet" + data.total.walletBal);
    this.walletTotal = data.total.walletBal;
    // console.log(data);
    //for (let i = 0; i < data.result.lenth; i++) {

    // }
  }

  payFromWallet2() {
    this.walletDebit.debit = this.grand_total;
    this.walletDebit.month1 = this.month_value;
    if (this.grand_total < 0) {
      alert(
        "Please amount cannot be zero, Please enter number of month count."
      );
    } else if (this.grand_total > this.walletTotal) {
      alert("Insufficient wallet balance or pay directly instead");
      this.payFromMyWallet = false;
    } else {
      this.loading.show();
      this.auth
        .RenewFromWallet(this.walletDebit)
        .subscribe(
          data => this.handleWalletData(data),
          error => console.log(error)
        );
    }
  }

  handleWalletData(data) {
    this.loading.hide();
    alert("Transaction successful");
    window.location.reload();
  }

  getBoxDetails(cost, chargeId, warehouse_id) {
    //alert(chargeId);
    this.purchaseBox.warehouse = warehouse_id;
    this.purchaseBox.charge_key = Math.floor(Math.random() * 1000000 + 1);
    this.grand_total = cost;
    this.chargeId = chargeId;
    this.grand_total_constant = cost;
    this.month_value = 1;
    this.purchaseBox.charge_id = chargeId;
    this.walletDebit.charge_id = chargeId;
    this.charge.amount = cost * 100;
  }

  //update cost on months entered
  updateCost(event) {
    var month = this.month_value;
    this.grand_total = this.grand_total_constant * month;
    this.charge.amount = this.grand_total * 100;
  }

  viewDirection(name, location, lat, log, event) {
    event.preventDefault();
    this.warehouseName = name;
    this.warehouseLocation = location;
    this.warehouseLat = lat;
    this.warehouseLog = log;
    this.ngxSmartModalService.getModal("warehousemap").open();
  }

  //pay for renewal
  payForBoxRenewal() {
    if (this.grand_total < 0) {
      alert("Amount can not be zero, Please enter month count");
    } else {
      this.loading.show();
      //console.log(this.charge);
      this.auth
        .pay(this.charge)
        .subscribe(
          data => this.handlePayData(data),
          error => console.log(error)
        );
    }
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
      this.purchaseBox.month1 = this.month_value;
      this.purchaseBox.bin = data.data.authorization.bin;
      // this.purchaseBox.charge_key = this.charge_key_hold;
      //console.log(this.purchaseBox);
      this.auth
        .addReturnCardCharges2(this.purchaseBox)
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
    alert("Transaction Successful, please close the  window");
    this.subscribed_boxes = data.result;
    this.charge.card.cvv = null;
    this.charge.card.number = null;
    this.charge.card.expiry_month = null;
    this.charge.card.expiry_year = null;
    this.month_value = 1;
  }

  //remaining days
  remainDays(days) {
    alert(
      "Hello, You have " + days + " left, please renew on time. Thank you !"
    );
  }

  Onlynumber(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  //open modal, then showing the list of the boxes
  loadBox() {
    this.loading.show();
    this.auth
      .loadSubcribedBox(this.token.getCompany())
      .subscribe(data => this.handleLoadBox(data), error => console.log(error));
  }

  handleLoadBox(data) {
    this.loading.hide();
    //console.log(data);
    this.subscribed_boxes = data.result;
  }

  ngOnInit() {
    this.getWarehouseList();
    if (this.token.getWarehouseChoice() == "1") {
      this.warehouseChoice = false;
    } else {
      this.warehouseChoice = true;
    }
  }

  notifyUs() {
    this.router.navigate(["./notify-us"]);
  }

  getSuppliers(event) {
    event.preventDefault();
    this.ngxSmartModalService.getModal("mysupplier").open();
  }
  getCustomers(event) {
    event.preventDefault();
  }

  createPurchase(warehouse_id, warehouse_name, warehouse_address) {
    this.purchaseOrder.warehouse = warehouse_id;
    this.warehouse_name = warehouse_name;
    this.warehouse_id = warehouse_id;
    this.warehouse_address = warehouse_address;
    this.getPurchaseOrderList(warehouse_id, 0);
    this.getChargeBox(warehouse_id, this.token.getCompany());
    this.getproducts();
    //console.log(this.vendors);
    this.ngxSmartModalService.getModal("purchaseorderlist").open();
  }

  addNewSaleOrder() {
    this.saleOrder.logistics = 0;
    this.saleListings = [];
    this.salesTotal=0;
    this.saleTaxTotal=0;
    this.saleGrandTotal=0;
    this.ngxSmartModalService.getModal("newsaleorder").open();
  }

  openSaleOrder(warehouse_id, warehouse_name, warehouse_address, lat, lng) {
    this.max.origin.lat = lat;
    this.max.origin.lng = lng;
    this.max.origin.address = warehouse_address;
    this.warehouse_name = warehouse_name;
    this.warehouse_id = warehouse_id;
    this.saleOrder.warehouse = warehouse_id;
    this.saleOrder.company = this.token.getCompany();
    this.warehouseLocation = warehouse_address;
    this.warehouse_address = warehouse_address;
    this.getChargeBox(warehouse_id, this.token.getCompany());
    this.saleOrder.id = null;
    this.saleOrder.order_no = null;
    this.saleOrder.send_warehouse = null;
    this.saleListings = [];
    this.saleOrder.expected_delivered_date = null;
    this.saleOrder.customer_id = 0;
    this.getOpenSaleOrders(0);
    this.ngxSmartModalService.getModal("saleorderList").open();
  }

  getOpenSaleOrders(status) {
    this.loading.show();
    this.auth
      .getOpenSaleOrders(status)
      .subscribe(
        data => this.handleOpenSaleOrders(data),
        error => console.log(error)
      );
  }

  handleOpenSaleOrders(data) {
    this.loading.hide();
    // console.log(data);
    this.saleLists = data.result;
  }

  viewSale(id, event) {
    //alert('ok');
    event.preventDefault();
    this.getSaleDetails(id);
  }

  getSaleDetails(id) {
    this.loading.show();
    this.auth
      .getSaleDetails(id)
      .subscribe(
        data => this.handleSaleDetails(data),
        error => console.log(error)
      );
  }

  handleSaleDetails(data) {
    this.loading.hide();
    //console.log(data);
    this.saleOrder = data.sales;
    for (let i = 0; i < data.saleListings.length; i++) {
      this.saleListings.push(data.saleListings[i]);
    }
    //this.saleListings = data.salelistings;
    console.log(this.saleListings);
    this.ngxSmartModalService.getModal("newsaleorder").open();
  }

  getOpenPurchaseOrders(status) {
    this.getPurchaseOrderList(this.warehouse_id, status);
  }

  viewPurchase(
    purchase_id,
    order_no,
    expected_delivered_date,
    vendor,
    total,
    sent_warehouse,
    status,
    warehouse,
    name,
    event
  ) {
    event.preventDefault();
    //alert(name);
    this.purchaseOrder.order_no = order_no;
    this.purchaseOrder.expected_delivered_date = expected_delivered_date;
    this.purchaseOrder.vendor_id = vendor;
    this.purchaseOrder.total = total;
    this.purchaseGrandTotal = total;
    this.purchaseOrderNumbers = order_no;
    this.purchaseOrderCreated = expected_delivered_date;
    this.purchaseOrder.id = purchase_id;
    this.purchaseOrder.status = status;
    this.purchaseOrder.warehouse = warehouse;
    this.warehouse_name = name;

    if (sent_warehouse == 1) {
      this.orderSentToWarehouse = true;
    } else {
      this.orderSentToWarehouse = false;
    }
    //orderSentToWarehouse
    //get order listings...
    //alert(purchase_id);
    this.getOrderListings(purchase_id);
    this.ngxSmartModalService.getModal("newpurchaseorder").open();
  }

  getOrderListings(purchse_id) {
    this.loading.show();
    this.auth
      .getOrderListings(purchse_id)
      .subscribe(
        data => this.handOrderListings(data),
        error => console.log(error)
      );
  }
  openVendorForm(event) {
    event.preventDefault();
    this.vendor.vendorCustomer = 1;
    this.ngxSmartModalService.getModal("vendorMyForm").open();
  }
  openVendorForm2(event) {
    event.preventDefault();
    this.vendor.vendorCustomer = 2;
    this.ngxSmartModalService.getModal("vendorMyForm").open();
  }
  clearAll() {
    this.purchaseListings = [];
    this.purchaseGrandTotal = 0;
    this.rowCount = 0;
  }
  clearAll2() {
    this.saleListings = [];
    this.purchaseGrandTotal = 0;
    this.saleRow = 0;
  }
  handOrderListings(data) {
    this.loading.hide();
    this.purchaseListings = [];
    this.rowCount = 0;
    this.purchaseGrandTotal = 0;
    var data = data.result;
    for (let i = 0; i < data.length; i++) {
      this.newPurchaseListing.product = data[i]["product"];
      this.newPurchaseListing.cost = data[i]["cost"];
      this.newPurchaseListing.quantity = data[i]["quantity"];
      this.newPurchaseListing.lineTotal = data[i]["lineTotal"];
      this.newPurchaseListing.tax = data[i]["tax"];
      this.newPurchaseListing.box = data[i]["box"];
      this.newPurchaseListing.order_id = data[i]["order_id"];
      this.newPurchaseListing.created_by = data[i]["created_by"];
      this.newPurchaseListing.product_code = data[i]["product_code"];

      this.purchaseListings.push(this.newPurchaseListing);
      this.newPurchaseListing = {};
      this.newPurchaseListing.product = 0;
      this.newPurchaseListing.tax = 0;
      this.newPurchaseListing.box = 0;
    }
    for (let i = 0; i < this.purchaseListings.length; i++) {
      this.purchaseGrandTotal += this.purchaseListings[i]["lineTotal"];
      this.rowCount++;
    }

    // this.purchaseListings = data.result;
    // console.log(this.purchaseListings);
  }

  printPurchaseOrder() {
    this.getCompanyProfile();
    this.getSelectedVendors();
    this.getOrderListings2(this.purchaseOrder.id);
    this.ngxSmartModalService.getModal("printpurchase").open();
  }

  getOrderListings2(purchase_id) {
    this.auth
      .getOrderListings2(purchase_id)
      .subscribe(
        data => this.handlePurchaseForPrint(data),
        error => console.log(error)
      );
  }

  handlePurchaseForPrint(data) {
    this.printPurchaseListings = data.result;
    this.printPurchaseListingTotal = 0;
    for (let i = 0; i < this.printPurchaseListings.length; i++) {
      this.printPurchaseListingTotal += this.printPurchaseListings[i][
        "lineTotal"
      ];
    }
  }

  getChargeBox(warehouse_id, company) {
    this.auth
      .getChargeBox(warehouse_id, company)
      .subscribe(
        data => this.handleChargBox(data),
        error => console.log(error)
      );
  }

  handleChargBox(data) {
    this.boxes = data.result;
  }

  getPurchaseOrderList(warehouse_id, status) {
    this.loading.show();
    this.auth
      .getPurchaseOrderList(warehouse_id, this.token.getCompany(), status)
      .subscribe(
        data => this.handlePurchaseOrderList(data),
        error => console.log(error)
      );
  }

  handlePurchaseOrderList(data) {
    this.loading.hide();
    //console.log(data);
    this.purchaseOrderList = data.result;
    // console.log(this.purchaseOrderList);
  }

  addNewPurchaseOrder() {
    this.purchaseOrder.expected_delivered_date = null;
    this.purchaseOrder.vendor_id = null;
    // this.purchaseOrder.company = null,
    // warehouse: null,
    this.purchaseOrder.box_id = null;
    this.purchaseOrder.order_no = null;
    this.purchaseOrder.created_by = null;
    this.purchaseOrder.total = null;
    this.purchaseOrder.id = null;
    this.purchaseOrder.status = null;
    this.purchaseOrderNumbers = null;
    this.purchaseOrderCreated = null;
    // this.newPurchaseListing = {};
    this.purchaseListings = [];
    this.getVendors(1);
    this.getproducts();
    this.rowCount = 0;
    this.purchaseGrandTotal = 0;
    this.ngxSmartModalService.getModal("newpurchaseorder").open();
  }

  updatePurchasePrice(event) {
    alert(event.target.value.id);
  }

  //add warehouse for those not using our warehouse services
  addWarehouse() {
    if (this.token.getWarehouseChoice() == "1") {
      alert(
        "Hello, You do not need to add warehouse, we have handled that part on your behalve. Please goto user profile, select warehouse location. Kindly select warehouse that is close to you !"
      );
    } else {
      //continue...
      //add warehouse here...
      this.warehouse.id = null;
      this.ngxSmartModalService.getModal("newwarehouse").open();
    }
  }

  //get the subscribed warehouse
  getWarehouseList() {
    this.loading.show();
    this.auth
      .getWarehouseList(
        this.token.getCompany(),
        this.token.getWarehouseChoice()
      )
      .subscribe(
        data => this.handleWarehouseList(data),
        error => console.log(error)
      );
  }

  handleWarehouseList(data) {
    this.loading.hide();
    this.warehouses = data.result;
  }
}
