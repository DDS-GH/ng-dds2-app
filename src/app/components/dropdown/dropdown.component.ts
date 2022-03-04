import { Component, Input, Output, EventEmitter } from "@angular/core";
import { DdsComponent } from "../../helpers/dds-component-shell";
import { setElementId, stringToBoolean } from "../../helpers/dds-helpers";

@Component({
  selector: `dds-dropdown`,
  templateUrl: `./dropdown.component.html`
})
export class DropdownComponent extends DdsComponent {
  @Input() label: string;
  @Input() helper: string;
  @Input() groups: any;
  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.ddsInitializer = `Dropdown`;
    this.elementId = setElementId(
      this.elementId,
      this.ddsInitializer.toLowerCase()
    );
    this.groups = JSON.parse(
      this.groups
        .replace(/\\'/g, "@p0z")
        .replace(/'/g, '"')
        .replace(/@p0z/g, "'")
    );
    this.ddsAfterInit = () => {
      this.ddsElement.addEventListener(
        `ddsDropdownSelectionChangeEvent`,
        (e) => {
          this.optionSelected.emit(this.ddsComponent.getValue());
        }
      );
    };
  }
}
