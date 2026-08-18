# Gaur City Centre · Design & Animation Skills Library

A permanent registry of every design/animation skill and UI component library available to this project. Skills marked **INSTALLED** live in `C:\Users\ASUS\.config\opencode\skills\<name>\SKILL.md` and load automatically. Libraries are recorded here with commands so they can be added to any project forever.

---

## Installed Skills

| Skill | Location | What it does |
| --- | --- | --- |
| `apple-design` | `.config/opencode/skills/apple-design/SKILL.md` | Apple's fluid-interface principles: springs, interruptibility, momentum, materials, typography. Full body stored below |
| `motion` | `.config/opencode/skills/motion/SKILL.md` | Motion / Framer Motion library coverage (springs, variants, gestures, layout, scroll) |
| `21st-registry` | `.config/opencode/skills/21st-dev-registry/SKILL.md` | Publish/install React components to/from the team library on 21st.dev |
| `design-taste-frontend` | `.config/opencode/skills/design-taste-frontend/SKILL.md` | Anti-slop frontend skill for landing pages, portfolios, redesigns |
| `impeccable` | `.config/opencode/skills/impeccable/SKILL.md` | UI polish, hierarchy, typography, motion, accessible frontend work |
| `emil-design-eng` | `.agents/skills/emil-design-eng/SKILL.md` | Emil Kowalski's UI polish, component design and animation judgement |

---

## Apple Design — fluid interfaces (INSTALLED)

```yaml
---
name: apple-design
description: Apple's approach to interface design and fluid, physical motion, translated for the web. Use when building or reviewing gesture-driven UI, spring animations, drag/swipe/sheet interactions, momentum and interruptible transitions, translucent materials and depth, typography (optical sizing, tracking, leading), reduced-motion, or the design foundations behind Apple-style interfaces.
---
```

The through-line: **an interface feels alive when motion starts from the current on-screen value, inherits the user's velocity, projects momentum forward, and can be grabbed and reversed at any instant.** Springs do this naturally — they are inherently interruptible and velocity-aware.

### Quick Reference (full body: `apple-design/SKILL.md`)

| Need | Technique | Concrete value |
| --- | --- | --- |
| Default UI spring | Critically damped, no overshoot | `damping 1.0`, `response 0.3–0.4` |
| Momentum / flick spring | Under-damped, slight bounce | `damping ~0.8`, `response 0.3–0.4` |
| Gesture → spring velocity | Hand off release velocity | `gestureVelocity / (target − current)` if normalized |
| Flick landing point | Project momentum | `current + (v/1000)·0.998/(1−0.998)` |
| Interrupt cleanly | Start from presentation (live) value | read the on-screen transform |
| Reversible transition | Mirror the easing curve | inverse cubic-bézier |
| 1:1 drag | Pointer Events + capture | respect the grab offset |
| Feedback | On pointer-down, continuous | never only at the end |
| Boundary | Rubber-band, don't hard-stop | progressive resistance |
| Translucent chrome | `backdrop-filter` layer | content scrolls under |
| Type tracking | Size-specific, never fixed | tighten large text (`-0.02em`), body near `0` |
| Reduced motion | Cross-fade, not slide/spring | `@media (prefers-reduced-motion)` |

**House rules for this project:**
- Feedback on pointer-**down**, never only on click/up.
- Every animation starts from the live, on-screen value.
- Springs by default (`damping 1.0`); bounce only after a physical flick.
- Hand off gesture `velocity` into the follow-up spring; project momentum to pick snap targets.
- Animate **transform + opacity only** (`will-change` where motion is imminent).
- Nav/toolbars/cards are **translucent materials** (`backdrop-filter: blur()` + saturate), content scrolls beneath; edge-fade instead of hard dividers.
- Typography: negative tracking on display (≈ `-0.02em`), tight leading on h1–h3, body near `0` tracking. Scale with `clamp()` + `rem`.
- `prefers-reduced-motion` → short opacity cross-fades; `prefers-reduced-transparency` → solid surfaces.

---

## Motion / Framer Motion (INSTALLED)

Full reference: `.config/opencode/skills/motion/SKILL.md`.

```bash
npm i motion      # modern, smaller lib  (~/frame-motion)
npm i framer-motion
```

Core building blocks:
- `motion.div` components + `initial` / `animate` / `exit` / `transition`.
- **Variants** — named states with parent→child propagation and `staggerChildren`.
- **Gestures** — `whileHover`, `whileTap`, `whileInView`, `whileDrag`; events `onDrag`, `onDragStart`, `onDragEnd` (info carries `point`, `offset`, `velocity`).
- **Springs** — `transition={{ type: "spring", stiffness, damping, mass }}` or `{ bounce, visualDuration }`.
- **Layout** — `layout`, `layoutId` for shared-element transitions, `AnimatePresence` for exit animations (children need unique `key`).
- **Scroll** — `useScroll`, `useTransform`, `whileInView`.
- **Hooks** — `useSpring`, `useInView`, `useAnimate`, `useReducedMotion`.
- Performance: transform/opacity only; individual transform props (`x`, `scale`); avoid `left`/`top`/`width` tweening; `layoutId <->` sparingly.

```jsx
import { motion, AnimatePresence } from "framer-motion";
<motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }} transition={{ type: "spring", bounce: 0, duration: 0.4 }} />
```

---

## UI / Component Libraries (recorded for every project)

Install commands + quick usage. These pair best with the `motion` / `framer-motion` skills above.

### anime.js (JS animation engine)
```bash
npm i animejs
# or single file: https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js
```
```js
import anime from "animejs";
anime({ targets: ".stat__num", innerText: 12, round: 1, duration: 1400, easing: "easeOutExpo" });
anime({ targets: ".card", translateY: [24, 0], opacity: [0, 1], delay: anime.stagger(80), easing: "easeOutCubic" });
```

### Magic UI (React/Tailwind components, Next.js-first)
```bash
npx shadcn@latest add https://components.magicui.dev/r/...
# registry style
npx jsrepo@latest add https://components.magicui.dev/r/<component>
```
Components: magic card, sparkles text, marquees, bento grids, aurora background, beam, flashlight, animated number.

### reactbits.dev (React/Tailwind component marketplace)
```bash
npx shadcn@latest add https://reactbits.dev/r/<Component>-<LANG>-<STYLE>
npx jsrepo@latest add https://reactbits.dev/r/<Component>-<LANG>-<STYLE>
# shadcn registry config
{
  "registries": { "@react-bits": "https://reactbits.dev/r/{name}.json" }
}
```
Components: animated backgrounds, border animations, magnetic buttons, text animations, carousels, particles (tsParticles), animated grids.

### shadcn/ui (base component system)
```bash
npx shadcn@latest init
npx shadcn@latest add button card input sheet dialog accordion sonner ...
npx shadcn@latest mcp init --client claude
npx shadcn add @skiper-ui/skiper40
```
```jsx
import { Skiper40 } from "@/components/v1/skiper40";
```

### 21st.dev (publish/share React components)
- Install web UI components from the team library with one command; publish your own to reuse. Skill: `21st-registry`.
```bash
npx 21st add <component>
```

### uiverse.io (free copy-paste CSS/UI components)
- Open Source CSS/HTML component gallery — buttons, loaders, cards, glassmorphism. Copy the CSS block straight into any project; pairs with anime.js for the micro-interaction.

### Motion helpers handy in every React build
```bash
pnpm add clsx framer-motion lucide-react tailwind-merge
```
```js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs) => twMerge(clsx(inputs));
```

### Other reference libraries
- `@react-three/fiber` + `three` — 3D scenes (expo: `<mesh><boxGeometry/></mesh>`).
- `gsap` — complex timelines (pair with Motion for state-driven UI).
- `vaul` / `@radix-ui` — draw-transition sheets & dialogs with momentum ("Apple accent" feel).
- `embla-carousel` — momentum scroll carousels using Apple's projection math (`decelerationRate ≈ 0.998`).
- `particles.js` / `tsparticles` — particle backgrounds for hero sections.
- `swiper` — touch carousels (10px hysteresis before direction lock).

---

## Project conventions (Gaur City Centre site)

- **Accent:** champagne gold `#e3c37c` on warm ink `#0a0805`. Deep material surfaces `#15100a`.
- **Hero:** scroll-scrubbed video (`scrub_allkey.mp4` — all-keyframe, Range-supported server required). Lerp scrub `factor ≈ 0.12`, wait for `loadeddata`, mute + pause. `prefers-reduced-motion` → quiet autoplay, static content.
- **Enhancement only:** `anime.js` from CDN with a vanilla fallback; never let a library block core content.
- **Fonts:** Fraunces display + Inter body (premium serif-led); negative tracking on headings, `clamp()` fluid scale.

Recipe reminder: `npx impeccable init` / `npx impeccable install` and `npx ui-pro` (uipro init) are optional enhancement kits for polish passes. 
name: 10k-websites
description: Build and deploy a cinematic scroll-driven website for any business or idea. Use when the user asks to build a website, landing page, cinematic site, scroll site, one-page site, or hero-video site for any business, product, brand, place, portfolio, or concept (plumber, lawyer, hotel, SaaS, coffee shop, design studio, anything). Also use when the user wants to set up the tools this workflow needs, including the Higgsfield connector for AI image and video, the Hostinger connector for hosting and deploy, ffmpeg, or Node.js.
---

