import {Component, OnInit} from "@angular/core";
import {RegexStore} from "../shared/store";
import {Chip} from "../shared/chip";
import {sortChips} from "../shared/actions";
import {SortablejsOptions} from "angular-sortablejs";
import * as _ from "lodash";

@Component({
    selector: 'workbench',
    styleUrls: ['workbench.component.styl'],
    template: `
    <div [sortablejs]="chips" [sortablejsOptions]="options">
        <chip *ngFor="let c of chips" [chip]="c"></chip>
    </div>`
})
export class WorkbenchComponent implements OnInit {
    
    private chips: Array<Chip> = [];
    
    private options: SortablejsOptions = {
        animation: 100,
        scroll: true,
        handle: '.drag',
        onEnd: () => {
            this.store.dispatch(sortChips(_.map(this.chips, (c) => c.id)));
        }
    };
    
    constructor(private store: RegexStore) {
        
        store.subscribe(() => {
            this.chips = this.store.state.chips;
        })
    }
    
    ngOnInit() {
    }
}
