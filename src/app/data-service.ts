import { Injectable } from '@angular/core';

import { Internationalization } from '@syncfusion/ej2-base';
import {
    AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip,
    AccumulationDataLabel, SeriesModel, Chart, LineSeries, DateTime, Legend, Tooltip, IAccLoadedEventArgs, AccumulationTheme, IAccPointRenderEventArgs,
    StackingColumnSeries, Crosshair, DataLabel, ColumnSeries, IMouseEventArgs, Series
} from '@syncfusion/ej2-charts';
import { Grid, DetailRow } from '@syncfusion/ej2-grids';

import { GridAppComponent } from './grid-app/grid-app.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';

@Injectable()

export class DataService {
    constructor() {
        this.initialize();
    }

    public emi: number = 0;
    public princ: number = 0;
    public tent: number = 0;
    public principalValue: number = 300000;
    public interestValue: number = 5.5;
    public loanValue: number = 15;
    public dateValue: Date = new Date();
    public yearWiseData: Object[] = [];
    public emiAmt: string = '';
    public principalAmt: string = '';
    public interestAmt: string = '';
    public totalAmt: string = '';
    public dashboard: DashboardComponent;

    public yearTenure: boolean = true;
    public chart: BarChartComponent;
    public grid: GridAppComponent;
    public totalPrincipalYear: number = 0;
    public totalInterestYear: number = 0;
    public inter: number;
    public dataUnits: Object[] = [];
    public dateObj: Date = new Date();
    public totalInterest: number = 0;
    public totalAmount: number = 0;
    public totalPrincipal: number = 0;
    public endBalance: number;
    public beginBalance: number;
    public yearTotal: number = 0;
    public monthNames: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    public intl: Internationalization = new Internationalization();

    public getCurrencyVal(value: number): string {
        return this.intl.formatNumber(value, { format: 'C0' });
    }

    public refreshUI1(): void {
        this.setInitValues();
        let interestPercent: number = parseFloat((Math.round((this.emi * this.tent) - this.princ) / Math.round((this.emi * this.tent)) * 100).toFixed(2));
        this.dashboard.pieChart.series = [
            {
                dataSource: [
                    {
                        'x': 'Principal Amount',
                        y: this.princ,
                        text: parseFloat(((this.princ) / Math.round((this.emi * this.tent)) * 100).toFixed(2)) + '%'
                    },
                    {
                        'x': 'Interest Amount',
                        y: (this.tent ? Math.round((this.emi * this.tent) - this.princ) : 0),
                        text: interestPercent ? interestPercent + '%' : ' '
                    }
                ],
                radius: '80%', xName: 'x',
                animation: { enable: true },
                yName: 'y',
                startAngle: 290,
                endAngle: 290, innerRadius: '60%',
                explode: true, explodeOffset: '10%', explodeIndex: 3
            }
        ];
        this.dashboard.pieChart.refresh();
        this.updateTotalAmt();
    }

    public refreshUI(): void {
        this.refreshUI1();
        this.calRangeValues();
        this.renderControls();
        this.chart.chartObj.refresh();
    }

    public updateTotalAmt(): void {        
        this.dashboard.emiAmt = this.emiAmt;
        this.dashboard.interestAmt = this.interestAmt;
        this.dashboard.totalAmt = this.totalAmt;
        this.dashboard.principalAmt = this.principalAmt;
    }