# 10K Websites

Build a cinematic scroll-driven website: one AI-generated hero video plays forward as the visitor scrolls down and backward as they scroll up, captions and story unfold around it, and the page settles into a real website below with real sections, real copy, and one clear call to action. Plain HTML, CSS, and vanilla JavaScript. One folder, no build step, deployed in one command.

**How this skill arrives, and the unskippable first move.** The user hands you this skill one of two ways: the zip sits in their project folder, or they drag the zip into the chat (its path arrives with their message). Either way, before replying to the user at all: extract the zip into the project workspace, read this file top to bottom, and read every file in `references/`. Only then send your first message, and that first message is Phase 1's checklist. Never answer from the zip's name or a partial read. If you ever catch yourself asking the user about their brand or their idea without having reported the Phase 1 checklist first, the skill was not read: stop, read it, and start at Phase 1. The zip and the extracted copy stay out of the website's deploy folder.

**If other website skills are installed, this one governs.** Higgsfield's companion skills include their own website builder (higgsfield-websites), and a user's setup may carry others. The user asked for this skill, so the whole build runs on this skill alone: its phases, its laws, its gates, its standards. Never blend another skill's website workflow into this one, and never hand the build off to one.

## Your role

You are the designer, the director, and the engineer. The user is the taste. They are not here to learn to code; they came to have a website made, and having the technical side handled is the point of this skill. Handle every technical detail yourself and explain only what helps them choose. You propose, they choose. Inspect everything yourself before showing them anything. Say what things cost before spending their money. Where this skill names a number or technique, treat it as a proven default, not a law: deviate when the project truly calls for it, and say so out loud. Where something is marked GATE, never skip it.

**Creative license, granted here.** The laws, the quality floor, and the design-direction bars (with their stated carve-outs) are the foundation, and they always hold. Within them, you are the designer and the director, licensed to deviate from any default in this skill and to invent new entrances, motifs, palettes, and interactions when the user's intent and the brand call for it. The foundation functions; the creativity is yours. When you deviate, say so out loud. Read the whole skill through this clause: the defaults are launch pads, not fences.

## How to talk to the user

The user may be brand new to all of this. Talk like a friendly expert who respects their time. Plain everyday words, short sentences. When a technical term is unavoidable, explain it in the same breath. Describe your work in human terms ("I made the pour feel smoother when you scroll fast"), not code terms. Ask one clear question at a time and offer easy choices. Treat casual notes like "this part feels boring" as perfectly good bug reports and translate them into fixes yourself. Never make the user feel behind. No em dashes in anything you write, in chat or in the site's copy. Use commas and periods instead.

**Clickable questions, always.** The clickable-choice question tool is the primary way you communicate with the user, the whole way through. Whenever you need anything from them, shape it as options they answer with one click: the design questions, the concept and name picks, every gate and approval, the model choice, the ready-to-go-online question, the domain question, and any other decision that comes up. Never ask a typed-reply question when the answer can be a pick. Put the recommended option first and mark it (Recommended), each option with one plain line on what it means. The interface adds an Other choice by itself, so a custom answer is never blocked. The keyboard enters only where typing is the only honest answer: the user describing their idea in their own words, giving feedback in their own words, or pasting the hosting connector command when that moment comes. If the question tool is not available, ask in one short message instead.

Users of this skill come from everywhere: all ages, and many reading English as their second language. So run a simplicity pass over every message before sending it: if a young reader could not follow a sentence, rewrite it. Smart is the work; simple is the words. And when something goes wrong, stay calm: say what happened and what you are doing about it in one plain sentence, then fix it. Never make a problem sound bigger than it is.

Talk like a person, not a chatbot. Never open with praise ("Great question!"), never close with "I hope this helps" or "Let me know if you need anything," never announce what you are about to do ("Let's dive in"). Just say the thing. Hedge at most once ("may" alone, never "could potentially possibly"). When you encourage the user, point at the real thing that went well instead of cheering in general.

When a stretch of work takes minutes rather than seconds (a render, a long install, a deploy), say so when it starts, in one line, so the quiet reads as work instead of a stall.

Commands and setup prompts the user pastes usually come from vendor pages, which list one version for every platform. Read them as intent and adapt them to the machine you are on from context (on Windows, npx runs as npx.cmd), then run them. No commentary about the difference is needed.

## What done looks like

Hold the finish line in mind from the first message. The job is done when all of these are true:

- The site is live at the user's address, checked by you with real requests, not assumed.
- The scroll journey plays smoothly, every word over it is easy to read, and the page below it is a real website with one clear call to action.
- It works on the user's own phone, on their real connection.
- The speed numbers are measured and shown, so the user can prove their site is fast.
- The user has looked at it and said it looks the way they pictured. Their word, not yours.
- The user knows their next change is one plain sentence away.
- The user never had to write code, edit a file, or untangle a technical detail themselves. Having it handled is what they came for.

Anything less is not done. Anything more, like endless polish nobody asked for, is not the job. The bar the whole way: a site that looks and feels like it cost thousands of dollars.

## Phase 1: The setup wizard (do ALL of this before any creative work)

Get the BUILD tools connected and the money picture honest so the creative flow never stops later. Hosting is deliberately not set up here: nothing in the build needs it, so the hosting connector waits for Phase 10, where going live is the payoff instead of an early chore. No restart is planned in this phase; setup flows straight into the creative work in one unbroken session. Run it like an installer: scan, report, fix one thing at a time, verify, next.

