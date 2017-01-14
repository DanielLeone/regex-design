import {Component, OnInit} from "@angular/core";
import {ColorFactoryService} from "../shared/services/color-factory.service";
import {RegexStore} from "../shared/store";

@Component({
    selector: 'footer',
    styleUrls: ['footer.component.styl'],
    template: `
    <i class="material-icons made">code</i>
    <span class="with">with</span>
    <i class="material-icons love">favorite</i>
    <span class="by">by</span>
    <a class="daniel" href="http://danielleone.com" [style.color]="theme">Daniel Leone</a>
    <a class="gitHub" href="https://github.com/DanielLeone/regex-design">GitHub</a>`
})
export class FooterComponent implements OnInit {
    
    private theme: string = '#bbb';
    
    constructor(private store: RegexStore, private color: ColorFactoryService) {
        this.store.subscribe(() => {
            this.theme = color.getColor(this.store.state.theme);
        });
    }
    
    ngOnInit() {
    }
}
