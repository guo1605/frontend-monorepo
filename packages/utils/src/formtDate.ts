export function formatDate(date: Date | string | number, format = "YYYY-MM-DD") {
  const newDate = new Date(date);

  const map: Record<string, string> = {
    "YYYY": String(newDate.getFullYear()),
    "MM": String(newDate.getMonth() + 1).padStart(2, "0"),
    "DD": String(newDate.getDate()).padStart(2, "0"),
    "HH": String(newDate.getHours()).padStart(2, "0"),
    "mm": String(newDate.getMinutes()).padStart(2, "0"),
    "ss": String(newDate.getSeconds()).padStart(2, "0"),
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (matched) => map[matched]);

}