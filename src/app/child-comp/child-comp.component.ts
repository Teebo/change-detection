import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-child-comp',
  templateUrl: './child-comp.component.html',
  styleUrls: ['./child-comp.component.scss']
})
export class ChildCompComponent implements OnInit {

  constructor(private parent: AppComponent) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    // Cause ExpressionChanged error, because change detection had already been ran in the parent component
    // But we are updating the parent's component property 'text' used in the binding
    this.parent.text = 'Updated text in parent component';
  }

}
