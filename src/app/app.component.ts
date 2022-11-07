import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as signalR from '@microsoft/signalr'

export class Result{
  type: any = undefined;
  name: string = "";
  data: number[] = []
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chart: any;
  updateFromInput = false;
  chartCallback: any;
   connection: signalR.HubConnection;
   results: Result[] = [];
  constructor(){
    this.connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7159/satishub")
    .build();

    this.connection.start();

    this.connection.on("receiveMessage", (message: any)=> {

      this.chartOptions.series = message;

        this.updateFromInput = true;
        this.chart.hideLoading();
    });

    const self = this;
    this.chart = (chart:any) => {
      self.chart = chart;
    }
  }

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: "Başlık"
    },
    subtitle: {
      text: "Alt başlık"
    },
    yAxis: {
      title: {
        text: "Y ekseni"
      }
    },
    xAxis: {
      accessibility: {
        rangeDescription: "2019 - 2020"
      }
    },
    legend: {
      layout: "vertical",
      align: 'right',
      verticalAlign: "middle"
    },
    series: [
      {
        type: undefined,
        name: "",
        data: [1000]
      },
      {
        type: undefined,
        name: "",
        data: [1000]
      },
      {
        type: undefined,
        name: "",
        data: [1000]
      }
    ],
        plotOptions: {
      series: {
        label: {
          connectorAllowed: true
        },
        pointStart: 100
      }
    }

  }

}
