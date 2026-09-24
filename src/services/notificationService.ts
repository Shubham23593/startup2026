import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';

export async function scheduleDeadlineReminders(eventId: string, title: string, deadline: number) {
  const timings = [
    { label: '7 Days Before', ms: 7*24*60*60*1000 },
    { label: '1 Day Before', ms: 24*60*60*1000 },
    { label: '1 Hour Before', ms: 60*60*1000 },
    { label: '30 Min Before', ms: 30*60*1000 },
  ];
  for (const t of timings) {
    const triggerTime = deadline - t.ms;
    if (triggerTime > Date.now()) {
      await notifee.createTriggerNotification({
        title: `📅 ${t.label}: ${title}`,
        body: `Tap to open - ${title}`,
        android: { channelId: 'deadlines', importance: AndroidImportance.HIGH, pressAction: { id: 'default' }, actions: [{ title: 'Mark Complete', pressAction: { id: 'complete' } }, { title: 'Snooze 1h', pressAction: { id: 'snooze' } }] }
      }, { type: TriggerType.TIMESTAMP, timestamp: triggerTime });
    }
  }
}

export async function onBootRestore() {
  // Restore all notifications after phone restart - called from BootReceiver
  // Fetch from WatermelonDB and reschedule
}
