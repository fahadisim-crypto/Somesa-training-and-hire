import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));

  // Shared Gemini client lazy initializer
  let geminiClient: GoogleGenAI | null = null;
  function getGemini(): GoogleGenAI | null {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    if (!geminiClient) {
      geminiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return geminiClient;
  }

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // 1. Analyze Video & Generate Bilingual Captions (English & Luganda)
  app.post("/api/ai/analyze-video-captions", async (req, res) => {
    try {
      const {
        videoTitle = "Product Showcase Video",
        tradeCategory = "Video",
        videoDescription = "",
        durationSeconds = 30,
        userNotes = "",
      } = req.body;

      const ai = getGemini();

      if (ai) {
        const prompt = `You are a specialist video producer and bilingual Ugandan content editor for SOMESA (a platform empowering female creators and physical trade artisans in Uganda).
Analyze this creator video project:
- Title: ${videoTitle}
- Category: ${tradeCategory}
- Description: ${videoDescription || "A short mobile video demonstrating products/services in Uganda."}
- Video duration: approximately ${durationSeconds} seconds
- Creator notes: ${userNotes || "Focus on natural conversational tone, authentic Ugandan Luganda phrasing, and clear product pricing in UGX."}

Generate an analysis containing:
1. "title": Crisp, attractive video headline
2. "summary": 2-sentence breakdown in English
3. "summaryLuganda": Accurate 2-sentence breakdown in natural Luganda
4. "hookRating": Number from 1 to 10 evaluating how engaging the opening hook is
5. "lightingScore": e.g. "Optimal natural light" or "Needs DIY reflector"
6. "soundClarity": e.g. "Clear direct voice" or "Needs wind muffling"
7. "suggestedHashtags": 5-8 relevant hashtags (e.g. #UgandaCreatives #KampalaBusiness #MasakaCoffee #BuyUgandaBuildUganda #WomenInTrade)
8. "callToActionEnglish": High-converting CTA for WhatsApp / DM orders
9. "callToActionLuganda": Natural Luganda CTA (e.g. "Tukubireko oba weereza obubaka ku WhatsApp...")
10. "whatsappStatusSnippet": One-sentence status text ready to copy-paste with phone placeholder
11. "cues": An array of 4 to 7 synchronized timestamped subtitle cue cards spanning from 0 to ${durationSeconds} seconds.
Each cue MUST have:
- "id": string (e.g. "cue-1")
- "startTime": string (e.g. "00:00")
- "endTime": string (e.g. "00:05")
- "startSeconds": number (e.g. 0)
- "endSeconds": number (e.g. 5)
- "englishText": English subtitle sentence
- "lugandaText": Accurate, natural, idiomatic Luganda translation of that sentence.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                summary: { type: Type.STRING },
                summaryLuganda: { type: Type.STRING },
                hookRating: { type: Type.NUMBER },
                lightingScore: { type: Type.STRING },
                soundClarity: { type: Type.STRING },
                suggestedHashtags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                callToActionEnglish: { type: Type.STRING },
                callToActionLuganda: { type: Type.STRING },
                whatsappStatusSnippet: { type: Type.STRING },
                cues: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      startTime: { type: Type.STRING },
                      endTime: { type: Type.STRING },
                      startSeconds: { type: Type.NUMBER },
                      endSeconds: { type: Type.NUMBER },
                      englishText: { type: Type.STRING },
                      lugandaText: { type: Type.STRING },
                    },
                    required: ["id", "startTime", "endTime", "startSeconds", "endSeconds", "englishText", "lugandaText"],
                  },
                },
              },
              required: [
                "title",
                "summary",
                "summaryLuganda",
                "hookRating",
                "lightingScore",
                "soundClarity",
                "suggestedHashtags",
                "callToActionEnglish",
                "callToActionLuganda",
                "whatsappStatusSnippet",
                "cues",
              ],
            },
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return res.json({ success: true, data: parsed, source: "gemini" });
        }
      }

      // Fallback contextual generation
      const fallbackResult = getContextualVideoCaptionsFallback(videoTitle, tradeCategory, durationSeconds);
      return res.json({ success: true, data: fallbackResult, source: "contextual_engine" });
    } catch (error: any) {
      console.error("Video caption analysis error:", error);
      const fallbackResult = getContextualVideoCaptionsFallback(
        req.body?.videoTitle || "Creator Demo Video",
        req.body?.tradeCategory || "Video",
        req.body?.durationSeconds || 30
      );
      return res.json({ success: true, data: fallbackResult, source: "contextual_fallback" });
    }
  });

  // 2. AI Portfolio Builder & Bio Generator
  app.post("/api/ai/portfolio-builder", async (req, res) => {
    try {
      const {
        creatorName = "Ugandan Artisan Creator",
        tradeCategory = "Artisan Crafts & Soaps",
        location = "Kampala, Uganda",
        experienceYears = "2",
        targetAudience = "Retail shops, boutiques, and direct shoppers",
        currentSkills = [],
        projectExperience = "",
      } = req.body;

      const ai = getGemini();

      if (ai) {
        const prompt = `You are a professional talent agent and career mentor at SOMESA, empowering female creators, physical artisans, soap makers, coffee aggregators, and digital designers across Uganda.
Generate a structured, professional portfolio profile for:
- Name: ${creatorName}
- Trade: ${tradeCategory}
- Location: ${location}
- Experience: ${experienceYears} years
- Target Audience: ${targetAudience}
- Known skills: ${Array.isArray(currentSkills) ? currentSkills.join(", ") : currentSkills}
- Project history notes: ${projectExperience || "Delivered high-quality local projects with proven customer satisfaction."}

Output structured JSON:
1. "tagline": A crisp, punchy 8-12 word professional positioning statement.
2. "bioEnglish": An authoritative, compelling 3-4 sentence professional bio in English.
3. "bioLuganda": A natural, culturally respectful 3-4 sentence bio in Luganda (not robotic translation, but rich conversational Luganda).
4. "suggestedSkills": 5-8 specific, high-demand skills for this trade.
5. "recommendedServices": Array of 2-3 packaged services with:
   - "name": Service title
   - "description": 1-2 sentence deliverable scope
   - "typicalTurnaround": e.g. "24–48 hours" or "3–5 days"
   - "startingRate": Realistic Ugandan rate in UGX & USD (e.g. "UGX 150,000 / $40")
   - "category": "${tradeCategory}"
6. "suggestedProjects": Array of 2 sample case studies with:
   - "title": Compelling client project title
   - "clientName": Ugandan client / brand name
   - "summary": 2-sentence challenge & solution overview
   - "whatIDid": Array of 3 bullet points
   - "tools": Array of 3 tools or equipment
   - "outcome": Measurable business outcome
   - "category": "${tradeCategory}"
7. "aiImagePrompts": Array of 3 prompt strings for Midjourney / Canva Magic / AI tools to generate product staging backgrounds for this trade.
8. "pitchMessageEnglish": WhatsApp client outreach template in English.
9. "pitchMessageLuganda": WhatsApp client outreach template in Luganda.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                tagline: { type: Type.STRING },
                bioEnglish: { type: Type.STRING },
                bioLuganda: { type: Type.STRING },
                suggestedSkills: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                recommendedServices: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      description: { type: Type.STRING },
                      typicalTurnaround: { type: Type.STRING },
                      startingRate: { type: Type.STRING },
                      category: { type: Type.STRING },
                    },
                    required: ["name", "description", "typicalTurnaround", "startingRate", "category"],
                  },
                },
                suggestedProjects: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      clientName: { type: Type.STRING },
                      summary: { type: Type.STRING },
                      whatIDid: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      tools: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      outcome: { type: Type.STRING },
                      category: { type: Type.STRING },
                    },
                    required: ["title", "clientName", "summary", "whatIDid", "tools", "outcome", "category"],
                  },
                },
                aiImagePrompts: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                pitchMessageEnglish: { type: Type.STRING },
                pitchMessageLuganda: { type: Type.STRING },
              },
              required: [
                "tagline",
                "bioEnglish",
                "bioLuganda",
                "suggestedSkills",
                "recommendedServices",
                "suggestedProjects",
                "aiImagePrompts",
                "pitchMessageEnglish",
                "pitchMessageLuganda",
              ],
            },
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return res.json({ success: true, data: parsed, source: "gemini" });
        }
      }

      // Fallback contextual generator
      const fallbackResult = getContextualPortfolioFallback(creatorName, tradeCategory, location);
      return res.json({ success: true, data: fallbackResult, source: "contextual_engine" });
    } catch (error: any) {
      console.error("AI Portfolio Builder error:", error);
      const fallbackResult = getContextualPortfolioFallback(
        req.body?.creatorName || "Ugandan Creator",
        req.body?.tradeCategory || "Video",
        req.body?.location || "Uganda"
      );
      return res.json({ success: true, data: fallbackResult, source: "contextual_fallback" });
    }
  });

  // 3. Somesa AI Copilot Chat Assistant
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message = "", history = [] } = req.body;
      const ai = getGemini();

      if (ai) {
        const systemInstruction = `You are "Somesa AI Copilot", an encouraging, highly knowledgeable digital mentor and creative advisor for Ugandan female creators, artisans (soap/candle makers), coffee aggregators, and digital marketers.
You give actionable, practical advice adapted to the East African SME market:
- Pricing in Uganda Shillings (UGX) and USD
- Smartphone shooting and low-cost lighting techniques
- Natural English and Luganda translations
- Mobile Money payment flows and WhatsApp Business tactics
- Quality standards for agriculture (e.g. coffee moisture levels) and handmade goods (e.g. cold-process soaps)
Keep answers concise, inspiring, formatted with neat bullet points, and friendly.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: message,
          config: {
            systemInstruction,
          },
        });

        return res.json({
          success: true,
          reply: response.text || "I am here to help you refine your portfolio, captions, and pricing!",
          source: "gemini",
        });
      }

      // Fallback chat reply
      const reply = getContextualChatFallback(message);
      return res.json({ success: true, reply, source: "contextual_engine" });
    } catch (error: any) {
      console.error("AI Chat error:", error);
      return res.json({
        success: true,
        reply: "Oli otya! I'm here to support your creative journey on SOMESA. Whether you need video script ideas, Luganda translations, or pricing advice for your artisan crafts, feel free to ask!",
        source: "contextual_fallback",
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SOMESA Full-Stack Server running on port ${PORT}`);
  });
}

