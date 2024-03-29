import { parseISO } from "date-fns";

const isoDateFormat = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}.*)?$/;

function isIsoDateString(value: any): boolean {
  return value && typeof value === "string" && isoDateFormat.test(value);
}

export function handleDates(body: any) {
  if (body === null || body === undefined || typeof body !== "object")
    return body;

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) body[key] = parseISO(value);
    else if (typeof value === "object") handleDates(value);
  }
}
export function formatDate(dt: Date | undefined) {
    if(dt == null) return '';
    var f = function(d: number) { return d < 10 ? '0' + d : d; };
    return f(dt.getDate()) + '/' + f(dt.getMonth() + 1) + '/' + dt.getFullYear();
  }  
