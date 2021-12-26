import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  shown: boolean = false; 
  preloaded: boolean = false; 
  @ViewChild('mynav') mynav:any;
  @ViewChild('preloader') preloader:any;

  // TODO: remove the button and the ngFor
  buttons = [
    {
      name: "About me",
    },
    {
      name: "Expertise",
    },
    {
      name: "Experience",
    },
    {
      name: "Education",
    },
    {
      name: "Portfolio",
    },
    {
      name: "Testimonials",
    },
    {
      name: "Contact me",
    },
  ]

  audio1 = new Audio("/assets/audio/1.mp3");
  audio2 = new Audio("/assets/audio/2.mp3");

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){

    const mynav = this.mynav.nativeElement; 
    window.addEventListener('scroll', ()=>{
      if(window.pageYOffset>50){
        mynav.classList.add("white");
      }else {
        mynav.classList.remove("white");
      }
      
    })
	
	  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
    const preloader = this.preloader.nativeElement; 
    
    if (!isMobile) {
      setTimeout(() => {
        this.preloaded = true;
      }, 800);
      setTimeout(function() {
        preloader.remove();
      }, 2000);

    } else {
      preloader.remove();
    }
    
  }

  switch() :void{
    if(this.shown){
      this.audio1.play();
    }else{
      this.audio2.play();
    }

    this.shown = !this.shown
    
  }

}
