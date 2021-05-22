import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

import { ToastrService} from 'ngx-toastr';

import { NotesService} from '../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  constructor(private fb: FormBuilder, private toastr: ToastrService, private noteService: NotesService) {
    this.textAreaForm = fb.group({
      textArea: "Here is you first note."
    });
   }
  rapidpageValue:string;
  noteFontSize:number = 21;
  noteColor:string = '#ffff88';
  public textAreaForm: FormGroup;
    items: Array<any> = [{sno:1, content:"Some content will go here.........",defFontSize:21}];
    itemsTable: Array<number[]>;
    boxWidth = 155;
    columnSize: number;
  ngOnInit(): void {
    this.noteService.readNotes().subscribe((res) =>{
      if(res?.status === 'sucess'){
        this.items = JSON.parse(res.result) ? JSON.parse(res.result) : this.items;
        this.noteFontSize = this.items[0]['defFontSize'] ? this.items[0]['defFontSize']: 21 ; 
        this.initTable();
      }
    },(error) =>{
      this.toastr.error("Something went wrong!");
    })
  }

  addNotes(){
    const notesSize = this.items.length;
    if(notesSize === 6) return this.toastr.warning("Notes Exccedd, Delete to create new one.");
    this.items.push({sno:notesSize+1,content:''});
    this.initTable();
    this.toastr.success('Note Created!')
  }

  saveNote(){
    if(this.items){
      this.items[0]['defFontSize'] = this.noteFontSize;
      this.noteService.saveNotes(this.items).subscribe((res)=>{
        if(res?.status === 'sucess') this.toastr.success("Saved successfully.")
      },(error) => {
        this.toastr.error("Saved Failed!");
      })
    }
  }

  deleteNotes(noteNo: number){
    this.items.forEach((obj, indx) =>{
      if(obj.sno === noteNo) this.items.splice(indx, 1);
    })
    
    this.noteService.saveNotes(this.items).subscribe((res)=>{
      if(res?.status === 'sucess') this.toastr.success("Deleted successfully.")
    },(error) => {
      this.toastr.error("Not Deleted!");
    })
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



  getItemsTable(rowLayout): number[][] {
    const { width } = rowLayout.getBoundingClientRect();
    const columnSize = Math.round(width / this.boxWidth);
    if (columnSize != this.columnSize) {
      this.columnSize = columnSize;
      this.initTable();
    }
    return this.itemsTable;
  }

  initTable() {
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
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.items = this.itemsTable.reduce(
      (previous, current) => previous.concat(current),
      []
    );

    this.initTable();
  }

}
