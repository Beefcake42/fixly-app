import { useEffect,useState } from 'react';
import { Alert,ScrollView,StyleSheet,Text,TouchableOpacity } from 'react-native';
import { useLocalSearchParams,router } from 'expo-router';
import { supabase } from '../../lib/supabase';
export default function Repair(){
 const {id}=useLocalSearchParams(); const [r,setR]=useState<any>(null);
 async function load(){const {data}=await supabase.from('repairs').select('*').eq('id',id).single();setR(data)}
 useEffect(()=>{load()},[id]);
 async function favorite(){const next=!r.is_favorite;const {error}=await supabase.from('repairs').update({is_favorite:next}).eq('id',id);if(error)return Alert.alert('Fixly',error.message);setR({...r,is_favorite:next})}
 async function remove(){const {error}=await supabase.from('repairs').delete().eq('id',id);if(error)return Alert.alert('Fixly',error.message);router.replace('/repairs')}
 if(!r)return <ScrollView style={s.page}><Text style={s.text}>Loading...</Text><TouchableOpacity style={s.delete} onPress={remove}><Text style={s.deleteText}>Delete Repair</Text></TouchableOpacity>
 </ScrollView>;
 return <ScrollView style={s.page}>
 <Text style={s.title}>{r.item_name||'Repair Guide'}</Text>
 <TouchableOpacity style={s.fav} onPress={favorite}><Text style={s.favText}>{r.is_favorite?'★ Favorited':'☆ Add to Favorites'}</Text></TouchableOpacity>
 {(r.difficulty||r.estimated_time)&&<Text style={s.meta}>{r.difficulty||''}{r.difficulty&&r.estimated_time?'  •  ':''}{r.estimated_time||''}</Text>}
 <Text style={s.label}>Problem</Text><Text style={s.text}>{r.problem}</Text>
 <Text style={s.label}>Diagnosis</Text><Text style={s.text}>{r.diagnosis}</Text>
 {!!r.safety&&<><Text style={s.label}>Safety</Text><Text style={s.warn}>{r.safety}</Text></>}
 {!!r.tools?.length&&<><Text style={s.label}>Tools</Text>{r.tools.map((x:string,i:number)=><Text key={'t'+i} style={s.text}>• {x}</Text>)}</>}
 {!!r.parts?.length&&<><Text style={s.label}>Parts</Text>{r.parts.map((x:string,i:number)=><Text key={'p'+i} style={s.text}>• {x}</Text>)}</>}
 <Text style={s.label}>Steps</Text>{(r.steps||[]).map((x:string,i:number)=><Text key={i} style={s.step}>{i+1}. {x}</Text>)}
 </ScrollView>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:'#0B1220',padding:20},title:{color:'#fff',fontSize:29,fontWeight:'900',marginTop:18},fav:{backgroundColor:'#334155',padding:12,borderRadius:10,alignSelf:'flex-start',marginTop:12},favText:{color:'#fff',fontWeight:'800'},meta:{color:'#A7F3D0',marginTop:12,fontWeight:'700'},label:{color:'#10B981',fontWeight:'900',fontSize:16,marginTop:16,marginBottom:5},text:{color:'#E2E8F0',lineHeight:22},warn:{color:'#FDE68A',lineHeight:22},step:{color:'#E2E8F0',lineHeight:23,marginBottom:10},delete:{backgroundColor:'#3F1D24',padding:14,borderRadius:10,alignItems:'center',marginVertical:24},deleteText:{color:'#FCA5A5',fontWeight:'900'}})
