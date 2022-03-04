import { Component, AfterViewInit, Input } from "@angular/core";
import { DdsComponent } from "../../helpers/dds-component-shell";
import { setElementId } from "../../helpers/dds-helpers";

@Component({
  selector: `dds-form`,
  templateUrl: `./form.component.html`,
  styleUrls: [`./form.component.scss`]
})
export class FormValidationComponent extends DdsComponent
  implements AfterViewInit {
  @Input() class: string;

  ngOnInit() {
    this.ddsInitializer = {
      component: `Form`,
      selector: `form-validation`
    };
    this.elementId = setElementId(
      this.elementId,
      this.ddsInitializer.component.toLowerCase()
    );
  }
}
