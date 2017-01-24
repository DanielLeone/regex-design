import {Component} from "@angular/core";
import {RegexStore} from "../shared/store";
import {ColorFactoryService} from "../shared/services/color-factory.service";
@Component({
    selector: 'app-root',
    styleUrls: ['app.component.styl'],
    template: `
    <super></super>
    <space></space>
    <expression></expression>
    <test></test>
    <footer></footer>
    `
})
export class AppComponent {
    private theme: string;
    
    constructor(private store: RegexStore, private color: ColorFactoryService) {
        this.store.subscribe(() => {
            this.theme = color.getColor(this.store.state.theme);
            document.getElementById('color-theme-meta-tag').setAttribute("content", this.theme);
        });
    }
}
