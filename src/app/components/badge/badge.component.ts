import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "dds-badge",
  templateUrl: "./badge.component.html",
  styleUrls: ["./badge.component.scss"]
})
export class BadgeComponent implements OnInit {
  @Input() elementId: string;
  @Input() classList: string = ``;
  @Input() icon: string = ``;
  @Input() value: string = ``;
  @Input() units: string = ``;
  public has: any = {
    icon: false,
    value: false,
    units: false
  };

  ngOnInit() {
    this.has.icon = this.icon !== ``;
    this.has.value = this.value !== ``;
    this.has.units = this.units !== ``;
  }
}
