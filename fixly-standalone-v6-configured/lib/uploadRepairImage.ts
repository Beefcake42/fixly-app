import * as FileSystem from 'expo-file-system';
import { supabase } from './supabase';

export async function uploadRepairImage(uri:string){
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) throw new Error('Sign in required.');
  const base64=await FileSystem.readAsStringAsync(uri,{encoding:FileSystem.EncodingType.Base64});
  const bytes=Uint8Array.from(atob(base64),c=>c.charCodeAt(0));
  const path=`${user.id}/${Date.now()}.jpg`;
  const {error}=await supabase.storage.from('repair-images').upload(path,bytes,{contentType:'image/jpeg',upsert:false});
  if(error) throw error;
  return path;
}
