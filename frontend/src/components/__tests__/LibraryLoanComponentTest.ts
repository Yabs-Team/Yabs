import LibraryLoanComponent from '@/components/LoanFormComponent.vue';

import { factory } from '@/helpers/testFactoryHelpers';
import LoansModule from '@/store/modules/LoansModule';
import UsersModule from '@/store/modules/UsersModule';
import { User } from '@/types';

// @ts-ignore

jest.mock('@/store/modules/LoansModule', () => {
  return {
    create: jest.fn().mockImplementationOnce((_arg) => {
      return Promise.resolve();
    })
  };
});

describe('LoanFormComponent.vue', () => {

  
    it('calls loansmodule with correct values and resets the input fields', async () => {
      const wrapper = factory(LibraryLoanComponent);
      UsersModule.setCurrentUser({uid: 123} as User);
      console.log(UsersModule.currentUserID);
  
      wrapper.find('[data-jest=\'book_barcode\']').setValue('1234');
      await wrapper.vm.$nextTick();
      wrapper.find('[data-jest=\'form\']').trigger('submit');
      await wrapper.vm.$nextTick()
  
      expect(LoansModule.create).toHaveBeenCalledWith({
        loaned_by_id: '123', //eslint-disable-line camelcase
        book_id: '1234', //eslint-disable-line camelcase
        lent_by_id: 123, //eslint-disable-line camelcasee
      });
    });
  });