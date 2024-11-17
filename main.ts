import "./style.scss";
import { supabase } from "./src/utils/supabase";
import domGenerator from "dom-generator";
import { formDataType } from "./src/types/index";

const app = document.querySelector("#app");

(async () => {
  try {
    const { data: messages, error } = await supabase
      .from("messages")
      .select("*");

    const dataElements: HTMLElement[] = [];

    messages?.forEach((message: formDataType) => {
      const dataElement = domGenerator({
        tag: "div",
        attributes: { id: "card" },
        children: [
          {
            attributes: { class: "data-wrapper" },
            tag: "div",
            children: [
              { tag: "h5", properties: { textContent: "user name" } },
              { tag: "p", properties: { textContent: message.fullname } },
            ],
          },
          {
            attributes: { class: "data-wrapper" },
            tag: "div",
            children: [
              { tag: "h5", properties: { textContent: "email" } },
              { tag: "p", properties: { textContent: message.email } },
            ],
          },
          {
            attributes: { class: "data-wrapper" },
            tag: "div",
            children: [
              { tag: "h5", properties: { textContent: "subject" } },
              { tag: "p", properties: { textContent: message.subject } },
            ],
          },
          {
            attributes: { class: "data-wrapper" },
            tag: "div",
            children: [
              { tag: "h5", properties: { textContent: "message" } },
              { tag: "p", properties: { textContent: message.message } },
            ],
          },
        ],
      });

      dataElements.push(dataElement);
    });

    dataElements.forEach((element) => app?.append(element));

    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
})();
