import {Component, OnInit} from "@angular/core";
import {RegexStore} from "../shared/store";

@Component({
    selector: 'options',
    styleUrls: ['options.component.styl'],
    template: `
<input type="checkbox" name="global"><label for="global">g</label>
<input type="checkbox" name="case-agnostic"><label for="case-agnostic">i</label>
`
})
export class OptionsComponent implements OnInit {
    
    constructor(private store: RegexStore) {
        store.subscribe(() => {
        })
    }
    
    ngOnInit() {
    }
}
