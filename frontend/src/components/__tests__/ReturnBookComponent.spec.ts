import { Wrapper } from '@vue/test-utils';
import { shallowFactory } from '@/helpers/testFactoryHelpers';
import Vue from 'vue';
import ReturnLoanComponent from '@/components/ReturnLoanComponent.vue';
import BooksModule from '@/store/modules/BooksModule';

jest.mock('@/store/modules/BooksModule', () => {
    return {
      create: jest.fn().mockImplementationOnce((_arg) => {
        return Promise.resolve();
      })
    };
});

describe('ReturnLoanComponent.vue', () => {
    it('calls update book with correct input', () => {
        setTimeout(() => {
            const wrapper: Wrapper<ReturnLoanComponent> = shallowFactory(ReturnLoanComponent);
    
            wrapper.find('[data-jest=\'book_barcode_return\']').setValue('5002');
            wrapper.find('[data-jest=\'book_condition\']').setValue('Broken');
            wrapper.find('[data-jest=\'ReturnBook\']').trigger('submit');
    
            expect(BooksModule.update).toHaveBeenCalledWith({
                barcode: '5002', 
                title_id: 1, //eslint-disable-line camelcase
                condition: 'Broken' 
            });
        }, 1000);
    });
});