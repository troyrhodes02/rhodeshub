/**
 * Calculate relative time string from a date string
 * Returns "Updated X days ago" or "Updated X hours ago" format
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `Updated ${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  } else if (diffInHours > 0) {
    return `Updated ${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  } else {
    return "Updated just now";
  }
}
