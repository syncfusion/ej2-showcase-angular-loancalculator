import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ChangedEventArgs } from '@syncfusion/ej2-angular-calendars';
import { isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { DataService } from '../data-service';

@Component({
  selector: 'statement-section',
  templateUrl: './statement.component.html',
  encapsulation: ViewEncapsulation.None
})

export class StatementComponent implements OnInit {

    /** Configurations for the Statement page */
    constructor(private data: DataService) {
    }

    public format: string = 'MMM yyy';
    public dateValue: Date = new Date();
    public width: string = '250px';

    public onChange(args: ChangedEventArgs): void {
        if (isNOU(args.value)) {
            this.dateValue = new Date();
        } else {
            this.data.dateValue = this.dateValue = args.value;
            this.data.refreshUI();
        }
    }

    public ngOnInit(): void {
    }
}
