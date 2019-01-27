import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TokenService {
  constructor() {}

  setToken(token) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  setUser(user) {
    localStorage.setItem("user", user);
  }
  getUser() {
    return localStorage.getItem("user");
  }
  setName(name) {
    localStorage.setItem("name", name);
  }
  getName() {
    return localStorage.getItem("name");
  }
  setEmail(email) {
    localStorage.setItem("email", email);
  }
  getEmail() {
    return localStorage.getItem("email");
  }

  setCompany(company) {
    localStorage.setItem("company", company);
  }
  getCompany() {
    return localStorage.getItem("company");
  }

  setWarehouseChoice(value) {
    localStorage.setItem("warehouse_choice", value);
  }
  getWarehouseChoice() {
    return localStorage.getItem("warehouse_choice");
  }

  remove() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("warehouse_choice");
    localStorage.removeItem("company");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
  }

  isLoggedIn() {
    var token = this.getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
