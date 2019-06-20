import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adventure-nav',
  templateUrl: './adventure-nav.component.html',
  styleUrls: ['./adventure-nav.component.css']
})
export class AdventureNavComponent implements OnInit {
  links = ['Overview', 'Roleplay', 'Characters'];
  activeLink = this.links[0];

  constructor() { }

  ngOnInit() {
  }

}
