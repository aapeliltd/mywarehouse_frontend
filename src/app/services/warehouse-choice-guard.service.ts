import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: "root"
})
export class WarehouseChoiceGuardService implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // console.log(this.token.getWarehouseChoice());
    /* if (this.token.getWarehouseChoice() == "1") {
      return true;
    } else if (this.token.getWarehouseChoice() == "0") {
      return true;
    } else if (this.token.getWarehouseChoice() == "2") {
      //this.router.navigate(["./choose-warehouse"]);
      return true;
    }
    */

    return true;
  }
  constructor(private token: TokenService, private router: Router) {}
}
