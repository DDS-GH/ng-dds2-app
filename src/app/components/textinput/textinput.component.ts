import { Component, Input, Output, EventEmitter } from "@angular/core";
import { DdsComponent } from "../../helpers/dds-component-shell";
import { pascalDash, stringToBoolean } from "../../helpers/dds-helpers";

@Component({
  selector: `dds-textinput`,
  templateUrl: `./textinput.component.html`,
  styleUrls: [`./textinput.component.scss`]
})
export class TextInputComponent extends DdsComponent {
  @Output() onIconClick: EventEmitter<object> = new EventEmitter<object>();
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
  @Input() mask: string;
  @Input() button: string;
  @Input() icons: string = ``;
  @Input() iconStart: string = ``;
  @Input() iconClickable: any = `false`;
  @Input() disabled: any = `false`;
  @Input() required: any = `false`;
  @Input() optionalText: string = ` (optional)`;
  public dataDds: string = ``;
  public iconList: Array<string> = [];

  ngOnInit() {
    super.ngOnInit();
    this.iconClickable = stringToBoolean(this.iconClickable);
    this.disabled = stringToBoolean(this.disabled);
    this.required = stringToBoolean(this.required);
    if (this.icons) {
      this.iconList = this.icons.replace(/ /g, ``).split(`,`);
    }
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

  handleIconClick(e: any) {
    if (this.iconClickable) {
      this.onIconClick.emit({
        type: e.target.getAttribute(`data-type`),
        value: this.ddsElement.querySelector(`input`).value || undefined
      });
    }
  }

  handleIconKeyup(e: any) {
    if (e.key === `Enter`) {
      this.handleIconClick(e);
    }
  }
}
