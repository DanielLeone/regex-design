import {Component} from "@angular/core";
import {RegexStore} from "../shared/store";
import {ColorFactoryService} from "../shared/services/color-factory.service";
import {HostListener} from "@angular/core/src/metadata/directives";
import {changeTheme} from "../shared/actions";
import * as _ from "lodash";

@Component({
    selector: 'super',
    template: `
    <h1>Re<span [style.color]="theme">g</span>ex<i class="material-icons" [style.color]="theme">color_lens</i>Desi<span [style.color]="theme">g</span>n</h1>
    <h3>Design your Regular Expressions</h3>
    `,
    styleUrls: ['super.component.styl']
})
export class SuperComponent {
    
    private theme: string = '#bbb';
    constructor(private store: RegexStore, private color: ColorFactoryService) {
        this.store.subscribe(() => {
            this.theme = color.getColor(this.store.state.theme);
        });
    }
    
    
    @HostListener('click')
    changeTheme() {
        const theme = RegexStore.THEMES[_.random(0, RegexStore.THEMES.length - 1, false)];
        const colorMap = this.store.createNewColorMap(theme);
        this.store.dispatch(changeTheme(theme, colorMap))
    }
}
