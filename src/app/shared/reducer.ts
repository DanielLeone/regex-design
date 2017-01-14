import {IChipAction, ADD_CHIP, UPDATE_CHIP, REMOVE_CHIP, SORT_CHIPS, UPDATE_TEST, CHANGE_THEME} from "./actions";
import {Chip} from "./chip";
import * as _ from "lodash";

export function reducer(state, action: IChipAction) {
    switch (action.type) {
        case ADD_CHIP:
            state.chips.push(action.chip);
            return state;
        case UPDATE_CHIP:
            const i = _.findIndex(state.chips, (c: Chip) => c.id == action.chip.id);
            state.chips[i] = action.chip;
            return state;
        case REMOVE_CHIP:
            state.chips = _.filter(state.chips, (c: Chip) => c.id != action.chip.id);
            return state;
        case SORT_CHIPS:
            state.chips = _.sortBy(state.chips, (c: Chip) => _.findIndex(action.order, (o) => c.id == o));
            return state;
        case UPDATE_TEST:
            state.test = action.test;
            return state;
        case CHANGE_THEME:
            state.theme = action.theme;
            state.colors = action.colorMap;
            return state;
        default:
            return state;
    }
}
