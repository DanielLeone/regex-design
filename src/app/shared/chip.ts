export class Chip {
    
    constructor(public id: string,
                public display: string,
                public type: string,
                public editable:boolean= false,
                public hasInput: boolean,
                public curried: any,
                public input: string = '') {
    }
}
