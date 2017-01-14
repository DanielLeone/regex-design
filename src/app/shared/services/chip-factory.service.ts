import {Injectable} from "@angular/core";
import * as _ from "lodash";
import {Chip} from "../chip";

const VerbalExpressions = require('verbal-expressions');

@Injectable()
export class ChipFactoryService {
    
    private chips: Array<Chip> = [];
    
    constructor() {
        _.forEach(this.getChipDefinitions(), (d) => {
            const [display, type, hasInput, curried] = d;
            this.chips.push(new Chip(this.nextID(), display, type, false, hasInput, curried))
        })
    }
    
    public getPaletteChips() {
        return this.chips;
    }
    
    public curryChip(chip: any) {
        chip.curried = this.getChipDefinitions().find(i => i[1] === chip.type)[3];
        return chip;
    }
    
    public getChipDefinitions(): Array<[string, string, boolean, any]> {
        return [
            ['find', 'find', true, (v, i) => v.find(i)],
            ['then', 'then', true, (v, i) => v.then(i)],
            ['or', 'or', true, (v, i) => v.or(i)],
            ['maybe', 'maybe', true, (v, i) => v.maybe(i)],
            ['begin capture group', 'beginCapture', false, (v, i) => v.beginCapture()],
            ['end capture group', 'endCapture', false, (v, i) => v.endCapture()],
            ['start of line', 'startOfLine', false, (v, i) => v.startOfLine()],
            ['end of line', 'endOfLine', false, (v, i) => v.endOfLine()],
            ['tab', 'tab', false, (v, i) => v.tab()],
            ['word', 'word', false, (v, i) => v.word()],
            ['whitespace', 'whitespace', false, (v, i) => v.whitespace()],
            ['anything', 'anything', false, (v, i) => v.anything()],
            ['anything but', 'anythingBut', true, (v, i) => v.anythingBut(i)],
            ['something', 'something', false, (v, i) => v.something(i)],
            ['something but', 'somethingBut', true, (v, i) => v.somethingBut(i)],
            ['any of', 'anyOf', true, (v, i) => v.anyOf(i)],
            ['linebreak', 'lineBreak', false, (v, i) => v.lineBreak()],
            ['search one line', 'searchOneLine', false, (v, i) => v.searchOneLine()],
            ['with any case', 'withAnyCase', false, (v, i) => v.withAnyCase()],
            ['stop at first', 'stopAtFirst', false, (v, i) => v.stopAtFirst()],
        ];
    }
    
    public createChip(type: string): Chip {
        const c = _.find(this.chips, (c) => c.type === type);
        if (!c) {
            console.error('Type not found', type);
            return;
        }
        let copy: Chip = _.cloneDeep(c);
        copy.id = this.nextID();
        copy.editable = true;
        return copy;
    }
    
    public getExpression(chips: Array<Chip>) {
        try {
            const expression = VerbalExpressions();
            chips.forEach(c => c.curried(expression, c.input));
            return expression;
        } catch (e) {
            console.log("Invalid Regular Expression");
            return VerbalExpressions().then('Invalid Regular Expression');
        }
    }
    
    private nextID() {
        const lut = [];
        for (let i = 0; i < 256; i++) {
            lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
        }
        const d0 = Math.random() * 0xffffffff | 0;
        const d1 = Math.random() * 0xffffffff | 0;
        const d2 = Math.random() * 0xffffffff | 0;
        const d3 = Math.random() * 0xffffffff | 0;
        return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
            lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
            lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
            lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
    }
}
