/**
 * Schedules a reminder 10 minutes before posting time.
 * Uses Windows Task Scheduler to show a popup alert.
 *
 * Usage: node schedule-reminder.js <date> <time> [timezone] [topic]
 * Example: node schedule-reminder.js 2026-03-17 09:00 Asia/Kolkata "AI market changes"
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node schedule-reminder.js <YYYY-MM-DD> <HH:MM> [timezone] [topic]');
    console.error('Example: node schedule-reminder.js 2026-03-17 09:00 Asia/Kolkata "AI post"');
    process.exit(1);
  }
  return {
    date: args[0],
    time: args[1],
    timezone: args[2] || 'Asia/Kolkata',
    topic: args[3] || 'LinkedIn post',
  };
}

function getReminderTime(dateStr, timeStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hour, min] = timeStr.split(':').map(Number);
  const postTime = new Date(year, month - 1, day, hour, min, 0);
  const reminderTime = new Date(postTime.getTime() - 10 * 60 * 1000);
  return reminderTime;
}

function createPowerShellPopup(topic) {
  const scriptPath = path.join(__dirname, '..', 'posts', 'reminder-popup.ps1');
  const content = '# Reminder popup - do not edit manually\n' +
    'Add-Type -AssemblyName System.Windows.Forms\n' +
    '[System.Windows.Forms.MessageBox]::Show(\n' +
    '  "Your LinkedIn post is ready for approval. Post in 10 minutes!`n`nTopic: ' + topic.replace(/"/g, '\\"') + '",\n' +
    '  "LaravisionX - Post Approval Reminder",\n' +
    '  [System.Windows.Forms.MessageBoxButtons]::OK,\n' +
    '  [System.Windows.Forms.MessageBoxIcon]::Information\n' +
    ')';
  fs.writeFileSync(scriptPath, content, 'utf8');
  return scriptPath;
}

function scheduleWindowsTask(reminderTime, scriptPath) {
  const taskName = 'LaravisionX_PostReminder';
  const hour = reminderTime.getHours().toString().padStart(2, '0');
  const min = reminderTime.getMinutes().toString().padStart(2, '0');
  const schtasksTime = `${hour}:${min}`;
  const schtasksDate = `${(reminderTime.getMonth() + 1).toString().padStart(2, '0')}/${reminderTime.getDate().toString().padStart(2, '0')}/${reminderTime.getFullYear()}`;

  try {
    execSync(`schtasks /delete /tn "${taskName}" /f 2>nul`, { stdio: 'ignore' });
    const psPath = scriptPath.replace(/\\/g, '/');
    const tr = `powershell -ExecutionPolicy Bypass -File "${psPath}"`;
    execSync(`schtasks /create /tn "${taskName}" /tr "${tr}" /sc once /st ${schtasksTime} /sd ${schtasksDate} /f`, {
      stdio: 'inherit',
      shell: true,
    });
    return true;
  } catch (e) {
    return false;
  }
}

function main() {
  const { date, time, timezone, topic } = parseArgs();
  const reminderTime = getReminderTime(date, time);

  if (reminderTime < new Date()) {
    console.error('Reminder time is in the past. Use a future post time.');
    process.exit(1);
  }

  const scriptPath = createPowerShellPopup(topic);
  const success = scheduleWindowsTask(reminderTime, scriptPath);

  if (success) {
    console.log(JSON.stringify({
      success: true,
      postTime: `${date} ${time} (${timezone})`,
      reminderTime: reminderTime.toLocaleString(),
      message: `Reminder set for 10 minutes before post. You'll get a popup at ${reminderTime.toLocaleTimeString()}.`,
    }, null, 2));
  } else {
    console.log(JSON.stringify({
      success: false,
      postTime: `${date} ${time} (${timezone})`,
      reminderTime: reminderTime.toLocaleString(),
      message: 'Could not create Windows task. Try: Run terminal as Administrator, or set a manual reminder.',
      manualReminder: `Set a reminder for ${reminderTime.toLocaleString()} - "Approve LinkedIn post: ${topic}"`,
      popupScript: scriptPath,
    }, null, 2));
  }
}

main();
