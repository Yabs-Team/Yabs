import { shallowFactory, factory } from "@/helpers/testFactoryHelpers";
import ReturnLoanComponent from "@/components/ReturnLoanComponent.vue";
import Vue from "vue";

jest.mock("@/store/modules/BooksModule");
import BooksModule from "@/store/modules/BooksModule";
import { Wrapper } from "@vue/test-utils";


describe("ReturnLoanComponent.vue", () => {
  const book = {
    barcode: "5002",
    condition: "Broken",
    created_at: "2020-12-21T15:23:15.866Z",
    notes: null,
    title: {
      authors: "['Lewis Carroll']",
      cost: 700,
      cover:
        "http://books.google.com/books/content?id=sw0UwPjaw80C&printsec=frontcover&img=1&zoom=3&source=gbs_api",
      created_at: "2020-12-21T15:23:15.615Z",
      description:
        "A little girl falls down a rabbit hole and discovers a world of nonsensical and amusing characters.",
      id: 1,
      isbn: "0763645680",
      name: "Alice in Wonderland",
      page_count: "95.0",
      published_date: "2009",
      subject_id: 4,
      title_type: "Skönlitteratur",
      updated_at: "2021-01-04T15:54:04.695Z"
    },
    title_id: 1,
    updated_at: "2020-12-21T15:23:15.866Z"
  };

  const loan = {
    id: 1,
    loaned_by_id: 0,
    lent_by_id: 0,
    book_id: "5002",
    returned_at: null,
    created_at: "2021-01-06T18:28:58.728Z",
    updated_at: "2021-01-06T18:28:58.728Z",
    expiration_date: "2020-02-12",
    lent_by: {
      uid: 0,
      name: "Låneservice Johanneberg",
      email: "example.example@example.example",
      klass: "none",
      role: 1,
      google_token: "0",
      photo_path: null,
      created_at: "2020-12-21T15:22:53.281Z",
      updated_at: "2020-12-21T15:22:53.281Z"
    },
    loaned_by: {
      uid: 0,
      name: "Hmmm",
      email: "hmm@hmm.hmm",
      klass: "TE4",
      role: 1,
      google_token: "0",
      photo_path:
        "abc",
      created_at: "2020-12-21T15:22:58.998Z",
      updated_at: "2020-12-21T15:22:58.998Z"
    },
    book: book
  }

  const options = {
    mocks: {
      BooksModule: {
        update: jest.fn().mockImplementationOnce(_arg => {
          return Promise.resolve();
        }),
      },
      LoansModule: {
        fetchAll: jest.fn().mockImplementationOnce(_arg => {
          return Promise.resolve();
        }),
        allAsArray: [loan]
      }
    }
  };

  it("Expect the modal to be present", async () => {
    const wrapper = factory(ReturnLoanComponent, options);
    expect(wrapper.find("[data-jest='modal']").exists()).toBe(true);
  });

  it("Expect the barcodeReader to be present", async () => {
    const wrapper = factory(ReturnLoanComponent, options);

    expect(wrapper.find("[data-jest='barcodeReader']").exists()).toBe(false);
    wrapper.find("[data-jest='barcode_button']").trigger("click");
    expect(wrapper.find("[data-jest='barcodeReader']").exists()).toBe(true);
  });

  it("renders correctly", async () => {
    const wrapper: Wrapper<Vue> = shallowFactory(ReturnLoanComponent, options);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("initialises an update calls update book with correct input", async () => {
    const wrapper: Wrapper<Vue> = factory(ReturnLoanComponent, options);

    wrapper.find("[data-jest='book_barcode_return']").setValue("5002");
    wrapper.find("[data-jest='book_condition']").setValue("Broken");
    await wrapper.find("[data-jest='ReturnBook']").trigger("click");

    wrapper.setData({
      confirmationBody: book.title.name,
      confirmationHeader: "Confirm",
      modalActions: [
        {
          text: "Avbryt",
          action: (): void => {
            wrapper.setData({ showModal: false });
          }
        },
        {
          text: "Bekräfta",
          action: (): void => {
            wrapper.setData({ showModal: false });
            wrapper.vm.$data.submitChanges(book);
          }
        }
      ]
    });
    wrapper.setData({ showModal: true });
    const spy = jest.spyOn(wrapper.vm.$data, 'submitChanges');

    wrapper.findAll("[data-jest='modal-btn']").filter(x => x.html().toLowerCase().includes("bekräfta")).trigger("click");
    expect(spy).toHaveBeenCalled();
  });
});
