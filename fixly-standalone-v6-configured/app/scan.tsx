import { useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadRepairImage } from '../lib/uploadRepairImage';
import { supabase } from '../lib/supabase';

export default function Scan() {
 const [uri,setUri]=useState<string|null>(null);
 const [problem,setProblem]=useState('');
 const [result,setResult]=useState<any>(null);
 const [loading,setLoading]=useState(false);
 const [saving,setSaving]=useState(false);

 async function camera(){
   const p=await ImagePicker.requestCameraPermissionsAsync();
   if(!p.granted) return Alert.alert('Camera permission required');
   const r=await ImagePicker.launchCameraAsync({quality:.65,base64:true});
   if(!r.canceled){ setUri(r.assets[0].uri); (globalThis as any).__fixlyImage=r.assets[0].base64; }
 }
 async function gallery(){
   const r=await ImagePicker.launchImageLibraryAsync({quality:.65,base64:true});
   if(!r.canceled){ setUri(r.assets[0].uri); (globalThis as any).__fixlyImage=r.assets[0].base64; }
 }
 async function diagnose(){
   if(!uri) return Alert.alert('Add a photo first');
   setLoading(true);
   try {
     const base64=(globalThis as any).__fixlyImage;
     if(!base64) throw new Error('The selected photo could not be prepared.');
     const {data:{session},error:sessionError}=await supabase.auth.getSession();
     if(sessionError) throw sessionError;
     if(!session) throw new Error('Please sign in before using Fixly AI.');
     const {data,error}=await supabase.functions.invoke('diagnose',{
       body:{problem:problem.trim(),image:`data:image/jpeg;base64,${base64}`}
     });
     if(error) throw error;
     if(!data || data.error) throw new Error(data?.error || 'Diagnosis failed');
     setResult(data);
   } catch(e:any){ Alert.alert('Fixly',e.message); } finally {setLoading(false);}
 }
 async function saveRepair(){
   if(!result || saving) return;
   setSaving(true);
   try {
   const {data:{user}}=await (await import('../lib/supabase')).supabase.auth.getUser();
   if(!user) return Alert.alert('Fixly','Sign in to save repairs.');
   let image_path=null;
   try { if(uri) image_path=await uploadRepairImage(uri); } catch {}
   const {error}=await (await import('../lib/supabase')).supabase.from('repairs').insert({
     user_id:user.id,item_name:result.item,problem,diagnosis:result.summary,steps:result.steps||[],safety:result.safety,
     tools:result.tools||[],parts:result.parts||[],difficulty:result.difficulty,
     estimated_time:result.estimated_time,image_path
   });
   if(error) throw error;
   Alert.alert('Fixly','Repair saved to My Repairs.');
   } catch(e:any) {
     Alert.alert('Fixly',e.message || 'Could not save repair.');
   } finally {
     setSaving(false);
   }
 }
 return <ScrollView contentContainerStyle={s.page}>
   <Text style={s.title}>What needs fixing?</Text>
   <Text style={s.sub}>Take a clear photo and tell Fixly what is happening.</Text>
   {uri && <Image source={{uri}} style={s.image}/>}
   <View style={s.row}>
    <TouchableOpacity style={s.small} onPress={camera}><Text style={s.btn}>Take photo</Text></TouchableOpacity>
    <TouchableOpacity style={s.small} onPress={gallery}><Text style={s.btn}>Choose photo</Text></TouchableOpacity>
   </View>
   <TextInput style={s.problem} multiline placeholder="Example: It hums but the blade doesn't spin..." placeholderTextColor="#94A3B8" value={problem} onChangeText={setProblem}/>
   <TouchableOpacity style={[s.primary,loading&&{opacity:.65}]} onPress={diagnose} disabled={loading}>
     {loading?<View style={{flexDirection:'row',gap:10,alignItems:'center'}}><ActivityIndicator/><Text style={s.btn}>Fixly is diagnosing...</Text></View>:<Text style={s.btn}>Diagnose with Fixly</Text>}
   </TouchableOpacity>
   {result && <View style={s.card}>
      <Text style={s.cardTitle}>{result.item || 'Repair assessment'}</Text>
      <Text style={s.text}>{result.summary}</Text>
      {!!result.difficulty && <Text style={s.text}>Difficulty: {result.difficulty}</Text>}
      {!!result.estimated_time && <Text style={s.text}>Estimated time: {result.estimated_time}</Text>}
      {!!result.safety && <Text style={s.warning}>Safety: {result.safety}</Text>}
      {!!result.tools?.length && <><Text style={s.cardTitle}>Tools</Text>{result.tools.map((x:string,i:number)=><Text style={s.text} key={'t'+i}>• {x}</Text>)}</>}
      {!!result.parts?.length && <><Text style={s.cardTitle}>Parts</Text>{result.parts.map((x:string,i:number)=><Text style={s.text} key={'p'+i}>• {x}</Text>)}</>}
      <Text style={s.cardTitle}>Repair Steps</Text>
      {(result.steps||[]).map((x:string,i:number)=><Text style={s.text} key={i}>{i+1}. {x}</Text>)}
      <TouchableOpacity style={[s.primary,saving&&{opacity:.65}]} onPress={saveRepair} disabled={saving}><Text style={s.btn}>{saving?'Saving...':'Save Repair'}</Text></TouchableOpacity>
   </View>}
 </ScrollView>
}
const s=StyleSheet.create({
 page:{flexGrow:1,backgroundColor:'#0B1220',padding:20},
 title:{fontSize:30,fontWeight:'900',color:'#fff',marginTop:20},
 sub:{color:'#CBD5E1',marginVertical:8},
 image:{width:'100%',height:280,borderRadius:16,marginVertical:16},
 row:{flexDirection:'row',gap:10},
 small:{flex:1,backgroundColor:'#334155',padding:14,borderRadius:12,alignItems:'center'},
 problem:{minHeight:110,backgroundColor:'#172033',color:'#fff',padding:14,borderRadius:12,marginVertical:14,textAlignVertical:'top'},
 primary:{backgroundColor:'#10B981',padding:16,borderRadius:12,alignItems:'center'},
 btn:{color:'#fff',fontWeight:'800'},
 card:{backgroundColor:'#172033',padding:18,borderRadius:16,marginTop:18},
 cardTitle:{fontSize:21,fontWeight:'900',color:'#fff',marginBottom:8},
 text:{color:'#E2E8F0',marginBottom:8,lineHeight:21},
 warning:{color:'#FDE68A',fontWeight:'700',marginVertical:8}
});
