import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public PAYSTACK_TEST_SECRET_KEY =
    "sk_test_10836ac8467012a921b3eff501275c3c1b92b3ee";
  public MAX_PUBLIC_KEY =
    "pk_c6a1ff9977095a5a82f80e90f44b4dc6223598356481a9161a6455344f20f6e2";
  public MAX_PRIVATE_KEY =
    "sk_d1209ec80d16dc6a847047d4cc4f4edfda3958b4deee65a0bd9819171f34d012";

  // applicatin api header
  mywarehouseApiHeaders = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `bearer ${this.token.getToken()}`
    })
  };

  // paystack api header
  paystackApiHeaders = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `bearer ${this.PAYSTACK_TEST_SECRET_KEY}`
    })
  };

  //Max api
  maxApiHeaders = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `bearer ${this.MAX_PUBLIC_KEY}`
    })
  };

  maxApiHeaders2 = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `bearer ${this.MAX_PRIVATE_KEY}`
    })
  };

  private baseUrl = "api";

  constructor(private http: HttpClient, private token: TokenService) {}

  // get the list in the boz
  getListBox(charge_id) {
    return this.http.get(
      `${this.baseUrl}/getListBox/${charge_id}`,
      this.mywarehouseApiHeaders
    );
  }

  //get inventory boxes
  getBoxInventory(company_id) {
    return this.http.get(
      `${this.baseUrl}/getBoxInventory/${company_id}`,
      this.mywarehouseApiHeaders
    );
  }

  // get sale dashboard
  getSalesDashboard(company_id) {
    return this.http.get(
      `${this.baseUrl}/getSalesDashboard/${company_id}`,
      this.mywarehouseApiHeaders
    );
  }

  // get sales details
  getSaleDetails(id) {
    return this.http.get(
      `${this.baseUrl}/getSaleDetails/${id}`,
      this.mywarehouseApiHeaders
    );
  }

  // get open sale orders
  getOpenSaleOrders(status) {
    return this.http.get(
      `${this.baseUrl}/getOpenSaleOrders/${status}`,
      this.mywarehouseApiHeaders
    );
  }

  //send to warehouse
  sendWarehouse(id) {
    return this.http.get(
      `${this.baseUrl}/sendWarehouse/${id}`,
      this.mywarehouseApiHeaders
    );
  }

  //fufil order
  makeOrderFulfilment(data) {
    return this.http.post(
      `${this.baseUrl}/makeOrderFulfilment`,
      data,
      this.mywarehouseApiHeaders
    );
  }

  //confirm pick up
  confirmAcepickup(data) {
    return this.http.post(
      `${this.baseUrl}/confirmAcepickup`,
      data,
      this.mywarehouseApiHeaders
    );
  }

  //get ace price list
  getAcePriceList() {
    return this.http.get(
      `${this.baseUrl}/getAcePriceList/`,
      this.mywarehouseApiHeaders
    );
  }
  //confirm personal pick up
  confirmPersonalpickup(data) {
    return this.http.post(
      `${this.baseUrl}/confirmPersonalpickup`,
      data,
      this.mywarehouseApiHeaders
    );
  }

  //get google address location
  getGeometricLocation(destination) {
    return this.http.post(
      `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC7SrtIwZvHiuYTNLU6snCmiSVfd9HoxFU&address=${destination}&sensor=true`,
      destination
    );
  }

  //confirm pickup
  confirmPickup(data) {
    return this.http.post(
      `${this.baseUrl}/confirmPickup`,
      data,
      this.mywarehouseApiHeaders
    );
  }

  //get pickup window
  getPickupWindow(data) {
    return this.http.post(
      `https://sandbox.max.ng/v1/orders/windows`,
      data,
      this.maxApiHeaders2
    );
  }

  //get price window from max api
  getPriceWindow(data) {
    return this.http.post(
      `https://sandbox.max.ng/v1/pricings/estimate`,
      data,
      this.maxApiHeaders
    );
  }

  //get selected product by box
  getBoxProduct(box_id) {
    return this.http.get(
      `${this.baseUrl}/getBoxProduct/${box_id}`,
      this.mywarehouseApiHeaders
    );
  }

  //get total dashboard
  getTotalDashboard(company) {
    return this.http.get(
      `${this.baseUrl}/getTotalDashboard/${company}`,
      this.mywarehouseApiHeaders
    );
  }

  //send client message
  sendMessage(data) {
    return this.http.post(
      `${this.baseUrl}/sendMessage`,
      data,
      this.mywarehouseApiHeaders
    );
  }

  //get client messages
  getClientMessage(notification_id) {
    return this.http.get(
      `${this.baseUrl}/getClientMessage/${notification_id}`,
      this.mywarehouseApiHeaders
    );
  }

  //get tracking
  getOpenTracking(company, status) {
    return this.http.get(
      `${this.baseUrl}/getOpenTracking/${company}/${status}`,
      this.mywarehouseApiHeaders
    );
  }

  //print purchase listings
  getOrderListings2(purchase_id) {
    return this.http.get(
      `${this.baseUrl}/getOrderListings2/${purchase_id}`,
      this.mywarehouseApiHeaders
    );
  }

  //get selected vendor
  getSelectedVendors(vendor_id) {
    return this.http.get(
      `${this.baseUrl}/getSelectedVendors/${vendor_id}`,
      this.mywarehouseApiHeaders
    );
  }

  //update company profule
  updateCompanyProfile(company, data) {
    return this.http.post(
      `${this.baseUrl}/updateCompanyProfile/${company}`,
      data,
      this.mywarehouseApiHeaders
    );
  }

  //get company profile
  getCompanyProfile(company) {
    return this.http.get(
      `${this.baseUrl}/getCompanyProfile/${company}`,
      this.mywarehouseApiHeaders
    );
  }

  //get order lustings
  getOrderListings(purchase_id) {
    return this.http.get(
      `${this.baseUrl}/getOrderListings/${purchase_id}`,
      this.mywarehouseApiHeaders
    );
  }

  //update logs
  updateLogs(company) {
    return this.http.get(
      `${this.baseUrl}/updateLogs/${company}`,
      this.mywarehouseApiHeaders
    );
  }

  //get logs
  getlogs(company) {
    return this.http.get(
      `${this.baseUrl}/getlogs/${company}`,
      this.mywarehouseApiHeaders
    );
  }

  //get charge box
  getChargeBox(warehouse_id, company) {
    return this.http.get(
      `${this.baseUrl}/getChargeBox/${warehouse_id}/${company}`,
      this.mywarehouseApiHeaders
    );
  }

  //get purchase list
  getPurchaseOrderList(warehouse_id, company, status) {
    return this.http.get(
      `${
        this.baseUrl
      }/getPurchaseOrderList/${warehouse_id}/${company}/${status}`,
      this.mywarehouseApiHeaders
    );
  }

  //send to wwarehouse
  sendTowarehouse(id, total) {
    return this.http.get(
      `${this.baseUrl}/sendTowarehouse/${id}/${total}`,
      this.mywarehouseApiHeaders
    );
  }

  //add purchase listings
  addPurchaseListings(data, id) {
    return this.http.post(
      `${this.baseUrl}/addPurchaseListings/${id}`,
      data,
      this.mywarehouseApiHeaders
    );
  }

  //get cost price
  getCostPrice(product) {
    return this.http.get(
      `${this.baseUrl}/getCostPrice/${product}`,
      this.mywarehouseApiHeaders
    );
  }

  //create new purchase order
  updatePurchaseOrder(data) {
    return this.http.post(
      `${this.baseUrl}/updatePurchaseOrder/`,
      data,
      this.mywarehouseApiHeaders
    );
  }

  //get products
  getproducts(company) {
    return this.http.get(
      `${this.baseUrl}/getproducts/${company}`,
      this.mywarehouseApiHeaders
    );
  }

  //add new product
  addproduct(data) {
    return this.http.post(
      `${this.baseUrl}/addproduct/`,
      data,
      this.mywarehouseApiHeaders
    );
  }

  //get vendor customers
  getVendorCustomers(id) {
    return this.http.get(
      `${this.baseUrl}/getVendorCustomers/${id}`,
      this.mywarehouseApiHeaders
    );
  }

  //add vendor
  addVendor(data) {
    return this.http.post(
      `${this.baseUrl}/addVendor/`,
      data,
      this.mywarehouseApiHeaders
    );
  }

  //add new warehouse
  addNewWarehouse(data) {
    return this.http.post(
      `${this.baseUrl}/addNewWarehouse/`,
      data,
      this.mywarehouseApiHeaders
    );
  }

  //add new user account
  addNewSubscriptionAccount(data) {
    return this.http.post(
      `${this.baseUrl}/addNewSubscriptionAccount/`,
      data,
      this.mywarehouseApiHeaders
    );
  }

  //user price
  userPackagePrice() {
    return this.http.get(
      `${this.baseUrl}/userPackagePrice`,
      this.mywarehouseApiHeaders
    );
  }

  //get wallet balance
  getWalletBalance(company) {
    return this.http.get(
      `${this.baseUrl}/getWalletBalance/${company}`,
      this.mywarehouseApiHeaders
    );
  }

  //renew from wallet
  RenewFromWallet(data) {
    return this.http.post(
      `${this.baseUrl}/RenewFromWallet/`,
      data,
      this.mywarehouseApiHeaders
    );
  }

  //pay from wallet
  payFromWallet2(data) {
    return this.http.post(
      `${this.baseUrl}/payFromWallet/`,
      data,
      this.mywarehouseApiHeaders
    );
  }

  //pay from wallet
  payFromWallet3(data) {
    return this.http.post(
      `${this.baseUrl}/payFromWalle3/`,
      data,
      this.mywarehouseApiHeaders
    );
  }

  //get ip address
  getIpAddress() {
    return this.http.get("https://jsonip.com");
  }

  //get payment for a box
  getPaymentFor2(id) {
    return this.http.get(
      `${this.baseUrl}/getPaymentFor2/${id}`,
      this.mywarehouseApiHeaders
    );
  }

  //get payment for a box
  getPaymentFor(id) {
    return this.http.get(
      `${this.baseUrl}/getPaymentFor/${id}`,
      this.mywarehouseApiHeaders
    );
  }

  //get the list of transactions
  getListOfOtherTransactions(company) {
    return this.http.get(
      `${this.baseUrl}/getListOfOtherTransactions/${company}`,
      this.mywarehouseApiHeaders
    );
  }

  //get wallet transactions
  getWalletTransactions(company) {
    return this.http.get(
      `${this.baseUrl}/getWalletTransactions/${company}`,
      this.mywarehouseApiHeaders
    );
  }

  //get subscription by company
  getOtherTransactions2(company) {
    return this.http.get(
      `${this.baseUrl}/getOtherTransactions2/${company}`,
      this.mywarehouseApiHeaders
    );
  }

  //load subscribed box in the database
  loadSubcribedBox(company) {
    return this.http.get(
      `${this.baseUrl}/loadSubcribedBox/${company}`,
      this.mywarehouseApiHeaders
    );
  }

  // add single charges chargs
  addReturnCardCharges4(data) {
    return this.http.post(
      `${this.baseUrl}/addReturnCardCharges4`,
      data,
      this.mywarehouseApiHeaders
    );
  }

  // add return chargs
  addReturnCardCharges(data) {
    return this.http.post(
      `${this.baseUrl}/addReturnCardCharges`,
      data,
      this.mywarehouseApiHeaders
    );
  }

  // update or renew box charges !
  addReturnCardCharges2(data) {
    return this.http.post(
      `${this.baseUrl}/addReturnCardCharges2`,
      data,
      this.mywarehouseApiHeaders
    );
  }
  addReturnCardChargesWallet(data) {
    return this.http.post(
      `${this.baseUrl}/addReturnCardChargesWallet`,
      data,
      this.mywarehouseApiHeaders
    );
  }

  //pay via paystack
  pay(data) {
    return this.http.post(
      "https://api.paystack.co/charge",
      data,
      this.paystackApiHeaders
    );
  }

  //get boxes
  getBoxesAsPerWarehouse(warehouse_id) {
    return this.http.get(
      `${this.baseUrl}/getBoxesAsPerWarehouse/${warehouse_id}`,
      this.mywarehouseApiHeaders
    );
  }

  //get selected warehouse
  getSelectedWarehouses2(company) {
    return this.http.get(
      `${this.baseUrl}/getSelectedWarehouses2/${company}`,
      this.mywarehouseApiHeaders
    );
  }

  //list box
  boxList() {
    return this.http.get(`${this.baseUrl}/boxList`, this.mywarehouseApiHeaders);
  }

  signUp(data) {
    return this.http.post(`${this.baseUrl}/signUp`, data);
  }
  checkUserLoggedIn(email) {
    return this.http.get(`${this.baseUrl}/userExist/${email}`);
  }
  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  getUserChoices(company) {
    return this.http.get(
      `${this.baseUrl}/getUserChoices/${company}`,
      this.mywarehouseApiHeaders
    );
  }
  selectWarehouse(choice, company) {
    return this.http.get(
      `${this.baseUrl}/selectWarehouse/${choice}/${company}`,
      this.mywarehouseApiHeaders
    );
  }
  getWarehouses(company) {
    return this.http.get(
      `${this.baseUrl}/getWarehouses/${company}`,
      this.mywarehouseApiHeaders
    );
  }
  optForWarehouse(warehouse, company) {
    return this.http.get(
      `${this.baseUrl}/optForWarehouse/${warehouse}/${company}`,
      this.mywarehouseApiHeaders
    );
  }
  getSelectedWarehouses(company) {
    return this.http.get(
      `${this.baseUrl}/getSelectedWarehouses/${company}`,
      this.mywarehouseApiHeaders
    );
  }
  getChartData() {
    return this.http.get(
      `${this.baseUrl}/getChartData`,
      this.mywarehouseApiHeaders
    );
  }
  getWarehouseList(company, warehouseChoice) {
    return this.http.get(
      `${this.baseUrl}/getWarehouseList/${company}/${warehouseChoice}`,
      this.mywarehouseApiHeaders
    );
  }
}
