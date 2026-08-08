import OpenAI from "npm:openai";

Deno.serve(async (req) => {
  try {
    const { problem, image } = await req.json();
    if (!image) return new Response(JSON.stringify({error:"Image required"}), {status:400});
    const client = new OpenAI({ apiKey: Deno.env.get("OPENAI_API_KEY") });
    const response = await client.responses.create({
      model: "gpt-5",
      input: [{
        role: "user",
        content: [
          { type: "input_text", text:
`You are Fixly, a cautious repair assistant. Inspect the image and the user's symptom.
Problem: ${problem || "No symptom supplied."}
Return ONLY valid JSON with keys item, summary, safety, difficulty, estimated_time, tools, parts, steps. tools, parts, and steps must be arrays of short strings. difficulty must be Easy, Moderate, Difficult, or Professional.
Never instruct users to bypass guards, interlocks, pressure protections, or electrical safety. For high-risk gas, mains electrical, structural, pressurized, refrigerant, airbag, brake, or similar work, recommend a qualified professional instead of hazardous procedural steps.` },
          { type: "input_image", image_url: image }
        ]
      }]
    });
    const cleaned=response.output_text.replace(/^```json\s*/,'').replace(/```$/,'').trim();
    const parsed=JSON.parse(cleaned);
    const safe={
      item:String(parsed.item||"Unknown item"),
      summary:String(parsed.summary||"Unable to determine a diagnosis."),
      safety:String(parsed.safety||"Follow manufacturer safety instructions."),
      difficulty:["Easy","Moderate","Difficult","Professional"].includes(parsed.difficulty)?parsed.difficulty:"Professional",
      estimated_time:String(parsed.estimated_time||"Unknown"),
      tools:Array.isArray(parsed.tools)?parsed.tools.map(String).slice(0,20):[],
      parts:Array.isArray(parsed.parts)?parsed.parts.map(String).slice(0,20):[],
      steps:Array.isArray(parsed.steps)?parsed.steps.map(String).slice(0,30):[]
    };
    return new Response(JSON.stringify(safe),{headers:{"Content-Type":"application/json"}});
  } catch (e) {
    return new Response(JSON.stringify({error:String(e)}),{status:500,headers:{"Content-Type":"application/json"}});
  }
});
