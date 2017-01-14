import {Component, OnInit, HostBinding} from "@angular/core";
import {ChipFactoryService} from "../shared/services/chip-factory.service";
import {RegexStore} from "../shared/store";
import {Chip} from "../shared/chip";
import * as Clipboard from "clipboard";

@Component({
    selector: 'expression',
    styleUrls: ['expression.component.styl'],
    template: `
    <span id="expression">{{ expression }}</span>
    <i class="material-icons">content_copy</i>
    `
})
export class ExpressionComponent implements OnInit {
    
    private expression: String;
    
    @HostBinding('attr.id') private id = 'clipper';
    @HostBinding('attr.data-clipboard-target') private target = "#expression";
    
    private clipboard = new Clipboard('#clipper');
    
    constructor(private store: RegexStore, private chipFactory: ChipFactoryService) {
        
        this.store.subscribe(() => {
            this.expression = this.convertToExpression(this.store.state.chips);
        })
    }
    
    // @HostListener('click', ['$event.target'])
    // copied(target) {
    // }
    
    
    ngOnInit() {
    }
    
    convertToExpression(chips: Array<Chip>) {
        return this.chipFactory.getExpression(chips);
    }
}
