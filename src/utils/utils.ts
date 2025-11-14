/**
 * Formats a time string to time-of-day (HH:mm) in the user's local timezone.
 * Accepts ISO/RFC strings or epoch millis (as string); returns input on parse failure.
 */
export function formatTime(time: string) {
  const date = new Date(time);
  if (Number.isNaN(date.getTime())) return time;
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
