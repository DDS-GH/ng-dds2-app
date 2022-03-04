import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { DdsComponent } from "../../helpers/dds-component-shell";
import { setElementId } from "../../helpers/dds-helpers";

@Component({
  selector: `dds-dropdown`,
  templateUrl: `./dropdown.component.html`
})
export class DropdownComponent extends DdsComponent implements OnChanges {
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
    this.parseData();
    this.ddsAfterInit = () => {
      this.ddsElement.addEventListener(
        `ddsDropdownSelectionChangeEvent`,
        (e) => {
          this.optionSelected.emit(this.ddsComponent.getValue());
        }
      );
    };
  }
  parseData() {
    console.log(`parseData`, this.groups);
    try {
      this.groups = JSON.parse(
        this.groups
          .replace(/\\'/g, "@p0z")
          .replace(/'/g, '"')
          .replace(/@p0z/g, "'")
      );
    } catch (e) {
      console.log(e);
      this.label = `Error parsing Dropdown Data`;
      this.groups = [];
      this.ddsInitializer = ``; // prevents Dropdown initialization
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (
      !changes.groups.firstChange &&
      changes.groups.currentValue !== changes.groups.previousValue
    ) {
      this.parseData();
    }
  }
}
