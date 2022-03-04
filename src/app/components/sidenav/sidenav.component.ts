import { Component, Input } from "@angular/core";
import { DdsComponent } from "../../helpers/dds-component-shell";
import { setElementId, stringToBoolean } from "../../helpers/dds-helpers";

@Component({
  selector: `dds-sidenav`,
  templateUrl: `./sidenav.component.html`,
  styleUrls: [`./sidenav.component.scss`]
})
export class SidenavComponent extends DdsComponent {
  @Input() openState: string;
  private isOpen: boolean;

  ngOnInit() {
    this.ddsInitializer = `SideNav`;
    this.isOpen = stringToBoolean(this.openState);
    this.elementId = setElementId(
      this.elementId,
      this.ddsInitializer.toLowerCase()
    );
  }

  expandSidenav = (e: any) => {
    if (this.ddsComponent) this.ddsComponent.expand();
  };

  collapseSidenav = (e: any) => {
    if (this.ddsComponent) this.ddsComponent.collapse();
  };
}
