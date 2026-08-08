import { createClient } from "npm:@supabase/supabase-js@2";
Deno.serve(async(req)=>{
 try{
  const auth=req.headers.get("Authorization"); if(!auth)return new Response("Unauthorized",{status:401});
  const url=Deno.env.get("SUPABASE_URL")!,service=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const root=createClient(url,service);
  const token=auth.replace("Bearer ","");
  const {data:{user},error}=await root.auth.getUser(token);
  if(error||!user)return new Response("Unauthorized",{status:401});

  const {data:objects}=await root.storage.from("repair-images").list(user.id,{limit:1000});
  if(objects?.length){
    await root.storage.from("repair-images").remove(objects.map(x=>`${user.id}/${x.name}`));
  }
  // Database rows referencing auth.users cascade when the auth user is deleted.
  const {error:del}=await root.auth.admin.deleteUser(user.id);
  if(del)throw del;
  return new Response(JSON.stringify({ok:true}),{headers:{"Content-Type":"application/json"}});
 }catch(e){return new Response(JSON.stringify({error:String(e)}),{status:500,headers:{"Content-Type":"application/json"}})}
});
