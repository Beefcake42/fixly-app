import {ScrollView,StyleSheet,Text} from 'react-native';
export default function Privacy(){return <ScrollView style={s.p}><Text style={s.h}>Privacy Policy</Text><Text style={s.t}>
Fixly uses account information, repair descriptions, and photos you choose to provide to operate repair-assistance features. Repair photos and saved repair records are associated with your account. AI requests may include the photo and problem description needed to generate a diagnosis.

Before publishing Fixly, replace this in-app summary with the final public privacy policy and add the same public policy URL to Google Play Console. The final policy must accurately describe collection, use, sharing, retention, deletion, security practices, and contact information.

You can request account deletion from Account settings. Deleting an account is intended to delete associated Fixly records subject to any retention disclosed in the final policy.
</Text></ScrollView>}
const s=StyleSheet.create({p:{flex:1,backgroundColor:'#0B1220',padding:20},h:{color:'#fff',fontSize:30,fontWeight:'900',marginVertical:18},t:{color:'#CBD5E1',lineHeight:23,paddingBottom:40}})
