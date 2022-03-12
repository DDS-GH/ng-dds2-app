import { Component, OnInit, ViewChild } from "@angular/core";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { ModalComponent } from "./components/modal/modal.component";
import { DrawerComponent } from "./components/drawer/drawer.component";
import { arrayAdd, arrayRemove } from "./helpers/dds-helpers";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  @ViewChild(SidenavComponent) private sidenavComponent: SidenavComponent;
  @ViewChild(DrawerComponent) private drawerComponent: DrawerComponent;
  @ViewChild(ModalComponent) private modalComponent: ModalComponent;
  public showPage = `Home`;
  public selectValue1: Array<string> = [`Loading...`];
  public selectValue2: Array<string> = [`Loading...`];
  public textareaText: string = `You can get my logo from facebook something summery`;
  public menuItems = [
    {
      icon: `card-swipe-left`,
      text: `Sidenav`
    },
    {
      icon: `disc-software`,
      text: `Radio`
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
      text: `ActionMenu`
    },
    {
      icon: `fingerprint`,
      text: `Button`
    },
    {
      icon: `stack`,
      text: `Dropdown`
    },
    {
      icon: `alert-check-sqr`,
      text: `Checkbox`
    },
    {
      icon: `shield-check`,
      text: `Badge`
    },
    {
      icon: `app-window`,
      text: `MessageBar`
    },
    {
      icon: `ellipsis`,
      text: `Breadcrumb`
    },
    {
      icon: `tag`,
      text: `Tag`
    },
    {
      icon: `app-window`,
      text: `Tabs`
    }
  ];
  public checkboxOn: boolean = true;
  public splitButtonValue: string = `Country`;
  public splitButton2Value: string = `Singer`;
  private dropdownBase: Array<any> = [
    {
      hidden: false,
      options: [
        {
          name: "Alpha Item 0",
          value: "101", // to be used after v2.5.1
          selected: false
        },
        {
          name: "Not Shown Item 0",
          value: "999",
          selected: false,
          hidden: true
        },
        {
          name: "Alpha Item 1",
          value: "102",
          selected: false
        },
        {
          name: "Not Shown Item 1",
          value: "9992",
          selected: false,
          hidden: true
        },
        {
          name: "Alpha Item 2",
          value: "103",
          selected: false
        }
      ]
    },
    {
      name: "Other Stuff",
      options: [
        {
          name: "Beta Item 0",
          value: "201",
          selected: false
        },
        {
          name: "Beta Item 1",
          value: "202",
          selected: false
        },
        {
          name: "Beta Item 2",
          value: "302",
          selected: false
        }
      ]
    }
  ];
  public dropdownData: Array<any> = [
    {
      stored: [],
      groups: this.dropdownBase
    },
    {
      stored: [],
      groups: this.dropdownBase
    },
    {
      stored: [],
      groups: this.dropdownBase
    }
  ];

  ngOnInit() {
    console.clear();
    this.menuItems = [
      {
        icon: `home`,
        text: `Home`
      },
      ...this.menuItems.sort((a, b) =>
        a.text > b.text ? 1 : b.text > a.text ? -1 : 0
      )
    ];
    this.dropdownData.forEach((ddata: any) => {
      // I shouldn't have to stringify but Sandbox is removing JSON formatting for the data
      ddata.groups = JSON.stringify(ddata.groups);
    });
    this.getDelayedData();

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop: string) => searchParams.get(prop)
    });
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    let qsShowPage = params.showPage; // "some_value"
    if (qsShowPage) {
      this.showPage = qsShowPage;
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

  selectOptionSelected(e: any) {
    console.log(`select component`, e);
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

  dropdownHandlers = {
    clear: (index: number, e: any) => {
      this.dropdownData[index].stored = [];
    },
    select: (index: number, e: any) => {
      this.dropdownData[index].stored = arrayAdd(
        this.dropdownData[index].stored,
        e
      );
    },
    deselect: (index: number, e: any) => {
      this.dropdownData[index].stored = arrayRemove(
        this.dropdownData[index].stored,
        e
      );
    },
    keyUp: (index: number, e: any) => {
      this.fakeBackendSearch(index, e);
    },
    externalUpdate: (e: any) => {
      const newData = this.dropdownRandomItems(`New Data`, 1, false);
      this.dropdownData[1].stored = newData.selection;
      this.dropdownData[1].groups = [
        {
          name: `New Data`,
          options: newData.items
        }
      ];
      this.dropdownData[1].groups = JSON.stringify(this.dropdownData[1].groups);
    }
  };

  fakeBackendSearch = (index, e): any => {
    setTimeout(() => {
      const rememberThese = [];
      const randomItems = this.dropdownRandomItems(e, index);
      this.dropdownData[index].stored.forEach((storedOption) => {
        if (!randomItems.selection.includes(storedOption)) {
          rememberThese.push({
            name: storedOption,
            selected: true,
            stored: true
          });
        }
      });
      const compiledNewData = [
        {
          name: "Results for " + e,
          options: [...randomItems.items, ...rememberThese]
        }
      ];
      this.dropdownData[index].groups = JSON.stringify(compiledNewData);
    }, 500);
  };

  dropdownRandomItems(rName, index = 0, noSelected = true) {
    const selectedItems = [];
    const randomItems = [];
    for (let i = 0; i < Math.floor(Math.random() * 10) + 3; i++) {
      let selected = noSelected ? false : Math.floor(Math.random() * 2) === 0;
      const itemName = `${rName} Item ${i}`;
      if (!this.dropdownData[index].stored) {
        this.dropdownData[index].stored = [];
      }
      if (this.dropdownData[index].stored.includes(itemName)) {
        selected = true;
      }
      randomItems.push({
        name: itemName,
        value: i,
        selected: selected
      });
      if (selected) {
        selectedItems.push(itemName);
      }
    }
    return {
      items: randomItems,
      selection: selectedItems
    };
  }

  tabsSelect(tabIndex: number) {
    document.getElementById(`ddsTabs`).Tabs.setActiveTab(tabIndex);
  }
}
