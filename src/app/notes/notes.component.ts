import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  constructor(private fb: FormBuilder) {
    this.textAreaForm = fb.group({
      textArea: "Here is you first note."
    });
   }
  rapidpageValue:string;
  noteFontSize:number = 21;
  noteColor:string = '#ffff88';
  public textAreaForm: FormGroup;
    //items: Array<number> = Array.from({ length: 3 }, (v, k) => k + 1);
    items: Array<any> = [{sno:1,title:"Add you title...", content:"Some content will go here........."}];
    // two dimensional table matrix representing view model
    itemsTable: Array<number[]>;
  
    // fix column width as defined in CSS (150px + 5px margin)
    boxWidth = 155;
    // calculated based on dynamic row width
    columnSize: number;
  ngOnInit(): void {
  }

  

  addNotes(){
    const notesSize = this.items.length;
    this.items.push({sno:notesSize+1});
    this.initTable();
  }

  changeFontSize(isTrue){
    if(isTrue){
      this.noteFontSize = this.noteFontSize + 1;
    }else{
      this.noteFontSize = this.noteFontSize - 1;
    }
  }

  changeColor(colorCode){
    this.noteColor = '#'+colorCode;
  }



  getItemsTable(rowLayout: Element): number[][] {
    // calculate column size per row
    const { width } = rowLayout.getBoundingClientRect();
    const columnSize = Math.round(width / this.boxWidth);
    // view has been resized? => update table with new column size
    if (columnSize != this.columnSize) {
      this.columnSize = columnSize;
      this.initTable();
    }
    return this.itemsTable;
  }

  initTable() {
    // create table rows based on input list
    // example: [1,2,3,4,5,6] => [ [1,2,3], [4,5,6] ]
    this.itemsTable = this.items
      .filter((_, outerIndex) => outerIndex % this.columnSize == 0) // create outter list of rows
      .map((
        _,
        rowIndex // fill each row from...
      ) =>
        this.items.slice(
          rowIndex * this.columnSize, // ... row start and
          rowIndex * this.columnSize + this.columnSize // ...row end
        )
      );
  }

  reorderDroppedItem(event: CdkDragDrop<number[]>) {
    // same row/container? => move item in same row
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // different rows? => transfer item from one to another list
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    // update items after drop: flatten matrix into list
    // example: [ [1,2,3], [4,5,6] ] => [1,2,3,4,5,6]
    this.items = this.itemsTable.reduce(
      (previous, current) => previous.concat(current),
      []
    );

    // re-initialize table - makes sure each row has same numbers of entries
    // example: [ [1,2], [3,4,5,6] ] => [ [1,2,3], [4,5,6] ]
    this.initTable();
  }

}
