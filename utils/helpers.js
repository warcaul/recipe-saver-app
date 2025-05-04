import { create } from "express-handlebars";

const helpers = (handlebars) => {
  handlebars.handlebars.registerHelper("add", (a, b) => a + b);
  handlebars.handlebars.registerHelper("subtract", (a, b) => a - b);
  handlebars.handlebars.registerHelper("gt", (a, b) => a > b);
  handlebars.handlebars.registerHelper("lt", (a, b) => a < b);
  handlebars.handlebars.registerHelper("ifeq", (a, b, options) =>
    a === b ? options.fn(this) : options.inverse(this)
  );
  handlebars.handlebars.registerHelper("range", (start, end) => {
    let list = [];
    for (let i = start; i <= end; i++) {
      list.push(i);
    }
    return list;
  });

  handlebars.handlebars.registerHelper("includes", function (array, value) {
    return Array.isArray(array) && array.includes(value);
  });

  handlebars.handlebars.registerHelper("capitalize", function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  });
};

export default helpers;
