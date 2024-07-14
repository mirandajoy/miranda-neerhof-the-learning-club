const parseDateTime = (timestamp) => {
  const fullDate = new Date(timestamp).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });


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

  const convertedDateTime = {
    fullDate,
    day,
    month,
    fullTime,
  };

  return convertedDateTime;
};

export default parseDateTime;
