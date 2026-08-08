import { useCallback,useState } from 'react';
import { FlatList,StyleSheet,Text,TouchableOpacity,View } from 'react-native';
import { router,useFocusEffect } from 'expo-router';
import { supabase } from '../lib/supabase';
export default function Favorites(){
 const [rows,setRows]=useState<any[]>([]);
 useFocusEffect(useCallback(()=>{supabase.from('repairs').select('*').eq('is_favorite',true).order('created_at',{ascending:false}).then(({data})=>setRows(data||[]))},[]));
 return <View style={s.page}><Text style={s.title}>Favorites</Text><FlatList data={rows} keyExtractor={x=>x.id} ListEmptyComponent={<Text style={s.empty}>Favorite a repair guide and it will appear here.</Text>} renderItem={({item})=><TouchableOpacity style={s.card} onPress={()=>router.push({pathname:'/repair/[id]',params:{id:item.id}})}><Text style={s.name}>★ {item.item_name||'Repair'}</Text><Text style={s.text}>{item.diagnosis}</Text></TouchableOpacity>}/></View>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:'#0B1220',padding:20},title:{color:'#fff',fontSize:30,fontWeight:'900',marginVertical:18},card:{backgroundColor:'#172033',padding:16,borderRadius:14,marginBottom:10},name:{color:'#fff',fontSize:18,fontWeight:'900'},text:{color:'#CBD5E1',marginTop:5},empty:{color:'#94A3B8'}})
