import {ChipFactoryService} from "./chip-factory.service";

describe('ChipFactoryService', () => {
    
    beforeEach(() => {
        this.chipFactory = new ChipFactoryService();
    });
    
    it('Should be instantiated', () => {
        expect(this.chipFactory).toBeTruthy();
    });
    
});
