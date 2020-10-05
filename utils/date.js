// Helper function that formats the time and dates

export function currentDate() {
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();
  var midday;
  if (hour === 0) {
    hour = 12;
    midday = "AM";
  } else if (hour < 12) {
    midday = "AM";
  } else if (hour === 12) {
    midday = "PM";
  } else if (hour > 12) {
    hour = hour - 12;
    midday = "PM";
  }
  if (hour < 10) {
    hour = "0" + hour.toString();
  }
  if (minute < 10) {
    minute = "0" + minute.toString();
  }
  if (month < 10) {
    month = "0" + month.toString();
  }
  if (day < 10) {
    day = "0" + day.toString();
  }
  var result =
    hour + ":" + minute + " " + midday + ", " + month + "/" + day + "/" + year;
  return result;
}
