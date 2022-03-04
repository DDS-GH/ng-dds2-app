import { Component, Input, Output, EventEmitter } from "@angular/core";
import { DdsComponent } from "../../helpers/dds-component-shell";
import { setElementId } from "../../helpers/dds-helpers";

@Component({
  selector: `dds-select`,
  templateUrl: `./select.component.html`,
  styleUrls: [`./select.component.scss`]
})
export class SelectComponent extends DdsComponent {
  @Input() selectOptions: Array<string>;
  @Input() label: string;
  @Input() defaultValue: string;
  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();
  private selectedValue: string;

  ngOnInit() {
    this.ddsInitializer = `Select`;
    this.elementId = setElementId(
      this.elementId,
      this.ddsInitializer.toLowerCase()
    );
  }

  public onChange() {
    this.selectedValue = this.ddsElement.querySelector(`select`).value;
    this.optionSelected.emit(this.selectedValue);
  }
}
