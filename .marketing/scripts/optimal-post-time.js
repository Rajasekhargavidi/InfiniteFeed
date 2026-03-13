// AI Generated Code by Deloitte + Cursor (BEGIN)
/**
 * Calculates optimal LinkedIn posting times for maximum reach.
 * Based on 2025 engagement data: Tue-Thu, 8-11 AM and 12-2 PM local.
 * Industry-specific variations included.
 *
 * Usage: node optimal-post-time.js [industry] [timezone]
 * Example: node optimal-post-time.js technology America/Los_Angeles
 */

const INDUSTRY_SLOTS = {
  default: {
    days: ['Tuesday', 'Wednesday', 'Thursday'],
    slots: ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '12:00 PM', '1:00 PM', '2:00 PM'],
    avoid: ['Saturday', 'Sunday', 'Friday after 2 PM'],
  },
  technology: {
    days: ['Tuesday', 'Wednesday', 'Thursday'],
    slots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM'],
    timezoneHint: 'PST preferred for tech audience',
    avoid: ['Weekends', 'Friday afternoon'],
  },
  financial: {
    days: ['Monday', 'Tuesday', 'Wednesday'],
    slots: ['7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM'],
    timezoneHint: 'EST preferred',
    avoid: ['Weekends', 'Late afternoon'],
  },
  healthcare: {
    days: ['Wednesday', 'Thursday', 'Friday'],
    slots: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    timezoneHint: 'Local time',
    avoid: ['Early morning', 'Weekends'],
  },
  professional_services: {
    days: ['Monday', 'Tuesday', 'Wednesday'],
    slots: ['8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM'],
    timezoneHint: 'Local time',
    avoid: ['Weekends'],
  },
};

function getOptimalTimes(industry = 'default', timezone = 'local') {
  const config = INDUSTRY_SLOTS[industry] || INDUSTRY_SLOTS.default;
  const now = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const nextSlots = [];
  for (let d = 0; d < 7; d++) {
    const checkDate = new Date(now);
    checkDate.setDate(now.getDate() + d);
    const dayName = dayNames[checkDate.getDay()];
    if (!config.days.includes(dayName)) continue;

    for (const slot of config.slots) {
      const [time, period] = slot.split(' ');
      const [hour, min] = time.split(':').map(Number);
      let hour24 = hour;
      if (period === 'PM' && hour !== 12) hour24 += 12;
      if (period === 'AM' && hour === 12) hour24 = 0;

      const slotDate = new Date(checkDate);
      slotDate.setHours(hour24, min, 0, 0);
      if (slotDate > now) {
        nextSlots.push({
          date: slotDate.toISOString(),
          local: slotDate.toLocaleString('en-US', { timeZone: timezone || 'UTC' }),
          day: dayName,
          slot,
        });
      }
    }
  }

  nextSlots.sort((a, b) => new Date(a.date) - new Date(b.date));
  return { config, nextSlots: nextSlots.slice(0, 10) };
}

function main() {
  const industry = (process.argv[2] || 'default').toLowerCase().replace(/\s+/g, '_');
  const timezone = process.argv[3] || 'UTC';

  const { config, nextSlots } = getOptimalTimes(industry, timezone);

  console.log(JSON.stringify({
    industry: industry === 'default' ? 'general' : industry,
    timezone,
    bestDays: config.days,
    bestSlots: config.slots,
    avoid: config.avoid,
    timezoneHint: config.timezoneHint || null,
    nextOptimalTimes: nextSlots,
    recommendation: `Post on ${config.days.join(', ')} at ${config.slots.slice(0, 3).join(', ')} (${timezone}) for maximum reach. First hour engagement is critical (40%+ influence on total reach).`,
  }, null, 2));
}

main();
// AI Generated Code by Deloitte + Cursor (END)
