import App from "../../src/App.vue";
import { mount } from "@vue/test-utils";

describe("App", () => {
  it("renders without errors", () => {
    const wrapper = mount(App);

    expect(wrapper.html()).toContain("Willms and Sons");
  });
});
