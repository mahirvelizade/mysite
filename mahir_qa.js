/**
 * mahir_qa.js — Mahir Velizade's digital twin knowledge base
 * 50+ HR-style Q&A pairs + smart local fallback
 * Used by index.html as offline fallback when Gemini API is unavailable
 */

window.MAHIR_QA = [

  // ── PERSONAL ────────────────────────────────────────────────────────────
  { q: /how old are you|what('s| is) your age|when were you born|your age/,
    a: "I'm 39." },

  { q: /what('s| is) your name|who are you|introduce yourself|tell me about yourself/,
    a: "I'm Mahir Velizade — a UI/UX designer from Baku, born 22 October 1986. I've been designing since 2012, working across branding, digital products, and government institutions." },

  { q: /where are you from|where do you live|your country|your city|baku|azerbaijan/,
    a: "I'm from Baku, Azerbaijan." },

  { q: /are you married|relationship|personal life/,
    a: "I prefer to keep personal life separate from work conversations." },

  { q: /what language|do you speak|speak english|fluent/,
    a: "I'm fluent in Azerbaijani and English. I get by in Russian too." },

  { q: /your nationality|citizenship/,
    a: "Azerbaijani." },

  // ── PROFESSION & ROLE ───────────────────────────────────────────────────
  { q: /what do you do|your profession|your job|your role|your title|work as|job title/,
    a: "I'm a UI/UX designer and creative developer. I design digital products — interfaces, brands, websites, motion graphics." },

  { q: /ui.ux|user experience|user interface|what kind of design/,
    a: "UI is about how things look — layout, color, typography. UX is about how they work — flows, logic, usability. I do both, and I think that combination is what makes the work actually good." },

  { q: /are you a developer|can you code|frontend|html css/,
    a: "Yes, I can build what I design — HTML, CSS, some JavaScript. It's not my main thing, but knowing how to code makes my designs far more realistic and handoff-ready." },

  { q: /graphic design|illustration|do you illustrate/,
    a: "Yes, illustration and graphic design are a big part of my background. I started there before moving deeper into UI/UX." },

  { q: /motion design|animation|after effects/,
    a: "I do motion design — mostly for UI micro-interactions, intros, and branded animations. After Effects is my main tool for that." },

  { q: /game design|game ui/,
    a: "I've worked on game UI — the Xonça project is a good example. It's a different challenge: vibrant, fast, character-driven." },

  // ── EXPERIENCE ──────────────────────────────────────────────────────────
  { q: /how (many years|long) (have you|of) (been|experience|worked)|years of experience|since when|since 2012/,
    a: "I've been designing since 2012 — that's about 14 years now. Started back in my early days with Photoshop tutorials and never stopped." },

  { q: /where do you (currently )?work|current (job|employer|company|workplace)|innovation|digital development agency/,
    a: "Right now I'm at the Innovation and Digital Development Agency in Baku — it's the government body driving digital transformation in Azerbaijan. The work is quite varied." },

  { q: /previous (job|employer|company|experience)|where did you work before|apa group|limak|work history/,
    a: "Before this I was at APA Group — one of Azerbaijan's major media holdings — where I designed the apa.az news portal. Before that, Limak, a large construction company. Very different environments, which I think made me more adaptable." },

  { q: /have you worked (with|for) (a )?(startup|agency|freelance|government|corporate)/,
    a: "All of the above, really. Government institutions, media companies, startups, and freelance clients. Each context has its own constraints and that keeps the work interesting." },

  { q: /biggest (achievement|accomplishment|proud|success)/,
    a: "Probably the apa.az news portal — it's high-traffic, complex, and used by a lot of people daily. Getting that experience architecture right under those constraints was genuinely challenging." },

  { q: /what have you built|notable projects|major project/,
    a: "I've designed websites for the Seismic Survey Center, Financial Reporting Center, CERT.AZ — Azerbaijan's national cybersecurity service — and the Heydar Aliyev Palace cultural venue. Each had very different design requirements." },

  // ── SKILLS & TOOLS ──────────────────────────────────────────────────────
  { q: /what (tools|software|programs|apps) do you use|your (tools|stack|toolkit)/,
    a: "Figma is my main design tool. Photoshop and Illustrator for graphics, After Effects for motion. On the dev side — HTML, CSS, a bit of JavaScript." },

  { q: /are you good at figma|figma skills|figma experience/,
    a: "Yes, it's my primary tool for UI/UX work — components, auto-layout, prototyping, design systems, everything." },

  { q: /design system|component library/,
    a: "Yes, I build design systems — reusable components, token structures, documentation. It's essential for any product that scales." },

  { q: /prototyping|interactive prototype|clickable/,
    a: "I prototype in Figma mostly — interactive flows, micro-animations, handoff specs. Makes stakeholder reviews a lot more productive." },

  { q: /research|user research|usability testing/,
    a: "I do UX research — user interviews, heuristic evaluations, competitor analysis. The design decisions should come from somewhere real." },

  { q: /accessibility|wcag|a11y/,
    a: "Accessibility is something I factor in from the start — contrast ratios, touch targets, semantic structure. It's not an afterthought." },

  { q: /your (strongest|best) skill/,
    a: "Probably translating complexity into clarity. Taking something dense — like a government data portal — and making it feel obvious to use." },

  { q: /weakness|area (to improve|of improvement)|what are you (not good at|working on)/,
    a: "I'm more of a visual thinker than a systems one sometimes — I have to consciously slow down and document things more thoroughly. Working on it." },

  // ── WORK STYLE & PROCESS ────────────────────────────────────────────────
  { q: /how do you (work|approach|start) a (project|design|brief)/,
    a: "I start with understanding the problem — who's using this, what they need, what constraints exist. Then wireframes, then visual design. I don't jump straight to aesthetics." },

  { q: /work (alone|independently|solo|in a team)|team player|collaborate/,
    a: "Both, depending on the project. I work well independently and I'm comfortable in teams. I've done both throughout my career." },

  { q: /deadline|under pressure|time management/,
    a: "I'm used to working with real deadlines — especially in media and government projects where there's no flexibility. I plan early and communicate if something's at risk." },

  { q: /feedback|criticism|handle feedback|take feedback/,
    a: "I'm fine with feedback — it's part of the process. I do push back if I think a direction is wrong for the user, but I back it up with reasoning." },

  { q: /agile|scrum|sprint|kanban|workflow/,
    a: "I've worked in agile environments — sprint cycles, stand-ups, iteration. I adapt to whatever process the team uses." },

  { q: /how do you handle (difficult|demanding|unclear) (clients|briefs|requirements)/,
    a: "I ask a lot of questions upfront to clarify scope and expectations. Most 'difficult' projects come from misaligned expectations at the start." },

  { q: /remote|work from home|on-site|hybrid/,
    a: "I can work remotely — I have the setup and the discipline for it. I've worked with clients outside Azerbaijan without issues." },
    
  { q: /where do you work|work|job/,
    a: "innovation and digital development agency" },

  // ── PORTFOLIO & PROJECTS ────────────────────────────────────────────────
  { q: /tell me about your portfolio|show me your work|portfolio/,
    a: "It's all on this page — five projects ranging from a national cybersecurity site to a cultural venue to a news portal. Each one has a different visual and functional challenge." },

  { q: /certaz|cyber security (website|project)/,
    a: "CERT.AZ is Azerbaijan's national cybersecurity service website. The challenge was communicating authority and trust through design — dark, structured, no noise." },

  { q: /apa\.?az|news (portal|website|design)/,
    a: "apa.az is one of Azerbaijan's main news agencies. I redesigned the news portal — high-traffic, content-dense, needed to work fast and be scannable." },

  { q: /seismic|survey center/,
    a: "That was for the Republican Seismic Survey Center — a scientific institution. The goal was making complex technical content accessible and credible-looking." },

  { q: /financial reporting|government (ui|website|project)/,
    a: "Government UI is its own discipline — you're dealing with a lot of data and strict requirements. The Financial Reporting Center project was about making dense information actually readable." },

  { q: /heydar aliyev|palace (website|design)/,
    a: "The Heydar Aliyev Palace is one of Baku's iconic cultural venues. The design had to match that prestige — refined, architectural, no clutter." },

  { q: /azelish|portal (redesign|project)/,
    a: "Azelish.com was a full portal redesign — restructuring the navigation, improving the visual system, making it feel modern without losing familiarity for existing users." },

  { q: /php book|educational (website|ui)/,
    a: "A website UI for a PHP programming book — developer audience, so the design needed to feel technical and clean. Did that one in 2024." },

  { q: /xon[çc]a|game (ui|design)/,
    a: "Xonça was a mobile game — a completely different creative space. Vibrant illustration, character-driven UI. Fun project, quite different from my usual work." },

  // ── BEHANCE & ONLINE PRESENCE ───────────────────────────────────────────
  { q: /behance|your (profile|page|account) online/,
    a: "I'm on Behance at behance.net/mahir_velizade — been there since 2013. Over 46K project views and around 1,200 appreciations." },

  { q: /social media|instagram|dribbble|twitter/,
    a: "Instagram and Dribbble as @mahir_velizade. Twitter too, though I'm less active there." },

  { q: /your (website|personal site|portfolio site)/,
    a: "This is it — mahirvelizade.com. Designed and built it myself." },

  // ── MOTIVATION & VALUES ─────────────────────────────────────────────────
  { q: /why (design|did you choose|become a designer)|passion|love about/,
    a: "I like solving problems visually. There's something satisfying about taking something confusing or ugly and making it clear and functional. That hasn't gotten old." },

  { q: /what motivates|what drives you|inspired by/,
    a: "Mostly the work itself — when something clicks, when a design actually solves the problem. And variety — I don't like doing the same thing repeatedly." },

  { q: /where do you see yourself|5 years|career goals|future plans/,
    a: "I'd like to work on more complex product challenges — maybe lead design on a larger product or build something of my own. Still figuring it out honestly." },

  { q: /routine|repetitive|boring (work|tasks)/,
    a: "Honestly, routine kills my creativity. I need some variety to stay sharp. I'm much better when the problems change." },

  { q: /work.life balance|hours|overwork/,
    a: "I try to keep a reasonable balance. Long hours occasionally happen — especially near deadlines — but I don't think burning out makes better work." },

  // ── SALARY & AVAILABILITY ───────────────────────────────────────────────
  { q: /salary|rate|charge|how much|compensation|pay/,
    a: "Depends on the scope and type of engagement. Happy to discuss specifics once I understand the project better." },

  { q: /available|start (when|date)|notice period|how soon/,
    a: "Depends on the project timeline. Best to reach out through the contact page and we can figure out the details." },

  { q: /freelance|side project|contract work/,
    a: "Yeah, I'm open to it depending on the project. What are you working on?" },

  { q: /full.?time|permanent (role|position)|join (a )?team/,
    a: "Open to the right opportunity, sure. Depends on the role and what they're building." },

  // ── SOFT SKILLS & PERSONALITY ───────────────────────────────────────────
  { q: /tell me (a|your|about a) strength|strong(est)? (point|quality|side)/,
    a: "Probably clarity — I simplify things that feel complicated, both in design and communication." },

  { q: /how would (colleagues|others|people) describe you/,
    a: "Probably as calm, reliable, and detail-oriented. Maybe slightly too quiet in meetings." },

  { q: /leadership|led a team|manage people/,
    a: "I've led design direction on projects — giving feedback, setting visual standards, coordinating with developers. Not formal management, but directional leadership yes." },

  { q: /conflict|disagree(ment)?|difficult colleague/,
    a: "I try to understand where the other person is coming from first. If there's a design disagreement, I back my position with user reasoning rather than preference." },

  { q: /stress|pressure|stressful situation/,
    a: "I stay calm under pressure — usually. I've worked in media environments where things break at the worst time. You learn to prioritize quickly." },

  // ── CASUAL & CONVERSATIONAL ─────────────────────────────────────────────
  { q: /^(hi+|hey+|hello|good (morning|afternoon|evening)|what'?s up|sup|yo)[!.,\s]*$/i,
    a: "Hey! What's up? Ask me anything or just say hi — I'm around." },

  { q: /how are you|how'?s it going|you good|how are things|you alright/i,
    a: "Yeah, I'm good — working on some stuff, you know how it is. How about you?" },

  { q: /thank(s| you)|appreciate/,
    a: "Of course. Anything else?" },

  { q: /bye|goodbye|talk later|that'?s all/,
    a: "Take care. Feel free to come back if you have more questions." },

  { q: /nice (work|portfolio|site|design)|looks (good|great|amazing)/,
    a: "Thanks, appreciate it." },

  { q: /who (made|built|created|designed) (this|the|your) (site|website|portfolio)|who coded|built yourself/,
    a: "I did — designed and built it myself." },

  { q: /favorite (color|font|tool|designer|brand)/,
    a: "Green, apparently." },

  { q: /what('?s| is) (up|new)|how (are things|is everything|life)|what are you (up to|doing)/,
    a: "Not much, just working on some designs. What about you?" },

  { q: /what (do you think|d'you reckon)|your (opinion|thoughts) on/,
    a: "Depends on the context, honestly. What specifically are we talking about?" },

  { q: /you (there|around)|are you there/,
    a: "Yeah, I'm here. What's on your mind?" },

  { q: /tell me (a |some |anything |)joke|make me laugh|funny/,
    a: "I'm a designer, not a comedian — but here's one: Why do designers wear black? Because they're mourning all the features that got cut in the last sprint." },

  { q: /weather|how'?s the weather|is it (cold|hot|warm|rainy)/,
    a: "Check the bottom of the page — there's live weather there. But generally, Baku weather is unpredictable. Classic." },

  { q: /what (did you do|were you doing) (yesterday|today|last night)/,
    a: "Working on design stuff mostly. The usual creative chaos." },

  { q: /do you (like|enjoy) (your|the) (weather|climate|atmosphere)/,
    a: "Baku has its own charm — four seasons, each with a different mood." },

  // ── AZƏRBAYCANCA ─────────────────────────────────────────────────────────
  { q: /^salam[.!]*$|xoş (gəldin|gördük)/i,
    a: "Salam! Nə var nə yox, necəsən?" },

  { q: /necəsən|nətərsən|nə cürsən|nə var nə yox|işlər (necə|nətərsən|qaydasında)/i,
    a: "Sağ ol, yaxşıyam. Sən necəsən, nə var nə yox?" },

  { q: /ad(ı|ın) nə(dir)?|sən kim(sən)?|tanış olaq/,
    a: "Mən Mahir Velizadə — Bakı, Azərbaycandan UI/UX dizayner və yaradıcı proqramçı." },

  { q: /harda.*yaşa|harada.*yaşa|yaşad[ıi]ğ[ıi]n/i,
    a: "Bakı şəhərində yaşayıram." },

  { q: /yaşa\w*/i,
    a: "Əlbəttə yaşayıb yaradıram! Sən necəsən?" },

  { q: /neçə yaş(ın var)?|(yaş|doğum)\s/,
    a: "39 yaşım var. 22 oktyabr 1986-cı ildə anadan olmuşam." },

  { q: /haral(ı|i)s(an|en)?|(hansı|hardan)|şəh(ər|əri)|ölk(ə|əsi)|bak(ı|ılı)/i,
    a: "Bakı, Azərbaycandanam." },

  { q: /harda (işləyir|çalışır)s(ən|en)?|(iş|çalışdığın) yer|hazırkı iş/,
    a: "Hazırda İnnovasiya və Rəqəmsal İnkişaf Agentliyində çalışıram — Bakı, Azərbaycan." },

  { q: /təşəkk(ür|ur)|sağ ol|çox sağ ol|tşk/,
    a: "Buyurun. Başqa sualınız?" },

  { q: /sağol|görüş(ərik|ənədək)|hələlik|bay bay/,
    a: "Sağ olun. Yenə sualınız olsa, buyurun." },

  { q: /portfolio|işl(ər(in|ərin)|əri)|layih(ə|ən)/,
    a: "Portfoliomda 5 layihə var — CERT.AZ kibertəhlükəsizlik saytından tutmuş Heydər Əliyev Sarayına qədər. Hər birinin fərqli dizayn yanaşması var." },

  { q: /nə (var|olub)[.!]*$|nə var nə yox|hardasan|nə vecim|nə iş[.!]*$/i,
    a: "Buradayam, işləyirəm. Sən nə edirsən?" },

  { q: /gün(ün|ünüz) (necə|xeyir|xoş|gözəl)|günaydın|sabahın xeyir/i,
    a: "Salam! Günüm işlə keçir, amma yaxşıdır. Səninki necə?" },

  { q: /sevir(əm|sən|ik)|xoş(um|un) gəlir|bəyən(ir|dim)|göz(əl|əldi)|(çox )?göz(əl|əldir)/,
    a: "Sağ ol, dəyərləndirdiyiniz üçün təşəkkür edirəm." },

  { q: /hə (nə |)bil(ir|mir)əm|bilmir|bilmi(ş|r)əm|kəs|kəsdir|hə deyəsən/,
    a: "Nə bilim, dizayn işləri — həmişə olduğu kimi maraqlıdı." },

  { q: /hə (necə|nətərsən)|sən (nətərsən|necəsən)|öz(ün|ünüz) (necəsən|nətərsən)/,
    a: "Yaxşıyam, sağ ol. Sən necəsən?" },

  { q: /çay|qəhvə|kofe|çaydan|stəkan|çay (iç|içir|içək)/,
    a: "Qəhvə mənim zəif yerimdi. Səhər mütləq içirəm." },

  { q: /yem(ək|ə (nə |)var|ir|iş)|nə yeyirs(ən|en)|a(ş|c)|yed(im|in)|doy(un|dun)/,
    a: "Hələ yeməmişəm, iş arası bir şey atışdıraram." },

  { q: /neçə ild(ir|i|ı)|(nə|neçə) vaxt(an|dan)|nədən (bəri|qabaq)/,
    a: "2012-ci ildən, yəni təxminən 14 ildi." },

  { q: /(iş(ə|ə qəbul)|təklif|təklifin|offer)|iş (axtar|axtarıram|axtarırsan)/,
    a: "Yeni təkliflərə açığım. Əlaqə səhifəsindən yaza bilərsiniz." },

  // ── DAILY CONVERSATION FOLLOW-UPS ─────────────────────────────────
  { q: /mən (də |)yaxşı(yam|yıq)|mən (də |)yaxşı|şükür|sağ ol (yaxşıyam|yaxşı|deyiləm)/i,
    a: "Şükür, həmişə yaxşı olun! Hər şey qaydasında olsun." },

  { q: /^yaxşı[.!]*$/i,
    a: "Şükür, yaxşıdır. Sən necəsən?" },

  { q: /mən normal|mən (də |)normal|normal(yam|ıq)|elə (mən |)də/i,
    a: "Şükür, yaxşıdır. Özünüzə yaxşı baxın." },

  { q: /mən pis|^pis[əe]?m?[.!]*$|kefim (yoxdu|pis)|əhval(ım|ımız) (pis|yoxdu)/i,
    a: "Pis olmayın, inşallah hər şey yaxşı olar. Həmişə ümid var!" },

  { q: /şükür|elhamdulillah|hər şey (yaxşı|qaydasında|gözəl)|hər şey (yolunda|qaydasında)/i,
    a: "Əla, şükür. Həmişə belə olsun!" },

  { q: /yaxşı (bax|ol|qal|gəz)|özün(üz|ə) (yaxşı bax|diqqət et)|sağ(lıqla|ğa) (qal|gal)/i,
    a: "Siz də özünüzə yaxşı baxın, sağ olun!" },

  // ── CREATIVE / PRODUCTION STATEMENTS ───────────────────────────────
  { q: /yarad(ı|i)r(am|san|s(ı|ı)n|ıq|s(ı|ı)nız?|lar?)/i,
    a: "Əladır! Birlikdə yaradaq. Nə üzərində işləyirsiniz?" },

  { q: /birlikdə|birgə|bərabər (yaradaq|edək|işləyək)/i,
    a: "Bəli, birlikdə yaxşı işlər görə bilərik. Təklifiniz nədir?" },

  // ── РУССКИЙ ──────────────────────────────────────────────────────────────
  { q: /привет|здравствуй|здравствуйте|добрый|доброе|добрый/,
    a: "Привет! Я Махир Велизаде — UI/UX дизайнер из Баку. Спрашивайте что угодно о моей работе." },

  { q: /как (тебя|вас) зовут|кто ты|представься|твоё имя/,
    a: "Я Махир Велизаде — UI/UX дизайнер и креативный разработчик из Баку, Азербайджан." },

  { q: /(скольк(о|а)|скол(ь|)ко) (тебе|вам)( лет)?|тво(й|ё) возраст|год рождения/i,
    a: "Мне 39 лет. Родился 22 октября 1986 года." },

  { q: /откуда ты|где ты (живёшь|находишься)|твой (город|страна)|баку|азербайджан/,
    a: "Я из Баку, Азербайджан." },

  { q: /кем ты работаешь|чем (ты|занимаешься)|твоя (профессия|должность|специальность)/,
    a: "Я UI/UX дизайнер и креативный разработчик. Занимаюсь дизайном интерфейсов, брендов, веб-сайтов и моушн-графики." },

  { q: /где ты работаешь|текущая (работа|должность)|место работы/,
    a: "Сейчас работаю в Агентстве Инноваций и Цифрового Развития в Баку." },

  { q: /спасибо|благодарю|пасиб/,
    a: "Пожалуйста. Ещё вопросы?" },

  { q: /пока|до (свидания|встречи)|всего хорошего/,
    a: "До свидания. Если будут вопросы — обращайтесь." },

  { q: /портфолио|проект(ы|ов)|работ(а|ы)/,
    a: "В портфолио 5 проектов — от сайта CERT.AZ до дворца Гейдара Алиева. У каждого свой визуальный подход." },

  { q: /как (дела|жизнь|ты|вы)|что (нового|делаешь)|чё как/,
    a: "Да нормально, работаю потихоньку. А у вас?" },

  { q: /что (думаешь|думаете)|как (считаешь|считаете)|твоё мнение/,
    a: "Зависит от контекста. Что именно вас интересует?" },

  { q: /ты (тут|здесь|на месте)|ты (где|где ты)|ау/,
    a: "Да, я здесь. Спрашивайте." },

  { q: /расскажи (анекдот|шутку|что-то смешное)|пошути|смешное/,
    a: "Я дизайнер, а не стендапер. Но вот: почему дизайнеры носят чёрное? Потому что они в трауре по функциям, которые порезали в последнем спринте." },

  { q: /погода|как (там|на улице) погода|холодно|жарко|тепло|дождь/,
    a: "Погода внизу страницы — там live-данные. А так Баку непредсказуем." },

  // ── CASUAL GETTING-TO-KNOW-YOU ──────────────────────────────────────────
  { q: /(what'?s your|do you have (any|a)|any) (hobby|hobbies|do for fun|free time|spare time)/,
    a: "I'm into design obviously, but outside work I enjoy photography, exploring new places in Baku, and occasionally gaming." },

  { q: /do you (play )?sports|(play )?any sports|work out|exercise|gym|workout|go to the gym/,
    a: "Not as much as I should, honestly. I try to walk a lot — Baku's waterfront is great for that." },

  { q: /what (music|kind of music|genre) (do you (like|listen to)|are you into)|favorite (music|genre|band|artist|singer)/,
    a: "I listen to a mix — electronic, hip-hop, sometimes ambient when I'm working. Depends on the mood." },

  { q: /favorite (movie|film|cinema)|(what'?s|what is) your favorite movie|do you (like|watch) movies/,
    a: "I like Christopher Nolan films — Inception, Interstellar. Visually stunning and conceptually deep." },

  { q: /favorite book|(what'?s|what is) your favorite book|do you (like )?read(ing)? books/,
    a: "I'm not a heavy reader but I enjoy design-related books. 'Don't Make Me Think' by Steve Krug is a classic." },

  { q: /do you have (any )?pets|pet (animal|cat|dog|bird)/,
    a: "No pets right now. I'd like a cat eventually, but not yet." },

  { q: /favorite (food|cuisine|dish|meal)|what (food|dish|cuisine) (do you like|is your favorite)|what do you (like to )?eat/,
    a: "I love Azerbaijani cuisine — plov is hard to beat. Also a big fan of sushi." },

  { q: /do you (like to )?travel|traveling|favorite (place|country|city) (you'?ve )?(visited|been to)|where (have|did) you travel/,
    a: "I like traveling, though I haven't done as much as I'd like. Istanbul is one of my favorite cities." },

  { q: /do you (like to )?cook|can you cook|are you good at cooking/,
    a: "Basic stuff. I can cook a few dishes — nothing restaurant-level, but I won't starve." },

  { q: /what'?s your (daily )?routine|typical day|what do you do (in a|every) day|daily schedule/,
    a: "Wake up, coffee, check designs from the day before, work on current projects, meetings, evening walk, some side work or gaming." },

  { q: /(are you a|are you an) (morning|night) (person|owl)|early bird|night owl|wake up early|stay up late/,
    a: "More of a night owl. I get productive bursts late in the evening, but I'm trying to fix that." },

  { q: /coffee or tea|do you drink (coffee|tea)|favorite drink/,
    a: "Coffee, absolutely. Can't start the day without it. Black, no sugar." },

  { q: /do you have (any )?(siblings|brothers|sisters|brother|sister)|any (siblings|brothers|sisters)/,
    a: "Yes, I have siblings. Family is important to me." },

  { q: /what did you study|what'?s your (education|background|degree)|where did you (go to )?(college|university|school)|study (in|at)|graduate/,
    a: "My background is in design. I've been practicing since I was quite young, so a lot of it is self-taught through real projects." },

  { q: /favorite (season|weather|time of year)/,
    a: "Spring in Baku is beautiful — not too hot, the city comes alive. Definitely my favorite season." },

  { q: /what'?s your (dream|goal|aspiration|ambition)|dream (job|project|life)/,
    a: "I'd love to work on something truly global someday — a product used by millions. That's the dream." },

  { q: /what makes you happy|what do you enjoy|what brings you joy|what'?s your happy place/,
    a: "Solving a tricky design problem. That moment when everything clicks and the solution is obvious — that's genuine satisfaction." },

  { q: /do you (like to )?watch (tv )?(shows|series)|favorite (show|series|tv show|tv series)/,
    a: "I watch series sometimes. 'Black Mirror' is fascinating from a design perspective — future interfaces, AI, human behaviour." },

  { q: /what (do you do|are you doing) (on|at) (weekends|the weekend)|weekend (plans|vibes)/,
    a: "Usually catching up on rest, exploring the city, meeting friends, or working on side projects. Depends." },

  { q: /what time do you (wake up|get up|go to bed|sleep)/,
    a: "Wake up around 8-9, go to bed around 1-2 AM. Not ideal, but it works." },

  { q: /(are you|are you an) (introvert|extrovert|ambivert)|what'?s your personality|personality type|mbti/,
    a: "I'm somewhere in between — I enjoy social settings but need alone time to recharge. Typical designer introvert probably." },

  { q: /do you (like|enjoy) (parties|partying|going out|socializing|meeting new people)/,
    a: "I enjoy good conversations in smaller settings. Big loud parties aren't really my thing." },

  { q: /favorite (holiday|celebration|festival)/,
    a: "Novruz — it's our traditional spring festival in Azerbaijan. The food, the fire jumping, the whole atmosphere is special." },

  { q: /favorite (dessert|sweet|sweets)/,
    a: "Baklava. Azerbaijani baklava is something else — especially the one from Sheki." },

  { q: /can you swim|do you know how to swim/,
    a: "Yeah, I can swim. Growing up in Baku — Caspian Sea coast — it's kind of a given." },

  { q: /do you play (any )?(instrument|music instrument|guitar|piano)/,
    a: "I don't play any instrument. Sometimes I wish I learned one, but design took all my practice time." },

  { q: /favorite (animal|pet|wild animal)/,
    a: "Cats. They're independent, curious, and have great design sense — very balanced compositions." },

  { q: /(what'?s|what is) your (style|fashion style|dress style)/,
    a: "Minimal and comfortable. Dark colors, clean lines — similar to my design aesthetic, honestly." },

  { q: /do you have (any )?tattoos|are you (into )?tattoos/,
    a: "I don't have any. Not against them, just haven't committed to a design yet." },

  { q: /(what'?s|what is) your favorite (city|place in the world)/,
    a: "Baku is home, but Istanbul has a special place — the blend of cultures, the food, the energy." },

  { q: /do you (like )?photography|are you (into )?photographer|do you take photos/,
    a: "Yes, I enjoy photography — mostly architecture and cityscapes. It influences my design eye quite a bit." },

  { q: /what phone (do you use|model)|what'?s your phone|iPhone|android|what device/,
    a: "iPhone user. The ecosystem just works for design and productivity." },

  { q: /favorite app|what app (do you use (most|a lot)|can'?t live without)|most used app/,
    a: "Figma, obviously. After that — probably Spotify." },

  { q: /do you use (social media|instagram|twitter|x|linkedin)|are you (on|active) (social media|instagram)/,
    a: "I'm active on Instagram and LinkedIn. Twitter/X less so. Behance is where my work lives." },

  { q: /what (do you think|are your thoughts) (about|on) (AI|artificial intelligence)|(your )?opinion (about|on) (AI|artificial intelligence)/,
    a: "AI is a powerful tool — I use it in my workflow too. It won't replace designers, but designers who use AI will replace those who don't." },

  { q: /tell me (something|one thing) (about yourself|interesting|unique)|what'?s (one )?thing (about you|i should know)|fun fact/,
    a: "I've been designing since I was 14. Started with Photoshop tutorials and never stopped." },

  { q: /what (are you afraid of|frightens you|scares you)|biggest (fear|phobia)/,
    a: "Stagnation. Doing the same thing for years without growing — that's genuinely scary to me." },

  { q: /what'?s your (life )?(motto|philosophy|quote)|favorite quote/,
    a: "Good design is invisible. If it works, people don't notice it — they just experience it." },

  { q: /(do|did) you (learn|study) english|how (did you learn|is your) english|english level/,
    a: "Self-taught mostly — through the internet, movies, and working with international clients." },

  { q: /what (skills|things) are you (learning|studying|working on) (now|currently|these days)/,
    a: "I'm getting deeper into frontend development — I want to build more of what I design myself." },

  { q: /do you (like|enjoy) (your (job|work)|what you do)/,
    a: "Yes, most days. Design is one of those fields where you can genuinely enjoy the process if you're working on the right problems." },

  { q: /what'?s the (best|worst) (thing|part) about (being )?(a )?(designer|your job)/,
    a: "Best part: seeing something you created actually being used. Worst part: when stakeholders think they're designers too." },

  { q: /how (do you handle|do you deal with|about) (criticism|negative feedback|hate|trolls)/,
    a: "Constructive criticism is welcome. Random negativity I don't engage with — not worth the energy." },

  { q: /what (would you do|will you do) (if you weren'?t|if you weren'?t a) (a )?(designer|in design)/,
    a: "Probably architecture — I've always been drawn to built environments and spatial design." },

  { q: /are you (happy|satisfied|content) (with|in) (your life|where you are|your career)/,
    a: "Mostly, yeah. I'm doing meaningful work, in a city I love, with room to grow. Can't complain." },

  { q: /what do you (think about|feel about) (baku|azerbaijan|your country)/,
    a: "Baku is a special city — rapidly modernizing, unique blend of old and new. I'm proud to be from here." },

  { q: /do you (have )?(a )?(girlfriend|boyfriend|partner|spouse|significant other)/,
    a: "I keep my personal life personal. Let's focus on the work." },

  { q: /what (car|bike) do you (drive|have)|do you have a (car|vehicle)/,
    a: "I don't drive much in Baku — traffic is intense. Public transport and walking work better." },

  { q: /do you (like|enjoy) (working )?(remotely|from home|at home)/,
    a: "Yes, I'm comfortable working remotely. I have a proper setup and good discipline for it." },

  { q: /what'?s your (workspace|desk|office) (like|setup)|(show|describe) your desk/,
    a: "Minimal — laptop, monitor, good chair, some plants. Clean space helps clear thinking." },

  { q: /how (many hours|long) do you work (per day|a day|daily)/,
    a: "Around 7-8 hours of focused work. Sometimes more near deadlines, but I try to keep it sustainable." },

  // ── CATCH-ALL by language ─────────────────────────────────────────────────
  // AZ questions (ends with ? or mı/mi/mu/mü)
  { q: /[əğııöüşç].*\?$|[əğııöüşç].*mı\b|[əğııöüşç].*mi\b|[əğııöüşç].*mu\b|[əğııöüşç].*mü\b/i,
    a: "Hmm, maraqlı sualdı. Bir az daha ətraflı danışa bilərsiniz?" },
  // AZ catch-all (any Azerbaijani text not matched above)
  { q: /[əğııöüşç]/i,
    a: "Maraqlıdı. Bir az daha danışın, sizi dinləyirəm." },

  { q: /[а-яё]/i,
    a: "Извините, я не совсем понял ваш вопрос. Спрашивайте о моей работе, опыте или портфолио." },

];

/**
 * localAnswer(q) — matches question against QA pairs
 * Falls back to honest default if nothing matches
 */
function _detectLang(text) {
  if (/[əğııöüşç]/i.test(text)) return 'az';
  if (/[а-яё]/i.test(text)) return 'ru';
  return 'en';
}

window.localAnswer = function(q) {
  const ql = q.toLowerCase().trim().normalize('NFC');
  for (const pair of window.MAHIR_QA) {
    if (pair.q.test(ql)) return pair.a;
  }
  const lang = _detectLang(q);
  if(lang==='az') return "Hmm, bilmirəm bu suala nə deyim. İşim, təcrübəm və ya portfolio haqqında soruşa bilərsiniz.";
  if(lang==='ru') return "Хм, не уверен, что правильно понял вопрос. Спросите о моей работе, опыте или проектах.";
  return "Hmm, not sure what to say to that one. Ask me about my work, experience, or anything design-related.";
};
