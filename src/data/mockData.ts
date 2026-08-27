import { Creator, ProjectCaseStudy, HireRequest, Course, TutorRequest } from '../types';

export const INITIAL_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'proj-1',
    creatorId: 'creator-aisha',
    creatorName: 'Aisha Namukasa',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    creatorLocation: 'Kyotera, Uganda',
    creatorRole: 'Digital Content Creator',
    title: 'Coffee Mulondo Brand Social Campaign',
    clientName: 'Coffee Mulondo Co.',
    category: 'Video',
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    ],
    summary: 'Created visual content and short-form reels for a local specialty coffee roastery to promote their single-origin roast across Instagram and WhatsApp business catalogs.',
    whatIDid: [
      'Storyboarding & shot listing for 6 short-form reels',
      'Smartphone product photography with natural morning lighting',
      'Mobile video editing with custom sound sync in CapCut',
      'WhatsApp catalog product cover graphics and price cards'
    ],
    tools: ['CapCut', 'Canva', 'Smartphone Camera (iPhone 13)', 'Lightroom Mobile'],
    outcome: 'Produced a cohesive 12-piece visual asset pack that increased WhatsApp direct orders by 35% in the first two weeks of launch.',
    featured: true,
    year: '2026'
  },
  {
    id: 'proj-2',
    creatorId: 'creator-mariam',
    creatorName: 'Mariam Nakanwagi',
    creatorAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
    creatorLocation: 'Masaka, Uganda',
    creatorRole: 'Graphic & Brand Designer',
    title: 'Ssanje Bites Product Packaging & Identity',
    clientName: 'Ssanje Artisanal Foods',
    category: 'Branding',
    coverImage: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=800&q=80'
    ],
    summary: 'Designed vibrant modern packaging pouches and sticker labels for a Masaka-based dried fruit and roasted snack producer.',
    whatIDid: [
      'Visual brand identity including wordmark and color palette',
      'Pouch packaging layout with mandatory nutritional labeling',
      'Print-ready artwork files formatted for local printers',
      'Promotional launch flyers for retail kiosks'
    ],
    tools: ['Canva Pro', 'Adobe Illustrator', 'Figma'],
    outcome: 'Enabled Ssanje Bites to secure shelf space in 4 major supermarkets across Greater Masaka with professional packaging.',
    featured: true,
    year: '2026'
  },
  {
    id: 'proj-3',
    creatorId: 'creator-sharon',
    creatorName: 'Sharon Atim',
    creatorAvatar: 'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?auto=format&fit=crop&w=600&q=80',
    creatorLocation: 'Kampala, Uganda',
    creatorRole: 'Social Media Creator',
    title: 'Local Roots Café TikTok & Reels Campaign',
    clientName: 'Local Roots Café Kampala',
    category: 'Social Media',
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80'
    ],
    summary: 'Orchestrated a 3-week hyper-local TikTok content series highlighting behind-the-scenes barista stories and signature brunch meals.',
    whatIDid: [
      'Content calendar creation and trend forecasting',
      'On-site filming of 8 trending format videos',
      'Engaging caption writing and local hashtag optimization',
      'Community management and response handling during peak lunch hours'
    ],
    tools: ['TikTok Studio', 'CapCut', 'Meta Business Suite'],
    outcome: 'Grew TikTok follower base from 400 to 5,200+ with over 140,000 organic views and a noticeable surge in weekend foot traffic.',
    featured: true,
    year: '2026'
  },
  {
    id: 'proj-4',
    creatorId: 'creator-diana',
    creatorName: 'Diana Akello',
    creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    creatorLocation: 'Gulu, Uganda',
    creatorRole: 'Commercial Photographer',
    title: 'Mirembe Fashion Lookbook & Product Shoot',
    clientName: 'Mirembe Apparel',
    category: 'Photography',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80'
    ],
    summary: 'Captured high-contrast studio and outdoor lifestyle lookbook photography for a contemporary East African linen and cotton clothing line.',
    whatIDid: [
      'Model direction and moodboard curation',
      'Natural light lifestyle photography in urban settings',
      'Color grading and skin retouching in Lightroom',
      'E-commerce transparent cutout preparation for website'
    ],
    tools: ['Sony Alpha Mirrorless', 'Lightroom Classic', 'Canva'],
    outcome: 'Delivered 45 finished e-commerce images and 15 editorial hero images used on the brand’s website and digital press releases.',
    featured: true,
    year: '2026'
  },
  {
    id: 'proj-5',
    creatorId: 'creator-brenda',
    creatorName: 'Brenda Nakato',
    creatorAvatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80',
    creatorLocation: 'Rakai, Uganda',
    creatorRole: 'E-commerce & Catalog Specialist',
    title: 'Kampala Fresh WhatsApp Store & Inventory Setup',
    clientName: 'Kampala Fresh Groceries',
    category: 'E-commerce',
    coverImage: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
    ],
    summary: 'Configured an end-to-end digital sales channel using WhatsApp Business, product photography, price tiers, and automated order intake messages.',
    whatIDid: [
      'Digitized 60+ fresh farm and household grocery SKUs',
      'Shot clean product thumbnail photos against neutral backdrops',
      'Configured automated quick replies and business greeting scripts',
      'Trained store manager on handling incoming payment proofs'
    ],
    tools: ['WhatsApp Business API', 'Canva', 'Google Sheets'],
    outcome: 'Streamlined order taking from 15 minutes per customer to under 2 minutes, processing over 120 weekly repeat basket deliveries.',
    featured: false,
    year: '2026'
  },
  {
    id: 'proj-6',
    creatorId: 'creator-emmanuel',
    creatorName: 'Emmanuel Kigozi',
    creatorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    creatorLocation: 'Entebbe, Uganda',
    creatorRole: 'Video Editor & Motion Designer',
    title: 'Sanje Coffee Cooperative Impact Documentary Reel',
    clientName: 'Sanje Coffee Cooperative',
    category: 'Video',
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80'
    ],
    summary: 'Edited a cinematic 90-second farmer spotlight video and 4 social clips capturing the harvesting and sorting process at the coffee mill.',
    whatIDid: [
      'Audio leveling, sound design, and Swahili/Luganda subtitle styling',
      'Dynamic speed ramps and color correction',
      'Motion graphic lower thirds and data overlays'
    ],
    tools: ['CapCut Pro', 'Premiere Pro', 'Audacity'],
    outcome: 'Featured at the East Africa Agri-Exposition, driving new export inquiries from regional buyers.',
    featured: false,
    year: '2026'
  }
];

