import { Component, OnInit, ViewChild } from "@angular/core";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { ModalComponent } from "./components/modal/modal.component";
import { DrawerComponent } from "./components/drawer/drawer.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  @ViewChild(SidenavComponent) private sidenavComponent: SidenavComponent;
  @ViewChild(DrawerComponent) private drawerComponent: DrawerComponent;
  @ViewChild(ModalComponent) private modalComponent: ModalComponent;
  public showPage = 0;
  public selectValue1: Array<string> = [`Loading...`];
  public selectValue2: Array<string> = [`Loading...`];
  public textareaText: string = `You can get my logo from facebook something summery`;
  public menuItems = [
    {
      icon: `home`,
      text: `Home`
    },
    {
      icon: `card-swipe-left`,
      text: `Sidenav`
    },
    {
      icon: `cancelled`,
      text: `Non-Initializing Components`
    },
    {
      icon: `card-info`,
      text: `TextArea`
    },
    {
      icon: `clone`,
      text: `Modal`
    },
    {
      icon: `device-data-center`,
      text: `Select`
    },
    {
      icon: `comment`,
      text: `Tooltip`
    },
    {
      icon: `collapse-down-sqr`,
      text: `Accordion`
    },
    {
      icon: `card-swipe-right`,
      text: `Drawer`
    },
    {
      icon: `bolt`,
      text: `Action Menu`
    },
    {
      icon: `fingerprint`,
      text: `Button`
    },
    {
      icon: `stack`,
      text: `Dropdown`
    }
  ];
  public splitButtonValue: string = `Country`;
  public splitButton2Value: string = `Singer`;

  ngOnInit() {
    console.clear();
    this.getDelayedData();

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop: string) => searchParams.get(prop)
    });
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    let qsShowPage = params.showPage; // "some_value"
    if (qsShowPage) {
      this.showPage = Number(qsShowPage);
    }
  }

  getDelayedData(): void {
    setTimeout(() => {
      this.selectValue1 = [`Matrix`, `Free Guy`, `Dark City`, `Demolition Man`];
    }, 750);

    setTimeout(() => {
      this.selectValue2 = [
        `Hitchhiker's Guide to the Universe`,
        `The Princess Bride`,
        `Labyrinth`,
        `Do Androids Dream of Electric Sheep?`
      ];
    }, 1500);
  }

  collapseSidenav(e: any) {
    this.sidenavComponent.collapseSidenav(e);
    return false;
  }

  expandSidenav(e: any) {
    this.sidenavComponent.expandSidenav(e);
    return false;
  }

  openModal(e: any) {
    this.modalComponent.openModal(e);
  }

  openDrawer(e: any) {
    this.drawerComponent.openDrawer(e);
  }

  optionSelected(e: any) {
    console.log(e);
  }

  sidenavItemClick(e: any) {
    this.showPage = e;
  }

  actionMenuAction(e: any) {
    this.splitButtonValue = e;
  }

  actionMenu2Action(e: any) {
    this.splitButton2Value = e;
  }
}
