export function formatDate(startDate: Date): string {
  const currentDate = new Date();
  // Difference in seconds
  const difference = (currentDate.getTime() - startDate.getTime()) / 1000;
  // If startDate > CurrentDate break
  if (difference < 0) throw new Error("invalid start date");

  if (difference < 45) {
    return "just now";
  } else if (difference < 90) {
    return "few seconds ago";
  } else if (difference < 60 * 60) {
    const minutes = Math.round(difference / 60);
    return `${minutes} minutes ago`;
  } else if (difference < 120 * 60) {
    return "one hour ago";
  } else if (difference < 24 * 60 * 60) {
    const hours = Math.round(difference / 3600);
    return `${hours} hours ago`;
  } else if (difference < 48 * 60 * 60) {
    return "yesterday";
  } else if (difference < 30 * 24 * 60 * 60) {
    const days = Math.round(difference / (24 * 3600));
    return `${days} days ago`;
  } else if (difference < 60 * 24 * 60 * 60) {
    return "one month ago";
  } else if (difference < 365 * 24 * 60 * 60) {
    const months = Math.round(difference / (30 * 24 * 3600));
    return `${months} months ago`;
  } else if (difference < 730 * 24 * 60 * 60) {
    return "one year ago";
  } else {
    return startDate.toLocaleDateString();
  }
}
