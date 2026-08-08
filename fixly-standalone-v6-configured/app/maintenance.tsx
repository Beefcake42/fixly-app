import { useCallback,useState } from 'react';
import { Alert,FlatList,StyleSheet,Text,TextInput,TouchableOpacity,View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { supabase } from '../lib/supabase';
import { scheduleMaintenanceReminder } from '../lib/reminders';
export default function Maintenance(){
 const [title,setTitle]=useState(''); const [due,setDue]=useState(''); const [items,setItems]=useState<any[]>([]);
 const load=async()=>{const {data}=await supabase.from('maintenance').select('*').order('created_at',{ascending:false});setItems(data||[])};
 useFocusEffect(useCallback(()=>{load()},[]));
 async function add(){
  if(!title.trim())return;
  if(due && !/^\d{4}-\d{2}-\d{2}$/.test(due))return Alert.alert('Fixly','Use YYYY-MM-DD for the due date.');
  const {data:{user}}=await supabase.auth.getUser(); if(!user)return;
  const {error}=await supabase.from('maintenance').insert({user_id:user.id,title:title.trim(),due_date:due||null});
  if(error)return Alert.alert('Fixly',error.message);
  if(due) await scheduleMaintenanceReminder(title.trim(),new Date(due+'T09:00:00'));
  setTitle('');setDue('');load();
 }
 async function toggle(x:any){await supabase.from('maintenance').update({completed:!x.completed}).eq('id',x.id);load()}
 async function remove(id:string){await supabase.from('maintenance').delete().eq('id',id);load()}
 return <View style={s.page}><Text style={s.title}>Maintenance</Text>
 <TextInput style={s.input} placeholder="Maintenance task" placeholderTextColor="#94A3B8" value={title} onChangeText={setTitle}/>
 <TextInput style={s.input} placeholder="Due date: YYYY-MM-DD" placeholderTextColor="#94A3B8" value={due} onChangeText={setDue}/>
 <TouchableOpacity style={s.add} onPress={add}><Text style={s.bt}>Add & remind me</Text></TouchableOpacity>
 <FlatList data={items} keyExtractor={x=>x.id} renderItem={({item})=><View style={s.card}>
  <TouchableOpacity onPress={()=>toggle(item)}><Text style={[s.item,item.completed&&s.done]}>{item.completed?'✓ ':''}{item.title}</Text><Text style={s.date}>{item.due_date?'Due '+item.due_date:'No due date'}</Text></TouchableOpacity>
  <TouchableOpacity onPress={()=>remove(item.id)}><Text style={s.delete}>Delete</Text></TouchableOpacity>
 </View>}/></View>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:'#0B1220',padding:20},title:{color:'#fff',fontSize:30,fontWeight:'900',marginVertical:18},input:{backgroundColor:'#172033',color:'#fff',padding:15,borderRadius:12,marginBottom:9},add:{backgroundColor:'#10B981',padding:14,borderRadius:12,alignItems:'center',marginBottom:10},bt:{color:'#fff',fontWeight:'900'},card:{backgroundColor:'#172033',padding:16,borderRadius:12,marginTop:8},item:{color:'#fff',fontWeight:'800',fontSize:16},done:{textDecorationLine:'line-through',color:'#64748B'},date:{color:'#94A3B8',marginTop:5},delete:{color:'#FCA5A5',marginTop:10,fontWeight:'700'}})
