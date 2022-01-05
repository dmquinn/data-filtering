const now = new Date().toISOString().split("T")[0];
const dateFixer = (a) => {
  const date = a.split("D").pop().split("T").shift();
  return date;
};

export const getSearchResults = (array, userInput) => {
  const newArray = array.filter((item) => {
    return (
      item.body.bankName.toUpperCase().includes(userInput.toUpperCase()) ||
      item.body.bankBIC[0].includes(userInput.toUpperCase())
    );
  });
  return newArray;
};

export const filterFunction = (
  dataArray,
  docTypeFilter,
  rangeValues,
  isPublished
) => {
  const newArray = [];
  const checkedKeys = Object.keys(docTypeFilter);
  checkedKeys.forEach((x) => {
    /// check if each key[docTypeFilter] returns true
    if (docTypeFilter[x]) {
      const output = dataArray.filter((item) => item.body.type === x);
      newArray.push(...output);
    }
  });

  const filterByRange = newArray.filter(
    (item) =>
      item.body.reportScore >= rangeValues[0] &&
      item.body.reportScore <= rangeValues[1]
  );

  ///published/unpublished filters
  const publishFiltering = [];
  if (isPublished.yes) {
    const d = filterByRange.filter((item) => dateFixer(item.publishedAt) < now);
    publishFiltering.push(...d);
  }
  if (isPublished.no) {
    const e = filterByRange.filter((item) => dateFixer(item.publishedAt) > now);
    publishFiltering.push(...e);
  }
  return publishFiltering;
};
