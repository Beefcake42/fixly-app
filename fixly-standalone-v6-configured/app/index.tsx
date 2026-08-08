import { useEffect,useState } from 'react';
import { ActivityIndicator,Alert,StyleSheet,Text,TextInput,TouchableOpacity,View } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../lib/supabase';
export default function Home(){
 const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [busy,setBusy]=useState(true);
 useEffect(()=>{supabase.auth.getSession().then(({data})=>{if(data.session)router.replace('/dashboard');else setBusy(false)})},[]);
 async function signIn(){if(!email||!password)return Alert.alert('Fixly','Enter your email and password.');setBusy(true);const {error}=await supabase.auth.signInWithPassword({email:email.trim(),password});setBusy(false);if(error)return Alert.alert('Sign in',error.message);router.replace('/dashboard')}
 async function signUp(){if(!email.includes('@')||password.length<8)return Alert.alert('Fixly','Use a valid email and a password of at least 8 characters.');setBusy(true);const {error}=await supabase.auth.signUp({email:email.trim(),password});setBusy(false);if(error)return Alert.alert('Create account',error.message);Alert.alert('Fixly','Account created. Check your email if confirmation is enabled.')}
 if(busy)return <View style={s.loading}><ActivityIndicator size="large"/><Text style={s.wait}>Opening Fixly…</Text></View>;
 return <View style={s.page}><Text style={s.logo}>FIXLY</Text><Text style={s.tag}>Snap it. Diagnose it. Fix it.</Text>
 <TextInput style={s.input} placeholder="Email" placeholderTextColor="#9CA3AF" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail}/>
 <TextInput style={s.input} placeholder="Password" placeholderTextColor="#9CA3AF" secureTextEntry value={password} onChangeText={setPassword}/>
 <TouchableOpacity style={s.primary} onPress={signIn}><Text style={s.btn}>Sign in</Text></TouchableOpacity>
 <TouchableOpacity style={s.secondary} onPress={signUp}><Text style={s.btn}>Create account</Text></TouchableOpacity>
 <Text style={s.legal}>By creating an account, you agree to Fixly's Terms & Safety and acknowledge its Privacy Policy.</Text></View>}
const s=StyleSheet.create({page:{flex:1,backgroundColor:'#0B1220',padding:24,justifyContent:'center'},loading:{flex:1,backgroundColor:'#0B1220',alignItems:'center',justifyContent:'center'},wait:{color:'#CBD5E1',marginTop:12},logo:{fontSize:46,fontWeight:'900',color:'#fff',letterSpacing:3},tag:{fontSize:18,color:'#A7F3D0',marginBottom:32},input:{backgroundColor:'#172033',color:'#fff',padding:16,borderRadius:12,marginBottom:12},primary:{backgroundColor:'#10B981',padding:16,borderRadius:12,alignItems:'center',marginTop:8},secondary:{backgroundColor:'#334155',padding:16,borderRadius:12,alignItems:'center',marginTop:12},btn:{color:'#fff',fontWeight:'800'},legal:{color:'#64748B',fontSize:12,lineHeight:17,marginTop:18}})
