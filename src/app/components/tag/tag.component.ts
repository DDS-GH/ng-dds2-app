import {
  Component,
  EventEmitter,
  Input,
  AfterViewInit,
  Output
} from "@angular/core";
import { DdsComponent } from "../../helpers/dds-component-shell";
import { stringToBoolean } from "../../helpers/dds-helpers";

@Component({
  selector: "dds-tag",
  templateUrl: "./tag.component.html"
})
export class TagComponent extends DdsComponent implements AfterViewInit {
  @Output() onDimiss: EventEmitter<string> = new EventEmitter<string>();
  @Input() aria: string = `Dismiss`;
  @Input() dismiss: any = `true`;
  @Input() icon: string = ``;
  @Input() classList: string = ``;
  @Input() value: string = ``;

  ngOnInit() {
    super.ngOnInit();
    this.ddsInitializer = `Tag`;
    this.dismiss = stringToBoolean(this.dismiss);
    this.ddsOptions = {
      srDismiss: this.aria,
      dismiss: this.dismiss
    };
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.ddsElement.addEventListener(`ddsTagDismissEvent`, (e) => {
      const thisText: string = this.ddsElement
        .querySelector(`button`)
        .innerText.trim();
      const valueToEmit: any = !this.value
        ? thisText
        : {
            value: this.value,
            text: this.ddsElement.querySelector(`button`).innerText.trim()
          };
      this.onDimiss.emit(valueToEmit);
    });
  }
}
