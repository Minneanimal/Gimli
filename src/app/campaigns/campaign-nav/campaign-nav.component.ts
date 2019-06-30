import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-campaign-nav",
  templateUrl: "./campaign-nav.component.html",
  styleUrls: ["./campaign-nav.component.css"]
})
export class CampaignNavComponent implements OnInit {
  links = [
    { label: "Overview", link: "./" },
    { label: "Roleplay", link: "roleplay" },
    { label: "Characters", link: "characters" }
  ];
  activeLink = this.links[0].link;

  constructor() {}

  ngOnInit() {}
}