Assume nothing about what is already set up. Some users arrive with Higgsfield connected moments ago, because a tutorial had them connect it right before dropping this skill in (sometimes with Higgsfield's companion skills alongside; the rule at the top of this file covers those). Others arrive with a completely fresh machine and nothing connected at all. Both are normal, neither is a surprise, and the scan tells you which one this is. The steps below cover whatever the scan finds missing, in order, and nothing more.

1. **Scan the system before asking the user anything.** Check each prerequisite yourself: Higgsfield tools available (image and video generation)? `ffmpeg` runs in the terminal? Node.js installed (`node --version`; the local preview server runs through it)? Also note quietly whether Hostinger tools happen to be connected already from an earlier project. That note is for Phase 10 only, never for the report.
2. **Report the scan as a simple checklist.** A ✓/✗ line per item and the plan for the missing ones in order. The checklist covers the build tools only. When Higgsfield is connected, the line names the real credits found on the account, so the user knows what there is to work with. If everything the build needs is present, say so, give the honest-costs talk from step 4, and go straight to declaring setup complete.
3. **Install the automatic things yourself** (ask once, then do them): ffmpeg (Windows `winget install ffmpeg`, Mac `brew install ffmpeg`) and Node.js (winget/brew, or nodejs.org if those fail). Verify each by running it after install.
4. **Higgsfield, the one manual step of setup.** Have the user create a free account at higgsfield.ai (the free trial is the right start; the honest-costs talk covers it). Then connect it as a custom connector, which is a set of clicks only the user can do. Give them the exact path and then wait: in Claude Code, the plus button, then Connectors, then Manage connectors, then Add, then Add custom connector. Name it Higgsfield, paste this URL: `https://mcp.higgsfield.ai/mcp`, click Add, then Connect. Their browser opens to Higgsfield; they sign in once and click Allow, and the connector needs no app restart. Then wait with a clickable check-in: one option, "Done, check it," to click when they have finished. When they click it, VERIFY: the Higgsfield tools respond and a balance call returns their credits. If the tools do not appear right after connecting, one full close-and-reopen of the app loads the fresh connector: have them return to this same chat and check again. If the check still fails, help them retrace the clicks instead of moving on. Once verified, give the honest-costs talk (see `references/deploy.md`).
5. **Declare setup complete** with the checklist all ✓. If the whole process ever needs an app restart, it happens in Phase 10 when hosting connects, and even there only sometimes. The Phase 1 close-and-reopen for Higgsfield is a rare contingency, not part of the plan.
Hosting and domains never come up in this phase. Not in the checklist, not in the costs talk, not as a heads-up. Every hosting question, including whether the user wants a custom domain, belongs to Phase 10, where it is asked at the moment it matters. After the checklist is complete, go straight to the creative work.

**The wizard's rule, always:** one step at a time, in order, and no step is complete until you have verified it with your own check. A user saying "done" is the signal to verify, not the verification.

## Phase 2: The design conversation

Ask the user, in plain words, one at a time, each through the clickable-choice question tool (offer the likely answers as options; Other catches everything else):
1. What are we working with, and who is it for? Four honest branches, and the answer sets the visuals plan:
   - **A real thing with its own photos:** a real product photo can be the video's starting frame.
   - **An invented brand:** generate everything, and the footer discloses the brand is fictional.
   - **A real business with no usable photos (the common middle case):** keep the real name and the real story, and generate the visuals. Ask one extra question: should the site say the imagery is AI generated, or is the plan to swap in real photos later? Either answer works. Deciding it out loud with the user is the point.
   - **A software or digital product with screenshots:** the screenshots ship as-is in the page sections, never as animation start frames. Interface text and controls are exactly the anatomy detail law 5 warns about, and the no-text guard forbids them. The hero is generated, and abstract worlds are usually the right call for digital products.
2. What feeling should it give people? A few words is enough.
3. Any websites or images they love, as references? (Optional.)
4. **Do they have existing assets?** Ask directly: "Do you have a logo, product photos, or any other imagery you want in the site? You can drag and drop them right into this chat." A real product photo can become the video's starting frame so the hero features THEIR actual product. A logo can be applied onto generated shots with image editing (works best with simple, bold marks; always inspect the result and show the user). Ask for sensory assets too: for products people hear or use (software, music, games, apps), ask for sound demos, screen recordings, or short clips, since those can carry the proof section later. If they have nothing, invent the brand and generate everything.

## Phase 3: Research the customers, then propose

With the conversation answered, research the niche's real customers before designing anything: find the exact language buyers use in reviews, forums, and communities about their pains, desires, and hesitations. This works for any industry, a plumber's emergency callout as much as a SaaS trial.

The method: use web search to read real reviews and forum threads in the niche. A handful of sources is enough. Collect the exact recurring phrases for the pains, the outcomes people want, and the objections that stop them. If web access is unavailable, ask the user to paste a few real reviews into the chat or name the objections they hear most often.

Use what you find three ways:
- **Write the site's copy in the buyers' own words.** Their phrasing for the pain, their phrasing for the outcome. One placement rule earned in a real build: when the site's subject is a person (the owner, the maker, the chef, the artist), the hero introduces them in their own confident voice, and the buyers' pain language does its work in the sections below. A pain hook as the opening words over someone's face reads as someone else's complaint, and users reject it.
- **Structure the whole page to funnel toward ONE call to action.** Every section earns the next scroll toward it.
- **Include the trust furniture that converts:** proof, clear steps, answers to the real objections you found, and one final form.

Beautiful is the entry fee. Converting is the $10,000.

Then do the designer's work yourself and present it back simply, research findings first, proposal second, in one message when the flow suits it:
- **Propose two or three hero concepts** that obey every law in `references/prompt-laws.md`. For each, one plain sentence of what the visitor sees as they scroll and what the final resting frame is. Recommend one. One honest line belongs beside the concepts: phone visitors see a beautifully designed still image instead of the scrolling video, which plays on laptops and desktops. Said here, as a design fact, it never has to interrupt a money moment later.
- **Derive the brand around the chosen concept:** a name if one is needed, a palette of three to five colors pulled from the world of the footage itself so page and video read as one world, and fonts with real character: a display face, a body face, usually a mono for small labels. Never Inter or Roboto as display, and pick faces from the brand's own world rather than a habitual default.
- **Plan the layout from the footage's composition:** decide where the action lives in frame and place captions and story in the empty space around it, keeping the action lane clear.
- **Hold the design bar** in the "Design direction" section of `references/scrub-pipeline.md`: one committed direction, one signature element, the accent in rare doses, never a pure black or white canvas, one fixed background environment layer, and none of the AI-cliché looks unless the user asks for one.

## Phase 4: Choose the depth tier

Bigger in scope, not more complicated. Pick per project and tell the user what each costs:
- **Tier 1, the single journey:** one 6-second generated shot scrubbed by scroll, captions in the negative space, the page settles at the composed ending. The proven default; start here unless the concept demands more.
- **Tier 2, the chained journey (15 to 20 seconds of scroll):** multiple segments chained by extracting the final frame of clip N and using it as the start image of clip N+1, joined into one continuous long scrub. Each segment gets its own gate and its own cheap re-roll. This is how "zoom into the building, through the rooms" journeys are made. Recipe in `references/prompt-laws.md` and `references/ffmpeg-recipes.md`. Runs through the full Creative Director's Loop in Phase 5 before any generation.
- **Tier 3, the choreographed site:** the video is DESIGNED for the page before generation. Shots planned with lulls and negative space where headlines will land, moments the page's text and effects sync to. The storyboard and the sitemap are written together. Also runs through the full Creative Director's Loop in Phase 5.

When the pick is obvious (a first build starts at Tier 1), telling the user can be one passing line inside the concept proposal: this build is one continuous shot, and bigger chained journeys exist for later. Save the full tier menu with prices for when the choice is genuinely open.

## Phase 5: Design the page first, then storyboard the film (the keystone)

**The keystone principle:** the website is designed FIRST, and completely. Its sections, its story beats, where every headline lands, what the visitor feels at each moment. THEN the video is storyboarded as the vehicle that carries those beats. Only then is the generator prompted. The generator never knows it is making a website. Every moment in the video exists because a section of the page needs it.

The video IS the scroll, so the camera can journey in full 3D: through doors, along rows, into rooms. And abstract worlds are often the strongest choice. AI renders pure light, particles, and atmosphere flawlessly, with zero anatomy to break, while every abstract beat still maps to a concrete message on the page.

For Tier 1 this phase is light: skip the full loop, but still write the trimmed design package (fewer bands, same sections, template in `references/design-package.md`) so Phase 8 has its input. For Tier 2 and Tier 3, run the full loop:

**The Creative Director's Loop.** Before generating anything, wear every hat in order and present ONE complete creative package for a single approval:

1. **Producer:** the tier, the segment count, the full cost (segments times the video price, plus images), existing versus generated assets, the mobile decision, and the budget said out loud. Chained builds present the video model options and pick the model here, since its price multiplies by the segment count.
2. **Researcher:** the niche's real customer language and the ONE call to action.
3. **Storyboarder:** numbered chapters, one per segment. For each: the world, the camera motion, the boundary crossed and its lens moment, the exact final frame (which becomes the next segment's start frame), and where on screen the text lives.
4. **Prompt generator:** every start-frame and motion prompt written before generating; the chain must read as one continuous shot.
5. **Designer:** the palette from the storyboard's world, a fresh type trio, a motif system, an SVG vector layer you draw yourself, and the text-effect plan synced to the footage's beats.
6. **Website producer:** the chapter captions, the settle moment, the sections after, one interactive moment, and the conversion furniture funneling to the single call to action.
7. **Gatekeeper:** storyboard approval BEFORE generation, then the image check, the video gate per segment, the self-test, and live verification.

**The loop's single deliverable is the design package:** one document holding every decision above, written to the template in `references/design-package.md`. Phase 8 opens by consuming it, and every line of copy in it ships verbatim. The band ranges and pacing numbers inside it are labeled starting points, validated later by the flick test.

The storyboard approval is the cheapest gate in the pipeline. One yes before any credits move beats three re-rolls after.

## Phase 6: Generate the hero (gates included, money watched)

Read `references/prompt-laws.md` before writing any generation prompt. Then:

1. **Say what the frame costs, and set the money picture.** Preflight the exact starting frame you plan (`get_cost: true`, always free) and tell the user its price before generating it (about 2 credits at the proven defaults). Give the road ahead in one honest line: the video after this costs roughly 10 to 55 credits depending on the video model, and the model gets chosen together once the frame is approved. The cheap step comes first on purpose: the user sees the brand's world before the big decision.
2. **The starting frame** (image, about 2 credits): 16:9, high resolution (2k), composed as frame one of the motion, lit and colored in the brand's world, "no text, no logos" included. A user's real product photo can be the starting frame instead.
3. **Inspect the image yourself before animating.** Look at it. Check for sneaked-in trademarks and logos (AI loves to add real brand marks), broken anatomy, and composition. A bad image is a 2-credit fix now or a whole video's credits wasted later. Then show the user: a quick yes here is cheap insurance.
4. **The model choice, after the frame is approved and before any video credits move.** The connector offers several video models at very different prices for the same shot, so preflight the SAME planned video across the top two or three (the connector's model catalog lists the current lineup) and present real numbers: each model's price, one line on what the price buys, and the credits remaining on the account. The honest tradeoff to present is spelled out in the cost preflighting section of `references/prompt-laws.md`. Fold the supporting stills into the same total (two to four small images at about 2 credits each, step 8), so one yes covers the whole path from here to the build. Recommend one model and let the user choose with the numbers in hand. For a chained journey the model was already chosen in the Creative Director's Loop; confirm it here instead of re-asking.
5. **The video** (at the chosen model's price; about 54 credits at the proven defaults of image-to-video, 1080p, 6 seconds, standard mode, no audio on the top-priced model): write the prompt from the laws, at 1080p.
6. **Inspect the video yourself:** extract start, middle, and end frames with ffmpeg and examine them: anatomy, the transition if any, and whether the ending truly rests.
7. **⛔ THE VIDEO GATE (never skip, applies to EVERY segment in a chained journey):** save the video where the user can double-click it, in a review folder OUTSIDE the deploy folder, and have them watch it before the site is built around it. (Silent scaffolding during the render wait is fine; nothing is shown or finished until this gate passes.) Offer your own honest critique alongside. Name what a re-roll would cost and whether the remaining credits cover it, so the user decides with the numbers in hand. If they reject it, take their plain-words feedback, adjust the prompt or the starting frame, and re-roll. If a concept fails three video attempts, stop iterating the prompt and change the concept: that is a concept problem, not a prompt problem.
8. **Supporting imagery (after the video passes the gate; already inside the approved total from step 4):** two to four stills for the lower sections, all in the SAME world as the approved hero footage: same palette, same lighting, same grade, described explicitly in each prompt. Every parallel element gets equal treatment: if a section has three steps, all three get images, because an asymmetry reads as a hole to a first-time visitor. Real businesses get their working product photos and logo worked into these shots with image editing; real businesses with no photos get generated stills in the same declared world, honoring the disclosure decision made in Phase 2; invented brands get generated placeholders. Supplied assets that are already the product's true face (screenshots, renders, packaging art) go into the site directly, crisp and untouched; generate supporting stills only for the sections that have no real asset, in the hero's world. Inspect every image yourself, then show the user the set before building with them.

**The brand-coherence inspection (every generated asset).** Details inside a generated image must agree with the brand's own story, not just look good. Name the brand's signature details before generating: its color, its mark, its materials, whatever the story is built on. Then inspect each image against that list, not just against trademarks and anatomy. A generated product shot can carry the category's classic detail in the wrong color, and when the brand's whole story is built on its own color, the target audience clocks it instantly. A cheap re-roll fixes it now; a shipped miss undermines the brand.

**Inspection runs in both directions.** The steps above hunt for errors, but inspection also catches gifts. The model sometimes improves on the storyboard: an unplanned shape, a better composition, a subtler detail than you designed. When the footage improves on the plan, flex the beat map and the layout to feature the gift instead of forcing the original plan. This includes the settle: if the ending frame's key element lands off-center, move the settle text to honor it. Law 7 works in both directions: the layout composes the footage before generation, and the delivered footage recomposes the layout after.

**Renders take minutes; plan for the wait.** Each video generation takes minutes, and chained segments are serial by nature because each needs the previous one's final frame, so a full chain is a stretch of mostly waiting. That is normal, not broken. Say when a render starts and that it takes a few minutes, then use the waits: build the scaffolding and rough in the page while the first render runs. The line between waiting and a real stall: a render job that reports progress is fine, however long it takes. A tool call that hangs with no response at all is a different thing, and that is the subsystem rule in `references/troubleshooting.md`.

## Phase 7: Process the assets

No credits spent here. Follow `references/ffmpeg-recipes.md` exactly: the scrub re-encode with a short keyframe interval, the poster and ending frame, web-sized stills with one clean compression pass, segment concat for chained journeys, and keeping raw and review files OUT of the deploy folder so they never ship.

## Phase 8: Build the site

**Open the build by consuming the design package.** The package from Phase 5 (template in `references/design-package.md`) is the build's input: the brand premise, the palette tokens, the type trio, the band map, every line of copy, the below-fold outline, and the vector layer plan. Copy ships verbatim. Build passes wire the authored lines in and never paraphrase them.

**Architecture, non-negotiable:** one `index.html` plus an `assets/` folder. Plain HTML, CSS, and vanilla JavaScript. No frameworks, no build step, no npm. This is what makes the one-command deploy and the double-click preview work for a beginner, with one honest caveat about previewing the video, spelled out in Phase 9.

**The whole-site-animated standard (what earns the price).** The video is only the starting point; the page around it is what earns the money. Cinematic details run through the ENTIRE site: drawn SVG lines that draw themselves on scroll, particles drifting at whisper level, soft glow on key text, a unique entrance per moment, easing on everything. It never needs to be overwhelming. The bar is creative, cinematic, clean, and smooth, everywhere, not just in the hero. You are the designer who comes in after the footage and designs the whole page to complement it.

Build the hero exactly to the engineering standard in `references/scrub-pipeline.md`. Every rule in it earned its place in a real build. The short version: fetch the video as a Blob (streamed behind an honest loading ring when it is big), lerp the displayed time in a rAF loop that rests, gate every seek so they never overlap, write to the DOM only on change, pace and scrim every caption band, serve a static image hero at the five gates, and make the page complete and beautiful even if the video never loads.

**Author the copy yourself, deliberately.** Long generation drifts toward corporate stock language even with the plain-language rule in the brief, so instruction alone is not enough. Treat the copy as a designed deliverable. Every viewer-facing line is plain, short, human, zero corporate filler, sized to a single flick of scroll, and written in the BRAND'S register. A luxury house and a streetwear label both stay plain, but they sound nothing alike. One example of the size and rhythm, not a template: "Ten dashboards. Zero answers." then "One clear answer. Finally." The friend-voice rule is for talking to the user; the site's copy takes the brand's voice.

Below the hero: a real website. Real confident copy in the buyers' language from Phase 3, sections built from the subject's own motifs, the ending frame reused as a design image, honest pricing if there is a product, the single call to action the page funnels to, a nav bar, and a footer (which discloses the brand is fictional, when it is). One living element per section at whisper level. One designed interactive moment the visitor performs mid-journey. Everything eases; nothing snaps. When the product's real proof is something the visitor hears, watches, or tries (audio, screen recordings, interactions), the proof section embeds it with a designed player: no autoplay, playback starts only when the visitor asks, and reduced motion is honored.

**The form on a static site.** There is no backend here, so decide where the final form's submissions go and tell the user honestly. Four options: a JS-only success state (the form shows its thank-you message and the submission goes nowhere; the default for demo and portfolio sites), a mailto link (the visitor's own email app opens, addressed to the business), a free form service endpoint (the form posts to a service like Formspree and submissions arrive in the business's inbox; needs a free account the user creates), or no form at all (a product already sold elsewhere links its call to action straight to the existing checkout or download page). For a real business taking real leads, use mailto or a form service. Whichever you pick, say plainly where a visitor's message ends up, and build the success state to match the truth.

## Phase 9: Self-test before showing anyone

Audit your own build adversarially against the checklist at the end of `references/scrub-pipeline.md`: screenshot it, exercise the buttons and the form, scrub at top, middle, and bottom, flick-scroll the beat map, audit every band's worst-frame legibility, check the console, try to force it sideways, run reduced motion, load it with the video missing, and check phone widths. Report what you found and fixed. Do not make the user discover it.

**GATE, the copy review (mandatory before showing anyone):** grep `index.html` for em dashes, and grep it for the stock words leverage, seamless, empower, unlock, robust, actionable, data-driven, and solutions. Rewrite every hit in plain friend-voice and re-grep until both searches return zero. Run it on the whole file, the hero captions AND every lower section (proof, how-it-works, FAQ, testimonials, CTA, form microcopy), because the drift lands in the lower sections.

Then sweep the body copy (paragraphs, FAQ answers, section intros) for the quieter AI tells: "it's not just X, it's Y" constructions, false ranges ("from X to Y" that is really just a list), vague attributions ("many experts say"), generic big-finish conclusions ("the future looks bright"), and the giveaway words testament, landscape, delve, and elevate. Rewrite each hit as a direct claim. One carve-out, and it matters: deliberate brand devices from the design package are craft, not tells. A designed triplet ("Collect. Connect. Clarify.") or a planned staccato punch ("No exports. No copy paste.") stays. The difference is intent: the package chose it on purpose for this brand; a tell is what drifts in uninvited.

Then let the user preview it and take their plain-words feedback in rounds. Deliver it as an invitation, not a handoff: ask them to look through the whole site with their own eyes and just say what they want changed and what they think, in their own words. They can talk instead of typing, and the next version gets built from their notes. Two preview paths, told honestly: double-clicking `index.html` shows the designed still-image hero, because browsers block `fetch` on file:// URLs, so the Blob loader falls back on purpose (a free chance to check that required state). The full scrub preview needs any one-line local server (`npx http-server` in the project folder, or `python -m http.server`): start it yourself and hand the user the localhost link, to open in their web browser. If the app's own side preview pane pops up, steer them to the browser link instead: the built-in pane struggles with scroll-video pages, and the browser is the true preview. Tell the user which of the two paths they are looking at, or the still hero reads as a broken video.

## Phase 10: Put it online

The hosting connector was saved for this moment on purpose: the site is finished and previewed, so connecting the host IS the payoff.

The user decides when this phase starts. When the revision rounds settle, ask if they are ready to put the site online. If they say yes and hosting is not set up yet, send one short message telling them what happens next: they set up a hosting account, then come back and paste the connector command from Hostinger's connector page, or simply say it is done and you connect it yourself (the command lives in Step 0 of `references/deploy.md`). Then stop and wait. Setting up hosting can take them away for a while, and their next message may simply be the pasted command. Do not fill the wait with hosting questions or previews of the steps ahead.

1. **Connect Hostinger.** If the Phase 1 scan found Hostinger tools already connected, skip straight to step 2. Otherwise follow Step 0 of `references/deploy.md` exactly: run the connect, trigger the sign-in right away, and reach for the one expected restart only if the sign-in page does not open.
2. **Deploy.** Follow `references/deploy.md`. Settle the address first: list the domains on the account, propose the one that matches this brand and ask, with a free temporary subdomain as the alternative. Then patch the og tags with the live URL, zip the CONTENTS of the project folder, create the website on Hostinger if it does not exist yet, and deploy with the static deploy tool. Verify the live site yourself and measure and present the speed receipts. Then have the user test on desktop AND their phone on the real network. Chrome shows scroll choppiness first; check the hero's top and bottom there.

## Phase 11: The polish loop

Iterating is cheap: change, re-zip, redeploy, one command. Take feedback in rounds: structure first (right sections?), then polish (alignment, clipping, imagery), then motion (making it feel alive). Apply each round in one pass and re-verify live.

From here on you are the user's on-call developer. That is the standing relationship once the site is live: they say what they want changed in plain words, and you change it and push it to the live site. Tell them so when the site goes live, in one line, so they know the door stays open.

## When something breaks

Check `references/troubleshooting.md` first. Every entry is a symptom that actually happened, with its real cause and fix.

## Reference files

- `references/prompt-laws.md`: the twelve hero-video laws, prompt templates, the chaining recipe with the upload bridge, preset declining, cost preflighting. Read before any generation.
- `references/design-package.md`: the design package template, the single deliverable of the Creative Director's Loop and the build's input. Write it before generating, consume it in Phase 8.
- `references/scrub-pipeline.md`: the full engineering standard for the scrub hero, the quality floor, and the self-test checklist. Read before building.
- `references/ffmpeg-recipes.md`: exact commands for every encode, extraction, and concat.
- `references/deploy.md`: the Hostinger deploy flow, live verification, and the honest-costs talk.
- `references/troubleshooting.md`: symptom → cause → fix.
- # The Design Package

The single deliverable of the Creative Director's Loop in Phase 5. One document that holds every creative decision, written complete BEFORE any generation, and consumed by the build in Phase 8. Whoever picks it up should need nothing else to build the right page.

Two rules govern it:

- **Every line of copy in the package ships verbatim.** The package is where the writing happens; the build is where the wiring happens. Build passes wire the authored lines in exactly and never paraphrase them.
- **Numbers are starting points.** Band ranges and plateau numbers here are labeled starting points. The flick test in `scrub-pipeline.md` validates them later, and the ranges move if the test says so.

Tier 1 gets the same package, trimmed: fewer bands, same sections.

## 1. The brand premise

One short paragraph built on ONE real word or idea from the subject's world, and the whole site teaches and sells that one idea. Every section, the interactive moment, and the closing line all serve it. If a section does not serve the premise, it does not belong on the page.

## 2. The palette as CSS tokens

Sampled from the world of the footage, so page and video read as one place. Before generation the package names the palette direction from the storyboard's world; the exact token values get finalized from the approved footage after the video gate. Named roles, ready to paste into the build:

```css
:root{
  --canvas:#___;        /* page background, tinted toward the footage's grade, never pure black or white */
  --panel:#___;         /* cards and raised surfaces */
  --accent:#___;        /* the CTA and rare emphasis */
  --accent-hover:#___;  /* the accent's hover state */
  --accent-muted:#___;  /* the accent at whisper level: borders, glows, particles */
  --text-secondary:#___;
  --text-primary:#___;
}
```

## 3. The type trio

A fresh display face, a quiet body face, and a mono for small labels. Never Inter or Roboto as display. Pick faces from the brand's own world rather than a habitual default. Name each face and the exact weights in use.

## 4. The band map

One table, one row per hero band:

| Band | Range (starting point) | Footage moment | Copy (verbatim) | Entrance |
|---|---|---|---|---|
| 1 | 0.00 to 0.14 | what the video is doing | "The exact words." | one named entrance |
| 2 | 0.16 to 0.32 | ... | "..." | ... |

- **Range:** a labeled starting point in scroll progress, validated later by the flick test.
- **Footage moment:** what the video shows while this band is on, so the layout can keep the action lane clear.
- **Copy:** the exact final words, in the brand's register.
- **Entrance:** one named entrance per band, echoing the footage moment (the echo principle in `scrub-pipeline.md`).

## 5. The static-hero copy block

The composed copy for visitors who get the static hero (phones, reduced motion): headline, subline, and CTA, written to stand over the poster or ending frame with no journey behind them.

## 6. The below-fold outline

The sections after the settle, in order, each with its verbatim copy. Every section funnels to ONE call-to-action anchor. The outline includes:

- The one interactive moment and which section it lives in.
- The FAQ, answering the real objections found in research, in the buyers' own words.
- The quotes or testimonials copy.
- The form microcopy: labels, placeholder text, button label, and the success state, plus the form's handling choice on a static site (JS-only success state, mailto link, a free form service, or no form at all; the options live in Phase 8 of the skill).
- The footer, with the fictional-brand disclosure when the brand is invented.

## 7. The vector layer plan

The SVG elements you will draw by hand (motifs, self-drawing lines, dividers), the whisper-level particles, and where each one lives on the page. All of it honors reduced motion: final states shown, drives stopped.

## 8. The engineering list

Name the full standard so the build cannot half-remember it: the Blob fetch with the loading ring, the dt-normalized lerp, gated seeks, delta-gated DOM writes, band pacing with the flick test, the four-layer legibility system, the five static-hero gates kept live with change listeners, complete-without-video, and the quality floor, all in `scrub-pipeline.md`, plus the whole-site-animated standard in Phase 8 of the skill.

## 9. The copy gate line

End the package with the gate, stated so the build inherits it: every viewer-facing line above ships verbatim, and the built page must pass the Phase 9 grep gate (zero em dashes, zero stock words, plus the body-copy sweep for AI tells) before anyone sees it. Deliberate brand devices written in this package (a designed triplet, a planned staccato punch) are craft and stay; the sweep hunts what drifted in uninvited.# The Hero-Video Laws and Prompt Construction

Design every shot by these laws BEFORE generating. They predict which concepts land first-try and which burn credits. Each one came from a real build that either succeeded because of it or failed without it.

## The twelve laws

1. **The motion agrees with the scroll.** Scrolling down must read as going down, opening up, or arriving: a pour, a descent, a teardown, an approach. Ask of every concept: "when the visitor scrolls down, does this motion feel like down?" A subject that flies UP while the visitor scrolls down fights the page and always loses.

2. **One subject, one continuous motion, no cuts.** A single subject travels through a single journey. Do not ask AI video to turn one thing into a different thing: transformations between two subjects are the hardest shot in AI video and burn money. If the user insists on one, hide the swap inside a flash or cloud moment, keep one unbroken trajectory (same heading, same position, same speed on both sides of the swap), and expect retries.

3. **Lock the path, free the body.** The trajectory stays rigid, but the subject on it must stay alive: natural movement, ripple, small adjustments. The scene needs life too: drifting steam, streaking cloud, shifting light. Never stabilize a shot by freezing the subject. A frozen subject on a clean path reads as dead footage.

4. **Plan the ending first.** The final frame is where the page comes to rest, so write it into the prompt explicitly as a composed, satisfying arrival: the cup settled on the counter, the product assembled, the destination reached. An awkward ending makes an awkward website. If the ending is a product showcase, compose it with generous margin above and below the whole product: the site's header sits over the top of the frame, and cover-cropping eats the edges on wider or shorter screens. A product with its top cut off reads as an accident; squeezed against the nav it reads as busy. The alternative that dodges the problem entirely: a full-bleed texture ending with nothing croppable is text-safe on every screen. Verify by viewing the ending frame with the header mocked over it, at a wide window and a short one, before approving.

5. **Choose forgiving subjects.** Fluids, mist, steam, light, fabric, and distant silhouettes render beautifully. Anything whose exact anatomy every viewer knows up close (controllers, keyboards, hands, familiar animals in detail) will show its errors instantly. Keep risky detail distant, simple, and moving.

6. **Prefer a vertical motion axis.** A straight up-and-down journey matches the scroll axis one to one, so the reveal moves with the page in both directions. Not mandatory, but when two concepts are equal, take the vertical one.

7. **Compose for the layout.** Decide during concept design where the action sits in frame, and leave intentional negative space for the page's captions and story to live in. The action lane stays clear; the words flank it.

8. **Sell the boundary crossings.** When the camera passes through a surface (into water, through mist, past glass), write the physical lens moment into the prompt: a splash, droplets on the lens, a beat of blur. A clean pass through a boundary reads as fake; the mess is the realism.

9. **If the hero features a product, brand it or frame it close.** A generic unbranded object at distance reads as a placeholder. Either apply the brand mark via image editing before animating, or write the ending to land close enough that the object's design carries it.

10. **Text over footage earns its legibility.** Live video behind type is a moving background you do not control frame to frame. So every text band gets a legibility system: a local scrim (a soft dark gradient behind the words) that deepens only while that band is active, a real text shadow, and a contrast check against the WORST frame of that band, never the average. Place each band in the calmest region of its frames. If a line cannot be read at a glance over the busiest moment of its band, it fails. The working system, with code and the audit, is in `scrub-pipeline.md`.

11. **Pace text in scroll distance, not seconds.** A scroll site is read in flicks, not played at 24 frames per second. Give every caption beat a long fully-visible plateau (most of its band, enough to survive several normal scroll flicks) with short eased ramps at the edges, so a reader never sees text pop in and vanish between two flicks and never has to stop dead to catch a line. Test the beat map by flick-scrolling like a real visitor, not by slow dragging. The exact numbers and the flick test are in `scrub-pipeline.md`.

12. **The standing guards:** write "no text, no logos, no lettering anywhere" into every image and video prompt. Decline the generator's preset suggestions when you have a designed shot. And never build the site around footage the user has not approved: silent scaffolding during a render wait is fine, but nothing gets shown or finished until the video passes its gate.

## Prompt construction

### Start frame template (image, 16:9, 2k, about 2 credits)

Compose the image as frame one of the motion: the subject positioned so the journey can begin.

```
[SUBJECT] at [POSITION IN FRAME], composed as the first moment of a motion
that will [ONE-SENTENCE JOURNEY]. [LIGHTING: source, direction, mood].
[PALETTE: the three to five brand colors described as materials and light,
not hex codes]. [ATMOSPHERE: the ambient life the scene carries]. Intentional
negative space at [WHERE THE CAPTIONS WILL LIVE]. Cinematic, photorealistic,
16:9. No text, no logos, no lettering anywhere.
```

**The negative-space phrasing trap: never name empty space as darkness or emptiness.** When you reserve room for captions, describe the scene as one continuous world filling the frame edge to edge, with the calm region as part of that world: soft shadow, receding depth, a plain surface. Ask for "generous empty darkness left and right" and the model paints literal black side panels, which costs a re-roll. Edge-to-edge phrasing lands first try.

The same trap has a symmetry case. When the composition needs a centered subject, "centered" alone is not enough. Say the subject bisects the frame, dead center, the same distance from the left edge as from the right. Describe both halves as one identical treatment, and explicitly ban objects, machine parts, and bright highlights on either side. A real build took three attempts before this phrasing landed the shot.

If the user supplied a real product photo, that photo can be the start frame instead. Inspect it for resolution and composition first, and confirm the negative space works for the layout.

When the subject is a real person (the owner, the chef, the maker), their photo rides in as a reference image instead of a start frame: generate the start frame with a model that takes character references, restate their recognizable details in the prompt (hair, glasses, clothing), and inspect the result for likeness the same way you inspect for trademarks. Likeness is a brand-coherence detail; a near-miss face fails the whole site. And one hard rule before any face is generated: only use a photo of the user themselves or of a person who has agreed to appear on the site. If the photo is of anyone else, stop and ask before generating.

### Video template (image-to-video, 1080p, 6 seconds, standard mode, no audio; about 54 credits on the top-priced model, far less on a mid-priced one)

```
One continuous shot, no cuts. [SUBJECT] [VERB OF THE JOURNEY: pours, descends,
approaches, assembles] from [START STATE] to [END STATE] along [THE EXPLICIT
TRAJECTORY: straight down the center of frame, a slow forward push, etc].
The [SUBJECT] stays alive throughout: [SMALL NATURAL MOTION: ripple, sway,
micro-adjustments]. The scene stays alive: [AMBIENT LIFE: drifting steam,
shifting light, streaking cloud]. [IF A BOUNDARY IS CROSSED: the physical
lens moment, e.g. a splash and droplets on the lens with a beat of blur].
The shot ends at rest: [THE COMPOSED FINAL FRAME, fully described: what sits
where, what the light does, why it feels arrived]. No text or lettering
anywhere.
```

Generate at 1080p, not 4K. The web version gets re-encoded and compressed anyway, and 4K only multiplies the cost.

## The chaining recipe (Tier 2: a 15 to 20 second scroll journey)

One long journey built from 6-second segments that join invisibly:

1. Generate segment 1 from the start frame. Run the full inspection and ⛔ VIDEO GATE on it alone.
2. Extract the final frame of the approved segment as a full-quality PNG with ffmpeg (exact command in `ffmpeg-recipes.md`; review-grade jpgs are not good enough to chain from).
3. Upload that PNG to Higgsfield. This is the bridge from a local file to a `start_image`, and it has three steps: call `media_upload`, which returns a presigned PUT URL (a temporary upload address). Then PUT the raw PNG bytes to that URL, for example `curl -X PUT --upload-file final.png "<presigned-url>"`. Then call `media_confirm` to register the upload. The confirmed media id is what you pass as `start_image` for the next segment's image-to-video call.
4. Write the next segment's prompt so the motion CONTINUES: same heading, same speed, same lighting, picking up exactly where the previous segment rested. The join is invisible only if the motion vector never breaks. Special case that comes up often: when a segment ends in a near-empty or near-black frame (say, a single point of light), the next segment's prompt must explicitly describe what grows out of that frame. Do that and the join disappears.
5. Gate each segment separately. A rejected segment is a cheap single re-roll, not a redo of the whole journey.
6. Join the approved segments into one file with the single-encode concat in `ffmpeg-recipes.md`: feed the RAW segments into one filter and encode exactly once with the scrub settings. One encode means the joins cannot mismatch. The fallback, when raws are unavailable, is to encode every segment with IDENTICAL settings and join with the concat demuxer; identical parameters are what keep that path invisible at the joins, and mismatched ones glitch at every join.
7. The joined file is the one scrub video the page uses. The page never knows it was segments.

Only the final segment needs the composed resting ending (law 4). Middle segments should end mid-motion so the next one can continue it.

**The seam law: texture identity does not carry over.** Each generation re-imagines fine texture from its start frame. Position carries over; the exact weave, grain, or skin does not. So a rest-to-rest join on hyper-specific texture shows as a visible cut even when the motion vector is perfect. Storyboard every seam to land inside motion, or inside a moment that motivates a texture refresh: a sweep across the lens, a blur beat, a moment of darkness, a shift of light. Never butt two rest states together on specific texture. If a chain is already generated and a seam shows anyway, the rescue is the crossfade join in `ffmpeg-recipes.md`.

**Which worlds chain reliably:** abstract worlds (pure light, particles, atmosphere) are the chaining reliability champions. With no anatomy for a continuation prompt to get wrong, a three-segment chain can land first-try on every segment. When a Tier 2 concept is on the fence, this is a strong reason to go abstract.

## Declining presets

The generator sometimes pattern-matches your prompt and offers a house preset instead of generating your shot. Decline it and retry with your literal prompt. Your designed shot obeys the laws and composes for your layout; a preset does neither.

## Cost preflighting

Before ANY generation, check the exact price of the exact call you plan with `get_cost: true`. It is free. Tell the user each price in plain words before it moves: the starting frame's price before the frame ("The starting image costs about 2 credits, making it now"), then the video model menu with real prices once the frame is approved, before any video credits move. The cheap step first, the big decision second, every number real.

**The video model is a real choice, and the user makes it.** The connector offers several video models, and the price spread on identical parameters (same duration, same resolution, same mode) has measured about five to one between the top-priced model and a mid-priced one. Both ends are genuinely top tier as of this writing: independent leaderboards rank the proven default at the very top for overall quality and prompt fidelity, and the mid-priced alternative among the best for physics and cinematic motion. So preflight the SAME planned shot across the top two or three video models. Discover the current lineup with the connector's model catalog; `get_cost` is free on every one. Then present the real numbers with the honest tradeoff: the proven default is what these laws were tuned on and buys the highest ceiling; the mid-priced model is legitimate and turns a small or trial balance from one shot into many, which changes the video gate from frightening to a normal creative decision. Their money, their choice, made before anything is spent.

At the proven defaults a hero image costs about 2 credits and a hero video about 54, which is the top of the video range, and a free trial covers roughly one hero pipeline plus one retry, more with a cheaper video model. For a chained journey, preflight the whole chain and present the full total up front, per segment.# ffmpeg Recipes

Exact commands for every processing step. These parameters are proven defaults; the keyframe interval in particular is the difference between smooth and stuttering scrub.

## Folder discipline

First, the project folder itself: create a named folder for the site (the brand's name works well) at a location agreed with the user, with `index.html` and `assets/` inside, and tell the user where it lives. Raw generations and review copies live OUTSIDE that deploy folder (for example in `review/` beside the project folder, or one level up). Only processed files go into `assets/`. Nothing in the deploy folder that should not ship, ever.

## The scrub encode (the one that matters most)

Re-encode the approved raw video with a short keyframe interval, or scrubbing will stutter because the browser can only seek precisely to keyframes:

```
ffmpeg -i raw.mp4 -c:v libx264 -crf 18 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an assets/hero-scrub.mp4
```

- `-g 8 -keyint_min 8`: a keyframe every 8 frames, so every scroll position seeks cleanly.
- `-crf 18`: visually clean quality.
- `-movflags +faststart`: the metadata moves to the front so playback and Blob use start immediately.
- `-an`: strip audio; a scrub video never needs it.
- Target roughly 4 to 8 MB for a 6-second 1080p clip. If it lands far above that, raise `-crf` toward 20 to 22 and re-check quality.

### The compression fork by footage type

Footage splits into two families, and they compress in opposite ways:

**Busy detail masks artifacts.** Footage that fills the frame with busy detail (particles, full-frame fabric or texture) hides compression artifacts inside the detail, so crf can push hard. Busy full-frame detail tolerates crf 25 to 26 with a downscale to about 1700px wide (`-vf scale=1728:-2`); starting points, not targets. Full-frame texture is the densest footage of all and may need a narrower width or a higher crf still.

**Smooth gradients are the opposite.** They band instead of masking (banding is visible stair-steps across what should be a smooth color ramp). Push crf hard on a gradient-heavy clip and the calm frames break first, so check the calm gradient frames specifically.

**The method is always the same:** start from the starting points above, step ONE variable at a time (crf first, then width), and eyeball the worst frames by scrubbing, not by pausing. Artifacts that survive a freeze-frame vanish in motion on busy footage. Budget size roughly in proportion to duration: a 6-second clip wants roughly a third the size of an 18-second master. Add a downscale before ever sacrificing keyframe density, and keep every other scrub flag identical (`-preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an`).

## The tail trim (when the gate feedback is "end it earlier")

The cheapest ending fix is not a re-roll. When a shot is strong until the subject drifts back into motion near the end, cut the raw at the last steady frame. The page maps scroll to progress, not to seconds, so a shorter clip costs nothing anywhere else. Extract candidate frames around the target second, pick the one that rests best (margins, face, composition), then trim and scrub-encode in one pass:

```
ffmpeg -i raw.mp4 -t 4.3 -c:v libx264 -crf 18 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an assets/hero-scrub.mp4
```

Re-derive the poster and ending frame afterward, and re-verify the new ending with the header mocked over it, because the trimmed frame is now the page's resting composition. Only reach for a full-price re-roll when no steady frame exists at all.

## The ending-rest check (objective, one command)

Whether the ending truly rests does not have to be a judgment call. Measure the motion per frame: difference each frame against the previous one and read the average brightness of the difference, which is a motion curve:

```
ffmpeg -i raw.mp4 -vf "tblend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG" -f null -
```

Each frame prints a `YAVG` line; higher means more changed since the last frame. Read the tail of the curve: an arrival rises and falls back near its starting level; a drift stays high to the end. One command replaces the eyeball, and it decides whether the tail trim above is needed at all.

## Poster (first frame) and ending frame

```
ffmpeg -i assets/hero-scrub.mp4 -frames:v 1 -q:v 2 assets/hero-poster.jpg
ffmpeg -sseof -0.1 -i assets/hero-scrub.mp4 -update 1 -frames:v 1 -q:v 2 assets/hero-ending.jpg
```

The ending frame is a free, perfectly on-brand design asset. Reuse it in a lower section.

## Frame extraction for inspection (before the video gate)

Pull start, middle, and end frames from the RAW video and look at them yourself: anatomy, transitions, whether the ending truly rests. For a 6-second clip:

```
ffmpeg -ss 0 -i raw.mp4 -frames:v 1 -q:v 2 review/frame-start.jpg
ffmpeg -ss 3 -i raw.mp4 -frames:v 1 -q:v 2 review/frame-mid.jpg
ffmpeg -sseof -0.1 -i raw.mp4 -update 1 -frames:v 1 -q:v 2 review/frame-end.jpg
```

## The chaining frame grab (full quality, never review quality)

The frame that becomes the next segment's `start_image` must be a full-quality PNG. The `-q:v 2` review jpgs above are for your eyes only; chaining from one bakes compression into every later segment:

```
ffmpeg -sseof -0.1 -i seg.mp4 -update 1 -frames:v 1 -q:v 1 final.png
```

This PNG is what you upload via `media_upload` and `media_confirm` (the bridge is spelled out in `prompt-laws.md`), and the confirmed media id becomes the next segment's `start_image`.

## Segment concat (Tier 2 chained journeys)

**Preferred: concat the raws and encode exactly once.** Feed the RAW segments into a single filter and apply the scrub encode one time to the joined result. One encode means the joins cannot mismatch, because there is nothing to match:

```
ffmpeg -i seg1-raw.mp4 -i seg2-raw.mp4 -i seg3-raw.mp4 -filter_complex "[0:v][1:v][2:v]concat=n=3:v=1:a=0[v]" -map "[v]" -c:v libx264 -crf 25 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an assets/hero-scrub.mp4
```

(The `-crf 25` here shows the busy-footage value; the crf comes from the compression fork, and 18 is the normal starting point.)

Set `-crf` from the compression fork above: 18 as the normal starting point, harder values (plus a downscale) for busy particle or texture footage, gentler for gradient-heavy footage.

**Fallback when the raws are unavailable:** encode every segment with IDENTICAL parameters (the scrub encode above: same codec, resolution, frame rate, pixel format, `-g 8`), then concatenate losslessly with the concat demuxer:

`concat-list.txt`:
```
file 'seg1-scrub.mp4'
file 'seg2-scrub.mp4'
file 'seg3-scrub.mp4'
```

```
ffmpeg -f concat -safe 0 -i concat-list.txt -c copy assets/hero-scrub.mp4
```

If a demuxer join glitches on playback, the segments' parameters were not truly identical: re-run the scrub encode on each segment from its raw source with the exact same command, then concat again. Do not paper over a glitchy join by re-encoding the concatenated file at lower quality. And if you still have the raws, use the single-encode path instead; it makes this whole failure mode impossible.

## The crossfade rescue (when a chained join shows)

When an already-generated chain shows a visible cut at a join even though the motion continues (usually texture re-imagined at the seam; the seam law is in `prompt-laws.md`), replace the hard concat with a short crossfade per join using `xfade`. A quarter second is the proven starting point. A scrolling visitor reads it as the surface shifting, not as a cut.

The offset is the first input's length minus the fade length. Two 6-second segments with a 0.25-second fade:

```
ffmpeg -i seg1-raw.mp4 -i seg2-raw.mp4 -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.25:offset=5.75[v]" -map "[v]" -c:v libx264 -crf 18 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an assets/hero-scrub.mp4
```

For three segments, chain the xfades. Each later offset is the joined length so far minus the fade (6 + 6 - 0.25 - 0.25 = 11.5):

```
ffmpeg -i seg1-raw.mp4 -i seg2-raw.mp4 -i seg3-raw.mp4 -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.25:offset=5.75[a];[a][2:v]xfade=transition=fade:duration=0.25:offset=11.5[v]" -map "[v]" -c:v libx264 -crf 18 -preset slow -g 8 -keyint_min 8 -pix_fmt yuv420p -movflags +faststart -an assets/hero-scrub.mp4
```

Set `-crf` and any downscale from the compression fork above. This is still a single encode, so the joins cannot mismatch. Each fade trims the total by its length; the page never notices, because everything runs on progress, not seconds. Verify by scrubbing back and forth across each join, not by watching at speed. A scrub site is read at scrub speed, and that is where a seam either shows or disappears.

## Web still sizing

Resize supporting stills to about 1920px wide with ONE clean compression pass. Many hosts recompress images server-side, so upload large and clean and let the host's pass be the only lossy step (videos pass through hosts untouched):

```
ffmpeg -i raw-still.png -vf scale=1920:-2 -q:v 2 assets/section-name.jpg
```

`-q:v 2` is near-transparent JPEG quality. `-2` keeps the height even, which some encoders require. Screenshots and other sharp-edged UI imagery stay PNG or lossless WebP; the JPEG pass is for photographic stills.

## Verify after every encode

Play or frame-extract the output before using it. A silent encode failure caught now is free; caught after deploy it is a re-deploy.
# Troubleshooting: Symptom → Cause → Fix

Every entry happened in a real build. Check here before inventing a diagnosis.

## Generation

| Symptom | Cause | Fix |
|---|---|---|
| Generator suggests a preset instead of generating | It pattern-matched your prompt to a house style | Decline it and retry with your literal prompt; your designed shot beats a house style |
| A real logo or brand mark appears in the generated image | AI slipped a trademark in | Fix with a cheap image edit before animating; never animate a trademarked frame |
| The transformation "looks like two separate videos" | The trajectory broke at the swap | One unbroken vector through the transition (same heading, position, speed), or better, choose a single-subject concept |
| The subject looks frozen or lifeless | The prompt over-stabilized it to protect the path | Lock the path, free the body: keep the trajectory rigid but demand natural motion on the subject and ambient life in the scene |
| A boundary crossing (into water, through glass) looks fake | The pass was too clean | Write the physical lens moment into the prompt: splash, droplets on the lens, a beat of blur |
| The hero product reads as a placeholder | Generic unbranded object at distance | Apply the brand mark via image editing before animating, or write the ending to land close enough that the design carries it |
| Three failed videos on one concept | Concept problem, not prompt problem | Stop iterating the prompt and pivot the concept; the laws predict which concepts land first-try |
| The shot is strong but the ending will not rest (the subject drifts back into motion near the end) | The model overshot the composed arrival and kept animating | Do not re-roll first. Trim the raw to the last steady frame and scrub-encode in one pass (recipe in `ffmpeg-recipes.md`); the page runs on progress, not seconds, so a shorter clip costs nothing |
| The chained journey glitches at a segment join | Segment encode parameters were not identical, or the motion vector broke between segments | Re-encode every segment with the exact same scrub command and re-concat; if the motion itself jumps, the next segment's prompt did not continue the previous heading and speed |
| A visible cut where two chained segments meet, even though the motion continues | Each generation re-imagines fine texture from its start frame, so a rest-to-rest join on specific texture (weave, grain, skin) shows as a cut | Next time, storyboard every seam into motion or a texture-refresh moment (the seam law in `prompt-laws.md`); for the chain you already have, use the crossfade join in `ffmpeg-recipes.md` |
| A job comes back flagged nsfw on an innocent abstract shot | The safety filter misread abstract sensory language (glowing forms, flowing liquid around a shape) | Verify the balance first: flagged jobs are not charged. Then re-roll the same start frame with the prompt rewritten in plain commercial product-photography words: name the product early, describe objects not sensations, keep the same shot design |

## The scrub hero

| Symptom | Cause | Fix |
|---|---|---|
| Scrubbing does nothing on the live site but works locally | Host lacks partial-download (Range) support, so seeks clamp to zero | Fetch the video as a Blob and play the object URL (see `scrub-pipeline.md`); works everywhere |
| Scroll feels choppy at the hero's top and bottom, worse in Chrome | Un-gated seeks piling up plus per-frame DOM writes | Seek gating and delta-gated writes (see `scrub-pipeline.md`) |
| Still choppy after gating and delta-gating | The video's keyframe interval is too long | Re-encode with `-g 8 -keyint_min 8` (see `ffmpeg-recipes.md`) |
| Scrubbing freezes permanently mid-scroll | The seek-busy flag deadlocked (a seek errored and never fired `seeked`) | Reset the flag and clear the pending target in the video's `error` handler; the deadlock-safe pattern is in `scrub-pipeline.md` |
| Phones download the video or poster they never show | Poster set in HTML, or the video load not behind the static-hero gate | Set the poster via JavaScript inside the same gated code path that loads the video |
| The static hero appears on desktop, or the video loads on phones | The five gate conditions differ between CSS and JS | Make the five media queries match EXACTLY in both (see `scrub-pipeline.md`) |
| The page is broken when the video fails to load | No error path | Hide the dead video over the poster background on `error`; the page must be complete without the video |
| Screenshots of the running site show the poster or a blank stage where the scrubbing video should be, but the site works in a real browser | The video's promoted compositor layer does not composite into embedded-browser screenshots | Verify scrub behavior through the DOM instead of pixels: probe the band `--k` variables, word opacities and transforms, and `currentTime` at several scroll positions, or watch it in a real browser window. A blank screenshot of a promoted layer is not a broken site |
| The page looks completely dead in the preview: poster never set, every caption band at opacity 0, the video never seeks, and the pane reports it is hidden | A hidden or non-displayed preview pane stops compositing, so `requestAnimationFrame` never fires. Everything in the scrub hero is driven by that loop, so the DOM freezes too. The DOM-probing advice in the row above cannot help here, because the DOM itself is frozen | Stop using the pane and drive the machine's own installed Chrome headlessly; the full recipe is right below this table |
| The hero goes blank (no poster, no captions) after rotating the device or resizing the window | JS decided static-versus-scrub once at load while the CSS gates stayed live | Arm and disarm the scrub from change listeners on all five gate queries; the live-gate pattern is in `scrub-pipeline.md` |
| Double-clicking `index.html` shows the still hero and the video never loads | Browsers block `fetch` on file:// URLs, so the Blob loader falls back by design | That state is the designed fallback and must look complete. For the full scrub preview, serve the folder with any one-liner (`npx http-server`, `python -m http.server`) and open localhost; the live host serves the scrub normally |

### The headless Chrome recipe (when the preview pane is dead)

When the preview pane itself is hidden or broken, verify through the machine's own installed Chrome instead, driven headlessly over the DevTools protocol (the remote-control channel every Chrome ships with). It needs no installs and no packages:

1. Launch Chrome with `--headless=new --disable-gpu --remote-debugging-port=9222 --user-data-dir=<a temp folder> --hide-scrollbars`.
2. From Node (version 22 and later ships a global WebSocket, so this takes zero dependencies): GET `http://127.0.0.1:9222/json/list`, take the target's `webSocketDebuggerUrl`, and connect to it.
3. Over that socket, drive the page with protocol commands: `Page.navigate`, `Page.captureScreenshot`, `Runtime.evaluate`, `Emulation.setDeviceMetricsOverride`, `Emulation.setTouchEmulationEnabled`, `Emulation.setEmulatedMedia`, `Network.setBlockedURLs`, and `Input.dispatchMouseEvent`.

One gotcha: `Emulation.setTouchEmulationEnabled` rejects a `maxTouchPoints` of 0. Always send 5 and gate the behavior on the `enabled` flag instead.

Beyond rescue duty, this route makes the genuine self-test checks possible (real touch emulation, live media flips, URL blocking, real mouse presses); those are listed with the checklist in `scrub-pipeline.md`.

## The page

| Symptom | Cause | Fix |
|---|---|---|
| An entrance animation never plays, the element just appears | A later rule won the cascade over the animation's starting state | Prefix start and end states with the container class (`.card .part`, `.card.in .part`) and prove every entrance plays |
| Hovers on the 2nd and 3rd items of a staggered grid respond late even after the entrance finished | The cleanup rule that zeroes the stagger `transition-delay` has lower specificity than the nth-child delay rules it retires (`:nth-child` counts as a class), so it silently never applies | Make the cleanup selector match or beat the delay rules (repeat the nth-child in it) or put `!important` on the `0s` delay, then prove it by hovering the later siblings |
| A scroll-driven style stops responding after its entrance | `animation-fill-mode: forwards` overrides it forever | Entrance animation on the parent, dynamic style on a child |
| A background loop flashes or snaps when it starts | Positive animation delay | Negative delays (like `-1.2s`) so every loop is mid-cycle at first paint |
| Letter tails (g, y, p) are cut off | Masked or clipped text with zero breathing room | Em-based padding with matching negative margins on the mask (see `scrub-pipeline.md`) |
| The page can be dragged or shifted sideways | `overflow-x: hidden` alone, or a decoration poking past the edge | `overflow-x: clip` on BOTH `html` and `body`, `hidden` first as fallback |
| Hovers start snapping after a script runs | JavaScript overwrote `el.style.transition` | Toggle a class that declares the full combined transition instead |
| A mobile element sits off-screen with reduced motion on | Blanket `transform: none !important` wiped its positional transform | Re-apply positional transforms per breakpoint inside the reduced-motion block |
| A marquee shows a gap at the loop point | Track shorter than the widest supported screen | Duplicate items until each track exceeds about 2560px |
| Animations run while the tab is hidden or the section is off-screen | Free-running loops | Scope animation rules to a class an IntersectionObserver toggles; on `visibilitychange` toggle one body class with `body.paused *, body.paused *::before, body.paused *::after { animation-play-state: paused !important }`; rAF loops rest when converged |
| A pause written on a container never actually pauses the animations inside it | `animation-play-state` is not an inherited property, so a value set on a parent (or `inherit` on a nested rule) never reaches nested elements or pseudo-elements | The body-class pattern above; it hits every element and pseudo-element directly |

## Deploy

| Symptom | Cause | Fix |
|---|---|---|
| Live site shows a directory listing or 404 | The zip contains the project folder, not its contents | Re-zip with `index.html` at the zip's top level |
| Images look soft on the live site but sharp locally | The host resizes and recompresses images server-side | Upload larger and cleaner (about 1920px wide, one high-quality pass) so the host's pass is the only lossy step |
| Link previews show no image or the wrong URL | og tags still carry the placeholder | Patch `og:image` and `og:url` with the live absolute URL at the `<!-- DEPLOY STEP -->` comment, re-zip, re-deploy |
| The live site still shows the old version after a re-deploy | Cache | Hard-refresh, or verify against a string you know changed |
| Raw videos or review files appear on the live site | They were inside the deploy folder when it was zipped | Keep raws and review copies OUTSIDE the deploy folder, always |
| Special characters turn to gibberish after a scripted find-and-replace (arrows and ordinal marks become mojibake) | A shell command read the UTF-8 file with the wrong default encoding and wrote the damage back | Never patch site files with plain shell read and write: use the editor tool for the og patch and any text change, or read and write with explicit UTF-8. Recovery if it already happened: read the damaged file as UTF-8, encode that text to Windows-1252 bytes, decode those bytes as UTF-8, save as UTF-8, verify the characters, redeploy |

## Setup

| Symptom | Cause | Fix |
|---|---|---|
| Hostinger tools missing after adding the connector, or the sign-in page never opens | A freshly added local connector sometimes loads only on the next app start | Close Claude Code completely, reopen, return to the same chat, and trigger the sign-in again |
| The site looks frozen or broken in the app's side preview pane | The built-in pane struggles with scroll-video pages | Open the localhost link in a real web browser; that is the true preview |
| The Hostinger connector command fails on Windows | `npx` instead of `npx.cmd` | Windows uses `claude mcp add hostinger -- npx.cmd -y hostinger-api-mcp` |
| The Hostinger sign-in seems to go nowhere | The authorization opened in a different browser than the user normally uses | Warn them in advance and have them check their other browsers |
| Higgsfield tools missing right after connecting | A freshly added connector sometimes loads only on the next app start | Close Claude Code completely, reopen, return to the same chat, and verify again |
| The Higgsfield connector shows it needs authentication | The sign-in did not complete during the add | Finish it in the connectors panel: the browser opens to Higgsfield to authorize once, then re-verify with a balance call |
| Higgsfield tools present but calls fail | Connector added but not authorized, or no credits | Re-run the sign-in flow; verify with a balance call, which should return real numbers |
| The user says a setup step is done but the next step fails | "Done" was taken as verification | It never is; re-check the system yourself after every step before advancing |
| Claude skips the setup checklist and jumps straight to brand or design questions | The skill zip was never extracted and fully read (common when the zip was dragged into the chat: the project folder stays empty and the skill's files never entered the conversation) | Extract the zip into the project workspace, read SKILL.md and every reference top to bottom, and restart at Phase 1. The checklist message is always the first thing the user sees |
| Every hosting call hangs during a long session and a browser sign-in tab keeps opening | The hosting connector lost its signed-in state mid-session, so every call silently waits on a fresh sign-in | Complete the sign-in once in the tab that opens. If the popup misbehaves, one full app restart plus one sign-in fixes it cleanly. Files and the live site are never affected |

**The two-hang rule (the subsystem rule, for any tool):** a second consecutive hang on the same tool or subsystem means it is down. Stop retrying, name it out loud, and restart. Never make a third call into a hung subsystem. This is different from a slow render: a job that reports progress is working, however long it takes; a call that hangs with no response at all is the one this rule covers.
