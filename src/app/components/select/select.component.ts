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
  @Input() init: string = `now`;
  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();
  private selectedValue: string;

  ngOnInit() {
    this.ddsInitializer = `Select`;
    this.ddsStartImmediately = this.init === `now`;
    this.elementId = setElementId(this.elementId);
  }

  public onChange() {
    this.selectedValue = this.ddsElement.querySelector(`select`).value;
    this.optionSelected.emit(this.selectedValue);
  }
}
