import {Injectable} from "@angular/core";
import * as _ from 'lodash';
const randomColor = require('randomColor');

@Injectable()
export class ColorFactoryService {
    
    constructor() {
    }
    
    getColors(hue: string, count: number): Array<string> {
        return randomColor({hue, count, luminosity: 'dark'});
    }
    
    getColor(hue: string): any {
        return _.head(randomColor({hue, count: 1, luminosity: 'dark'}));
    }
}
