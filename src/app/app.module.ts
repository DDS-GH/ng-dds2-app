import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AccordionComponent } from "./components/accordion/accordion.component";
import { ActionMenuComponent } from "./components/actionmenu/actionmenu.component";
import { ActionMenuItemComponent } from "./components/actionmenu/actionmenu.item.component";
import { ActionMenuMenuComponent } from "./components/actionmenu/actionmenu.menu.component";
import { AppComponent } from "./app.component";
import { BadgeComponent } from "./components/badge/badge.component";
import { ButtonComponent } from "./components/button/button.component";
import { DrawerComponent } from "./components/drawer/drawer.component";
import { DropdownComponent } from "./components/dropdown/dropdown.component";
import { FormValidationComponent } from "./components/form/form.component";
import { IsSelectedDirective } from "./helpers/isselected.directive";
import { MenuService } from "./helpers/menu.service";
import { MessageBarComponent } from "./components/messagebar/messagebar.component";
import { ModalComponent } from "./components/modal/modal.component";
import { SelectComponent } from "./components/select/select.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { SidenavItemComponent } from "./components/sidenav/sidenav.item.component";
import { SidenavMenuComponent } from "./components/sidenav/sidenav.menu.component";
import { TextAreaComponent } from "./components/textarea/textarea.component";
import { TooltipComponent } from "./components/tooltip/tooltip.component";

@NgModule({
  declarations: [
    AccordionComponent,
    ActionMenuComponent,
    ActionMenuItemComponent,
    ActionMenuMenuComponent,
    AppComponent,
    BadgeComponent,
    ButtonComponent,
    DrawerComponent,
    DropdownComponent,
    FormValidationComponent,
    IsSelectedDirective,
    MessageBarComponent,
    ModalComponent,
    SelectComponent,
    SidenavComponent,
    SidenavItemComponent,
    SidenavMenuComponent,
    TextAreaComponent,
    TooltipComponent
  ],
  imports: [BrowserModule, FormsModule],
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule {}
