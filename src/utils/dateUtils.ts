export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

export const formatWeekNumber = (date: Date): number => {
  // Calculate pregnancy week number (assuming date is pregnancy start date)
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
  return diffWeeks;
};

export const getRelativeTime = (date: Date): string => {
  const now = new Date().getTime();
  const timestamp = date.getTime();
  const diff = now - timestamp;

  // Convert milliseconds to minutes/hours/days
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days === 1) {
    return 'yesterday';
  } else if (days < 7) {
    return `${days} days ago`;
  } else {
    return formatDate(date);
  }
};
