import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-warehouse-chart",
  templateUrl: "./warehouse-chart.component.html",
  styleUrls: ["./warehouse-chart.component.css"]
})
export class WarehouseChartComponent implements OnInit {
  data: Object;
  public chartData = [];
  public choice1 = {
    label: "MY WAREHOUSE",
    value: null
  };
  public choice2 = {
    label: "USERS",
    value: null
  };

  constructor(private auth: AuthService, private loading: NgxSpinnerService) {}

  ngOnInit() {
    this.getChartData();
  }

  //get the data
  getChartData() {
    this.loading.show();
    this.auth
      .getChartData()
      .subscribe(
        data => this.handleChartData(data),
        error => console.log(error)
      );
  }

  handleChartData(data) {
    this.loading.hide();
    //console.log(data);
    this.choice1.value = data.result[0]["total_in"];
    this.choice2.value = data.result[0]["total_out"];
    this.chartData.push(this.choice1);
    this.chartData.push(this.choice2);
    this.data = {
      chart: {
        // "caption": "Recommended Portfolio Split",
        //"subCaption" : "For a net-worth of $1M",
        showValues: "1",
        showPercentInTooltip: "0"
        // "numberPrefix" : "$",
        // enableMultiSlicing: "1",
        //theme: "fusion"
      },
      data: this.chartData
    };
  }
}