// Contextual Fallback Generators for Instant Offline / No-Key Reliability
function getContextualVideoCaptionsFallback(videoTitle: string, category: string, duration: number) {
  if (category === "Artisan Crafts & Soaps" || videoTitle.toLowerCase().includes("soap") || videoTitle.toLowerCase().includes("candle")) {
    return {
      title: "Handmade Botanical Soap & Scented Candle Crafting Process",
      summary: "A step-by-step visual demonstration of measuring pure shea butter, hand-pouring scented essential oils, and curing cold-process soap bars.",
      summaryLuganda: "Enteekateeka y’okupima butto w’ebirime, okufuka amafuta ag’akaloosa, n’okukola sabbuuni ow’emikono mu ngeri ey’obukuumi.",
      hookRating: 9,
      lightingScore: "Warm daylight with good overhead clarity",
      soundClarity: "Crisp natural workspace audio",
      suggestedHashtags: ["#UgandaArtisans", "#OrganicSoapUganda", "#HandmadeInUganda", "#KyoteraCrafts", "#BuyUgandaBuildUganda", "#WomenInTrade"],
      callToActionEnglish: "Order your custom organic batch today via WhatsApp or book an on-site workshop!",
      callToActionLuganda: "Weereza obubaka bwo ku WhatsApp okufuna sabbuuni wo oba okutegeka omusomo gw’emikono!",
      whatsappStatusSnippet: "Natural handmade soaps & candles available in bulk! WhatsApp 0703-112244 for catalogue & delivery fees.",
      cues: [
        {
          id: "cue-1",
          startTime: "00:00",
          endTime: "00:05",
          startSeconds: 0,
          endSeconds: 5,
          englishText: "Today I am formulating a fresh batch of organic shea butter soap bars.",
          lugandaText: "Leero ng’enda kukola sabbuuni omuggya ow’emikono akoleddwa mu butto w’ebirime.",
        },
        {
          id: "cue-2",
          startTime: "00:05",
          endTime: "00:11",
          startSeconds: 5,
          endSeconds: 11,
          englishText: "We carefully balance natural lemongrass and eucalyptus oils for a soothing herbal scent.",
          lugandaText: "Tugatta amafuta ag’akaloosa aka kisaanyi ne kalitusi okuleeta akawoowo akalungi.",
        },
        {
          id: "cue-3",
          startTime: "00:11",
          endTime: "00:18",
          startSeconds: 11,
          endSeconds: 18,
          englishText: "Watch the trace form as we blend to the perfect pouring consistency.",
          lugandaText: "Laba engeri sabbuuni gy’afaananiramu nga tutabudde obulungi nga tonnaba kumufuka mu bifo.",
        },
        {
          id: "cue-4",
          startTime: "00:18",
          endTime: "00:24",
          startSeconds: 18,
          endSeconds: 24,
          englishText: "Each bar cures for 4 weeks to guarantee gentle, long-lasting lather on your skin.",
          lugandaText: "Buli kitole kya sabbuuni tukikuumira mu bbanga lya wiiki 4 okukakasa nti aweweera ku lususu.",
        },
        {
          id: "cue-5",
          startTime: "00:24",
          endTime: "00:30",
          startSeconds: 24,
          endSeconds: 30,
          englishText: "Tap WhatsApp below to order gift sets or wholesale boutique packs!",
          lugandaText: "Koonako wano ku WhatsApp okusaba ebipande by’edduuka lyo oba ebirabo by’omulembe!",
        },
      ],
    };
  }

  if (category === "Agribusiness & Farm Management" || videoTitle.toLowerCase().includes("coffee")) {
    return {
      title: "Specialty Coffee Cherries Float Sorting & Moisture Calibration",
      summary: "Quality inspection demonstration showing how smallholder cherries are density-sorted and dried to 12.5% export standard on raised solar beds.",
      summaryLuganda: "Okulaga engeri y’okukeberamu emwanyi ku tandalo n’okupima obubisi obutuufu nga tonnaba kuzitunda.",
      hookRating: 8.5,
      lightingScore: "Bright natural outdoor sun with tarpaulin contrast",
      soundClarity: "Clear field narration",
      suggestedHashtags: ["#UgandaCoffee", "#MasakaRobusta", "#AgriBusinessUganda", "#WomenInAgri", "#CoffeeQuality"],
      callToActionEnglish: "Contact our aggregation depot for verified 12% moisture Arabica & Robusta lots!",
      callToActionLuganda: "Tuweereze obubaka okufuna emwanyi ezikebereddwako obubisi obw’omulembe!",
      whatsappStatusSnippet: "Premium dry red cherry lots ready for dispatch. Certified at 12.5% moisture meter standard. WhatsApp +256 771 990088.",
      cues: [
        {
          id: "cue-1",
          startTime: "00:00",
          endTime: "00:06",
          startSeconds: 0,
          endSeconds: 6,
          englishText: "Here is how we ensure top export grade for our Greater Masaka coffee cherries.",
          lugandaText: "Laba engeri gye tukolamu okukakasa nti emwanyi zaffe zituukiriza omutindo gw’ensi yonna.",
        },
        {
          id: "cue-2",
          startTime: "00:06",
          endTime: "00:12",
          startSeconds: 6,
          endSeconds: 12,
          englishText: "First, we submerge harvest baskets to float out any defective, low-density beans.",
          lugandaText: "Okusooka, tuzinnyika mu mazzi okwawula emwanyi enjereere n’ezirina ebizibu.",
        },
        {
          id: "cue-3",
          startTime: "00:12",
          endTime: "00:19",
          startSeconds: 12,
          endSeconds: 19,
          englishText: "Next, we dry only uniform ripe red cherries on elevated mesh beds with constant aeration.",
          lugandaText: "Oluvannyuma, twanika emwanyi emmyufu zokka ku tandalo eziri waggulu mu mpewo ennungi.",
        },
        {
          id: "cue-4",
          startTime: "00:19",
          endTime: "00:25",
          startSeconds: 19,
          endSeconds: 25,
          englishText: "Testing with our digital moisture meter confirms we have reached the exact 12.5% benchmark.",
          lugandaText: "Tukozesa ekyuma kya dijito okupima obubisi era tukakasa ziri ku ddaala 12.5% ery’omulembe.",
        },
        {
          id: "cue-5",
          startTime: "00:25",
          endTime: "00:30",
          startSeconds: 25,
          endSeconds: 30,
          englishText: "Connect with our aggregation team for reliable, traceable farm-direct coffee.",
          lugandaText: "Yunga n’ekibiina kyaffe okufuna emwanyi ez’obwesige eziva butereevu ku balimi.",
        },
      ],
    };
  }

  // Default Digital / Video / Creator fallback
  return {
    title: "Smartphone Product Showcase & MoMo Fast Checkout",
    summary: "Captivating retail showcase highlighting clean window lighting, product angles, and direct Mobile Money ordering via WhatsApp.",
    summaryLuganda: "Vidiyo ennyonnyola ebintu by’edduuka nga byakubiddwa ku simu n’engeri y’okusasula mangu ne Mobile Money.",
    hookRating: 9.2,
    lightingScore: "45-degree natural window lighting with white card reflection",
    soundClarity: "Clear voiceover with subtle background rhythm",
    suggestedHashtags: ["#KampalaCreatives", "#ShopUganda", "#MobileCreator", "#BuyUgandaBuildUganda", "#SOMESA"],
    callToActionEnglish: "Tap the WhatsApp link in bio to place your order with free Kampala delivery today!",
    callToActionLuganda: "Koonako ku link ya WhatsApp eri ku profile okusasula ne MoMo n’okufuna ebintu bino leero!",
    whatsappStatusSnippet: "New collection now in stock! DM or WhatsApp 0700-000000 for quick delivery around Kampala & Entebbe.",
    cues: [
      {
        id: "cue-1",
        startTime: "00:00",
        endTime: "00:06",
        startSeconds: 0,
        endSeconds: 6,
        englishText: "Looking for high quality products made right here in Uganda? Take a look at this.",
        lugandaText: "Onoonya ebintu eby’omulembe ebikoleddwa wano mu Uganda? Laba ku bino.",
      },
      {
        id: "cue-2",
        startTime: "00:06",
        endTime: "00:12",
        startSeconds: 6,
        endSeconds: 12,
        englishText: "Every single piece is handcrafted with premium natural materials and careful attention.",
        lugandaText: "Buli kimu kikoleddwa n’emikono mu bintu eby’obutonde era n’obwegendereza obw’ekitalo.",
      },
      {
        id: "cue-3",
        startTime: "00:12",
        endTime: "00:19",
        startSeconds: 12,
        endSeconds: 19,
        englishText: "We pack and dispatch across Kampala, Masaka, and Gulu with instant confirmation.",
        lugandaText: "Tuweereza mu Kampala, Masaka, ne Gulu n’obukakafu obw’amangu ennyo.",
      },
      {
        id: "cue-4",
        startTime: "00:19",
        endTime: "00:25",
        startSeconds: 19,
        endSeconds: 25,
        englishText: "Pay conveniently with MTN Mobile Money or Airtel Money when you place your order.",
        lugandaText: "Sasula bulungi nga okozesa MTN MoMo oba Airtel Money ng’osaba.",
      },
      {
        id: "cue-5",
        startTime: "00:25",
        endTime: "00:30",
        startSeconds: 25,
        endSeconds: 30,
        englishText: "Message us on WhatsApp right now to secure yours before stocks sell out!",
        lugandaText: "Tuweereze obubaka ku WhatsApp kaakano nga tebinnaggwaawo mu dduuka!",
      },
    ],
  };
}

