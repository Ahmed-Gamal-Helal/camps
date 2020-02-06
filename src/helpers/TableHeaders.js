// import i18n from "@/lang";

const createTableHeaders = (headersName = []) => {
  return headersName.map(header => {
    return {
      text: header,
      align: "center",
      sortable: false,
      width: header === "Actions" ? "150" : ""
    };
  });
};
export default createTableHeaders;