export const INITIAL_CREATORS: Creator[] = [
  {
    id: 'creator-aisha',
    slug: 'aisha-namukasa',
    name: 'Aisha Namukasa',
    title: 'Digital Content Creator',
    location: 'Kyotera, Uganda',
    country: 'Uganda',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'I help small businesses and brands tell their authentic stories through simple, engaging mobile video and vibrant photography. Specializing in food, agribusiness, and retail content that drives actual customer inquiries.',
    shortBio: 'I help small businesses tell their stories through simple, engaging video and photography.',
    available: true,
    trainingBadge: {
      type: 'somesa',
      label: 'SOMESA-trained',
      description: 'Completed SOMESA Digital Media & Practical Creative Production track.',
      year: '2026'
    },
    skills: ['Video Production', 'Smartphone Photography', 'Social Media Content', 'CapCut', 'Reels / TikTok'],
    primaryCategory: 'Video',
    services: [
      {
        name: 'Short-Form Video Production',
        description: '3–5 polished vertical videos for TikTok, Instagram Reels, or WhatsApp status with sound design & captions.',
        typicalTurnaround: '2–3 days',
        startingRate: 'UGX 150,000 / $40',
        category: 'Video'
      },
      {
        name: 'Product & Lifestyle Photography',
        description: 'High-resolution smartphone and camera photography highlighting your products in natural, appealing settings.',
        typicalTurnaround: '1–2 days',
        startingRate: 'UGX 100,000 / $28',
        category: 'Photography'
      },
      {
        name: 'Social Media Asset Pack',
        description: 'Complete weekly bundle with 5 graphic posts, 2 video reels, and ready-to-post captions.',
        typicalTurnaround: '3–4 days',
        startingRate: 'UGX 250,000 / $65',
        category: 'Social Media'
      }
    ],
    projects: [INITIAL_PROJECTS[0]],
    experience: [
      {
        role: 'Graduate - Digital Media & Content Track',
        organization: 'SOMESA Digital Skills Programme',
        year: '2026',
        description: 'Trained in commercial mobile cinematography, brand storytelling, and client project delivery.'
      },
      {
        role: 'Freelance Content Creator',
        organization: 'Kyotera Local Business Collaborations',
        year: '2026',
        description: 'Delivered visual branding and video campaigns for 12+ local retail and hospitality clients.'
      }
    ],
    tools: ['CapCut', 'Canva', 'Lightroom Mobile', 'Instagram', 'TikTok', 'WhatsApp Business'],
    socialLinks: {
      whatsapp: '+256 700 123456',
      instagram: '@aisha_creates.ug',
      tiktok: '@aishanamukasa'
    },
    metrics: {
      completedProjects: 6,
      satisfiedClients: 12,
      rating: 4.9
    },
    featured: true
  },
  {
    id: 'creator-mariam',
    slug: 'mariam-nakanwagi',
    name: 'Mariam Nakanwagi',
    title: 'Graphic & Brand Designer',
    location: 'Masaka, Uganda',
    country: 'Uganda',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
    bio: 'Visual designer passionate about creating crisp, memorable brand identities, product packaging labels, and marketing collateral for ambitious African entrepreneurs and growing enterprises.',
    shortBio: 'Visual brand designer crafting distinct logos, packaging stickers, and digital marketing materials.',
    available: true,
    trainingBadge: {
      type: 'somesa',
      label: 'SOMESA-trained',
      description: 'Completed SOMESA Graphic Design & Visual Identity certification.',
      year: '2026'
    },
    skills: ['Canva Pro', 'Branding & Identity', 'Packaging Design', 'Posters & Flyers', 'Social Graphics'],
    primaryCategory: 'Graphic Design',
    services: [
      {
        name: 'Brand Identity Starter Kit',
        description: 'Custom primary logo, submark, brand color palette, font pairings, and usage guidelines sheet.',
        typicalTurnaround: '4–5 days',
        startingRate: 'UGX 200,000 / $55',
        category: 'Branding'
      },
      {
        name: 'Product Label & Packaging Artwork',
        description: 'Print-ready labels for bottles, jars, pouches, or boxes tailored to local packaging printers.',
        typicalTurnaround: '3 days',
        startingRate: 'UGX 120,000 / $32',
        category: 'Graphic Design'
      },
      {
        name: 'Promotional Marketing Materials',
        description: 'Eye-catching flyers, event banners, price lists, and social media promo cards.',
        typicalTurnaround: '2 days',
        startingRate: 'UGX 80,000 / $22',
        category: 'Graphic Design'
      }
    ],
    projects: [INITIAL_PROJECTS[1]],
    experience: [
      {
        role: 'Design Track Graduate',
        organization: 'SOMESA Digital Skills Programme',
        year: '2026',
        description: 'Comprehensive training in typography, packaging layouts, and digital branding tools.'
      },
      {
        role: 'Brand Designer',
        organization: 'Masaka Creative Studio',
        year: '2025–2026',
        description: 'Created print and digital assets for regional agricultural and food brands.'
      }
    ],
    tools: ['Canva Pro', 'Adobe Illustrator', 'Figma', 'Photoshop'],
    socialLinks: {
      whatsapp: '+256 750 987654',
      instagram: '@mariamdesigns.ug',
      linkedin: 'mariam-nakanwagi-design'
    },
    metrics: {
      completedProjects: 8,
      satisfiedClients: 15,
      rating: 5.0
    },
    featured: false
  },
  {
    id: 'creator-sharon',
    slug: 'sharon-atim',
    name: 'Sharon Atim',
    title: 'Social Media Creator & Strategist',
    location: 'Kampala, Uganda',
    country: 'Uganda',
    avatar: 'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?auto=format&fit=crop&w=600&q=80',
    bio: 'Dynamic social media storyteller and trend strategist who knows how to captivate Ugandan and East African audiences. Helping businesses turn casual viewers into loyal repeat paying customers.',
    shortBio: 'Engaging content creator turning everyday business moments into viral TikToks and customer trust.',
    available: true,
    trainingBadge: {
      type: 'somesa',
      label: 'SOMESA-trained',
      description: 'Completed SOMESA Social Media Strategy & Growth certification.',
      year: '2026'
    },
    skills: ['TikTok Growth', 'Reels Strategy', 'Community Management', 'Content Calendars', 'Influencer Collabs'],
    primaryCategory: 'Social Media',
    services: [
      {
        name: 'Monthly Social Media Management',
        description: '12 posts + 6 video reels per month, custom captions, comment replies, and monthly analytics reporting.',
        typicalTurnaround: 'Monthly Retainer',
        startingRate: 'UGX 450,000 / $120',
        category: 'Social Media'
      },
      {
        name: 'Viral TikTok Content Batch',
        description: 'Filming, editing, and scripting 5 viral-format TikTok videos tailored to your business niche.',
        typicalTurnaround: '3 days',
        startingRate: 'UGX 180,000 / $48',
        category: 'Social Media'
      }
    ],
    projects: [INITIAL_PROJECTS[2]],
    experience: [
      {
        role: 'Social Media Graduate',
        organization: 'SOMESA Digital Skills Programme',
        year: '2026',
        description: 'Advanced community growth, short-form storytelling, and performance tracking.'
      }
    ],
    tools: ['TikTok Studio', 'CapCut', 'Meta Business Suite', 'Canva', 'Notion'],
    socialLinks: {
      whatsapp: '+256 772 345678',
      tiktok: '@sharonatim_ug',
      instagram: '@sharonatim_content'
    },
    metrics: {
      completedProjects: 9,
      satisfiedClients: 14,
      rating: 4.8
    },
    featured: false
  },
  {
    id: 'creator-diana',
    slug: 'diana-akello',
    name: 'Diana Akello',
    title: 'Commercial & Portrait Photographer',
    location: 'Gulu, Uganda',
    country: 'Uganda',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: 'Passionate visual photographer specializing in high-grade product photography, corporate team headshots, fashion lookbooks, and documentary event coverage across Northern and Central Uganda.',
    shortBio: 'Commercial photographer capturing vibrant product textures, professional portraits, and events.',
    available: true,
    trainingBadge: {
      type: 'somesa',
      label: 'SOMESA-trained',
      description: 'Completed SOMESA Photography & Visual Storytelling masterclass.',
      year: '2026'
    },
    skills: ['Product Photography', 'Studio Portraits', 'Event Coverage', 'Lightroom Grading', 'Visual Storytelling'],
    primaryCategory: 'Photography',
    services: [
      {
        name: 'Product Photography Catalog Shoot',
        description: 'Up to 20 products shot on clean white/textured backgrounds, color-graded and sized for web and social.',
        typicalTurnaround: '2–3 days',
        startingRate: 'UGX 200,000 / $55',
        category: 'Photography'
      },
      {
        name: 'Executive & Team Portraits',
        description: 'Professional headshots for leadership, founders, and team members with soft studio lighting.',
        typicalTurnaround: '2 days',
        startingRate: 'UGX 150,000 / $40',
        category: 'Photography'
      }
    ],
    projects: [INITIAL_PROJECTS[3]],
    experience: [
      {
        role: 'Lead Photographer',
        organization: 'Gulu Visuals Hub',
        year: '2025–2026',
        description: 'Documented cultural festivals, youth entrepreneurship showcases, and commercial fashion shoots.'
      }
    ],
    tools: ['Sony Alpha', 'Lightroom Classic', 'Capture One', 'Canva'],
    socialLinks: {
      whatsapp: '+256 701 445566',
      instagram: '@dianaakello.photo'
    },
    metrics: {
      completedProjects: 7,
      satisfiedClients: 11,
      rating: 4.9
    },
    featured: false
  },
  {
    id: 'creator-brenda',
    slug: 'brenda-nakato',
    name: 'Brenda Nakato',
    title: 'E-commerce & WhatsApp Catalog Specialist',
    location: 'Rakai, Uganda',
    country: 'Uganda',
    avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80',
    bio: 'I help physical stores and micro-enterprises launch streamlined WhatsApp stores, digital product catalogs, and Instagram shopping setups that make ordering simple and quick for customers.',
    shortBio: 'Helping retail shops and producers turn their inventory into quick-ordering WhatsApp catalogs.',
    available: true,
    trainingBadge: {
      type: 'somesa',
      label: 'SOMESA-trained',
      description: 'Completed SOMESA Digital Commerce & E-commerce Operations track.',
      year: '2026'
    },
    skills: ['WhatsApp Business', 'Product Cataloging', 'Mobile Payment Setup', 'Order Workflow Design', 'Shopify Basics'],
    primaryCategory: 'E-commerce',
    services: [
      {
        name: 'WhatsApp Store Complete Setup',
        description: 'Full catalog setup for up to 30 items with clear photos, descriptions, price tags, and auto-responder setup.',
        typicalTurnaround: '2 days',
        startingRate: 'UGX 120,000 / $32',
        category: 'E-commerce'
      },
      {
        name: 'Digital Order Management Sheet',
        description: 'Simple mobile-friendly Google Sheet tracker for orders, payments, and delivery driver dispatches.',
        typicalTurnaround: '1 day',
        startingRate: 'UGX 80,000 / $22',
        category: 'E-commerce'
      }
    ],
    projects: [INITIAL_PROJECTS[4]],
    experience: [
      {
        role: 'E-commerce Track Graduate',
        organization: 'SOMESA Digital Skills Programme',
        year: '2026',
        description: 'Specialized in conversational commerce, micro-logistics, and digital inventory workflows.'
      }
    ],
    tools: ['WhatsApp Business API', 'Canva', 'Google Workspace', 'Shopify'],
    socialLinks: {
      whatsapp: '+256 788 990011',
      linkedin: 'brenda-nakato-ecommerce'
    },
    metrics: {
      completedProjects: 5,
      satisfiedClients: 8,
      rating: 4.9
    },
    featured: false
  },
  {
    id: 'creator-emmanuel',
    slug: 'emmanuel-kigozi',
    name: 'Emmanuel Kigozi',
    title: 'Video Editor & Motion Designer',
    location: 'Entebbe, Uganda',
    country: 'Uganda',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    bio: 'Fast, creative video editor focused on punchy cuts, audio mixing, lower thirds, and social-first video storytelling for brands, creators, and documentary initiatives.',
    shortBio: 'Editor creating cinematic short-form reels, documentary cutdowns, and branded video animations.',
    available: true,
    trainingBadge: {
      type: 'somesa',
      label: 'SOMESA-trained',
      description: 'Completed SOMESA Video Editing & Audio Craft certification.',
      year: '2026'
    },
    skills: ['CapCut Pro', 'Premiere Pro', 'Sound Design', 'Motion Graphics', 'Color Correction'],
    primaryCategory: 'Video',
    services: [
      {
        name: 'Video Reel Polish & Editing',
        description: 'Transform your raw footage into 3 high-impact reels with sound effects, captions, and color touch-ups.',
        typicalTurnaround: '24–48 hours',
        startingRate: 'UGX 100,000 / $28',
        category: 'Video'
      },
      {
        name: 'Brand Promo Video (60–90 sec)',
        description: 'Complete commercial edit with licensed background music, logo animated sting, and dynamic subtitles.',
        typicalTurnaround: '3 days',
        startingRate: 'UGX 220,000 / $60',
        category: 'Video'
      }
    ],
    projects: [INITIAL_PROJECTS[5]],
    experience: [
      {
        role: 'Video Editing Fellow',
        organization: 'SOMESA Creative Lab',
        year: '2026',
        description: 'Post-production training with emphasis on pacing, narrative retention, and mobile export standards.'
      }
    ],
    tools: ['CapCut Pro', 'Adobe Premiere Pro', 'After Effects', 'Audacity'],
    socialLinks: {
      whatsapp: '+256 702 334455',
      instagram: '@kigozi_edits'
    },
    metrics: {
      completedProjects: 8,
      satisfiedClients: 13,
      rating: 4.8
    },
    featured: false
  },
  {
    id: 'creator-patricia',
    slug: 'patricia-namutebi',
    name: 'Patricia Namutebi',
    title: 'Brand Strategist & Copywriter',
    location: 'Jinja, Uganda',
    country: 'Uganda',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    bio: 'Crafting resonant brand messaging, tagline concepts, WhatsApp promotional broadcasts, and website copy that connects directly with modern African consumers.',
    shortBio: 'Words and strategy that give local brands a clear, memorable, and professional voice.',
    available: false,
    trainingBadge: {
      type: 'somesa',
      label: 'SOMESA-trained',
      description: 'Completed SOMESA Brand Strategy & Content Writing track.',
      year: '2026'
    },
    skills: ['Brand Storytelling', 'Copywriting', 'WhatsApp Copy', 'Pitch Decks', 'Content Strategy'],
    primaryCategory: 'Marketing',
    services: [
      {
        name: 'Brand Messaging & Tagline Blueprint',
        description: 'Core brand story, value propositions, elevator pitch, and 5 distinct marketing angles.',
        typicalTurnaround: '3 days',
        startingRate: 'UGX 160,000 / $44',
        category: 'Marketing'
      }
    ],
    projects: [],
    experience: [
      {
        role: 'Digital Communications Associate',
        organization: 'Jinja Eco Tourism Venture',
        year: '2025–2026',
        description: 'Wrote website copy and quarterly newsletter updates.'
      }
    ],
    tools: ['Notion', 'Google Docs', 'Canva', 'ChatGPT'],
    socialLinks: {
      whatsapp: '+256 755 667788',
      linkedin: 'patricia-namutebi-copy'
    },
    metrics: {
      completedProjects: 4,
      satisfiedClients: 6,
      rating: 5.0
    },
    featured: false
  },
  {
    id: 'creator-harriet',
    slug: 'harriet-namatovu',
    name: 'Harriet Namatovu',
    title: 'Master Organic Soap & Candle Artisan',
    location: 'Kyotera, Uganda',
    country: 'Uganda',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
    bio: 'Crafting premium cold-process herbal soaps, moringa shampoo bars, and scented soy candles. I supply retail boutiques and also conduct practical on-site group workshops for women’s savings groups.',
    shortBio: 'Handmade organic soaps, scented candles, and practical artisan soap-making trainer.',
    available: true,
    trainingBadge: {
      type: 'somesa',
      label: 'SOMESA-trained',
      description: 'Certified in Artisan Manufacturing, Safe Formulation & Brand Packaging.',
      year: '2026'
    },
    skills: ['Cold-Process Soap Making', 'Soy Candle Pouring', 'Natural Essential Oils', 'Product Packaging', 'Hands-on Workshop Facilitation'],
    primaryCategory: 'Artisan Crafts & Soaps',
    services: [
      {
        name: 'Artisan Soap & Candle Workshop (On-Site)',
        description: 'Half-day practical training for up to 10 women on formulation, curing, safety, and packaging.',
        typicalTurnaround: '1 day session',
        startingRate: 'UGX 200,000 / $55',
        category: 'Artisan Crafts & Soaps'
      },
      {
        name: 'Custom Wholesale Batch (50+ Bars / Jars)',
        description: 'Custom formulated organic soaps or candles branded with your boutique or lodge logo.',
        typicalTurnaround: '7–10 days',
        startingRate: 'UGX 150,000 / $40',
        category: 'Artisan Crafts & Soaps'
      }
    ],
    projects: [
      {
        id: 'proj-soap-1',
        creatorId: 'creator-harriet',
        creatorName: 'Harriet Namatovu',
        creatorAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
        creatorLocation: 'Kyotera, Uganda',
        creatorRole: 'Master Soap & Candle Artisan',
        title: 'Nabugabo Eco-Lodge Custom Shea & Lemongrass Soap Line',
        clientName: 'Nabugabo Eco-Lodge',
        category: 'Artisan Crafts & Soaps',
        coverImage: 'https://images.unsplash.com/photo-1607006314644-88574620f49c?auto=format&fit=crop&w=1000&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80'
        ],
        summary: 'Formulated and crafted 200 handmade botanical soap bars infused with Ugandan shea butter and organic lemongrass for guest welcome hampers.',
        whatIDid: [
          'Raw ingredient sourcing and organic batch formulation',
          'Hand-pouring, botanical swirl layering, and 4-week temperature-controlled curing',
          'Kraft paper wrap and wax seal stamping with lodge branding'
        ],
        tools: ['Cold-Process Soap Equipment', 'Custom Wood Molds', 'Natural Botanical Extracts'],
        outcome: 'Delivered a zero-chemical luxury amenity line that reduced the lodge’s imported soap costs by 40% while supporting local agriculture.',
        featured: true,
        year: '2026'
      }
    ],
    experience: [
      {
        role: 'Founder & Head Crafter',
        organization: 'Kyotera Natural Botanicals',
        year: '2024–2026',
        description: 'Manufactured and retailed over 4,000 herbal soap bars and 800 hand-poured soy candles.'
      }
    ],
    tools: ['Digital Weighing Scales', 'Silicone Soap Molds', 'Wax Melting Pots', 'Canva Label Templates'],
    socialLinks: {
      whatsapp: '+256 703 112244',
      instagram: '@kyotera_soaps'
    },
    metrics: {
      completedProjects: 9,
      satisfiedClients: 15,
      rating: 5.0
    },
    featured: true
  },
  {
    id: 'creator-proscovia',
    slug: 'proscovia-nalubega',
    name: 'Proscovia Nalubega',
    title: 'Coffee Aggregator & Agribusiness Quality Lead',
    location: 'Masaka, Uganda',
    country: 'Uganda',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialist in coffee cherry sourcing, moisture-controlled drying, quality defect grading, and smallholder farmer recordkeeping. I help cooperatives and roasters source high-yield specialty Robusta & Arabica.',
    shortBio: 'Coffee cherry aggregation, moisture meter grading, and farmer cooperative bookkeeping.',
    available: true,
    trainingBadge: {
      type: 'somesa',
      label: 'SOMESA-trained',
      description: 'Certified in Agricultural Aggregation, Post-Harvest Quality & Digital Farm Ledger.',
      year: '2026'
    },
    skills: ['Coffee Cherry Floating & Grading', 'Moisture Meter Testing (12%)', 'Raised Drying Bed Management', 'Digital Farm Accounting', 'Farmer Network Management'],
    primaryCategory: 'Agribusiness & Farm Management',
    services: [
      {
        name: 'Harvest Quality Audit & Moisture Certification',
        description: 'On-site testing of coffee drying beds, moisture levels, defect screening, and lot segregation.',
        typicalTurnaround: '1–2 days',
        startingRate: 'UGX 180,000 / $48',
        category: 'Agribusiness & Farm Management'
      },
      {
        name: 'Smallholder Group Aggregation & Farm Ledger',
        description: 'Organizing 20–50 outgrowers, setting up digital delivery logbooks and transparent MoMo payout schedules.',
        typicalTurnaround: '3–5 days',
        startingRate: 'UGX 250,000 / $65',
        category: 'Agribusiness & Farm Management'
      }
    ],
    projects: [
      {
        id: 'proj-coffee-1',
        creatorId: 'creator-proscovia',
        creatorName: 'Proscovia Nalubega',
        creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        creatorLocation: 'Masaka, Uganda',
        creatorRole: 'Coffee Aggregator & Agribusiness Lead',
        title: 'Greater Masaka 40-Farmer Robusta Premium Harvest Batch',
        clientName: 'Buddu Valley Roasters',
        category: 'Agribusiness & Farm Management',
        coverImage: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80'
        ],
        summary: 'Aggregated 12 tons of ripe red cherries across 40 outgrowers, managing strict shade drying on raised beds to achieve consistent 12.5% moisture with zero mould contamination.',
        whatIDid: [
          'Cherry float sorting and farmer training on ripe cherry selective picking',
          'Daily moisture meter logging and solar tarp aeration schedules',
          'Digital batch tracking on Google Sheets linked to direct mobile money disbursements'
        ],
        tools: ['Grain Moisture Meter', 'Solar Tarpaulins', 'Mobile Farm Ledger'],
        outcome: 'Achieved 98% Grade-A export qualification, earning farmers a 22% price premium over standard farmgate broker rates.',
        featured: true,
        year: '2026'
      }
    ],
    experience: [
      {
        role: 'Field Quality Coordinator',
        organization: 'Masaka Organic Coffee Growers Union',
        year: '2024–2026',
        description: 'Supervised 12 drying depots and managed quality verification protocols.'
      }
    ],
    tools: ['Dickey-John Moisture Meter', 'Google Workspace', 'WhatsApp Group Broadcasts'],
    socialLinks: {
      whatsapp: '+256 771 990088'
    },
    metrics: {
      completedProjects: 11,
      satisfiedClients: 19,
      rating: 4.9
    },
    featured: true
  },
  {
    id: 'creator-zulaika',
    slug: 'zulaika-kavuma',
    name: 'Zulaika Kavuma',
    title: 'AI Prompt Engineer & Digital Automation Specialist',
    location: 'Kampala, Uganda',
    country: 'Uganda',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
    bio: 'I help local businesses and artisans leverage AI for photorealistic product staging, automated WhatsApp customer support replies, and bilingual marketing campaigns in English and Luganda.',
    shortBio: 'AI image generation, WhatsApp AI assistants, and automated bilingual copywriting.',
    available: true,
    trainingBadge: {
      type: 'somesa',
      label: 'SOMESA-trained',
      description: 'Completed Advanced AI Prompting, Visual Staging & Workflow Automation.',
      year: '2026'
    },
    skills: ['AI Product Staging', 'Canva Magic Studio', 'Bilingual AI Copywriting', 'WhatsApp Bot Workflows', 'Midjourney & Image Gen'],
    primaryCategory: 'AI Tools & Automation',
    services: [
      {
        name: 'AI Product Photo Staging Pack (10 Scenes)',
        description: 'We take simple phone photos of your products and generate 10 studio/lifestyle ad scenes using AI tools.',
        typicalTurnaround: '24 hours',
        startingRate: 'UGX 120,000 / $32',
        category: 'AI Tools & Automation'
      },
      {
        name: 'WhatsApp Business Auto-Response Flow',
        description: 'Complete script, FAQ auto-responder, and payment intake prompts tailored for your customers.',
        typicalTurnaround: '1–2 days',
        startingRate: 'UGX 100,000 / $28',
        category: 'AI Tools & Automation'
      }
    ],
    projects: [
      {
        id: 'proj-ai-1',
        creatorId: 'creator-zulaika',
        creatorName: 'Zulaika Kavuma',
        creatorAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
        creatorLocation: 'Kampala, Uganda',
        creatorRole: 'AI Prompt Engineer & Designer',
        title: 'Kampala Soy Candles AI Lifestyle Ad Campaign',
        clientName: 'Mirembe Glow Candles',
        category: 'AI Tools & Automation',
        coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1607006314644-88574620f49c?auto=format&fit=crop&w=800&q=80'
        ],
        summary: 'Generated 15 photorealistic African boutique hotel and spa scenes placing client’s handmade candles without booking an expensive studio.',
        whatIDid: [
          'Product cutout cleaning and depth-map extraction',
          'Prompt engineering for warm African interior lighting and textures',
          'Bilingual Luganda & English social ad captions with call-to-actions'
        ],
        tools: ['Midjourney', 'Canva Magic Studio', 'ChatGPT / Gemini Studio', 'Lightroom Mobile'],
        outcome: 'Generated 3.4x higher Instagram engagement on ads and saved the client over UGX 800,000 in venue rental costs.',
        featured: true,
        year: '2026'
      }
    ],
    experience: [
      {
        role: 'AI Media Specialist',
        organization: 'SOMESA Innovation Lab',
        year: '2025–2026',
        description: 'Trained creators and SMEs on practical AI workflows for product marketing.'
      }
    ],
    tools: ['Gemini 2.5', 'Canva AI', 'Midjourney', 'Photoshop', 'Meta Ads'],
    socialLinks: {
      whatsapp: '+256 705 443322',
      instagram: '@zulaika.ai'
    },
    metrics: {
      completedProjects: 8,
      satisfiedClients: 14,
      rating: 5.0
    },
    featured: true
  }
];

