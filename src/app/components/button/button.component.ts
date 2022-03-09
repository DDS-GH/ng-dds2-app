import { Component, Input, AfterViewInit } from "@angular/core";
import { DdsComponent } from "../../helpers/dds-component-shell";
import { setElementId } from "../../helpers/dds-helpers";

@Component({
  selector: "dds-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent extends DdsComponent implements AfterViewInit {
  @Input() elementId: string;
  @Input() ariaLabel: string;
  @Input() action: string;

  ngOnInit() {
    this.elementId = setElementId(this.elementId);
  }
}
