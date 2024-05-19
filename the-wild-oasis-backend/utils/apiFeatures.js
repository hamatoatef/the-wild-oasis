class QueryBuilder {
  static generateFilterQuery(filterParams) {
    if (filterParams.hasOwnProperty("status")) {
      return `where status = '${filterParams.status}'`;
    }
    return "";
  }

  static generateSortQuery(filterParams) {
    if (filterParams.hasOwnProperty("sort")) {
      return `ORDER BY ${filterParams.sort.replace("-", " ").toLowerCase()}`;
    }
    return "";
  }

  static createQueryString(obj) {
    const keyValuePairs = Object.entries(obj).map(([key, value]) => {
      // Check if the value is a string and if it contains a single quote,
      // in which case, wrap it with double quotes
      const formattedValue = typeof value === "string" ? `'${value}'` : value;
      return `${key} = ${formattedValue}`;
    });

    return keyValuePairs.join(", ");
  }
}

module.exports = QueryBuilder;
