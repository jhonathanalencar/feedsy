import { Timestamp } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';


export function formatTimestampToDate(timestamp: Timestamp){
  const date = timestamp;

  if(!date){return;}

  const formattedDate = date.toDate();

  return formatDistanceToNow(formattedDate, { addSuffix: true });
}