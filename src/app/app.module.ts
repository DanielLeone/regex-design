import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app/app.component";
import {SuperComponent} from "./super/super.component";
import {WorkbenchComponent} from "./workbench/workbench.component";
import {TestComponent} from "./test/test.component";
import {ChipComponent} from "./chip/chip.component";
import {ExpressionComponent} from "./expression/expression.component";
import {PaletteComponent} from "./palette/palette.component";
import {ChipFactoryService} from "./shared/services/chip-factory.service";
import {RegexStore} from "./shared/store";
import {ColorFactoryService} from "./shared/services/color-factory.service";
import {SortablejsModule} from "angular-sortablejs";
import {OptionsComponent} from "./options/options.component";
import {FooterComponent} from "./footer/footer.component";

@NgModule({
    declarations: [
        AppComponent,
        SuperComponent,
        WorkbenchComponent,
        ChipComponent,
        ExpressionComponent,
        PaletteComponent,
        TestComponent,
        OptionsComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        SortablejsModule
    ],
    providers: [
        RegexStore,
        ChipFactoryService,
        ColorFactoryService
    ],
    entryComponents: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
    
}
