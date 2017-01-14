import {Chip} from "./chip";
export interface IChipAction {
    type: string,
    chip?: Chip,
    order?: Array<string>,
    test?: string,
    theme?: string,
    colorMap?: {}
}

export const ADD_CHIP = 'ADD_CHIP';
export const UPDATE_CHIP = 'UPDATE_CHIP';
export const REMOVE_CHIP = 'REMOVE_CHIP';
export const SORT_CHIPS = 'SORT_CHIPS';
export const UPDATE_TEST = 'UPDATE_TEST';
export const CHANGE_THEME = 'CHANGE_THEME';

export function addChip(chip: Chip): IChipAction {
    return {
        type: ADD_CHIP,
        chip: chip
    };
}

export function updateChip(chip): IChipAction {
    return {
        type: UPDATE_CHIP,
        chip: chip
    };
}

export function removeChip(chip): IChipAction {
    return {
        type: REMOVE_CHIP,
        chip: chip
    };
}

export function sortChips(order): IChipAction {
    return {
        type: SORT_CHIPS,
        order
    };
}
export function updateTest(test): IChipAction {
    return {
        type: UPDATE_TEST,
        test
    };
}
export function changeTheme(theme, colorMap): IChipAction {
    return {
        type: CHANGE_THEME,
        theme,
        colorMap
    };
}
