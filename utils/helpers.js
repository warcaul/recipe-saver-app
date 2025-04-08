import { create } from "express-handlebars";

const helpers = (handlebars) => {
  handlebars.handlebars.registerHelper("add", (a, b) => a + b);
  handlebars.handlebars.registerHelper("subtract", (a, b) => a - b);
  handlebars.handlebars.registerHelper("gt", (a, b) => a > b);
  handlebars.handlebars.registerHelper("lt", (a, b) => a < b);
  handlebars.handlebars.registerHelper("ifeq", (a, b, options) => (a === b ? options.fn(this) : options.inverse(this)));
  handlebars.handlebars.registerHelper("range", (start, end) => {
    let list = [];
    for (let i = start; i <= end; i++) {
      list.push(i);
    }
    return list;
  });
};


export default helpers;
