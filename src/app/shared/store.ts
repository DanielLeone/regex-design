import {reducer} from "./reducer";
import {createStore} from "redux";
import {IChipAction} from "./actions";
import {Injectable} from "@angular/core";
import {ColorFactoryService} from "./services/color-factory.service";
import {ChipFactoryService} from "./services/chip-factory.service";
import * as _ from "lodash";

@Injectable()
export class RegexStore {
    private store;
    
    
    private static LOCAL_STORAGE_KEY = "regex_design_state_1";
    public static THEMES = ['red', 'orange', 'green', 'blue', 'purple', 'monochrome'];
    
    constructor(private colorFactory: ColorFactoryService, private chipFactory: ChipFactoryService) {
        
        
        const theme = RegexStore.THEMES[_.random(0, RegexStore.THEMES.length - 1, false)];
        const colors = this.createNewColorMap(theme);
        
        function getState() {
            const defaultState = {
                chips: [],
                theme: theme,
                colors: colors,
                test: 'Test your regex here'
            };
            const stored = Storage ? JSON.parse(localStorage.getItem(RegexStore.LOCAL_STORAGE_KEY)) : {};
            const localState = stored || {};
            const chips = localState.chips || [];
            localState.chips = chips.map(c => chipFactory.curryChip(c));
            
            return _.defaults({}, localState, defaultState);
        }
        this.store = createStore(reducer, getState());
        
        this.subscribe(_.throttle(() => {
            // Remove the theme and colors map from saving to local storage
            localStorage.setItem(RegexStore.LOCAL_STORAGE_KEY, JSON.stringify(_.omit(this.state, ['theme', 'colors'])))
        }, 1000));
        
    }
    
    public createNewColorMap(theme){
        const types = this.chipFactory.getChipDefinitions().map(def => def[1]);
        const colors = this.colorFactory.getColors(theme, types.length);
        const colorMap = {};
        types.forEach(type => colorMap[type] = colors.pop());
        return colorMap;
    }
    
    get state() {
        return this.store.getState();
    }
    
    subscribe(c) {
        c();
        return this.store.subscribe(c);
    }
    
    dispatch(action: IChipAction) {
        this.store.dispatch(action);
    }
}
