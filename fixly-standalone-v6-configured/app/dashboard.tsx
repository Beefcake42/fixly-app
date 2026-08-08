import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
export default function Dashboard(){
 const Tile=({title,sub,to}:{title:string,sub:string,to:string})=>
 <TouchableOpacity style={s.tile} onPress={()=>router.push(to as any)}>
   <Text style={s.tileTitle}>{title}</Text><Text style={s.sub}>{sub}</Text>
 </TouchableOpacity>;
 return <View style={s.page}>
  <Text style={s.logo}>FIXLY</Text><Text style={s.heading}>Repair smarter.</Text>
  <TouchableOpacity style={s.hero} onPress={()=>router.push('/scan')}><Text style={s.heroTitle}>Scan & Diagnose</Text><Text style={s.heroSub}>Photograph an item and let Fixly help identify the problem.</Text></TouchableOpacity>
  <View style={s.row}><Tile title="My Repairs" sub="Saved repair guides" to="/repairs"/><Tile title="Maintenance" sub="Keep equipment on schedule" to="/maintenance"/></View>
  <View style={s.row}><Tile title="Favorites" sub="Important fixes" to="/favorites"/><Tile title="Account" sub="Sign out & settings" to="/account"/></View>
 </View>
}
const s=StyleSheet.create({page:{flex:1,backgroundColor:'#0B1220',padding:20,paddingTop:60},logo:{color:'#10B981',fontSize:18,fontWeight:'900',letterSpacing:3},heading:{color:'#fff',fontSize:34,fontWeight:'900',marginTop:8,marginBottom:24},hero:{backgroundColor:'#10B981',padding:22,borderRadius:18,marginBottom:16},heroTitle:{color:'#fff',fontSize:25,fontWeight:'900'},heroSub:{color:'#ECFDF5',marginTop:6,lineHeight:20},row:{flexDirection:'row',gap:12,marginBottom:12},tile:{flex:1,minHeight:125,backgroundColor:'#172033',padding:16,borderRadius:16},tileTitle:{color:'#fff',fontSize:18,fontWeight:'800'},sub:{color:'#94A3B8',marginTop:8,lineHeight:19}})