export const INITIAL_REQUESTS: HireRequest[] = [
  {
    id: 'req-1',
    creatorId: 'creator-aisha',
    creatorName: 'Aisha Namukasa',
    clientName: 'David Ssemwogerere',
    organization: 'Masaka Organic Honey',
    phone: '+256 701 889900',
    email: 'david@masakahoney.ug',
    serviceNeeded: 'Video',
    projectDescription: 'Need 4 short video reels showing our beekeeping hives and new honey bottle sizes for TikTok & Instagram.',
    budget: 'UGX 300,000',
    timeline: 'This week',
    createdAt: '2 hours ago',
    status: 'Pending'
  },
  {
    id: 'req-2',
    creatorId: 'creator-mariam',
    creatorName: 'Mariam Nakanwagi',
    clientName: 'Grace Katende',
    organization: 'Kyotera Bakery & Confectionery',
    phone: '+256 772 112233',
    email: 'grace@kyoterabakery.com',
    serviceNeeded: 'Branding',
    projectDescription: 'We are launching birthday cake boxes and need custom sticker designs and cake menu price cards.',
    budget: 'UGX 180,000',
    timeline: 'As soon as possible',
    createdAt: '1 day ago',
    status: 'In Progress'
  },
  {
    id: 'req-3',
    creatorId: 'creator-sharon',
    creatorName: 'Sharon Atim',
    clientName: 'Julian Birungi',
    organization: 'Urban Roots Kampala Boutique',
    phone: '+256 754 998877',
    serviceNeeded: 'Social Media',
    projectDescription: 'Looking for someone to manage our TikTok account for the upcoming festive fashion sale.',
    budget: 'UGX 450,000 / month',
    timeline: 'This month',
    createdAt: '2 days ago',
    status: 'Contacted'
  }
];

