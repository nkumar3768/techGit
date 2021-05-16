import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }
  cards:any = [{title:"We can Write and Save the notes and later we can read it.", btnTitle:"Lets write notes.", path:'/notes'},
              {title:"We can Write and Save the notes and later we can read it.", btnTitle:"Lets write notes."},
              {title:"We can Write and Save the notes and later we can read it.", btnTitle:"Lets write notes."},]
  ngOnInit(): void {
  }

}
