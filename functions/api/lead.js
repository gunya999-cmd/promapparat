
export async function onRequestPost(context){
  try{
    const data=await context.request.json();
    if(!data.name||!data.phone){
      return new Response(JSON.stringify({ok:false,error:'name and phone required'}),{status:400,headers:{'Content-Type':'application/json'}});
    }
    // TODO: подключить Telegram Bot API, email-сервис или CRM webhook.
    return new Response(JSON.stringify({ok:true,lead:data}),{status:200,headers:{'Content-Type':'application/json'}});
  }catch(e){
    return new Response(JSON.stringify({ok:false,error:'bad request'}),{status:400,headers:{'Content-Type':'application/json'}});
  }
}