function getContextualPortfolioFallback(name: string, category: string, location: string) {
  if (category === "Artisan Crafts & Soaps") {
    return {
      tagline: "Handmade botanical herbal soaps, moringa shampoo bars, and bespoke soy candles.",
      bioEnglish: `I am ${name}, an artisan soap maker and trainer based in ${location}. I formulate skin-nourishing botanical soaps using local shea butter, essential oils, and organic herbs, supplying retail boutiques and facilitating hands-on women’s workshops.`,
      bioLuganda: `Nze ${name}, mukugu mu kukola sabbuuni ow’emikono n’emisubbaawa egy’akaloosa mu ${location}. Nkozesa butto w’ebirime n’eddagala ly’obutonde okukola ebintu ebirabirira olususu n’okusomesa abakazi abalala.`,
      suggestedSkills: [
        "Cold-Process Soap Making",
        "Soy Candle Pouring",
        "Natural Scent Blending",
        "Eco Packaging & Sealing",
        "UNBS Standards Basics",
        "Hands-On Workshop Facilitation",
      ],
      recommendedServices: [
        {
          name: "Custom Wholesale Batch (50+ Bars / Jars)",
          description: "Formulated and cured botanical soaps or scented candles branded with your lodge or boutique logo.",
          typicalTurnaround: "7–10 days",
          startingRate: "UGX 150,000 / $40",
          category: "Artisan Crafts & Soaps",
        },
        {
          name: "On-Site Group Soap Making Workshop",
          description: "Practical half-day masterclass for up to 10 participants with raw ingredient kits included.",
          typicalTurnaround: "1 day session",
          startingRate: "UGX 200,000 / $55",
          category: "Artisan Crafts & Soaps",
        },
      ],
      suggestedProjects: [
        {
          title: "Nabugabo Safari Lodge Eco Soap Hamper",
          clientName: "Nabugabo Safari Lodge",
          summary: "Crafted 250 lemongrass-infused soap bars in custom kraft wraps for eco-lodge guest suites.",
          whatIDid: [
            "Formulated organic shea butter recipe with antibacterial properties",
            "Poured and cured bars under controlled humidity for 4 weeks",
            "Printed and hand-applied bilingual product labels",
          ],
          tools: ["Wood Loaf Molds", "Precision Scales", "Kraft Paper Seals"],
          outcome: "Reduced imported soap costs for the lodge by 45% while offering guests an authentic Ugandan welcome gift.",
          category: "Artisan Crafts & Soaps",
        },
      ],
      aiImagePrompts: [
        "Handmade rustic herbal soap bars with dried botanical petals resting on a clean wooden tray, warm natural African morning sunlight, minimalist boutique spa background, photorealistic 8k",
        "Scented soy candle in an amber glass jar with kraft paper label, flickering soft flame, surrounded by raw coffee beans and dried lemongrass, cozy boutique aesthetic",
      ],
      pitchMessageEnglish: `Hello! I craft handmade organic shea butter soaps and scented soy candles that local boutiques and lodges love. I’d be glad to supply a custom wholesale batch or organize a fun team workshop for your group.`,
      pitchMessageLuganda: `Oli otya! Nze nkola sabbuuni ow’emikono n’emisubbaawa ey’akaloosa akasanyusa abaguzi. Nsobola okukuleetera ebipande by’edduuka lyo oba okukola omusomo gw’emikono n’abakozi bo.`,
    };
  }

  if (category === "Agribusiness & Farm Management") {
    return {
      tagline: "Specialty coffee cherry aggregation, 12% moisture meter testing, and digital farm ledgers.",
      bioEnglish: `I am ${name}, an agribusiness coordinator and coffee quality inspector in ${location}. I connect smallholder farmers with premium buyers by managing cherry float grading, raised bed drying, and transparent mobile money farm ledgers.`,
      bioLuganda: `Nze ${name}, nkolagana n’abalimi b’emwanyi mu ${location} okukakasa nti emwanyi zonna zituukiriza omutindo gw’okutunda ebweru, okupima obubisi, n’okusasula abalimi ku simu.`,
      suggestedSkills: [
        "Cherry Density Float Sorting",
        "Digital Moisture Meter Calibration (12%)",
        "Raised Solar Bed Management",
        "Google Sheets Farm Ledger",
        "Farmer Cooperative Training",
      ],
      recommendedServices: [
        {
          name: "Harvest Quality Audit & Moisture Certification",
          description: "On-site testing of drying beds, moisture levels, defect screening, and lot segregation.",
          typicalTurnaround: "1–2 days",
          startingRate: "UGX 180,000 / $48",
          category: "Agribusiness & Farm Management",
        },
        {
          name: "Smallholder Group Aggregation & Farm Ledger",
          description: "Organizing 20–50 outgrowers, setting up digital delivery logbooks and transparent MoMo payout schedules.",
          typicalTurnaround: "3–5 days",
          startingRate: "UGX 250,000 / $65",
          category: "Agribusiness & Farm Management",
        },
      ],
      suggestedProjects: [
        {
          title: "Greater Masaka Outgrowers Premium Harvest Lot",
          clientName: "Buddu Valley Specialty Coffee",
          summary: "Aggregated 15 tons of ripe red cherries across 45 outgrowers with zero mold contamination.",
          whatIDid: [
            "Selective cherry picking workshops for farm leaders",
            "Moisture meter logging three times daily during solar drying",
            "Immediate MoMo bulk payouts linked to delivery weights",
          ],
          tools: ["Grain Moisture Meter", "Solar Tarpaulins", "Mobile Farm Ledger"],
          outcome: "Achieved 98% Grade-A export qualification, earning farmers a 22% price premium over farmgate broker rates.",
          category: "Agribusiness & Farm Management",
        },
      ],
      aiImagePrompts: [
        "Vibrant red ripe coffee cherries spread neatly on raised wooden drying beds, African farm landscape background, warm golden hour sun, photorealistic agribusiness photography",
      ],
      pitchMessageEnglish: `Hello! I help coffee cooperatives and roasters source high-yield specialty Robusta and Arabica with verified 12% moisture levels and full traceability to local outgrowers.`,
      pitchMessageLuganda: `Oli otya! Nnyamba abaguzi b’emwanyi okufuna emwanyi ennungi ezikebereddwa obubisi obutuufu obutatuuka kwonooneka era nga ziva butereevu ku balimi.`,
    };
  }

  // Default Digital & Video trade fallback
  return {
    tagline: "Short-form commercial video producer, CapCut editor, and bilingual social marketing creator.",
    bioEnglish: `I am ${name}, a commercial video creator and visual storyteller in ${location}. I create high-converting TikToks, Instagram Reels, and WhatsApp product showcases that help Ugandan brands turn views into paying customers.`,
    bioLuganda: `Nze ${name}, mukugu mu kukwata vidiyo z’amasimu ez’amaduuka mu ${location}. Nkwata vidiyo za TikTok, Instagram Reels, ne WhatsApp ezikwata emitima gy’abaguzi ne zikuyamba okutunda.`,
    suggestedSkills: [
      "Smartphone 4K Shooting",
      "CapCut Pro Dynamic Editing",
      "Bilingual Voiceover (English/Luganda)",
      "Product Lighting & Angles",
      "TikTok & Reels Strategy",
    ],
    recommendedServices: [
      {
        name: "3-Reel Product Promo Starter Package",
        description: "3 polished short-form videos with trendy audio, text overlays, and clear call-to-action.",
        typicalTurnaround: "48 hours",
        startingRate: "UGX 150,000 / $40",
        category: "Video",
      },
      {
        name: "Monthly Brand Content Retainer (8 Videos)",
        description: "Bi-weekly filming and weekly video deliveries for active WhatsApp and TikTok campaigns.",
        typicalTurnaround: "Monthly",
        startingRate: "UGX 400,000 / $110",
        category: "Video",
      },
    ],
    suggestedProjects: [
      {
        title: "Masaka Handbags TikTok Launch Campaign",
        clientName: "Amani Leather Goods",
        summary: "Filmed a 5-video series showcasing product durability and waterproof stitching for local shoppers.",
        whatIDid: [
          "Storyboarding and model styling in natural daylight",
          "Fast-paced CapCut editing with sound effects and Luganda voiceover",
          "WhatsApp Business catalog integration cards",
        ],
        tools: ["iPhone 13", "CapCut", "Ring Light", "Lavalier Mic"],
        outcome: "Generated over 48,000 organic views and 140 direct WhatsApp order inquiries within 10 days.",
        category: "Video",
      },
    ],
    aiImagePrompts: [
      "Modern bright photography studio in Kampala with ring light and camera gimbal on wooden desk, warm daylight, clean modern creative workspace",
    ],
    pitchMessageEnglish: `Hello! I produce short smartphone videos for local businesses that drive real WhatsApp sales. I’d love to film a fresh 3-video promo batch for your products this week!`,
    pitchMessageLuganda: `Oli otya! Nkwata vidiyo z’ebintu by’edduuka lyo ezirabika obulungi era ezireeta abaguzi abasasula. Nsobola okukukwatira vidiyo 3 ez’omulembe gye bujja.`,
  };
}