export const CATEGORIES = [
  'All',
  'Video',
  'Photography',
  'Graphic Design',
  'Social Media',
  'Marketing',
  'E-commerce',
  'Branding',
  'Artisan Crafts & Soaps',
  'Agribusiness & Farm Management',
  'AI Tools & Automation'
] as const;

export const SERVICES_LIST = [
  {
    id: 'serv-video',
    name: 'Video',
    icon: '🎥',
    tagline: 'Short-form video, product videos, event content and editing.',
    details: 'From viral TikTok trends and reels to product demonstrations and event recaps, discover video creators with mobile cinema and editing skills.',
    category: 'Video' as const,
    creatorCount: 4,
    popularFor: ['Product Reels', 'TikTok Campaigns', 'Event Cutdowns', 'Tutorials']
  },
  {
    id: 'serv-crafts',
    name: 'Artisan Crafts & Soaps',
    icon: '🌿',
    tagline: 'Organic cold-process soaps, scented candles, and physical workshop tutors.',
    details: 'Connect with certified female artisans manufacturing pure botanical soaps, natural candles, and booking practical group training workshops.',
    category: 'Artisan Crafts & Soaps' as const,
    creatorCount: 3,
    popularFor: ['Organic Soaps', 'Soy Candles', 'On-Site Workshops', 'Custom Amenities']
  },
  {
    id: 'serv-agri',
    name: 'Agribusiness & Farm Quality',
    icon: '☕',
    tagline: 'Coffee cherry aggregation, moisture meter grading, and farmer ledger management.',
    details: 'Experienced agricultural coordinators helping cooperatives, mills, and roasters source high-yield specialty coffee with strict moisture controls.',
    category: 'Agribusiness & Farm Management' as const,
    creatorCount: 3,
    popularFor: ['Coffee Sourcing', 'Moisture Grading', 'Raised Bed Drying', 'Farmer Ledgers']
  },
  {
    id: 'serv-ai',
    name: 'AI Tools & Automation',
    icon: '🤖',
    tagline: 'AI product staging, Canva AI ad mockups, and WhatsApp auto-responders.',
    details: 'Accelerate your marketing with AI: generate lifestyle backgrounds for your products and automate customer replies in English and Luganda.',
    category: 'AI Tools & Automation' as const,
    creatorCount: 2,
    popularFor: ['Product AI Staging', 'Canva Magic Studio', 'WhatsApp Bots', 'Bilingual Copy']
  },
  {
    id: 'serv-photo',
    name: 'Photography',
    icon: '📸',
    tagline: 'Product photography, portraits, events and social media content.',
    details: 'Crisp, authentic imagery that makes your physical goods look irresistible and your team look confident and approachable.',
    category: 'Photography' as const,
    creatorCount: 3,
    popularFor: ['Product Shoots', 'Lookbooks', 'Team Headshots', 'Food Styling']
  },
  {
    id: 'serv-design',
    name: 'Design',
    icon: '🎨',
    tagline: 'Posters, social media graphics, packaging and brand materials.',
    details: 'Modern packaging stickers, promotional flyers, price menus, and marketing collateral ready for digital screens and local printers.',
    category: 'Graphic Design' as const,
    creatorCount: 5,
    popularFor: ['Packaging Labels', 'Social Graphics', 'Flyers & Posters', 'Price Menus']
  },
  {
    id: 'serv-social',
    name: 'Social Media',
    icon: '📱',
    tagline: 'Content creation, TikTok, Instagram and Facebook management.',
    details: 'Turn casual social browsers into real customers with consistent posting, high-engagement trends, and local community interaction.',
    category: 'Social Media' as const,
    creatorCount: 4,
    popularFor: ['Account Management', 'TikTok Strategy', 'Content Calendars', 'Bio Links']
  },
  {
    id: 'serv-ecom',
    name: 'E-commerce',
    icon: '🛒',
    tagline: 'Product listings, WhatsApp catalogues and online selling support.',
    details: 'Set up WhatsApp Business catalogs, tidy up product inventories, and enable effortless ordering directly through chat apps.',
    category: 'E-commerce' as const,
    creatorCount: 3,
    popularFor: ['WhatsApp Catalogs', 'Inventory Digitize', 'Shopify Store', 'Price Lists']
  },
  {
    id: 'serv-branding',
    name: 'Branding',
    icon: '✨',
    tagline: 'Logos, visual identity and simple brand systems.',
    details: 'Stand out from competitors with unique logos, consistent typography, color palettes, and professional guidelines you can apply anywhere.',
    category: 'Branding' as const,
    creatorCount: 4,
    popularFor: ['Logo Design', 'Brand Guidelines', 'Color Palettes', 'Typography']
  }
];

