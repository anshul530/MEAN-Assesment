import { Component, OnInit, ViewEncapsulation, TemplateRef, ChangeDetectorRef, ViewChild, SimpleChanges, AfterViewInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { ApiService } from '../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartOptions } from 'chart.js';
import { ChartConfiguration } from 'chart.js';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { CounterCardComponent } from '../counterCard/counterCard.component';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [CommonModule, NgChartsModule, CounterCardComponent]
})

export class HomeComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  multipleCounter = {};
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'No Of Peoples',
        backgroundColor: ['rgba(1, 210, 142, 0.5)', 'rgba(1, 210, 142, 0.5)', 'rgba(1, 210, 142, 0.5)', 'rgba(1, 210, 142, 0.5)', 'rgba(1, 210, 142, 0.5)'],
        borderColor: ['#01d28e', '#01d28e', '#01d28e', '#01d28e', '#01d28e'],
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(1, 210, 142, 0.8)', 'rgba(1, 210, 142, 0.8)', 'rgba(1, 210, 142, 0.8)', 'rgba(1, 210, 142, 0.8)', 'rgba(1, 210, 142, 0.8)'],
        hoverBorderColor: ['#01a6d2', '#01a6d2', '#01a6d2', '#01a6d2', '#01a6d2'],
        hoverBorderWidth: 2,
        barPercentage: 0.5,
        categoryPercentage: 0.5
      }
    ]
  };
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            size: 16,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 16,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (tooltipItem) {
            return `Data: ${tooltipItem.raw}`;
          }
        }
      }
    },
  };
  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20,
          },
        },
      },
      tooltip: {
        bodyFont: {
          size: 20,
        },
      },
      datalabels: {
        display: true,
        font: {
          size: 20,
        },
      },
    },
  };
  pieChartLabels = [];
  pieChartDatasets = [{
    data: [],
    backgroundColor: ['#01a6d2', '#01d28e', '#6601d2'],
    hoverBackgroundColor: ['#019fc2', '#01b86f', '#5e01b6'],
  }];
  pieChartLegend = true;
  pieChartPlugins = [];
  doughnutChartLabels: string[] = [];
  doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [{
    data: [],
    label: 'Series A',
    backgroundColor: ['#01a6d2', '#01d28e', '#6601d2', '#ff6600'],
    hoverBackgroundColor: ['#019fc2', '#01b86f', '#5e01b6', '#ff8533']
  }];
  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20,
          },
        },
      },
      tooltip: {
        bodyFont: {
          size: 20,
        },
      },
      datalabels: {
        display: true,
        font: {
          size: 20,
        },
      },
    },
  };
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'No Of Peoples',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(1, 210, 142, 0.8)'
      }
    ]
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
        callbacks: {
          label: function (tooltipItem) {
            return `Data: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };
  lineChartLegend = true;


  constructor(private apiService: ApiService,
    private LoaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getDistinctStatusWithCount();
    this.getMultipleCounters();
    this.getBookingMediumCounters();
    this.getPeoplesCountYearly();
    this.getPeoplesCountMonthly();
  }


  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  getDistinctStatusWithCount() {
    this.apiService.getData("reservation/getDistinctStatusWithCount").subscribe(res => {
      if (res['status'] == 200) {
        res['data'].forEach(el => {
          let temp = el['status'].charAt(0).toUpperCase() + el['status'].slice(1);
          this.doughnutChartLabels.push(temp);
          this.doughnutChartDatasets[0]['data'].push(el['status_count']);
        });
      }
      this.cdr.detectChanges();
      if (this.chart) this.chart.chart.update();
      this.LoaderService.hideLoader();
    }, (err) => {
      this.LoaderService.hideLoader();
    });
  }

  getMultipleCounters() {
    this.apiService.getData("reservation/getMultipleCounters").subscribe(res => {
      if (res['status'] == 200) this.multipleCounter = res['data'];
      this.LoaderService.hideLoader();
    }, (err) => {
      this.LoaderService.hideLoader();
    });
  }

  getBookingMediumCounters() {
    this.apiService.getData("reservation/getBookingMediumCounters").subscribe(res => {
      if (res['status'] == 200) {
        let data = res['data'];
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            this.pieChartLabels.push(key);
            this.pieChartDatasets[0]['data'].push(data[key]);
          }
        }
        this.cdr.detectChanges();
        if (this.chart) this.chart.chart.update();
      }
      this.LoaderService.hideLoader();
    }, (err) => {
      this.LoaderService.hideLoader();
    });
  }

  getPeoplesCountYearly() {
    this.apiService.getData("reservation/getPeoplesCountYearly").subscribe(res => {
      if (res['status'] == 200) {
        res['data'].forEach(el => {
          this.barChartData['labels'].push(el['year']);
          this.barChartData['datasets'][0]['data'].push(el['people_count']);
        });
        this.cdr.detectChanges();
        if (this.chart) this.chart.chart.update();
      }
      this.LoaderService.hideLoader();
    }, (err) => {
      this.LoaderService.hideLoader();
    });
  }

  getPeoplesCountMonthly() {
    this.apiService.getData("reservation/getPeoplesCountMonthly").subscribe(res => {
      if (res['status'] == 200) {
        res['data'].forEach(el => {
          this.lineChartData['labels'].push(el['month_name']);
          this.lineChartData['datasets'][0]['data'].push(el['people_count']);
        });
        this.cdr.detectChanges();
        if (this.chart) this.chart.chart.update();
      }
      this.LoaderService.hideLoader();
    }, (err) => {
      this.LoaderService.hideLoader();
    });
  }

}
