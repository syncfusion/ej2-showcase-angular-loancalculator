import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { closest } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Grid, DetailRow, DetailDataBoundEventArgs } from '@syncfusion/ej2-grids';
import { DataService } from '../data-service';
Grid.Inject(DetailRow);

@Component({
  selector: 'app-grid',
  templateUrl: './grid-app.component.html',
  encapsulation: ViewEncapsulation.None
})

export class GridAppComponent implements OnInit {

    /** Configurations for the Grid page */
    constructor(private data: DataService) {
    }

    @ViewChild('scheduleGrid')
    public grid!: Grid;

    public yearWiseData: Object[] = this.data.yearWiseData;
    public childGrid: Object = {
        created: this.childCreated,
        dataBound: this.childDataBound,
        queryString: 'year',
        columns: [
            { field: 'month', headerText: 'Month', textAlign: 'Center', minWidth: '80px' },
            {
                field: 'emi', format: 'C0',
                hideAtMedia: '(min-width: 480px)', headerText: 'Payment', minWidth: '80px', textAlign: 'Center'
            },
            { field: 'pricipalPaid', format: 'C0', headerText: 'Pricipal Paid', minWidth: '80px', textAlign: 'Center' },
            { field: 'interest', format: 'C0', headerText: 'Interest Paid', minWidth: '80px', textAlign: 'Center' },
            { field: 'endingBalance', format: 'C0', headerText: 'Balance', minWidth: '80px', textAlign: 'Center' }
        ],
        dataSource: this.data.dataUnits
    };
    public format: string = 'c0';
    public balanceHideAtMedia: string = '(min-width: 750px)';
    public paymentHideAtMedia: string = '(min-width: 480px)';

    /* tslint:disable */
    public childCreated(args: Object): void {
        // (this.getHeaderContent() as HTMLElement).style.display = 'none';
        // this.element.style.display = 'none';
    }
    public childDataBound(args: Object): void {
        // this.element.style.display = '';
    }
    /* tslint:enable */
    public onClick(args: MouseEvent): void {
        const target = args.target as HTMLElement;
        if (target.classList.contains('e-row-toggle') || target.parentElement?.querySelector('.e-row-toggle')) {
            const rowElement = closest(target, 'tr') as HTMLElement;
            const rowIndex = parseInt(rowElement.getAttribute('aria-rowindex') || '', 10);
            if (rowIndex >= 0) {
                if (target.classList.contains('e-icon-gdownarrow')) {
                    target.classList.remove('e-icon-gdownarrow');
                    target.classList.add('e-icon-grightarrow');
                    this.grid.detailRowModule.collapse(rowIndex - 1);
                } else {
                    target.classList.remove('e-icon-grightarrow');
                    target.classList.add('e-icon-gdownarrow');
                    this.grid.detailRowModule.expand(rowIndex - 1);
                }
            }
        }    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
    }
}
