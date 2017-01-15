import {Component, OnInit} from "@angular/core";
import {ColorFactoryService} from "../shared/services/color-factory.service";
import {RegexStore} from "../shared/store";

@Component({
    selector: 'footer',
    styleUrls: ['footer.component.styl'],
    template: `
    <a class="daniel" [style.color]="colors[0]" href="http://danielleone.com">Daniel Leone</a>
    <i class="material-icons code" [style.color]="colors[1]">code</i>
    <a class="gitHub" [style.color]="colors[2]" href="https://github.com/DanielLeone/regex-design">GitHub</a>`
})
export class FooterComponent implements OnInit {
    
    private colors: string[] = ['#fff', '#fff', '#fff'];
    
    constructor(private store: RegexStore, private color: ColorFactoryService) {
        this.store.subscribe(() => {
            this.colors = color.getColors(this.store.state.theme, 3);
        });
    }
    
    ngOnInit() {
    }
}
