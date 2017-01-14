import {ColorFactoryService} from "./color-factory.service";
describe('ColorFactoryService', () => {

    beforeEach(() => {
        this.colorFactory = new ColorFactoryService();
    });

    it('Should be instantiated', () => {
        expect(this.colorFactory).toBeTruthy();
    });

});
