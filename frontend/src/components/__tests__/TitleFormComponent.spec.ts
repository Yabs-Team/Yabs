import TitleFormComponent from '@/components/TitleFormComponent.vue';

import { Wrapper} from '@vue/test-utils';
import { factory } from '@/helpers/testFactoryHelpers';
import TitlesModule from '@/store/modules/TitlesModule';
import Vue from 'vue';

jest.mock('@/store/modules/TitlesModule', () => {
  return {
    create: jest.fn().mockImplementationOnce((_arg) => {
      return Promise.resolve();
    })
  };
});

describe('TitleFormComponent.vue', () => {
  
  it('calls TitlesModule with correct values', () => {
    const wrapper: Wrapper<Vue> = factory(TitleFormComponent);

    wrapper.find('[data-jest=\'name\']').setValue('Title1');
    wrapper.find('[data-jest=\'cost\']').setValue('20');
    wrapper.find('[data-jest=\'isbn\']').setValue('1234567891');
    wrapper.find('[data-jest=\'titleType\']').setValue('Kurslitteratur');
    wrapper.find('[data-jest=\'subjectId\']').setValue('Programmering');

    wrapper.find('[data-jest=\'form\']').trigger('submit');

    expect(TitlesModule.create).toHaveBeenCalledWith({
      name: 'Title1',
      title_type: 'Kurslitteratur', //eslint-disable-line camelcase
      cost: '20',
      isbn: '1234567891',
      'subject_id': 'Programmering'
    });
  });
});