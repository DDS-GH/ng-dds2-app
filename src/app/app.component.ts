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
  public showPage = "Home";
  public selectValue1: Array<string> = [`Loading...`];
  public selectValue2: Array<string> = [`Loading...`];
  public textareaText: string = `You can get my logo from facebook something summery`;
  public menuItems = [
    {
      icon: `card-swipe-left`,
      text: `Sidenav`
    },
    {
      icon: `cancelled`,
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
    }
  ];
  public checkboxOn: boolean = true;
  public splitButtonValue: string = `Country`;
  public splitButton2Value: string = `Singer`;
  public dropdownDataSimple: any = [
    {
      options: [
        {
          name: "Simple Item1",
          value: "101", // to be used after v2.5.1
          selected: false
        },
        {
          name: "Simple Item2",
          value: "102", // to be used after v2.5.1
          selected: true
        },
        {
          name: "Simple Item3",
          value: "103", // to be used after v2.5.1
          selected: false
        }
      ]
    }
  ];
  public dropdownData: any = [
    {
      hidden: false,
      options: [
        {
          name: "Alpha Item1",
          value: "101", // to be used after v2.5.1
          selected: false
        },
        {
          name: "Not Shown Item",
          value: "999",
          selected: false,
          hidden: true
        },
        {
          name: "Alpha Item2",
          value: "102",
          selected: false
        },
        {
          name: "Not Shown Item2",
          value: "9992",
          selected: false,
          hidden: true
        },
        {
          name: "Alpha Item3",
          value: "103",
          selected: false
        }
      ]
    },
    {
      name: "Other Stuff",
      options: [
        {
          name: "Beta Item1",
          value: "201",
          selected: false
        },
        {
          name: "Beta Item2",
          value: "202",
          selected: false
        },
        {
          name: "Beta Item3",
          value: "302",
          selected: false
        }
      ]
    }
  ];
  private dropdownStored: any = [];

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
    this.dropdownData = JSON.stringify(this.dropdownData); // I shouldn't have to stringify but Sandbox is removing JSON formatting for the data
    this.dropdownDataSimple = JSON.stringify(this.dropdownDataSimple); // I shouldn't have to stringify but Sandbox is removing JSON formatting for the data
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

  handleDropdownCleared(e: any) {
    this.dropdownStored = [];
    console.log(`stored: ${this.dropdownStored}`);
  }

  handleDropdownSelected(e: string) {
    this.dropdownStored = arrayAdd(this.dropdownStored, e);
  }

  handleDropdownDeselected(e: string) {
    this.dropdownStored = arrayRemove(this.dropdownStored, e);
  }

  handleDropdownKeyUp(e) {
    setTimeout(() => {
      const rememberThese = [];
      const randomItems = this.dropdownRandomItems(e);
      this.dropdownStored.forEach((storedOption) => {
        if (!randomItems.selection.includes(storedOption)) {
          rememberThese.push({
            name: storedOption,
            selected: true,
            stored: true
          });
        }
      });
      this.dropdownData = [
        {
          name: "Results for " + e,
          options: [...randomItems.items, ...rememberThese]
        }
      ];
      console.log(this.dropdownData);
      this.dropdownData = JSON.stringify(this.dropdownData);
    }, 500);
  }

  dropdownAction(instruct: string) {
    switch (instruct) {
      case "update":
        const newData = this.dropdownRandomItems(`New Data`, false);
        this.dropdownStored = newData.selection;
        this.dropdownData = [
          {
            name: "New Data",
            options: newData.items
          }
        ];
        this.dropdownData = JSON.stringify(this.dropdownData);
        break;
    }
  }

  dropdownRandomItems(rName, noSelected = true) {
    const selectedItems = [];
    const randomItems = [];
    for (let i = 0; i < Math.floor(Math.random() * 10) + 3; i++) {
      let selected = noSelected ? false : Math.floor(Math.random() * 2) === 0;
      const itemName = `${rName} Item ${i}`;
      if (this.dropdownStored.includes(itemName)) {
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
}
