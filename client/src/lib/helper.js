export const cleanHtml = (html) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};