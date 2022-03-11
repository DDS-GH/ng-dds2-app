import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { DdsComponent } from "../../helpers/dds-component-shell";
import {
  setElementId,
  debounce,
  throttle,
  stringToBoolean
} from "../../helpers/dds-helpers";

@Component({
  selector: `dds-dropdown`,
  templateUrl: `./dropdown.component.html`,
  styleUrls: [`./dropdown.component.scss`]
})
export class DropdownComponent extends DdsComponent implements OnChanges {
  @Input() label: string;
  @Input() helper: string;
  @Input() groups: any;
  @Input() noOptionsLabel: string = `No options found`;
  @Input() selectedLabel: string = `selected`;
  @Input() srClearLabel: string = `clear selected items`;
  @Input() useBackend: any = `false`;
  @Input() onKeyUp: any;
  @Input() selection: string = `single`;
  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() onKeyUp: EventEmitter<string> = new EventEmitter<string>();
  @Output() optionDeselected: EventEmitter<string> = new EventEmitter<string>();
  @Output() optionsCleared: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.ddsInitializer = `Dropdown`;
    this.ddsOptions = {
      selection: this.selection,
      noOptionsLabel: this.noOptionsLabel,
      selectedLabel: this.selectedLabel,
      srClearLabel: this.srClearLabel
    };
    this.elementId = setElementId(this.elementId);
    this.useBackend = stringToBoolean(this.useBackend);
    this.parseData();
    this.ddsAfterInit = () => {
      // this.ddsElement.addEventListener(
      //   `ddsDropdownSelectionChangeEvent`,
      //   (e) => {
      //     this.optionSelected.emit(this.ddsComponent.getValue());
      //   }
      // );
      const dropdownNotice = this.ddsElement.querySelector(
        `.dds__dropdown__notice`
      );
      const dropdownInput = this.ddsElement.querySelector(
        `.dds__dropdown__input-field`
      );
      const dropdownClear = this.ddsElement.querySelector(`.dds__tag`);
      const handleUpFinal = () => {
        dropdownNotice.innerText = ``;
        this.onKeyUp.emit(dropdownInput.value);
      };
      const handleDownFinal = (e) => {
        const ignoredKeys = [`ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`];
        if (!ignoredKeys.includes(e.key) && this.noOptionsLabel) {
          dropdownNotice.innerText = this.noOptionsLabel;
        }
      };
      const handleClear = () => {
        this.optionsCleared.emit(this.ddsComponent.getValue());
      };
      const handleKeyUp = debounce(() => handleUpFinal());
      const handleKeyDown = throttle((e) => handleDownFinal(e));
      if (this.useBackend) {
        dropdownInput.addEventListener(`keyup`, handleKeyUp);
        dropdownInput.addEventListener(`keydown`, handleKeyDown);
      }
      if (dropdownClear) {
        dropdownClear.addEventListener(`click`, handleClear);
      }
      this.ddsElement.addEventListener(`click`, (e) => {
        if (
          e.target.classList &&
          e.target.classList.contains(`dds__dropdown__item-option`)
        ) {
          if (!stringToBoolean(e.target.getAttribute(`data-selected`))) {
            this.optionDeselected.emit(e.target.innerText);
          } else {
            this.optionSelected.emit(e.target.innerText);
          }
        }
      });
    };
  }
  parseData() {
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
  deselect(byText: string) {
    const ddOptions = this.ddsElement.querySelectorAll(
      `.dds__dropdown__item-option`
    );
    for (let i = 0; i < ddOptions.length; i++) {
      if (ddOptions[i].textContent.trim() === byText.trim()) {
        ddOptions[i].parentElement.querySelector(`button`).click(); // This will be replaced *after* DDS2 v2.5.1
        this.optionDeselected.emit(byText.trim());
      }
    }
  }
}
