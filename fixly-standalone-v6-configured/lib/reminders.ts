import * as Notifications from 'expo-notifications';

export async function scheduleMaintenanceReminder(title:string,dueDate:Date){
  const permission=await Notifications.requestPermissionsAsync();
  if(permission.status!=='granted') return null;
  const trigger=new Date(dueDate);
  trigger.setHours(9,0,0,0);
  if(trigger.getTime()<=Date.now()) return null;
  return Notifications.scheduleNotificationAsync({
    content:{title:'Fixly Maintenance',body:title},
    trigger:{type:Notifications.SchedulableTriggerInputTypes.DATE,date:trigger}
  });
}
