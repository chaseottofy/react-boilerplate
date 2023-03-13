const labels = {
  monthsLong: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  monthsShortUpper: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  weekdaysLong: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  weekdaysNarrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};

const testDate = date => {
  return date instanceof Date && !isNaN(date) ? date : new Date(date);
};

const leadingZero = num => {
  return num < 10 ? `0${num}` : num;
};

const getTimestamp = (date = new Date()) => {
  const month = labels.monthsShortUpper[date.getMonth()];
  const day = parseInt(date.getDate());
  const [hour, minute] = [
    leadingZero(date.getHours()),
    leadingZero(date.getMinutes())
  ];
  return `${month}${day}_${hour}${minute}`;
};

const getDateAsArray = date => {
  date = testDate(date);
  return [+date.getFullYear(), +date.getMonth() + 1, +date.getDate()];
};

const formatDateForDisplay = date => {
  date = testDate(date);
  const month = labels.monthsShort[date.getMonth()];
  const day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  let hm = `${hours}:${minutes}`;
  return `${month} ${day} ${date.getFullYear()}, (${hm}) `;
};

const checkIfSameDates = (date1, date2) => {
  [date1, date2] = [testDate(date1), testDate(date2)];
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
};

const formatDuration = seconds => {
  let time = { year: 31536000, day: 86400, hour: 3600 },
    res = [];
  if (seconds === 0) return 'now';
  for (let key in time) {
    if (seconds >= time[key]) {
      let val = Math.floor(seconds / time[key]);
      res.push(val += val > 1 ? ' ' + key + 's' : ' ' + key);
      seconds = seconds % time[key];
    }
  }
  return res.length > 1 ? res.join(', ').replace(/,([^,]*)$/, ' &' + '$1') : res[0];
};

const sortDates = (dates, dir) => {
  return dates.sort((a, b) => {
    const [date1, date2] = [new Date(a), new Date(b)];
    return dir === "asc" ? date1 - date2 : date2 - date1;
  });
};

const getDayOrdinal = day => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
};

export {
  testDate,
  leadingZero,
  getTimestamp,
  getDateAsArray,
  formatDateForDisplay,
  checkIfSameDates,
  formatDuration,
  sortDates,
  getDayOrdinal,
};