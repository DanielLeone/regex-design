import {Component} from "@angular/core";
@Component({
    selector: 'app-root',
    styleUrls: ['app.component.styl'],
    template: `
    <super></super>
    <div>
        <palette></palette>
        <workbench></workbench>
    </div>
    <expression></expression>
    <test></test>
    <footer></footer>
    `
})
export class AppComponent {
}
