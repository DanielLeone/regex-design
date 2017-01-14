import {Component, OnInit} from "@angular/core";
import {ChipFactoryService} from "../shared/services/chip-factory.service";
import {Chip} from "../shared/chip";

@Component({
    selector: 'palette',
    styleUrls: ['palette.component.styl'],
    template: `
    <label for="palette_toggle"><i class="material-icons">chevron_right</i></label>
    <input id="palette_toggle" type="checkbox">
    <div class="container"><chip *ngFor="let c of chips" [chip]="c"></chip></div>
    `
})
export class PaletteComponent implements OnInit {
    
    private chips: Array<Chip>;
    
    constructor(private chipFactory: ChipFactoryService) {
        this.chips = chipFactory.getPaletteChips();
    }
    
    ngOnInit() {
    }
}