function getContextualChatFallback(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("price") || lower.includes("rate") || lower.includes("cost") || lower.includes("ugx") || lower.includes("charge")) {
    return `### Recommended Pricing Guide for Ugandan Creators & Artisans:
1. **Single Product Reel / TikTok Promo**: UGX 50,000 – UGX 90,000 ($14–$25) per video.
2. **3-Video Starter Package**: UGX 150,000 – UGX 220,000 ($40–$60).
3. **Artisan Soap Workshop (Half-day)**: UGX 200,000 ($55) for up to 10 participants.
4. **Wholesale Soap / Candle Batch (50 units)**: UGX 150,000 – UGX 250,000 ($40–$68).
5. **Coffee Moisture Audit & Grading**: UGX 180,000 ($48) per verification lot.

💡 *Pro Tip*: Always quote in UGX for local shop owners and offer direct MTN/Airtel MoMo payment with a 50% deposit before filming or formulation!`;
  }

  if (lower.includes("luganda") || lower.includes("translate") || lower.includes("caption")) {
    return `### Helpful Luganda Business & Marketing Phrases:
- **"Tukubireko oba weereza obubaka ku WhatsApp"** → *Call us or send a message on WhatsApp*
- **"Sasula bulungi ne Mobile Money (MTN / Airtel)"** → *Pay smoothly with Mobile Money*
- **"Ebintu eby’omulembe ebikoleddwa mu Uganda"** → *High quality products made in Uganda*
- **"Tuweereza mu Kampala yonna n’ebweru"** → *We deliver across Kampala and outside districts*
- **"Sabbuuni ow’obutonde aweweera ku lususu"** → *Natural organic soap that soothes the skin*

You can use these directly in your video overlays and WhatsApp status cards!`;
  }

  return `### How Somesa AI Can Assist You Today:
- 🎬 **Video Captions & Analysis**: Generate timestamped English and Luganda subtitles with editable cues.
- 💼 **Portfolio & Bio Builder**: Turn your trade experience into a high-converting profile with Ugandan pricing.
- 🌿 **Artisan & Physical Trades**: Package your soap-making, candle crafting, or coffee aggregation services.
- 🎨 **AI Image Prompts**: Generate photorealistic staging backgrounds for your shop products.

What project or trade would you like to work on right now?`;
}

startServer();