export const LOCATIONS_LIST = [
  'All Locations',
  'Kyotera, Uganda',
  'Masaka, Uganda',
  'Kampala, Uganda',
  'Rakai, Uganda',
  'Gulu, Uganda',
  'Entebbe, Uganda',
  'Jinja, Uganda'
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-capcut-101',
    created_at: '2026-02-15T10:00:00Z',
    instructor_id: 'creator-aisha',
    instructor_name: 'Aisha Namukasa',
    instructor_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    instructor_title: 'Digital Content Creator & CapCut Specialist',
    instructor_slug: 'aisha-namukasa',
    instructor_location: 'Kyotera, Uganda',
    title: 'Making Product Videos on CapCut',
    title_luganda: "Okukola Vidiyo z'Ebyagula ku CapCut",
    slug: 'making-product-videos-capcut',
    description: 'Learn how to film crisp smartphone product videos and edit dynamic short-form reels on CapCut with sync audio, smooth transitions, and price text in Luganda.',
    category: 'CapCut Video',
    thumbnail_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
    price_ugx: 5000,
    is_all_access: true,
    duration_minutes: 42,
    level: 'Beginner',
    language: 'Luganda (with simple English terms)',
    status: 'published',
    rating: 4.9,
    total_students: 148,
    featured: true,
    whatYouWillLearn: [
      'Setting up natural lighting for your shop items',
      'Shooting 3 angles that make products look irresistible',
      'Importing and trimming clips on mobile CapCut',
      'Adding trending background music and Luganda voiceover',
      'Exporting at high resolution without watermarks'
    ],
    requirements: [
      'Any smartphone with a working camera',
      'CapCut Mobile app installed (Free version is 100% fine)'
    ],
    lessons: [
      {
        id: 'les-cap-1',
        course_id: 'course-capcut-101',
        title: 'Lesson 1: Setting Up Your Smartphone Light & Angles',
        duration_minutes: 8,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        order_index: 1,
        is_free_preview: true,
        summary: 'Enteekateeka y’ettaala n’engeri y’okukwata kamera (How to hold your phone and position morning window light for clarity).'
      },
      {
        id: 'les-cap-2',
        course_id: 'course-capcut-101',
        title: 'Lesson 2: Trimming & Cutting Clips in CapCut Mobile',
        duration_minutes: 11,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        order_index: 2,
        is_free_preview: false,
        summary: 'Okusalako vidiyo n’okukwataganya obutundu obw’enjawulo mu bwangu.'
      },
      {
        id: 'les-cap-3',
        course_id: 'course-capcut-101',
        title: 'Lesson 3: Adding Smooth Transitions & Product Beat Sync',
        duration_minutes: 12,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        order_index: 3,
        is_free_preview: false,
        summary: 'Okuteekamu enkyukakyuka (transitions) n’emiziki egikwatagana n’obutundu bwa vidiyo.'
      },
      {
        id: 'les-cap-4',
        course_id: 'course-capcut-101',
        title: 'Lesson 4: Adding Price Badges, WhatsApp CTA & Exporting',
        duration_minutes: 11,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        order_index: 4,
        is_free_preview: false,
        summary: 'Okuteekako ebiwandiiko eby’ebbeeyi n’ennamba ya WhatsApp okulagira abaguzi gyebakubira.'
      }
    ],
    resources: [
      {
        id: 'res-cap-1',
        title: 'CapCut Mobile 10-Step Editing Cheatsheet',
        title_luganda: 'Ekiwandiiko Ekifunze: Emitendera 10 Egy’Okutereeza Vidiyo',
        description: 'Printable 2-page quick reference card covering timeline shortcuts, speed ramps, audio ducking, and bitrates.',
        type: 'pdf',
        file_size: '1.4 MB PDF',
        download_url: '/assets/resources/capcut-10step-cheatsheet.pdf',
        preview_image_url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
        lesson_id: 'les-cap-2',
        lesson_title: 'Lesson 2: Trimming & Cutting Clips in CapCut Mobile',
        tags: ['CapCut', 'Video Editing', 'Shortcuts', 'Luganda/English'],
        content_preview: [
          'Step 1: Always lock auto-exposure on product before recording.',
          'Step 2: Use 0.7s - 1.2s cuts for modern short-form TikTok pacing.',
          'Step 3: Beat-sync transitions to bass drops in your background track.',
          'Step 4: Export at 1080p, 30fps, Bitrate: Recommended for WhatsApp/IG.'
        ]
      },
      {
        id: 'res-cap-2',
        title: 'Ugandan Price Tag & MoMo Video Overlay Badges Pack',
        title_luganda: 'Ebipande bya MoMo n’Ebbeeyi Eby’okuteeka ku Vidiyo (PNG)',
        description: 'Set of 12 transparent high-resolution PNG badges: "UGX Price Tag", "MTN MoMo Accepted", "Airtel Money", "Free Delivery in Masaka/Kampala".',
        type: 'image',
        file_size: '3.8 MB ZIP / PNG',
        download_url: '/assets/resources/uganda-momo-price-badges.zip',
        preview_image_url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
        lesson_id: 'les-cap-4',
        lesson_title: 'Lesson 4: Adding Price Badges, WhatsApp CTA & Exporting',
        tags: ['Overlays', 'PNG Badges', 'MoMo', 'Call To Action'],
        content_preview: [
          'Includes 12 transparent PNG assets',
          'Ready to import as CapCut "Overlay" layer',
          'Clean vector styling with high contrast on dark & light clips'
        ]
      },
      {
        id: 'res-cap-3',
        title: '3-Point Natural Light & Product Framing Angle Diagram',
        title_luganda: 'Enteekateeka y’Ettaala n’Ensonda z’Essimu (Infographic)',
        description: 'Visual visual diagrams showing window position, 45-degree angle setup, and how to eliminate phone shadows on physical products.',
        type: 'guide',
        file_size: '2.1 MB PDF',
        download_url: '/assets/resources/lighting-framing-diagram.pdf',
        preview_image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
        lesson_id: 'les-cap-1',
        lesson_title: 'Lesson 1: Setting Up Your Smartphone Light & Angles',
        tags: ['Lighting', 'Framing', 'Smartphone', 'Angles'],
        content_preview: [
          'Diagram A: Window light at 90 degrees with DIY cardboard reflector.',
          'Diagram B: Top-down flatlay framing for soaps, coffee, and crafts.',
          'Diagram C: 45-degree hero shot with soft bokeh focus.'
        ]
      }
    ]
  },
  {
    id: 'course-canva-branding',
    created_at: '2026-02-18T14:30:00Z',
    instructor_id: 'creator-mariam',
    instructor_name: 'Mariam Nakanwagi',
    instructor_avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
    instructor_title: 'Graphic & Brand Identity Designer',
    instructor_slug: 'mariam-nakanwagi',
    instructor_location: 'Masaka, Uganda',
    title: 'Designing Shop Posters & Packaging on Canva',
    title_luganda: "Okukola Ebipande n'Obupapula bw'Ebyagula mu Canva",
    slug: 'designing-posters-packaging-canva',
    description: 'Master Canva mobile to design beautiful product stickers, price menus, WhatsApp flyers, and shop promotional posters without needing a computer.',
    category: 'Canva Design',
    thumbnail_url: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1000&q=80',
    price_ugx: 5000,
    is_all_access: true,
    duration_minutes: 48,
    level: 'Beginner',
    language: 'Luganda (with simple English terms)',
    status: 'published',
    rating: 5.0,
    total_students: 112,
    featured: true,
    whatYouWillLearn: [
      'Choosing the right flyer template for your industry',
      'Picking harmonious colors that match your brand',
      'Removing image backgrounds effortlessly',
      'Preparing print-ready sticker files for local printing hubs'
    ],
    requirements: [
      'Smartphone with Canva app installed',
      'Internet connection to browse templates'
    ],
    lessons: [
      {
        id: 'les-can-1',
        course_id: 'course-canva-branding',
        title: 'Lesson 1: Canva App Setup & Choosing Templates (Free Preview)',
        duration_minutes: 10,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        order_index: 1,
        is_free_preview: true,
        summary: 'Enteekateeka ya Canva n’engeri y’okulondamu ebipande ebisaanidde dduuka lyo.'
      },
      {
        id: 'les-can-2',
        course_id: 'course-canva-branding',
        title: 'Lesson 2: Typography, Colors & Product Placement',
        duration_minutes: 14,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        order_index: 2,
        is_free_preview: false,
        summary: 'Enkozesa y’amabala n’ennukuta ezisikiriza abaguzi ku mikutu gya yintaneti.'
      },
      {
        id: 'les-can-3',
        course_id: 'course-canva-branding',
        title: 'Lesson 3: Packaging Sticker Labels & Print Output Settings',
        duration_minutes: 12,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        order_index: 3,
        is_free_preview: false,
        summary: 'Engeri y’okuteekateeka ebiwandiiko ebigenda okukubibwa ku bupapula (Print PDF).'
      },
      {
        id: 'les-can-4',
        course_id: 'course-canva-branding',
        title: 'Lesson 4: Social Media Flyers for Daily WhatsApp Status',
        duration_minutes: 12,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        order_index: 4,
        is_free_preview: false,
        summary: 'Okukola ebipande bya WhatsApp Status ebya buli lunaku ebyangu okusoma.'
      }
    ],
    resources: [
      {
        id: 'res-can-1',
        title: 'Uganda Print-Ready Sticker & Poster Sizing Cheatsheet',
        title_luganda: 'Ebipimo by’Obupapula n’Ebipande mu Kampala ne Masaka',
        description: 'Standard dimensions (5x5cm jar stickers, A4 posters, A6 flyer cards) with bleed and CMYK PDF export settings for local print presses.',
        type: 'pdf',
        file_size: '1.9 MB PDF',
        download_url: '/assets/resources/canva-print-sizing-cheatsheet.pdf',
        preview_image_url: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80',
        lesson_id: 'les-can-3',
        lesson_title: 'Lesson 3: Packaging Sticker Labels & Print Output Settings',
        tags: ['Print Settings', 'Sticker Sizes', 'Bleed & Margin', 'PDF Export'],
        content_preview: [
          '50mm x 50mm: Round Soap & Candle Jar sticker guidelines.',
          '70mm x 120mm: Coffee & Honey pouch front label specs.',
          'A4 (210 x 297mm): Shopfront promotional poster resolution setup.',
          'Export instruction: PDF Print with Crop Marks & Bleed enabled.'
        ]
      },
      {
        id: 'res-can-2',
        title: 'Artisan Brand Color Palettes & Luganda Font Pairing Guide',
        title_luganda: 'Amabala n’Ennukuta Ezisaana Bizinesi za Wano',
        description: '10 carefully curated East African color swatches (Earthy Ochre, Forest Nile, Masaka Sun) paired with free Google fonts available in Canva.',
        type: 'guide',
        file_size: '2.5 MB PDF',
        download_url: '/assets/resources/brand-color-font-guide.pdf',
        preview_image_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80',
        lesson_id: 'les-can-2',
        lesson_title: 'Lesson 2: Typography, Colors & Product Placement',
        tags: ['Color Palettes', 'Typography', 'Branding', 'Design'],
        content_preview: [
          'Palette 1: Nile Forest (Deep Pine #0A2E24 + Tangerine #FF6321).',
          'Palette 2: Savannah Gold (Warm Ochre #C28E0E + Sand #F5F2ED).',
          'Palette 3: Buddu Berry (Wild Cranberry #881337 + Cream #FEF3C7).'
        ]
      },
      {
        id: 'res-can-3',
        title: 'Canva 5-in-1 Daily WhatsApp Status Flyer Templates',
        title_luganda: 'Ebipande 5 Eby’amangu ebya WhatsApp Status (Template Pack)',
        description: 'Pre-designed flyer templates: "Flash Sale 20% Off", "Fresh Stock Arrived", "Customer Review", "Weekend Delivery Schedule", "Menu Special".',
        type: 'template',
        file_size: '4.2 MB ZIP / Assets',
        download_url: '/assets/resources/canva-status-templates.zip',
        preview_image_url: 'https://images.unsplash.com/photo-1512290900672-1f4a47895055?auto=format&fit=crop&w=600&q=80',
        lesson_id: 'les-can-4',
        lesson_title: 'Lesson 4: Social Media Flyers for Daily WhatsApp Status',
        tags: ['Flyers', 'WhatsApp Status', 'Templates', 'Canva'],
        content_preview: [
          'Includes 5 ready-to-edit canvas layout files',
          'Editable text placeholders for UGX prices and shop locations',
          'Mobile 9:16 vertical ratio optimized for WhatsApp Status & IG Stories'
        ]
      }
    ]
  },
  {
    id: 'course-whatsapp-business',
    created_at: '2026-02-20T08:15:00Z',
    instructor_id: 'creator-brenda',
    instructor_name: 'Brenda Nakato',
    instructor_avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80',
    instructor_title: 'E-commerce & WhatsApp Specialist',
    instructor_slug: 'brenda-nakato',
    instructor_location: 'Rakai, Uganda',
    title: 'Setting Up WhatsApp Business Catalogues & Quick Replies',
    title_luganda: "Enteekateeka ya WhatsApp Business Catalogues n'Okutunda",
    slug: 'whatsapp-business-catalogues-sales',
    description: 'Transform WhatsApp into an automated online storefront. Upload clean product photos, set transparent price tiers, configure instant greeting messages, and organize customer orders.',
    category: 'WhatsApp Business',
    thumbnail_url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=80',
    price_ugx: 5000,
    is_all_access: true,
    duration_minutes: 36,
    level: 'Beginner',
    language: 'Luganda (with simple English terms)',
    status: 'published',
    rating: 4.8,
    total_students: 195,
    featured: true,
    whatYouWillLearn: [
      'Migrating safely from personal WhatsApp to WhatsApp Business',
      'Uploading and grouping items into easy-to-browse collections',
      'Creating quick reply shortcuts (e.g. /price, /location, /momo)',
      'Labeling chats: New Order, Paid, Dispatched'
    ],
    requirements: [
      'A dedicated SIM number for your business',
      'WhatsApp Business app downloaded from Play Store/App Store'
    ],
    lessons: [
      {
        id: 'les-wa-1',
        course_id: 'course-whatsapp-business',
        title: 'Lesson 1: Business Profile Setup & Verification (Free Preview)',
        duration_minutes: 9,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        order_index: 1,
        is_free_preview: true,
        summary: 'Enteekateeka y’erinnya ly’edduuka, obudde obw’okukola, n’ekifo weriri.'
      },
      {
        id: 'les-wa-2',
        course_id: 'course-whatsapp-business',
        title: 'Lesson 2: Catalog Photography & Price Structuring',
        duration_minutes: 10,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        order_index: 2,
        is_free_preview: false,
        summary: 'Okuteeka ebifaananyi by’ebyamaguzi n’ebbeeyi ezitegeerekeka mu kataloogi.'
      },
      {
        id: 'les-wa-3',
        course_id: 'course-whatsapp-business',
        title: 'Lesson 3: Automated Greeting, Away Messages & Quick Replies',
        duration_minutes: 9,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        order_index: 3,
        is_free_preview: false,
        summary: 'Engeri WhatsApp gy’eramuzaamu abantu obutereevu bwe bakugoberera.'
      },
      {
        id: 'les-wa-4',
        course_id: 'course-whatsapp-business',
        title: 'Lesson 4: Order Management, Customer Labels & MoMo Verification',
        duration_minutes: 8,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        order_index: 4,
        is_free_preview: false,
        summary: 'Okuteeka obubonero (Labels) ku bakasitoma abasasudde n’abakyalinda okutuusibwako.'
      }
    ],
    resources: [
      {
        id: 'res-wa-1',
        title: '25 High-Converting Luganda & English Quick Reply Scripts',
        title_luganda: 'Ebyokuddamu ebyangu 25 (Quick Replies) ebya WhatsApp',
        description: 'Ready-to-paste shortcut messages for order inquiries, price confirmations, payment instructions, delivery follow-ups, and polite reviews.',
        type: 'pdf',
        file_size: '1.2 MB PDF',
        download_url: '/assets/resources/whatsapp-quick-reply-scripts.pdf',
        preview_image_url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
        lesson_id: 'les-wa-3',
        lesson_title: 'Lesson 3: Automated Greeting, Away Messages & Quick Replies',
        tags: ['Quick Replies', 'Customer Service', 'Scripts', 'Luganda'],
        content_preview: [
          '/momo: "Tusaba osasule ku MTN MoMo Pay: *165*3*Code# erinnya ly\'edduuka [SHOP NAME]."',
          '/delivery: "Tutuusa ebyamaguzi mu Masaka, Kyotera ne Kampala buli Lwakusatu ne Lwamukaaga."',
          '/confirm: "Owekitibwa [NAME], tufunye ssente zo. Ebyamaguzi byo tubiteeseteese okukutuusibwako."'
        ]
      },
      {
        id: 'res-wa-2',
        title: 'Daily Customer Order & Mobile Money Payment Tracker',
        title_luganda: 'Ekiwandiiko ky’Okubala Ebyatundiddwa n’Okusasula (Printable Ledger)',
        description: 'Printable A4 daily log sheet + link to Google Sheets tracker with columns for Order ID, Client Phone, Items, MoMo Ref Code, and Delivery Boda Rider.',
        type: 'template',
        file_size: '1.6 MB PDF / Sheet',
        download_url: '/assets/resources/daily-order-momo-ledger.pdf',
        preview_image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
        lesson_id: 'les-wa-4',
        lesson_title: 'Lesson 4: Order Management, Customer Labels & MoMo Verification',
        tags: ['Order Tracker', 'Ledger', 'MoMo', 'Accounting'],
        content_preview: [
          'Section 1: Daily Order Queue & Client Contact Details',
          'Section 2: Mobile Money Transaction ID verification column',
          'Section 3: Delivery rider dispatch confirmation & client signature slot'
        ]
      },
      {
        id: 'res-wa-3',
        title: 'WhatsApp Catalog Category Header Badges Pack',
        title_luganda: 'Ebifaananyi bya Kataloogi ya WhatsApp (PNG Badges)',
        description: '8 square category covers styled for WhatsApp collections: "Bestsellers", "New Arrivals", "Organic Soaps", "Gift Boxes", "Special Offers".',
        type: 'image',
        file_size: '2.9 MB ZIP / PNG',
        download_url: '/assets/resources/whatsapp-catalog-covers.zip',
        preview_image_url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80',
        lesson_id: 'les-wa-2',
        lesson_title: 'Lesson 2: Catalog Photography & Price Structuring',
        tags: ['Catalog', 'Covers', 'WhatsApp Business', 'Icons'],
        content_preview: [
          'High resolution 1080x1080px square cards',
          'Compatible with WhatsApp Business Collection covers',
          'Clean botanical and modern artisan styling'
        ]
      }
    ]
  },
  {
    id: 'course-photo-lighting',
    created_at: '2026-02-21T11:00:00Z',
    instructor_id: 'creator-diana',
    instructor_name: 'Diana Akello',
    instructor_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    instructor_title: 'Commercial & Product Photographer',
    instructor_slug: 'diana-akello',
    instructor_location: 'Gulu, Uganda',
    title: 'Smartphone Product Photography with Natural Light',
    title_luganda: "Okukwata Ebifaananyi by'Ebyagula n'Essimu yo",
    slug: 'smartphone-product-photography-natural-light',
    description: 'Learn how to take clean, high-clarity product photos using affordable backdrops, window light, and mobile Lightroom editing.',
    category: 'Smartphone Photography',
    thumbnail_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    price_ugx: 5000,
    is_all_access: true,
    duration_minutes: 38,
    level: 'Beginner',
    language: 'Luganda (with simple English terms)',
    status: 'published',
    rating: 4.9,
    total_students: 86,
    featured: false,
    whatYouWillLearn: [
      'Creating a DIY reflector with white cardboard or styrofoam',
      'Using phone gridlines and focus locks for crisp details',
      'Basic color grading on free Lightroom mobile',
      'Removing clutter from background shots'
    ],
    requirements: [
      'Any smartphone with a clean camera lens',
      'A piece of white cardboard or clean tablecloth'
    ],
    lessons: [
      {
        id: 'les-pho-1',
        course_id: 'course-photo-lighting',
        title: 'Lesson 1: Cleaning Lens & Framing Basics (Free Preview)',
        duration_minutes: 8,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        order_index: 1,
        is_free_preview: true,
        summary: 'Engeri y’okuyonjaamu lens y’essimu n’okulungamya ekifaananyi obutanyukuta.'
      },
      {
        id: 'les-pho-2',
        course_id: 'course-photo-lighting',
        title: 'Lesson 2: DIY Reflectors & Window Lighting',
        duration_minutes: 10,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        order_index: 2,
        is_free_preview: false,
        summary: 'Okukozesa ebipande ebyeru okuggyawo ebisiikirize ku kintu kyo ky’okwata.'
      },
      {
        id: 'les-pho-3',
        course_id: 'course-photo-lighting',
        title: 'Lesson 3: Lightroom Mobile: Enhancing Colors & Sharpness',
        duration_minutes: 11,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        order_index: 3,
        is_free_preview: false,
        summary: 'Okutereeza amabala mu Lightroom essimu erage obulungi bw’ekintu ky’otunda.'
      },
      {
        id: 'les-pho-4',
        course_id: 'course-photo-lighting',
        title: 'Lesson 4: Square Crop & E-commerce Ready Export',
        duration_minutes: 9,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        order_index: 4,
        is_free_preview: false,
        summary: 'Okusalamu ekifaananyi mu sayizi eyanjulukuka ku WhatsApp ne webusaiti.'
      }
    ],
    resources: [
      {
        id: 'res-pho-1',
        title: 'DIY Reflector & Tabletop Window Setup Cheatsheet',
        title_luganda: 'Enteekateeka y’Ettaala Ey’oku Ddirisa n’Ebipande Ebyeru',
        description: 'Step-by-step visual positioning guide showing distances, cardboard angles, and diffused morning light hours (7:30am - 10:30am).',
        type: 'pdf',
        file_size: '1.7 MB PDF',
        download_url: '/assets/resources/diy-reflector-lighting-guide.pdf',
        preview_image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
        lesson_id: 'les-pho-2',
        lesson_title: 'Lesson 2: DIY Reflectors & Window Lighting',
        tags: ['Window Light', 'DIY Reflector', 'Product Photography', 'Lighting'],
        content_preview: [
          'Best lighting times: 7:30 AM – 10:30 AM or 4:00 PM – 6:00 PM.',
          'Position product 45cm away from direct sunlight patch.',
          'Angle white styrofoam board on the opposite side to bounce light into shadows.'
        ]
      },
      {
        id: 'res-pho-2',
        title: 'Lightroom Mobile Free Presets & Color Values Sheet',
        title_luganda: 'Ebipimo by’Amabala mu Lightroom Mobile (Preset Cheat Card)',
        description: 'Exact numeric values for Exposure, Contrast, Shadows (+25), Clarity (+12), and Warmth adjustments to make artisan goods pop.',
        type: 'guide',
        file_size: '1.3 MB PDF',
        download_url: '/assets/resources/lightroom-mobile-color-values.pdf',
        preview_image_url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80',
        lesson_id: 'les-pho-3',
        lesson_title: 'Lesson 3: Lightroom Mobile: Enhancing Colors & Sharpness',
        tags: ['Lightroom', 'Presets', 'Color Grading', 'Mobile'],
        content_preview: [
          'Natural Warmth: Temp +4, Tint +2 for rich African skin & wooden crafts.',
          'Vibrant Textiles: Vibrance +18, Saturation +4, Clarity +10.',
          'Sharpening: Amount 35, Radius 1.0, Masking 60 for clean edges without noise.'
        ]
      }
    ]
  },
  {
    id: 'course-tiktok-growth',
    created_at: '2026-02-22T09:45:00Z',
    instructor_id: 'creator-sharon',
    instructor_name: 'Sharon Atim',
    instructor_avatar: 'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?auto=format&fit=crop&w=600&q=80',
    instructor_title: 'Social Media & Growth Strategist',
    instructor_slug: 'sharon-atim',
    instructor_location: 'Kampala, Uganda',
    title: 'TikTok for Ugandan Shops & Cafés',
    title_luganda: "Okukozesa TikTok Okufuna Abaguzi mu Uganda",
    slug: 'tiktok-ugandan-shops-cafes',
    description: 'Learn how to create authentic behind-the-scenes videos on TikTok, use local trending sounds, and convert viral viewers into real paying customers.',
    category: 'TikTok Strategy',
    thumbnail_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    price_ugx: 5000,
    is_all_access: true,
    duration_minutes: 40,
    level: 'Intermediate',
    language: 'Luganda (with simple English terms)',
    status: 'published',
    rating: 4.9,
    total_students: 134,
    featured: false,
    whatYouWillLearn: [
      'Understanding the Ugandan TikTok algorithm in 2026',
      'The 3-second hook rule that prevents users from scrolling past',
      'Adding phone numbers and shop location in your bio',
      'Responding to comments with short follow-up videos'
    ],
    requirements: [
      'TikTok app installed with a Creator or Business account'
    ],
    lessons: [
      {
        id: 'les-tik-1',
        course_id: 'course-tiktok-growth',
        title: 'Lesson 1: Profile Setup & Ugandan Trends (Free Preview)',
        duration_minutes: 9,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        order_index: 1,
        is_free_preview: true,
        summary: 'Enteekateeka ya TikTok Profile n’engeri y’okukolamu vidiyo ezisaana obutonde bwa wano.'
      },
      {
        id: 'les-tik-2',
        course_id: 'course-tiktok-growth',
        title: 'Lesson 2: The 3-Second Hook Rule in Luganda',
        duration_minutes: 11,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        order_index: 2,
        is_free_preview: false,
        summary: 'Engeri y’okusikirizaamu omuntu okumala emisekundiro 3 egisooka aleme kusukako.'
      },
      {
        id: 'les-tik-3',
        course_id: 'course-tiktok-growth',
        title: 'Lesson 3: Behind-The-Scenes Content Ideas for Small Shops',
        duration_minutes: 10,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        order_index: 3,
        is_free_preview: false,
        summary: 'Ebirowoozo bya vidiyo: engoli y’okupakinga, okwogera n’abakozi, n’ensonga lwaki otunda.'
      },
      {
        id: 'les-tik-4',
        course_id: 'course-tiktok-growth',
        title: 'Lesson 4: Turning Views into WhatsApp Orders',
        duration_minutes: 10,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        order_index: 4,
        is_free_preview: false,
        summary: 'Engeri y’okukyusaamu abalaba vidiyo okugenda ku WhatsApp ne bagula ebintu byo.'
      }
    ],
    resources: [
      {
        id: 'res-tik-1',
        title: '30 Viral Luganda & English 3-Second Hook Formulas',
        title_luganda: 'Ebigambo 30 Ebisikiriza Abalabi ku TikTok mu Misekondiro 3',
        description: 'Battle-tested opening phrases that stop viewers in their tracks: "Ekyama kye tutatambula nakyo...", "Don\'t buy soap before checking this...", etc.',
        type: 'pdf',
        file_size: '1.5 MB PDF',
        download_url: '/assets/resources/tiktok-3second-hooks-luganda.pdf',
        preview_image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
        lesson_id: 'les-tik-2',
        lesson_title: 'Lesson 2: The 3-Second Hook Rule in Luganda',
        tags: ['Hooks', 'TikTok Script', 'Viral', 'Luganda'],
        content_preview: [
          'Hook #1: "Lwaki abantu bangi basasula ssente enyingi ku [ITEM] ate nga wano..."',
          'Hook #2: "Tofaayo kugula [PRODUCT] nga tonnalaba vidiyo eno!",',
          'Hook #3: "Watch how we pack 50 customer orders in Masaka today..."'
        ]
      },
      {
        id: 'res-tik-2',
        title: '30-Day Small Shop Video Content Calendar Template',
        title_luganda: 'Enteekateeka y’Ennaku 30 Ez’okukolamu Vidiyo (Content Calendar)',
        description: 'Structured day-by-day filming prompts for retail stores: Monday (Behind the scenes), Wednesday (Product Demo), Friday (Customer review), Weekend (Restock announcement).',
        type: 'template',
        file_size: '2.0 MB PDF',
        download_url: '/assets/resources/30day-video-content-calendar.pdf',
        preview_image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
        lesson_id: 'les-tik-3',
        lesson_title: 'Lesson 3: Behind-The-Scenes Content Ideas for Small Shops',
        tags: ['Content Calendar', 'Planning', 'Retail', 'Social Media'],
        content_preview: [
          'Week 1: Focus on origin story and raw materials sourcing.',
          'Week 2: Showcase manufacturing steps and hygiene / packaging.',
          'Week 3: Address top 5 customer questions directly on camera.',
          'Week 4: Flash promotions and VIP customer shoutouts.'
        ]
      }
    ]
  }
];

