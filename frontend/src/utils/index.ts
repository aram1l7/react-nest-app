export const beautifyDate = (serverDate: Date) => {
  const dateObject = new Date(serverDate);
  const currentDate = new Date();
  const timeDifference = Number(currentDate) - Number(dateObject);

  const minuteInMilliseconds = 60 * 1000;
  const hourInMilliseconds = 60 * minuteInMilliseconds;
  const dayInMilliseconds = 24 * hourInMilliseconds;
  const weekInMilliseconds = 7 * dayInMilliseconds;
  const monthInMilliseconds = 30 * dayInMilliseconds;

  let formattedDate;

  if (timeDifference < minuteInMilliseconds) {
    formattedDate = "Just now";
  } else if (timeDifference < hourInMilliseconds) {
    const minutesAgo = Math.floor(timeDifference / minuteInMilliseconds);
    formattedDate = `${minutesAgo} ${minutesAgo <= 1 ? 'minute' : 'minutes'} ago`;
  } else if (timeDifference < dayInMilliseconds) {
    const hoursAgo = Math.floor(timeDifference / hourInMilliseconds);
    formattedDate = `${hoursAgo}h ago`;
  } else if (timeDifference < weekInMilliseconds) {
    const daysAgo = Math.floor(timeDifference / dayInMilliseconds);
    formattedDate = `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  } else if (timeDifference < monthInMilliseconds) {
    const weeksAgo = Math.floor(timeDifference / weekInMilliseconds);
    formattedDate = `${weeksAgo} week${weeksAgo > 1 ? "s" : ""} ago`;
  } else {
    const actualDate = dateObject.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });
    return actualDate;
  }

  return formattedDate;
};

export const generateAvatar = (text: string) => {
  const canvas = document.createElement("canvas");
  const context: any = canvas.getContext("2d");

  canvas.width = 150;
  canvas.height = 150;

  let grd = context.createLinearGradient(0, 0, 150, 0);
  grd.addColorStop(0, "#07a2de");
  grd.addColorStop(1, "#1dd3b3");

  context.fillStyle = grd;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = "bold 100px Roboto";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text.toUpperCase(), canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL("image/png");
};
