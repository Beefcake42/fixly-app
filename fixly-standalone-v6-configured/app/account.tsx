import { Alert,StyleSheet,Text,TouchableOpacity,View } from 'react-native';
import { router } from 'expo-router';import { supabase } from '../lib/supabase';
export default function Account(){
 async function out(){await supabase.auth.signOut();router.replace('/')}
 function deleteAccount(){Alert.alert('Delete Fixly account?','This permanently deletes your account and associated database records.',[
  {text:'Cancel',style:'cancel'},{text:'Delete',style:'destructive',onPress:async()=>{
   const {data:{session}}=await supabase.auth.getSession();
   const r=await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/delete-account`,{method:'POST',headers:{Authorization:`Bearer ${session?.access_token}`}});
   if(!r.ok)return Alert.alert('Fixly','Account deletion failed.');
   await supabase.auth.signOut();router.replace('/');
  }}
 ])}
 return <View style={s.page}><Text style={s.title}>Account</Text><Text style={s.copy}>Manage your Fixly session and account data.</Text>
 <TouchableOpacity style={s.link} onPress={()=>router.push('/privacy')}><Text style={s.linkText}>Privacy Policy</Text></TouchableOpacity>
 <TouchableOpacity style={s.link} onPress={()=>router.push('/terms')}><Text style={s.linkText}>Terms & Safety</Text></TouchableOpacity>
 <TouchableOpacity style={s.btn} onPress={out}><Text style={s.bt}>Sign out</Text></TouchableOpacity>
 <TouchableOpacity style={s.danger} onPress={deleteAccount}><Text style={s.dangerText}>Delete account</Text></TouchableOpacity></View>}
const s=StyleSheet.create({page:{flex:1,backgroundColor:'#0B1220',padding:20},title:{color:'#fff',fontSize:30,fontWeight:'900',marginTop:18},copy:{color:'#94A3B8',marginVertical:14},btn:{backgroundColor:'#334155',padding:15,borderRadius:12,alignItems:'center'},bt:{color:'#fff',fontWeight:'900'},link:{paddingVertical:13},linkText:{color:'#A7F3D0',fontWeight:'800'},danger:{backgroundColor:'#3F1D24',padding:15,borderRadius:12,alignItems:'center',marginTop:14},dangerText:{color:'#FCA5A5',fontWeight:'900'}})