    public renderControls(): void {
        this.grid.yearWiseData = this.yearWiseData;
        this.grid.childGrid = {
            created: this.grid.childCreated,
            dataBound: this.grid.childDataBound,
            queryString: 'year',
            columns: [
                { field: 'month', headerText: 'Month', textAlign: 'center', minWidth: '80px' },
                {
                    field: 'emi', format: 'C0',
                    hideAtMedia: '(min-width: 480px)', headerText: 'Payment', minWidth: '80px', textAlign: 'center'
                },
                { field: 'pricipalPaid', format: 'C0', headerText: 'Pricipal Paid', minWidth: '80px', textAlign: 'center' },
                { field: 'interest', format: 'C0', headerText: 'Interest Paid', minWidth: '80px', textAlign: 'center' },
                { field: 'endingBalance', format: 'C0', headerText: 'Balance', minWidth: '80px', textAlign: 'center' }
            ],
            dataSource: this.dataUnits
        };
        this.chart.chartObj.series = [
            // {
            //     type: 'Column',
            //     columnWidth: 0.7,
            //     dataSource: this.yearWiseData,
            //     xName: 'yearN', width: 2, marker: {
            //         visible: true,
            //         width: 10,
            //         height: 10,
            //     },
            //     yName: 'yearTotal', name: 'Total Amount Paid', yAxisName: 'yAxis',
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
            },
        ];
    }

    public getInterest(): number {
        return this.interestValue ? parseFloat('' + this.interestValue / 12 / 100) : 0;
    }

    public calculateEMI(): number {
        let interestValue: number = this.getInterest();
        let tent: number = this.yearTenure ? (this.loanValue * 12) : this.loanValue;
        if (interestValue) {
            return this.principalValue * interestValue *
                (Math.pow((1 + interestValue), tent)) / ((Math.pow((1 + interestValue), tent)) - 1);

        }
        return this.principalValue / tent;
    }

    public setInitValues(): void {
        this.emi = this.calculateEMI();
        this.princ = this.principalValue;
        this.tent = this.yearTenure ? (this.loanValue * 12) : this.loanValue;
        this.dataUnits = [];
        this.yearWiseData = [];
        this.dateObj = new Date(this.dateValue.getTime());
        this.totalInterest = 0;
        this.totalAmount = 0;
        this.totalPrincipal = 0;
        this.totalPrincipalYear = 0;
        this.totalInterestYear = 0;
        this.emiAmt = this.getCurrencyVal(this.tent ? Math.round(this.emi) : 0);
        this.interestAmt = this.getCurrencyVal(this.tent ? Math.round((this.emi * this.tent) - this.princ) : 0);
        this.totalAmt = this.getCurrencyVal(this.tent ? Math.round((this.emi * this.tent)) : 0);
        this.principalAmt = this.getCurrencyVal(this.princ);
    }

    public calRangeValues(): void {
        for (let i: number = 0; i < this.tent; i++) {
            this.inter = this.getInterest ? (this.princ * this.getInterest()) : this.princ;
            this.totalInterest += this.inter;
            this.totalAmount += this.emi;
            this.totalPrincipal += parseFloat((this.emi - this.inter).toFixed(2));
            this.endBalance = this.princ - (this.emi - this.inter);
            this.yearTotal += this.emi;
            this.totalPrincipalYear += parseFloat((this.emi - this.inter).toFixed(2));
            this.totalInterestYear += this.inter;
            this.dataUnits.push({
                month: this.monthNames[this.dateObj.getMonth()],
                index: (i + 1),
                totalInterest: Math.round(this.totalInterest),
                totalAmount: this.totalAmount,
                emi: Math.round(this.emi),
                year: this.dateObj.getFullYear(),
                beginningBalance: Math.round(this.princ),
                interest: Math.round(this.inter),
                pricipalPaid: Math.round((this.emi - this.inter)),
                endingBalance: Math.round(this.endBalance)
            });
            if (i === 0 || this.dateObj.getMonth() === 0) {
                this.beginBalance = this.princ;
            }
            if (this.dateObj.getMonth() === 11 || (i === this.tent - 1)) {
                this.yearWiseData.push({
                    beginningBalance: Math.round(this.beginBalance),
                    totalInterest: Math.round(this.totalInterest),
                    totalPrincipal: Math.round(this.totalPrincipal),
                    totalAmount: Math.round(this.totalAmount),
                    yearTotal: Math.round(this.yearTotal),
                    endingBalance: Math.round(this.endBalance),
                    yearN: new Date(this.dateObj.getFullYear(), 0, 1),
                    year: this.dateObj.getFullYear(),
                    yearPrincipal: this.totalPrincipalYear,
                    yearInterest: this.totalInterestYear
                });
                this.yearTotal = 0;
                this.totalPrincipalYear = 0;
                this.totalInterestYear = 0;
            }
            this.princ = this.endBalance;
            if (i < this.tent - 1) {
                this.dateObj.setMonth(this.dateObj.getMonth() + 1);
            }
        }
    }

    public initialize(): void {
        this.setInitValues();
        this.calRangeValues();
    }

}
