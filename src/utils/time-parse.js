const parseDateTime = (timestamp) => {
  const fullDate = new Date(timestamp).toLocaleDateString("en-us", {
    timezone: "America/Halifax",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });


  const day = new Date(timestamp).toLocaleDateString("en-us", {
    timezone: "America/Halifax",
    day: "numeric",
  });

  const month = new Date(timestamp).toLocaleDateString("en-us", {
    timezone: "America/Halifax",
    month: "long",
  });

  const fullTime = new Date(timestamp).toLocaleString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
    timezone: "America/Halifax",
  });

  const convertedDateTime = {
    fullDate,
    day,
    month,
    fullTime,
  };

  return convertedDateTime;
};

export default parseDateTime;
