import { Component, Input, AfterViewInit, OnInit } from "@angular/core";

@Component({
  selector: "dds-badge",
  templateUrl: "./badge.component.html",
  styleUrls: ["./badge.component.scss"]
})
export class BadgeComponent implements OnInit, AfterViewInit {
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
    super.ngOnInit();
    this.has.icon = this.icon !== ``;
    this.has.value = this.value !== ``;
    this.has.units = this.units !== ``;
  }
}
