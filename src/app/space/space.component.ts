import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'space',
    styleUrls: ['space.component.styl'],
    template: `
    <input id="palette_toggle" type="checkbox">
    <palette></palette>
    <label for="palette_toggle" class="material-icons"></label>
    <workbench></workbench>
  `,
})
export class SpaceComponent implements OnInit {
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
}
