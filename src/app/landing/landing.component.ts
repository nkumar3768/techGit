import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }
  // cards:any = [{title:"We can Write and Save the notes and later we can read it.", btnTitle:"Lets write notes.", path:'/notes'},
  //             {title:"We can Write and Save the notes and later we can read it.", btnTitle:"Lets write notes."},
  //             {title:"We can Write and Save the notes and later we can read it.", btnTitle:"Lets write notes."},]
  
  isWorkSpaceMaximized:boolean = false;
  isCollapsed:boolean = false;
  sidebar:any;
  dynamicView:any;
  mainContent:any;

  ngOnInit(): void {
    this.sidebar = document.querySelector('.sidebar');
    this.dynamicView = document.getElementsByClassName('dynamicView');
    this.mainContent = document.querySelector('.main-content');
  }


  btnClick(){
    if(this.isCollapsed){
      this.isCollapsed = false;
    }else{
      this.isCollapsed = true;
    }
    for(var i=0; i<this.dynamicView.length; i++){
      this.dynamicView[i].classList.toggle('dynamicViewAn');
    }
    this.sidebar.classList.toggle('sidebar_small');
    this.mainContent.classList.toggle('main-content_large')
    
  }
}
