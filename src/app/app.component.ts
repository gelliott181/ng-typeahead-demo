import { Component } from '@angular/core';
import { TypeaheadSearchFunction, TypeaheadResultFormatter } from './core/typeahead/typeahead.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedResult;

  typeaheadSourceData: any[] = [
    {
      id: '0',
      name: 'Result 1'
    },
    {
      id: '1',
      name: 'Result 2'
    }
  ];

  typeaheadSearchFunction(): TypeaheadSearchFunction {
    const searchFn: TypeaheadSearchFunction = (searchString) => of(this.typeaheadSourceData.filter(element => element.name.includes(searchString)));

    return searchFn.bind(this);
  }

  typeaheadResultsFormatter(): TypeaheadResultFormatter {
    const resultFormatterFn: TypeaheadResultFormatter = (result) => `${result.name}`;
    return resultFormatterFn.bind(this);
  }

  onSelected(result: any) {
    this.selectedResult = result;
  }
}
