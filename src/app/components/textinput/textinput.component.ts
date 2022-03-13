import { Component, Input } from "@angular/core";
import { DdsComponent } from "../../helpers/dds-component-shell";
import { pascalDash } from "../../helpers/dds-helpers";

@Component({
  selector: `dds-textinput`,
  templateUrl: `./textinput.component.html`,
  styleUrls: [`./textinput.component.scss`]
})
export class TextInputComponent extends DdsComponent {
  @Input() type: string = `text`;
  @Input() value: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() helper: string;
  @Input() feedback: string;
  @Input() srHide: string = `Hide Password`;
  @Input() srShow: string = `Show Password`;
  @Input() hide: string = `Hide`;
  @Input() show: string = `Show`;
  @Input() minlength: string;
  @Input() maxlength: string;
  @Input() required: string;
  @Input() mask: string;
  public dataDds: string = ``;

  ngOnInit() {
    super.ngOnInit();
    switch (this.type.toLowerCase()) {
      case `password`:
        this.ddsInitializer = `InputPassword`;
        this.dataDds = pascalDash(this.ddsInitializer);
        this.ddsOptions = {
          srHideTitle: this.srHide,
          srShowTitle: this.srShow,
          showLabel: this.show,
          hideLabel: this.hide
        };
        break;
      case `tel`:
        this.ddsInitializer = `InputMask`;
        this.dataDds = pascalDash(this.ddsInitializer);
        this.ddsOptions = {
          mask: this.mask
        };
        break;
    }
  }
}
