export function calculatePercentageIncrease(dataByMonth) {
  const countByMonth = {};
  let percentageIncrease;

  // Loop through each data entry
  dataByMonth.forEach((entry) => {
    // Extract the year and month from the date
    const date = new Date(entry._id["$date"]);
    const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    // Increment the count for the specific month
    if (countByMonth[yearMonth]) {
      countByMonth[yearMonth] += entry.totalUsers;
    } else {
      countByMonth[yearMonth] = entry.totalUsers;
    }
  });

  // Calculate the percentage increase from the previous month
  const months = Object.keys(countByMonth);

  if (months.length > 1) {
    const currentMonth = months[months.length - 1];
    const previousMonth = months[months.length - 2];
    const currentMonthCount = countByMonth[currentMonth];
    const previousMonthCount = countByMonth[previousMonth];

    // Calculate the percentage increase
    const increase =
      ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;
    percentageIncrease = increase.toFixed(2); // Round to 2 decimal places

    return { percentageIncrease, countByMonth };
  } else if (months.length === 1) {
    const currentMonth = months[0];
    const currentMonthCount = countByMonth[currentMonth];
    const previousMonthCount = 1; // Assume last month's user count is 1

    // Calculate the percentage increase
    const increase =
      ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;
    percentageIncrease = increase.toFixed(2); // Round to 2 decimal places

    return { percentageIncrease, countByMonth };
  } else {
    console.log("Not enough data to calculate percentage increase.");
    return null;
  }
}

export function calculatePercentageIncreaseProjects(dataByMonth) {
  const countByMonth = {};

  // Loop through each data entry
  dataByMonth.forEach((entry) => {
    // Extract the year and month from the date
    const date = new Date(entry._id);
    const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    // Increment the count for the specific month
    if (countByMonth[yearMonth]) {
      countByMonth[yearMonth] += entry.totalProjects;
    } else {
      countByMonth[yearMonth] = entry.totalProjects;
    }
  });

  const months = Object.keys(countByMonth);

  if (months.length > 1) {
    const currentMonth = months[months.length - 1];
    const previousMonth = months[months.length - 2];
    const currentMonthCount = countByMonth[currentMonth];
    const previousMonthCount = countByMonth[previousMonth];

    // Calculate the percentage increase
    const increase =
      ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;
    const percentageIncrease = increase.toFixed(2); // Round to 2 decimal places

    return { percentageIncrease, countByMonth };
  } else if (months.length === 1) {
    const currentMonth = months[0];
    const currentMonthCount = countByMonth[currentMonth];
    const previousMonthCount = 1; // Assume last month's project count is 1

    // Calculate the percentage increase
    const increase =
      ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;
    const percentageIncrease = increase.toFixed(2); // Round to 2 decimal places

    return { percentageIncrease, countByMonth };
  } else {
    console.log("No data available.");
    return null;
  }
}
