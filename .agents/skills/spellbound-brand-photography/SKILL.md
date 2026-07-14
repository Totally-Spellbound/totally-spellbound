---
name: spellbound-brand-photography
description: Create or edit Totally Spellbound brand and marketing photography for storefront heroes, collection art, editorial sections and campaigns. Use when this repo needs new photographic imagery, an aspect-ratio image family, or an existing image brought into the approved cinematic style.
---

# Spellbound brand photography

The camera finds a real independent British shop, home or workshop at a charged moment.

## Art direction

- **Camera:** ARRI Alexa 35 colour response, vintage cinema glass and Kodak Vision3 500T emulation. Fine 35mm grain and restrained highlight halation.
- **Composition:** one clear subject across three planes: a soft foreground edge, a sharp middle subject and a background with real depth. Use close observational angles rather than centred catalogue layouts.
- **Light:** warm practicals, candles or task lamps shaped by cool rain-window or blue-hour fill. Shadows hold aubergine depth. Gold comes from light, brass and timber.
- **Place:** lived-in shelves, worn benches and believable domestic corners. Keep dust, patina, paper fibres, mineral inclusions, wood grain, ash and tool marks.
- **People:** cast distinctive real people. Age shows naturally in hands, hair and posture. Clothing is practical and idiosyncratic, with plum, mustard, worn linen, handmade jewellery and small prints. Keep faces outside frame unless the brief needs identity.
- **Spirituality:** imply it through objects, ritual and atmosphere. Products stay truthful in colour, scale and texture. Smoke and candlelight obey real physics.
- **Image surface:** the photograph reaches every edge. All copy, logos, borders and graphic frames belong to the interface.

`DESIGN.md` is the authority. When extending the current collection set, also read `docs/specs/collection-imagery-prompts.md` before writing the new shot brief.

## Steps

### 1. Establish the shot

Read the target surface and its live crop. Record the subject, use, copy-safe area and every required aspect ratio. Inspect neighbouring approved images so the new frame belongs to the set without repeating their scene.

Complete when the intended subject, crop constraints and output family are explicit.

### 2. Write separate compositions

Write one compact shot brief per aspect ratio in this order: subject; camera and planes; light; film response; materials; hard guardrails. Treat `16:9` and `4:5` as separate photographs. Move the camera and rebuild the layers for each frame.

Complete when every required ratio has its own copy-ready prompt and the scenes remain recognisably related.

### 3. Generate or edit

Load the `lovart-cli` and `nano-banana-pro` skills. Use Lovart's free Nano Banana Pro 4K route by default. Use Seedream only when its free queue is available or Andrew has authorised credits.

For a new frame:

```bash
lovart "<shot brief>" --model nano-banana-pro --res 4K --ratio 16:9 -o /tmp/<name>-wide.png
```

For a refinement, keep the approved parts and name only the change:

```bash
lovart "Keep <approved details>. Change <one thing>." --ref /tmp/<source>.png --model nano-banana-pro --res 4K --ratio 4:5 -o /tmp/<name>-edit.png
```

Complete when every required composition exists at 4K and no paid generation occurred without permission.

### 4. Inspect at full size

View every output. Check subject truth, hands, faces, object geometry, generated lettering, frame edges, repeated props and whether the light still feels photographic. Refine the nearest good image rather than starting over.

Complete when every image survives a full-size visual pass and each human or product detail reads as intentional.

### 5. Prepare storefront assets

Preserve the target's existing filename contract. Unless the surface specifies otherwise, export:

- wide: `2400 × 1350` and `1200 × 675` WebP;
- portrait: `1200 × 1500` and `600 × 750` WebP.

Use a centred crop only when the subject remains intact. Choose a deliberate crop position otherwise. Export around WebP quality 82, then confirm dimensions and file weights.

Complete when every source has both responsive derivatives and clean edge-to-edge pixels.

### 6. Archive and verify

Save the final prompts, model, date and any material edit prompt under `docs/specs/<campaign>-photography-prompts.md`. Extend an existing file when continuing the same set.

Open the real surface at desktop and mobile widths. Check the actual crop, copy contrast, broken images and horizontal overflow. Run the theme check when theme code or templates changed.

Complete when every shipped asset has a saved prompt, the live surface has been checked at both widths and unrelated repository changes remain untouched.
