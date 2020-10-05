// Helper function that makes sure the ISBN inpoutted by a buyer is real

export function isbnformatchecker(isbn_with_hyphens) {
  let isbn = isbn_with_hyphens.replace(/-/g, "");
  if (isbn.length == 13) {
    if (isNaN(parseInt(isbn))) {
      return false;
    } else {
      let sum = 0;
      let sub;
      for (let i = 0; i < 13; i++) {
        sub = isbn.substring(i, i + 1);
        if (i % 2 == 0) {
          sum = sum + parseInt(sub);
        } else {
          sum = sum + 3 * parseInt(sub);
        }
      }
      if (sum % 10 == 0) {
        return true;
      }
    }
  }
  if (isbn.length == 10) {
    let sum = 0;
    let sub = "";
    for (let i = 0; i < 10; i++) {
      sub = isbn.substring(i, i + 1);
      if (sub == "X" || sub == "x") {
        sum = sum + 10 * (i + 1);
      } else {
        if (isNaN(parseInt(sub))) {
          return false;
        } else {
          sum = sum + parseInt(sub) * (i + 1);
        }
      }
    }
    if (sum % 11 == 0) {
      return true;
    }
  }
  return false;
}
