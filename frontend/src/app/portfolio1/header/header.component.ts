import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  shown: boolean = false; 
  preloaded: boolean = false; 
  name : string = "John Doe";
  @ViewChild('mynav') mynav:any;
  @ViewChild('preloader') preloader:any;

  // TODO: remove the button and the ngFor
  buttons = [
    {
      name: "About me",
      selector: "about"
    },
    {
      name: "Expertise",
      selector: "expertise"
    },
    {
      name: "Career",
      selector: "career"
    },
    {
      name: "Testimonials",
      selector: "testimonials"
    },
    {
      name: "Contact me",
      selector: "contact"
    },
  ]

  audio1 = new Audio("/assets/audio/1.mp3");
  audio2 = new Audio("/assets/audio/2.mp3");

  constructor() { }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('portfolio')!).userName;
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

  goto(e:any,selector:string ){
    e.preventDefault();
    const element = document.querySelector('#'+selector)
    if(element){
      console.log(element)
      element.scrollIntoView({
        behavior:'smooth'
      })
    }
    
  }

}
