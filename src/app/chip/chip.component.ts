import {Component, OnInit, Input} from "@angular/core";
import {Chip} from "../shared/chip";
import {RegexStore} from "../shared/store";
import {updateChip, removeChip, addChip} from "../shared/actions";
import {HostBinding} from "@angular/core/src/metadata/directives";
import {ChipFactoryService} from "../shared/services/chip-factory.service";

@Component({
    selector: 'chip',
    styleUrls: ['chip.component.styl'],
    template: `
<div class="drag" *ngIf="chip.editable" >&#x2195;</div>
<div class="display">{{ chip.display }}</div>
<input *ngIf="chip.hasInput && chip.editable" type="text" (keyup)="update()" [(ngModel)]="chip.input">
<button *ngIf="chip.editable" (click)="remove()">&#xd7;</button>
<!--<button *ngIf="chip.editable" (click)="up()">&#x2191;</button>-->
<!--<button *ngIf="chip.editable" (click)="down()">&#x2193;</button>-->
<button *ngIf="!chip.editable" (click)="add()" >&#x2b;</button>`
})
export class ChipComponent implements OnInit {
    
    @Input('chip') chip: Chip;
    @HostBinding('attr.id') private id;
    @HostBinding('style.background-color') private color;
    
    constructor(private store: RegexStore, private factory: ChipFactoryService) {
        store.subscribe(() => {
            if (this.chip && store.state.colors &&
                store.state.colors[this.chip.type] != this.color) {
                this.color = store.state.colors[this.chip.type];
            }
        })
    }
    
    ngOnInit() {
        this.id = this.chip.id;
        this.color = this.store.state.colors[this.chip.type];
    }
    
    update() {
        this.store.dispatch(updateChip(this.chip))
    }
    
    remove() {
        this.store.dispatch(removeChip(this.chip))
    }
    
    add() {
        const c = this.factory.createChip(this.chip.type);
        this.store.dispatch(addChip(c));
    }
    
}
