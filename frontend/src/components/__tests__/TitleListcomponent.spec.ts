import TitleListComponent from '@/components/TitleListComponent.vue';
import { Wrapper} from '@vue/test-utils';
import { factory } from '@/helpers/testFactoryHelpers';

describe('TitleListComponent.vue', () => {
  
  it('checks whether ListComponent exists', () => {
    const wrapper: Wrapper<Vue> = factory(TitleListComponent);
    expect(wrapper.find({name: 'ListComponent'}).exists()).toBe(true);
  });

});