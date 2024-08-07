const parseDateTime = (timestamp) => {
  const fullDate = new Date(timestamp).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const calendarDate = new Date(timestamp).toISOString().slice(0, 10);

  const day = new Date(timestamp).toLocaleDateString("en-us", {
    day: "numeric",
  });

  const month = new Date(timestamp).toLocaleDateString("en-us", {
    month: "long",
  });

  const fullTime = new Date(timestamp).toLocaleString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const time24Hour = new Date(timestamp).toTimeString().slice(0, 5);

  const convertedDateTime = {
    fullDate,
    calendarDate,
    day,
    month,
    fullTime,
    time24Hour,
  };

  return convertedDateTime;
};

export default parseDateTime;
