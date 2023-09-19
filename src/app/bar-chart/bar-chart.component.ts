import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip,
    AccumulationDataLabel,  IAxisLabelRenderEventArgs,
    Chart, LineSeries, DateTime, Legend, Tooltip, IAccLoadedEventArgs, AccumulationTheme, IAccPointRenderEventArgs,
    StackingColumnSeries, DataLabel, ColumnSeries, IMouseEventArgs, Series
} from '@syncfusion/ej2-charts';
import { DataService } from '../data-service';

Chart.Inject(LineSeries, StackingColumnSeries, DataLabel, ColumnSeries, DateTime, Legend, Tooltip);


@Component({
  selector: 'app-chart',
  templateUrl: './bar-chart.component.html',
  encapsulation: ViewEncapsulation.None
})

export class BarChartComponent implements OnInit {

    /** Configurations for the Chart page */
    constructor(private data: DataService) {
    }

    @ViewChild('paymentGraph')
    public chartObj!: Chart;

    // Chart component binding properties
    public primaryXAxis: Object = {
        title: 'Years',
        valueType: 'DateTime',
        labelFormat: 'y',
        intervalType: 'Years',
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        lineStyle: { width: 1, dashArray: '2', color: 'rgba(255,255,255,0.2)' },
        labelStyle: {
            color: '#989CA9',
            fontFamily: 'Roboto',
            fontWeight: '400',
            size: '12px',
        },
        titleStyle: {
            color: '#FFFFFF',
            fontFamily: 'Raleway, sans-serif',
            fontWeight: '600',
            opacity: 0.62,
            size: '16px',
        }
    };
    public primaryYAxis: Object = {
        title: 'Balance',
        labelFormat: 'c0',
        rangePadding: 'None',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1, dashArray: '2', color: 'rgba(255,255,255,0.2)' },
        minorGridLines: { width: 0 },
        minorTickLines: { width: 0 },
        labelStyle: {
            color: '#989CA9',
            fontFamily: 'Roboto',
            fontWeight: '400',
            size: '16px',
        },
        titleStyle: {
            color: '#FFFFFF',
            fontFamily: 'Raleway, sans-serif',
            fontWeight: '600',
            opacity: 0.62,
            size: '16px',
        }
    };
    public axes: Object[] = [
      {
          majorGridLines: { width: 0 },
          minorGridLines: { width: 0 },
          majorTickLines: { width: 0 },
          minorTickLines: { width: 0 },
          rowIndex: 0, opposedPosition: true,
          lineStyle: { width: 0 },
          name: 'yAxis',
          title: 'Payment',
          labelFormat: 'c0',
          labelStyle: {
              color: '#989CA9',
              fontFamily: 'Roboto',
              fontWeight: '400',
              size: '16px',
          },
          titleStyle: {
              color: '#FFFFFF',
              fontFamily: 'Raleway, sans-serif',
              fontWeight: '600',
              opacity: 0.62,
              size: '16px',
          }
      }
    ];
    public tooltip: Object = {
        enable: true, shared: true,
        format: '${series.name} : ${point.y}',
        header: '<b>${point.x}<b>',
        fill: '#FFFFFF',
        opacity: 1,
        textStyle: {
            color: '#555555',
            fontFamily: 'Roboto',
            size: '12px',
            fontWeight: '400',
        },
    };
    public palettes: string[] = ['#FB6589', '#3AC8DC', '#FFFFFF'];
    public legendSettings: Object = {
        textStyle: {
            color: '#FFFFFF',
            fontFamily: 'Raleway, sans-serif',
            fontWeight: '600',
            opacity: 0.62,
            size: '16px',
        }
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public height: string = '500px';
    public yearWiseData: Object[] = this.data.yearWiseData;
    public barSeries: Object[] = [
        // {
        //     type: 'Column',
        //     columnWidth: 0.7,
        //     dataSource: this.yearWiseData,
        //     xName: 'yearN', width: 2, marker: {
        //         visible: true,
        //         width: 10,
        //         height: 10,
        //     },
        //     yName: 'yearTotal', name: 'Total Amount Paid', yAxisName: 'yAxis', visible: false
        // },
        {
            type: 'StackingColumn',
            columnWidth: 0.425,
            dataSource: this.yearWiseData,
            xName: 'yearN', width: 2, marker: {
                visible: true,
                width: 10,
                height: 10
            },
            yName: 'yearPrincipal', name: 'Principal Paid', yAxisName: 'yAxis'
        },
        {
            type: 'StackingColumn',
            columnWidth: 0.425,
            dataSource: this.yearWiseData,
            xName: 'yearN', width: 2, marker: {
                visible: true,
                width: 10,
                height: 10
            },
            yName: 'yearInterest', name: 'Interest Paid', yAxisName: 'yAxis'
        },
        {
            type: 'Line',
            dataSource: this.yearWiseData,
            xName: 'yearN', width: 2, marker: {
                visible: true,
                width: 10,
                height: 10,
                fill: '#60448D',
            },
            yName: 'endingBalance', name: 'Balance',
        }
    ];

    public onChartMouseUp(args: IMouseEventArgs): void {
        if (args.target.indexOf('_chart_legend_') > -1 && (args.target.indexOf('shape') > -1 || args.target.indexOf('text') > -1)) {
            let id: string[] = [args.target];
            id = (args.target.indexOf('shape') > -1) ? id[0].split('chart_legend_shape_') : id[0].split('chart_legend_text_');
            let index: number = parseInt(id[1], 10);
            let series: Series = this.chartObj.visibleSeries[index];
            let yName: string = series.yAxisName;
            let ySName: any;
            let visibility: boolean = false;
            if (series.visible) {
                for (let i: number = 0, len: number = this.chartObj.series.length; i < len; i++) {
                    ySName = this.chartObj.series[i].yAxisName;
                    if (len === 1 || (this.chartObj.series[i].visible &&
                        (<Series>this.chartObj.series[i]).index !== series.index && yName === ySName)) {
                        visibility = true;
                    }
                }
                series.yAxis.visible = visibility;
            } else {
                series.yAxis.visible = true;
            }
        }
    }

    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (window.innerWidth < 576) {
            if (args.axis.name === 'primaryYAxis' || args.axis.name === 'yAxis') {
                let value: number = Number(args.value) / 1000;
                args.text = value === 0 ? String(value) : (String(value) + 'K');
            }
        }
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
    }
}
