import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { of, EMPTY, Observable } from 'rxjs';
import { map, tap, debounceTime, switchMap, mapTo, filter } from 'rxjs/operators';

export type TypeaheadSearchFunction = (searchString: string) => Observable<any[]>;
export type TypeaheadResultFormatter = (result: any) => string;

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.css']
})
export class TypeaheadComponent implements OnInit {
  userHasEnteredSearchString: boolean = false;
  userIsSelectingResult: boolean = false;
  displayResults: boolean = false;
  results: any[] = [];

  @ViewChild('typeaheadInput') typeaheadInput: ElementRef;

  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  @Input() debounceTime: number = 333;
  @Input() noResultsFoundMessage: string = 'No results found.';

  @Input() searchFunction: TypeaheadSearchFunction = (searchString) => of([]);
  @Input() resultFormatter: TypeaheadResultFormatter = (result) => result;

  constructor() { }

  ngOnInit() { }

  onInputKeyup(event: Event) {
    of(event).pipe(
      debounceTime(this.debounceTime),
      map(e => (e.target as HTMLInputElement).value),
      switchMap(searchString => this.suggest(searchString))
    ).subscribe();
  }

  onInputFocus(event) {
    of(event).pipe(
      map(e => (e.target as HTMLInputElement).value),
      tap(searchString => console.log('focus: ', searchString)),
      switchMap(searchString => this.suggest(searchString))
    ).subscribe();
  }

  onInputBlur(event) {
    if (this.userIsSelectingResult) {
      return;
    }

    this.displayResults = false;
  }

  suggest(searchString: string) {
    return of(searchString).pipe(
      switchMap(searchString => (!searchString || searchString.length === 0) ? of([]) : this.searchFunction(searchString)),
      tap(results => this.displayResults = results.length > 0),
      tap(results => this.results = results)
    );
  }

  onResultSelected(result) {
    this.selected.emit(result);
    this.userHasEnteredSearchString = false;
    this.userIsSelectingResult = false;
    this.results = [];

    (this.typeaheadInput.nativeElement as HTMLInputElement).value = this.resultFormatter(result);
  }

  onResultsMouseEnter($event) {
    this.userIsSelectingResult = true;
  }

  onResultsMouseLeave($event) {
    this.userIsSelectingResult = false;
  }
}
