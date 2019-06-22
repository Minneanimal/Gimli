import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-adventure-nav",
  templateUrl: "./adventure-nav.component.html",
  styleUrls: ["./adventure-nav.component.css"]
})
export class AdventureNavComponent implements OnInit {
  links = [
    { label: "Overview", link: "./" },
    { label: "Roleplay", link: "roleplay" },
    { label: "Characters", link: "characters" }
  ];
  activeLink = this.links[0].link;

  constructor() {}

  ngOnInit() {}
}
