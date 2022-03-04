import { Component, OnInit, Input } from "@angular/core";
import { DdsComponent } from "../../helpers/dds-component-shell";
import { setElementId, stringToBoolean } from "../../helpers/dds-helpers";

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
    this.ddsInitializer = `Accordion`;
    this.elementId = setElementId(
      this.elementId,
      this.ddsInitializer.toLowerCase()
    );
    this.isOpen = stringToBoolean(this.openState);
  }
}
