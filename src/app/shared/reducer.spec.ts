import {reducer} from "./reducer";
import {IChipAction} from "./actions";
import {Chip} from "./chip";
describe('Reducer', () => {

    it('should add a chip', () => {

        const state = {
            chips: []
        };

        const action = {type: "ADD_CHIP", chip: <Chip>{id: '123', type: 'hey', input: ''}};

        const newState = reducer(state, <IChipAction>action);
        expect(newState.chips.length).toBe(1);
    });

    it('should update a chip', () => {

        const state = {
            chips: [
                {id: '1', type: 'hey', input: 'boo'},
                {id: '2', type: 'hey', input: 'boo'}
            ]
        };
    
        const action = {type: "UPDATE_CHIP", chip: <Chip>{id: '2', type: 'hey', input: 'baa'}};

        const newState = reducer(state, <IChipAction>action);
        expect(newState.chips.length).toBe(2);
        expect(newState.chips[0].input).toBe('boo');
        expect(newState.chips[1].input).toBe('baa');
    });

    it('should remove a chip', () => {

        const state = {
            chips: [
                {id: '1', type: 'hey', input: 'boo'},
                {id: '2', type: 'hey', input: 'boo'}
            ]
        };
    
        const action = {type: "REMOVE_CHIP", chip: <Chip>{id: '2', type: 'hey', input: 'baa'}};

        const newState = reducer(state, <IChipAction>action);
        expect(newState.chips.length).toBe(1);
        expect(newState.chips[0].input).toBe('boo');
    });

    it('should sort the array of chips', () => {
        const state = {
            chips: [
                {id: '1asdf', type: 'hey', input: 'boo'},
                {id: '2asdf', type: 'hey', input: 'boo'}
            ]
        };
        const action = {type: "SORT_CHIPS", order: ['2asdf', '1asdf']};
        const newState = reducer(state, <IChipAction>action);
        expect(newState.chips.length).toBe(2);
        expect(newState.chips.map((c: Chip) => c.id)).toEqual(['2asdf', '1asdf']);
    });

    it('should sort the array of chips, pushing unknown to the beginning', () => {
        const state = {
            chips: [
                {id: '1', type: 'hey', input: 'boo'},
                {id: '2', type: 'hey', input: 'boo'},
                {id: '3', type: 'hey', input: 'boo'}
            ]
        };
        const action = {type: "SORT_CHIPS", order: ['2', '1']};
        const newState = reducer(state, <IChipAction>action);
        expect(newState.chips.length).toBe(3);
        expect(newState.chips.map((c: Chip) => c.id)).toEqual(['3', '2', '1']);
    });
});
