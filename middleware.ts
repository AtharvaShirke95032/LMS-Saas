import { clerkMiddleware } from '@clerk/nextjs/server';




export default clerkMiddleware();


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // for today
  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }

  // for yesterday
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  // for last 7 days
  const last7Days = new Date(today);
  last7Days.setDate(today.getDate() - 7);
  if (date >= last7Days) {
    return "Last 7 Days";
  }
  //for last 30 days
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);
  if (date >= lastMonth) {
    return "Last Month";
  }

  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const date = formatDate("2025-07-06 15:14:50.989825+00");