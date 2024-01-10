
export const clearAllLS = () => {
  if (window) {
    localStorage.removeItem('access_token');
  }
};

export const uniqueBy = (array: any[], callback: (a: any) => any) => {
  let seen = new Set();
  return array.filter(item => {
    let k = callback(item);
    return seen.has(k) ? false : seen.add(k);
  });
}


const timeConvert = (d: Date) => {
  let hours = '' + d.getHours(),
    minutes = '' + d.getMinutes(),
    seconds = '' + d.getSeconds();

  hours = hours.padStart(2, '0');
  minutes = minutes.padStart(2, '0');
  seconds = seconds.padStart(2, '0');

  return [hours, minutes, seconds];
};

const dateConvert = (d: Date) => {
  let years = '' + d.getFullYear(),
    months = '' + (d.getMonth() + 1),
    days = '' + d.getDate();

  years = years.padStart(4, '0');
  days = days.padStart(2, '0');
  months = months.padStart(2, '0');

  return [days, months, years];
};

export const ISOtoLocalDatetimeStrFormat = (isoDate: string) => {
  if (!isoDate) return '';

  const date = new Date(isoDate);

  const [hour, minutes] = timeConvert(date);
  return `${dateConvert(date).join("/")} - ${[hour, minutes].join(":")}`;
};

export const validAdmin = (role: string) => {
  return role === 'admin';
};

export const formatAmount = (value: number | string | undefined) => {
  const num = value ? Number(value) : 0;
  return typeof num === 'number'
    ? num % 1 !== 0
      ? num.toLocaleString(undefined, { maximumFractionDigits: 7 })
      : num.toLocaleString()
    : '';
};

export const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

declare global {
  interface Array<T> {
    last(): T;
    first(): T;
  }
}

Array.prototype.last = function () {
  return this[this.length - 1];
}

Array.prototype.first = function () {
  return this[0];
}