export const INITIAL_TUTOR_REQUESTS: TutorRequest[] = [
  {
    id: 'tut-1',
    created_at: '2026-02-25T08:30:00Z',
    requester_name: 'Dr. Joseph Mukwaya',
    business_name: 'Kyotera Community Clinic & Pharmacy',
    phone: '+256 701 445566',
    location: 'Kyotera Main Road, Kyotera Town',
    skill_topic: 'WhatsApp Business & Health Tips Reels',
    preferred_date: '2026-03-02',
    notes: 'We want 2 of our receptionists to learn how to manage WhatsApp orders and create weekly health tip graphics on Canva.',
    assigned_tutor_id: 'creator-aisha',
    assigned_tutor_name: 'Aisha Namukasa',
    status: 'Tutor Assigned'
  },
  {
    id: 'tut-2',
    created_at: '2026-02-24T14:15:00Z',
    requester_name: 'Grace Nakimbugwe',
    business_name: 'Nabugabo Fresh Fish & Grill',
    phone: '+256 772 889900',
    location: 'Masaka Town, Elgin Street',
    skill_topic: 'Smartphone Photography & Menu Posters',
    preferred_date: '2026-03-04',
    notes: 'Need someone to visit on a Wednesday morning to teach our cook how to take juicy photos of our fresh tilapia platters for Facebook.',
    assigned_tutor_id: 'creator-mariam',
    assigned_tutor_name: 'Mariam Nakanwagi',
    status: 'New'
  },
  {
    id: 'tut-3',
    created_at: '2026-02-23T11:00:00Z',
    requester_name: 'Ssalongo Patrick Kityo',
    business_name: 'Kityo Coffee Millers & Agro Stores',
    phone: '+256 750 334411',
    location: 'Kalisizo Town, Greater Masaka',
    skill_topic: 'CapCut Video & WhatsApp Catalogues',
    preferred_date: '2026-02-28',
    notes: 'We have lots of farmers visiting our depot and want to create short testimonial videos to build trust with buyer cooperatives in Kampala.',
    assigned_tutor_id: 'creator-brenda',
    assigned_tutor_name: 'Brenda Nakato',
    status: 'Completed'
  }
];

