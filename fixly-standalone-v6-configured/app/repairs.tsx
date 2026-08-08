import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { supabase } from '../lib/supabase';
export default function Repairs(){
 const [rows,setRows]=useState<any[]>([]);
 const load=async()=>{const {data}=await supabase.from('repairs').select('*').order('created_at',{ascending:false});setRows(data||[])};
 useFocusEffect(useCallback(()=>{load()},[]));
 return <View style={s.page}><Text style={s.title}>My Repairs</Text>
 <FlatList data={rows} keyExtractor={x=>x.id} ListEmptyComponent={<Text style={s.empty}>No saved repairs yet. Diagnose something and save the guide.</Text>}
 renderItem={({item})=><TouchableOpacity style={s.card} onPress={()=>router.push({pathname:'/repair/[id]',params:{id:item.id}})}>
 <Text style={s.name}>{item.item_name||'Repair'}</Text><Text style={s.text}>{item.problem||item.diagnosis}</Text><Text style={s.date}>{new Date(item.created_at).toLocaleDateString()}</Text>
 </TouchableOpacity>}/></View>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:'#0B1220',padding:20},title:{color:'#fff',fontSize:30,fontWeight:'900',marginVertical:18},card:{backgroundColor:'#172033',padding:17,borderRadius:15,marginBottom:12},name:{color:'#fff',fontWeight:'900',fontSize:19},text:{color:'#CBD5E1',marginTop:5},date:{color:'#64748B',marginTop:9},empty:{color:'#94A3B8',lineHeight:22}})
