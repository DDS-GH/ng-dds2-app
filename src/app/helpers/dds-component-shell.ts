import { Component, AfterViewInit, Input } from "@angular/core";
import { createObserver, pascalDash } from "./dds-helpers";

// import { <Component> } from @dds/components;  You would use this if you were using the node module for DDS
declare var DDS: any; // Use declare if you import via CDN. Regular Angular (node_modules) usage would be via an import

@Component({})
export class DdsComponent implements AfterViewInit {
  @Input() elementId: string;

  public ddsStartImmediately: boolean = true;
  public ddsInitializer: any;
  public ddsElement: any;
  public ddsComponent: any;
  public ddsOptions: any;
  public ddsAfterInit: any;
  private observers: Array<any>;

  ngAfterViewInit() {
    this.ddsElement = document.getElementById(this.elementId);
    this.initialize();
  }

  initialize() {
    if (this.ddsInitializer) {
      if (this.ddsStartImmediately) {
        this.initializeNow();
        if (this.ddsAfterInit) {
          this.ddsAfterInit();
        }
      } else {
        this.initializeLater();
      }
    }
  }

  parseInitializer = (parm) => {
    let rValues = {
      component: ``,
      selector: ``
    };
    if (typeof this.ddsInitializer === `string`) {
      rValues.component = this.ddsInitializer;
      rValues.selector = pascalDash(this.ddsInitializer).toLowerCase();
    } else {
      rValues.component = this.ddsInitializer.component;
      rValues.selector = this.ddsInitializer.selector;
    }
    if (parm === `component`) {
      return rValues.component;
    } else if (rValues.selector.indexOf(`[`) > -1) {
      return rValues.selector;
    } else {
      return `[data-dds="${rValues.selector}"]`;
    }
  };

  initializeNow = () => {
    const ddsCom: string = this.parseInitializer(`component`);
    const ddsSel: string = this.parseInitializer(`selector`);
    let ddsDataElement: any;

    if (this.ddsElement) {
      ddsDataElement = this.ddsElement.querySelector(ddsSel);
      if (!ddsDataElement) {
        ddsDataElement = this.ddsElement.parentElement.querySelector(ddsSel);
      }
      if (ddsDataElement) {
        if (DDS[ddsCom]) {
          this.ddsComponent = new DDS[ddsCom](ddsDataElement, this.ddsOptions);
        } else {
          console.log(`No such DDS Component, ${ddsCom}`);
        }
      } else {
        console.log({
          ddsElement: this.ddsElement,
          parent: this.ddsElement.parentElement,
          error: `"${ddsCom}" not found by selector ${ddsSel}.`
        });
      }
    } else {
      console.log(
        `DDS Component "${ddsCom}" not found by elementId "${this.elementId}".`
      );
    }
  };

  initializeLater = () => {
    const ddsCom: string = this.parseInitializer(`component`);
    const ddsSel: string = this.parseInitializer(`selector`);
    var waitForElements = [
      {
        selectr: ddsSel,
        command: (elem: any) => {
          this.ddsComponent = new DDS[ddsCom](elem, this.ddsOptions);
          if (this.ddsAfterInit) {
            this.ddsAfterInit();
          }
        }
      }
    ];

    if (!this.observers) {
      this.observers = createObserver(waitForElements);
    }
  };
}
