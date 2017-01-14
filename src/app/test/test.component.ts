import {Component, ElementRef, AfterContentInit} from "@angular/core";
import {ChipFactoryService} from "../shared/services/chip-factory.service";
import {RegexStore} from "../shared/store";
import {updateTest} from "../shared/actions";
import * as _ from "lodash";
import {ColorFactoryService} from "../shared/services/color-factory.service";

const Mark = require('mark.js');

@Component({
    selector: 'test',
    styleUrls: ['test.component.styl'],
    template: `
    <div
        (focus)="unmark()"
        (blur)="mark()"
        (keyup)="keyup()"
        contenteditable
        spellcheck="false"
        autocorrect="false"
        autocapitalize="false">{{test}}</div>`
})
export class TestComponent implements AfterContentInit {
    ngAfterContentInit(): void {
        setTimeout(() => {
            if (this.marked) {
                this.unmark().mark();
            }
        }, 600);
    }
    
    
    private keyup = _.debounce(this.saveTest, 300);
    private marked = true;
    private test: string = '';
    private theme: string = '#bbb';
    private expression: RegExp;
    private instance;
    private options = {
        element: 'span',
        className: 'match',
        exclude: [],
        iframes: false,
        acrossElements: false,
        each: (node) => {
            // TODO This should be done once at the end, get 15 new colors, set the border of each item to a color, rather than doing each one separately
            node.style.borderBottomColor = this.color.getColor(this.theme);
        },
        filter: (textNode, foundTerm, totalCounter) => {
            // textNode is the text node which contains the found term
            // foundTerm is the found search term
            // totalCounter is a counter indicating the total number of all marks
            //              at the time of the function call
            return true; // must return either true or false
        },
        noMatch: (term) => {
            // term is the not found term
        },
        done: (counter) => {
            // counter is a counter indicating the total number of all marks
        },
        debug: false,
        log: window.console
    };
    
    
    constructor(private store: RegexStore,
                private chipFactory: ChipFactoryService,
                private el: ElementRef,
                private color: ColorFactoryService) {
        this.instance = new Mark(el.nativeElement);
        this.store.subscribe(() => {
            this.expression = this.chipFactory.getExpression(this.store.state.chips);
            this.theme = this.store.state.theme;
            this.test = this.store.state.test;
            if (this.marked) {
                this.unmark().mark();
            }
        })
    }
    
    unmark() {
        this.instance.unmark();
        this.marked = false;
        return this;
    }
    
    mark() {
        this.instance.markRegExp(this.expression, this.options);
        this.marked = true;
        return this;
    }
    
    saveTest() {
        this.store.dispatch(updateTest(this.test));
    }
    
}
