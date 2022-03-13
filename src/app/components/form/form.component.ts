import { Component, AfterViewInit, Input } from "@angular/core";
import { DdsComponent } from "../../helpers/dds-component-shell";

@Component({
  selector: `dds-form`,
  templateUrl: `./form.component.html`,
  styleUrls: [`./form.component.scss`]
})
export class FormValidationComponent extends DdsComponent
  implements AfterViewInit {
  @Input() class: string;

  ngOnInit() {
    super.ngOnInit();
    this.ddsInitializer = {
      component: `Form`,
      selector: `form-validation`
    };
  }
}
