import { Component } from '@angular/core';
import { TypeaheadSearchFunction, TypeaheadResultFormatter } from './core/typeahead/typeahead.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  typeaheadSearchFunction: TypeaheadSearchFunction = (searchString) => of(this.typeaheadSourceData.filter(element => element.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())));
  typeaheadResultsFormatter: TypeaheadResultFormatter = (result) => `${result.name}`;
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

  onSelected(result: any) {
    this.selectedResult = result;
  }
}
