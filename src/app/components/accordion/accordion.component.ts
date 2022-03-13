import { Component, OnInit, Input } from "@angular/core";
import { DdsComponent } from "../../helpers/dds-component-shell";
import { stringToBoolean } from "../../helpers/dds-helpers";

@Component({
  selector: "dds-accordion",
  templateUrl: "./accordion.component.html",
  styleUrls: ["./accordion.component.scss"]
})
export class AccordionComponent extends DdsComponent implements OnInit, Input {
  @Input() elementId: string;
  @Input() openState: string;
  private isOpen: boolean;

  ngOnInit() {
    super.ngOnInit();
    this.ddsInitializer = `Accordion`;
    this.isOpen = stringToBoolean(this.openState);
  }
}
