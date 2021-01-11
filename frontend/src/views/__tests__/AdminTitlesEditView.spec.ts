import AdminTitlesEditView from "../AdminTitlesEditView.vue";
import vue from "vue";

import { Wrapper } from "@vue/test-utils";
import { shallowFactory } from "@/helpers/testFactoryHelpers";

jest.mock("@/store/modules/TitlesModule");

const options = {
  mocks: {
    $route: {
      params: {
        id: "0763645680"
      }
    }
  },
  sync: false
};

describe("AdminTitlesEditView.vue", () => {
  it("Displays the correct data in the form", async () => {
    const wrapper: Wrapper<vue> = shallowFactory(AdminTitlesEditView, options);
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.text()).not.toMatch("Clean Code");
  });
});
