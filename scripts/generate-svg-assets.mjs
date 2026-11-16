import fs from 'fs';
import path from 'path';

function writeSvg(filePath, svgContent) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, svgContent.trim(), 'utf8');
  console.log(`Created: ${filePath}`);
}

// 1. Brand Logo (ATHANG IMPEX)
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E5C77A" />
      <stop offset="50%" stop-color="#C6A15B" />
      <stop offset="100%" stop-color="#9C7732" />
    </linearGradient>
    <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D7B55" />
      <stop offset="100%" stop-color="#123D2A" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15" />
    </filter>
  </defs>

  <!-- Emblem Icon -->
  <g transform="translate(10, 10)">
    <!-- Outer Shield / Circle -->
    <circle cx="50" cy="50" r="46" fill="url(#leafGrad)" stroke="url(#goldGrad)" stroke-width="2.5" />
    <circle cx="50" cy="50" r="41" fill="none" stroke="#C6A15B" stroke-width="0.75" stroke-dasharray="3 3" opacity="0.7" />
    
    <!-- Central Geometric Food / Export Leaf & Globe Motif -->
    <!-- Globe Meridians -->
    <ellipse cx="50" cy="50" rx="36" ry="16" fill="none" stroke="#C6A15B" stroke-width="0.8" opacity="0.35" transform="rotate(-25 50 50)" />
    <ellipse cx="50" cy="50" rx="16" ry="36" fill="none" stroke="#C6A15B" stroke-width="0.8" opacity="0.35" transform="rotate(-25 50 50)" />

    <!-- Stylized Golden Spice / Agricultural Sprout Leaf -->
    <path d="M50 20 C62 34 68 54 50 78 C32 54 38 34 50 20 Z" fill="url(#goldGrad)" filter="url(#shadow)" />
    <!-- Leaf Center Rib -->
    <path d="M50 23 L50 75" stroke="#123D2A" stroke-width="1.8" stroke-linecap="round" />
    <path d="M50 40 Q57 43 61 47" stroke="#123D2A" stroke-width="1.2" stroke-linecap="round" />
    <path d="M50 50 Q43 53 39 57" stroke="#123D2A" stroke-width="1.2" stroke-linecap="round" />
    <path d="M50 58 Q56 61 59 64" stroke="#123D2A" stroke-width="1.2" stroke-linecap="round" />

    <!-- Accent Export Stars / Seeds -->
    <circle cx="32" cy="46" r="2" fill="#E5C77A" />
    <circle cx="68" cy="46" r="2" fill="#E5C77A" />
    <circle cx="50" cy="84" r="2.5" fill="#E5C77A" />
  </g>

  <!-- Typography: ATHANG IMPEX -->
  <text x="125" y="58" font-family="'Playfair Display', Georgia, serif" font-size="36" font-weight="700" letter-spacing="4" fill="#123D2A">
    ATHANG
  </text>
  <text x="325" y="58" font-family="'Playfair Display', Georgia, serif" font-size="36" font-weight="400" letter-spacing="4" fill="#C6A15B">
    IMPEX
  </text>

  <!-- Subtitle Tagline -->
  <text x="126" y="82" font-family="'Inter', sans-serif" font-size="11" font-weight="600" letter-spacing="3.5" fill="#70776F">
    FOOD INGREDIENTS EXPORTER
  </text>

  <!-- Fine divider underline -->
  <line x1="126" y1="92" x2="480" y2="92" stroke="#E2E0D8" stroke-width="1" />
  <line x1="126" y1="92" x2="220" y2="92" stroke="#C6A15B" stroke-width="2" />
</svg>`;

// 2. Hero Image: Editorial Scene of Indian Dehydrated Ingredients
const heroIngredientsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="100%" height="100%">
  <defs>
    <radialGradient id="heroDarkVignette" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#1B5138" />
      <stop offset="60%" stop-color="#123D2A" />
      <stop offset="100%" stop-color="#0A2217" />
    </radialGradient>
    <linearGradient id="slateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#243028" />
      <stop offset="100%" stop-color="#18201B" />
    </linearGradient>
    <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2DE9F" />
      <stop offset="50%" stop-color="#C6A15B" />
      <stop offset="100%" stop-color="#8C6A24" />
    </linearGradient>
    <linearGradient id="onionPowderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDFBF5" />
      <stop offset="50%" stop-color="#F4EEDC" />
      <stop offset="100%" stop-color="#E2D4B5" />
    </linearGradient>
    <linearGradient id="onionFlakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EADAB8" />
      <stop offset="50%" stop-color="#CEB482" />
      <stop offset="100%" stop-color="#9C7738" />
    </linearGradient>
    <linearGradient id="tomatoPowderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E75841" />
      <stop offset="50%" stop-color="#C83B25" />
      <stop offset="100%" stop-color="#8B2111" />
    </linearGradient>
    <linearGradient id="gingerPowderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8C36E" />
      <stop offset="50%" stop-color="#CF9E38" />
      <stop offset="100%" stop-color="#9E731F" />
    </linearGradient>
    <filter id="bowlShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#000" flood-opacity="0.45" />
    </filter>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="1600" height="1000" fill="url(#heroDarkVignette)" />

  <!-- Subtle Editorial Grain & Luxury Grid Pattern -->
  <g opacity="0.08" stroke="#C6A15B" stroke-width="1">
    <line x1="100" y1="0" x2="100" y2="1000" />
    <line x1="400" y1="0" x2="400" y2="1000" />
    <line x1="800" y1="0" x2="800" y2="1000" />
    <line x1="1200" y1="0" x2="1200" y2="1000" />
    <line x1="1500" y1="0" x2="1500" y2="1000" />
    <line x1="0" y1="200" x2="1600" y2="200" />
    <line x1="0" y1="500" x2="1600" y2="500" />
    <line x1="0" y1="800" x2="1600" y2="800" />
  </g>

  <!-- Textured Stone Tabletop Surface -->
  <path d="M0 480 Q800 460 1600 480 L1600 1000 L0 1000 Z" fill="url(#slateGrad)" />
  <line x1="0" y1="480" x2="1600" y2="480" stroke="#C6A15B" stroke-width="1.5" opacity="0.4" />

  <!-- Natural Linen Table Runner / Accent Sheet -->
  <polygon points="260,1000 1340,1000 1220,530 380,530" fill="#EAE5D9" opacity="0.12" />

  <!-- 4 Editorial Artisan Ceramic Bowls Arranged in Perspective -->

  <!-- BOWL 1: Dehydrated Onion Powder (Left Middle) -->
  <g transform="translate(320, 680)" filter="url(#bowlShadow)">
    <!-- Shadow & Base -->
    <ellipse cx="0" cy="40" rx="170" ry="85" fill="#0E1611" opacity="0.6" />
    <!-- Ceramic Rim -->
    <ellipse cx="0" cy="0" rx="160" ry="80" fill="#2D3B31" stroke="url(#goldTrim)" stroke-width="3.5" />
    <ellipse cx="0" cy="5" rx="146" ry="70" fill="#1C2720" />
    <!-- Powder Mound -->
    <path d="M-135 5 Q-60 -75 0 -80 Q60 -75 135 5 Q60 55 0 60 Q-60 55 -135 5 Z" fill="url(#onionPowderGrad)" />
    <!-- Soft Highlights & Texture -->
    <ellipse cx="-15" cy="-25" rx="85" ry="40" fill="#FFFFFF" opacity="0.55" />
    <ellipse cx="25" cy="-10" rx="65" ry="30" fill="#FBF9F1" opacity="0.4" />
    <!-- Spoon with Powder -->
    <path d="M-140 -20 Q-180 -80 -240 -120 L-225 -130 Q-165 -85 -125 -15 Z" fill="#7A5A35" stroke="#52391F" stroke-width="2" />
    <ellipse cx="-130" cy="-15" rx="30" ry="16" fill="url(#onionPowderGrad)" transform="rotate(-30 -130 -15)" />
    <text x="0" y="110" font-family="'Inter', sans-serif" font-size="16" font-weight="600" letter-spacing="3" fill="#E5C77A" text-anchor="middle">
      DEHYDRATED ONION POWDER
    </text>
  </g>

  <!-- BOWL 2: Dehydrated Tomato Powder (Center High-Profile) -->
  <g transform="translate(800, 620)" filter="url(#bowlShadow)">
    <ellipse cx="0" cy="50" rx="200" ry="95" fill="#0E1611" opacity="0.65" />
    <!-- Ceramic Bowl Rim -->
    <ellipse cx="0" cy="0" rx="190" ry="92" fill="#28352C" stroke="url(#goldTrim)" stroke-width="4" />
    <ellipse cx="0" cy="6" rx="175" ry="80" fill="#16221A" />
    <!-- Rich Tomato Mound -->
    <path d="M-165 5 Q-80 -105 0 -115 Q80 -105 165 5 Q80 70 0 75 Q-80 70 -165 5 Z" fill="url(#tomatoPowderGrad)" />
    <ellipse cx="-20" cy="-35" rx="100" ry="50" fill="#FF8C75" opacity="0.45" />
    <ellipse cx="35" cy="-20" rx="75" ry="35" fill="#FFA590" opacity="0.3" />
    <!-- Decorative bay leaves / botanical branch -->
    <path d="M120 -50 C145 -90 190 -95 210 -85 C195 -60 160 -50 120 -50 Z" fill="#2E7D4E" stroke="#1B5138" stroke-width="1.5" />
    <path d="M140 -70 C160 -110 205 -115 225 -100 C205 -80 175 -70 140 -70 Z" fill="#3B9E63" />
    <text x="0" y="125" font-family="'Inter', sans-serif" font-size="18" font-weight="700" letter-spacing="3.5" fill="#FF8C75" text-anchor="middle">
      DEHYDRATED TOMATO POWDER
    </text>
  </g>

  <!-- BOWL 3: Dehydrated Ginger Powder (Right Middle) -->
  <g transform="translate(1280, 680)" filter="url(#bowlShadow)">
    <ellipse cx="0" cy="40" rx="170" ry="85" fill="#0E1611" opacity="0.6" />
    <ellipse cx="0" cy="0" rx="160" ry="80" fill="#2D3B31" stroke="url(#goldTrim)" stroke-width="3.5" />
    <ellipse cx="0" cy="5" rx="146" ry="70" fill="#1C2720" />
    <path d="M-135 5 Q-60 -75 0 -80 Q60 -75 135 5 Q60 55 0 60 Q-60 55 -135 5 Z" fill="url(#gingerPowderGrad)" />
    <ellipse cx="-20" cy="-25" rx="85" ry="40" fill="#FDE49E" opacity="0.5" />
    <!-- Ginger root silhouette -->
    <path d="M100 20 Q160 5 190 -25 Q210 5 180 35 Q140 40 100 20 Z" fill="#9C7738" stroke="#755620" stroke-width="2" opacity="0.85" />
    <text x="0" y="110" font-family="'Inter', sans-serif" font-size="16" font-weight="600" letter-spacing="3" fill="#E5C77A" text-anchor="middle">
      DEHYDRATED GINGER POWDER
    </text>
  </g>

  <!-- BOWL 4 / BOARD: Dehydrated Onion Flakes (Foreground Center-Bottom) -->
  <g transform="translate(800, 840)" filter="url(#bowlShadow)">
    <ellipse cx="0" cy="30" rx="240" ry="90" fill="#0A0E0B" opacity="0.75" />
    <!-- Shallow artisan platter -->
    <ellipse cx="0" cy="0" rx="230" ry="82" fill="#232E26" stroke="url(#goldTrim)" stroke-width="3" />
    <ellipse cx="0" cy="4" rx="215" ry="72" fill="#161E18" />
    <!-- Flakes Bed -->
    <ellipse cx="0" cy="-5" rx="200" ry="65" fill="#D3BE93" />
    <!-- Scatter of individual crisp kibbled flakes -->
    <g fill="url(#onionFlakeGrad)" stroke="#B39763" stroke-width="0.8">
      <polygon points="-120,-20 -95,-35 -75,-15 -105,-5" />
      <polygon points="-80,-40 -50,-50 -35,-30 -65,-25" />
      <polygon points="-30,-45 10,-55 25,-35 -15,-20" />
      <polygon points="35,-45 75,-50 90,-30 50,-20" />
      <polygon points="95,-35 135,-40 145,-15 110,-10" />
      <polygon points="-140,5 -110,-5 -95,20 -125,25" />
      <polygon points="-85,10 -55,-5 -35,15 -70,30" />
      <polygon points="-25,10 15,5 30,25 -10,35" />
      <polygon points="40,5 80,-5 95,20 55,30" />
      <polygon points="105,10 145,0 155,25 120,30" />
      <polygon points="-50,30 -20,25 -5,45 -35,50" />
      <polygon points="10,30 45,25 60,45 25,50" />
      <polygon points="-100,25 -70,20 -60,40 -90,42" />
      <polygon points="70,25 100,20 115,40 85,45" />
    </g>
    <text x="0" y="70" font-family="'Inter', sans-serif" font-size="15" font-weight="600" letter-spacing="3" fill="#F4EEDC" text-anchor="middle">
      DEHYDRATED ONION FLAKES (KIBBLED)
    </text>
  </g>

  <!-- Editorial Crest & Quality Seal in Top-Right -->
  <g transform="translate(1380, 120)">
    <circle cx="0" cy="0" r="55" fill="#123D2A" stroke="url(#goldTrim)" stroke-width="2.5" />
    <circle cx="0" cy="0" r="48" fill="none" stroke="#C6A15B" stroke-width="1" stroke-dasharray="3 3" />
    <text x="0" y="-12" font-family="'Inter', sans-serif" font-size="10" font-weight="700" letter-spacing="2.5" fill="#C6A15B" text-anchor="middle">
      PREMIUM
    </text>
    <text x="0" y="8" font-family="'Playfair Display', Georgia, serif" font-size="18" font-weight="700" fill="#FFFFFF" text-anchor="middle">
      EXPORT
    </text>
    <text x="0" y="24" font-family="'Inter', sans-serif" font-size="9" font-weight="600" letter-spacing="2" fill="#E5C77A" text-anchor="middle">
      STANDARD
    </text>
  </g>
</svg>`;

// 3. Product 1: Dehydrated Onion Powder
const onionPowderSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgP1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF8F2" />
      <stop offset="100%" stop-color="#EBE7DC" />
    </linearGradient>
    <linearGradient id="powderGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF9" />
      <stop offset="45%" stop-color="#F7F1DF" />
      <stop offset="100%" stop-color="#E2D4B5" />
    </linearGradient>
    <linearGradient id="ceramicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#324A3B" />
      <stop offset="100%" stop-color="#182A20" />
    </linearGradient>
    <linearGradient id="goldRimP" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2DE9F" />
      <stop offset="100%" stop-color="#A37E30" />
    </linearGradient>
    <filter id="pShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#123D2A" flood-opacity="0.18" />
    </filter>
  </defs>

  <rect width="800" height="600" fill="url(#bgP1)" />
  <circle cx="400" cy="300" r="260" fill="#E3DDD0" opacity="0.5" />

  <!-- Main Ceramic Dish with Onion Powder -->
  <g transform="translate(400, 320)" filter="url(#pShadow)">
    <!-- Base Plate -->
    <ellipse cx="0" cy="40" rx="220" ry="110" fill="#123D2A" opacity="0.12" />
    <ellipse cx="0" cy="0" rx="210" ry="105" fill="url(#ceramicGrad)" stroke="url(#goldRimP)" stroke-width="4" />
    <ellipse cx="0" cy="8" rx="190" ry="90" fill="#12241A" />

    <!-- Mountain of Fine Onion Powder -->
    <path d="M-170 10 Q-80 -110 0 -120 Q80 -110 170 10 Q80 75 0 85 Q-80 75 -170 10 Z" fill="url(#powderGrad1)" />
    <!-- Fine texture highlights -->
    <ellipse cx="-25" cy="-35" rx="100" ry="50" fill="#FFFFFF" opacity="0.65" />
    <ellipse cx="35" cy="-20" rx="80" ry="40" fill="#FFFDF8" opacity="0.5" />
    
    <!-- Wooden Measuring Spoon resting with powder -->
    <path d="M-140 -20 Q-200 -70 -260 -110 L-245 -125 Q-190 -80 -130 -10 Z" fill="#8B6338" stroke="#5C3F20" stroke-width="2" />
    <ellipse cx="-135" cy="-15" rx="36" ry="20" fill="url(#powderGrad1)" transform="rotate(-30 -135 -15)" />
  </g>

  <!-- Editorial Badge -->
  <g transform="translate(680, 80)">
    <rect x="-60" y="-20" width="120" height="40" rx="4" fill="#123D2A" />
    <text x="0" y="5" font-family="'Inter', sans-serif" font-size="11" font-weight="700" letter-spacing="2" fill="#C6A15B" text-anchor="middle">
      100% PURE
    </text>
  </g>

  <!-- Product Label at bottom -->
  <text x="400" y="530" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="700" fill="#123D2A" text-anchor="middle">
    Dehydrated Onion Powder
  </text>
  <text x="400" y="555" font-family="'Inter', sans-serif" font-size="13" font-weight="500" letter-spacing="2" fill="#70776F" text-anchor="middle">
    FINE GRADE • FOOD INGREDIENTS
  </text>
</svg>`;

// 4. Product 2: Dehydrated Onion Flakes
const onionFlakesSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgP2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBF9F4" />
      <stop offset="100%" stop-color="#ECE6D7" />
    </linearGradient>
    <linearGradient id="flakeBed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EEDEB8" />
      <stop offset="50%" stop-color="#D9C292" />
      <stop offset="100%" stop-color="#B89B60" />
    </linearGradient>
    <linearGradient id="singleFlake" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F7ECDA" />
      <stop offset="100%" stop-color="#CBB17E" />
    </linearGradient>
    <filter id="flShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#123D2A" flood-opacity="0.18" />
    </filter>
  </defs>

  <rect width="800" height="600" fill="url(#bgP2)" />
  <circle cx="400" cy="300" r="260" fill="#E0D7C4" opacity="0.45" />

  <!-- Artisan Platter of Kibbled Onion Flakes -->
  <g transform="translate(400, 310)" filter="url(#flShadow)">
    <ellipse cx="0" cy="40" rx="230" ry="115" fill="#123D2A" opacity="0.12" />
    <ellipse cx="0" cy="0" rx="220" ry="110" fill="#243428" stroke="#C6A15B" stroke-width="4" />
    <ellipse cx="0" cy="6" rx="200" ry="95" fill="#152118" />

    <!-- Flake Layer Base -->
    <ellipse cx="0" cy="-5" rx="185" ry="85" fill="url(#flakeBed)" />

    <!-- Crispy Kibbled Flake Fragments -->
    <g fill="url(#singleFlake)" stroke="#A98A4C" stroke-width="1">
      <polygon points="-120,-30 -85,-50 -60,-20 -95,-10" />
      <polygon points="-70,-60 -30,-70 -15,-40 -55,-35" />
      <polygon points="-10,-65 35,-75 55,-45 10,-35" />
      <polygon points="50,-60 95,-70 115,-40 70,-30" />
      <polygon points="110,-45 155,-55 165,-25 125,-15" />

      <polygon points="-140,5 -100,-10 -80,20 -120,30" />
      <polygon points="-85,5 -45,-10 -25,20 -65,35" />
      <polygon points="-30,5 15,-10 35,20 -10,35" />
      <polygon points="35,5 80,-10 95,20 50,35" />
      <polygon points="95,5 140,-10 155,20 110,35" />

      <polygon points="-110,40 -70,30 -55,60 -95,65" />
      <polygon points="-50,45 -10,35 10,65 -30,70" />
      <polygon points="15,45 55,35 70,65 30,70" />
      <polygon points="75,40 115,30 130,60 90,65" />

      <!-- Foreground loose flakes overlapping rim -->
      <polygon points="-35,75 5,70 20,95 -20,100" />
      <polygon points="25,75 65,70 80,95 40,100" />
    </g>
  </g>

  <!-- Editorial Badge -->
  <g transform="translate(680, 80)">
    <rect x="-60" y="-20" width="120" height="40" rx="4" fill="#123D2A" />
    <text x="0" y="5" font-family="'Inter', sans-serif" font-size="11" font-weight="700" letter-spacing="2" fill="#C6A15B" text-anchor="middle">
      KIBBLED
    </text>
  </g>

  <text x="400" y="530" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="700" fill="#123D2A" text-anchor="middle">
    Dehydrated Onion Flakes
  </text>
  <text x="400" y="555" font-family="'Inter', sans-serif" font-size="13" font-weight="500" letter-spacing="2" fill="#70776F" text-anchor="middle">
    KIBBLED ONION • COMMERCIAL FOOD APPLICATIONS
  </text>
</svg>`;

// 5. Product 3: Dehydrated Tomato Powder
const tomatoPowderSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgP3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBF7F5" />
      <stop offset="100%" stop-color="#EDE0DA" />
    </linearGradient>
    <linearGradient id="tomatoMound" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EC5B44" />
      <stop offset="45%" stop-color="#C73721" />
      <stop offset="100%" stop-color="#801C0E" />
    </linearGradient>
    <filter id="tmShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#801C0E" flood-opacity="0.22" />
    </filter>
  </defs>

  <rect width="800" height="600" fill="url(#bgP3)" />
  <circle cx="400" cy="300" r="260" fill="#E8D2CB" opacity="0.45" />

  <!-- Tomato Powder Dish -->
  <g transform="translate(400, 320)" filter="url(#tmShadow)">
    <ellipse cx="0" cy="40" rx="220" ry="110" fill="#123D2A" opacity="0.12" />
    <ellipse cx="0" cy="0" rx="210" ry="105" fill="#28342B" stroke="#C6A15B" stroke-width="4" />
    <ellipse cx="0" cy="8" rx="190" ry="90" fill="#152119" />

    <!-- Rich Red Powder Mound -->
    <path d="M-170 10 Q-80 -115 0 -125 Q80 -115 170 10 Q80 75 0 85 Q-80 75 -170 10 Z" fill="url(#tomatoMound)" />
    <ellipse cx="-25" cy="-35" rx="100" ry="50" fill="#FF8D76" opacity="0.55" />
    <ellipse cx="35" cy="-20" rx="75" ry="35" fill="#FFAA96" opacity="0.4" />

    <!-- Sprig of green herb -->
    <path d="M120 -50 C145 -90 190 -95 210 -85 C195 -60 160 -50 120 -50 Z" fill="#2E7D4E" stroke="#1B5138" stroke-width="1.5" />
    <path d="M140 -70 C160 -110 205 -115 225 -100 C205 -80 175 -70 140 -70 Z" fill="#3B9E63" />
  </g>

  <!-- Editorial Badge -->
  <g transform="translate(680, 80)">
    <rect x="-60" y="-20" width="120" height="40" rx="4" fill="#123D2A" />
    <text x="0" y="5" font-family="'Inter', sans-serif" font-size="11" font-weight="700" letter-spacing="2" fill="#FF8D76" text-anchor="middle">
      VIBRANT RED
    </text>
  </g>

  <text x="400" y="530" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="700" fill="#123D2A" text-anchor="middle">
    Dehydrated Tomato Powder
  </text>
  <text x="400" y="555" font-family="'Inter', sans-serif" font-size="13" font-weight="500" letter-spacing="2" fill="#70776F" text-anchor="middle">
    PURE TOMATO SOLIDS • SOUPS, SAUCES &amp; SEASONINGS
  </text>
</svg>`;

// 6. Product 4: Dehydrated Ginger Powder
const gingerPowderSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgP4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCFAF5" />
      <stop offset="100%" stop-color="#EDE5D2" />
    </linearGradient>
    <linearGradient id="gingerMound" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ECD085" />
      <stop offset="45%" stop-color="#CCA144" />
      <stop offset="100%" stop-color="#936D1F" />
    </linearGradient>
    <filter id="gnShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#123D2A" flood-opacity="0.18" />
    </filter>
  </defs>

  <rect width="800" height="600" fill="url(#bgP4)" />
  <circle cx="400" cy="300" r="260" fill="#E5D9BF" opacity="0.45" />

  <!-- Ginger Powder Dish -->
  <g transform="translate(400, 320)" filter="url(#gnShadow)">
    <ellipse cx="0" cy="40" rx="220" ry="110" fill="#123D2A" opacity="0.12" />
    <ellipse cx="0" cy="0" rx="210" ry="105" fill="#28342B" stroke="#C6A15B" stroke-width="4" />
    <ellipse cx="0" cy="8" rx="190" ry="90" fill="#152119" />

    <!-- Warm Golden Powder Mound -->
    <path d="M-170 10 Q-80 -110 0 -120 Q80 -110 170 10 Q80 75 0 85 Q-80 75 -170 10 Z" fill="url(#gingerMound)" />
    <ellipse cx="-25" cy="-35" rx="100" ry="50" fill="#FFF2CF" opacity="0.6" />
    <ellipse cx="35" cy="-20" rx="80" ry="40" fill="#FFE5A3" opacity="0.45" />

    <!-- Ginger root piece accent -->
    <path d="M-190 20 Q-150 40 -120 20 Q-140 0 -170 5 Z" fill="#936D1F" stroke="#684D13" stroke-width="2" />
  </g>

  <!-- Editorial Badge -->
  <g transform="translate(680, 80)">
    <rect x="-60" y="-20" width="120" height="40" rx="4" fill="#123D2A" />
    <text x="0" y="5" font-family="'Inter', sans-serif" font-size="11" font-weight="700" letter-spacing="2" fill="#C6A15B" text-anchor="middle">
      AROMATIC
    </text>
  </g>

  <text x="400" y="530" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="700" fill="#123D2A" text-anchor="middle">
    Dehydrated Ginger Powder
  </text>
  <text x="400" y="555" font-family="'Inter', sans-serif" font-size="13" font-weight="500" letter-spacing="2" fill="#70776F" text-anchor="middle">
    SPICY PUNGENCY • SPICE BLENDS &amp; FOOD PROCESSING
  </text>
</svg>`;

// 7. Industry Icons / Cards (SVG Illustrations)
function createIndustrySvg(title, iconPath, accentColor = "#C6A15B") {
  const safeTitle = title.replace(/&/g, "&amp;");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
    <defs>
      <linearGradient id="bgInd" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1B5138" />
        <stop offset="100%" stop-color="#123D2A" />
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="url(#bgInd)" />
    <!-- Fine luxury framing -->
    <rect x="20" y="20" width="560" height="360" fill="none" stroke="${accentColor}" stroke-width="1.5" opacity="0.4" />
    <circle cx="300" cy="180" r="85" fill="#122A1E" stroke="${accentColor}" stroke-width="2" />
    <g transform="translate(300, 180) scale(2.2)" stroke="${accentColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      ${iconPath}
    </g>
    <text x="300" y="325" font-family="'Playfair Display', Georgia, serif" font-size="22" font-weight="700" fill="#FFFFFF" text-anchor="middle">
      ${safeTitle}
    </text>
    <line x1="250" y1="345" x2="350" y2="345" stroke="${accentColor}" stroke-width="2" />
  </svg>`;
}

// Write the primary images
writeSvg('public/images/logo.svg', logoSvg);
writeSvg('public/images/hero/hero-ingredients.svg', heroIngredientsSvg);

// Product primary SVGs
writeSvg('public/images/products/onion-powder.svg', onionPowderSvg);
writeSvg('public/images/products/onion-powder-detail.svg', onionPowderSvg);
writeSvg('public/images/products/onion-powder-field.svg', onionPowderSvg);

writeSvg('public/images/products/onion-flakes.svg', onionFlakesSvg);
writeSvg('public/images/products/onion-flakes-detail.svg', onionFlakesSvg);
writeSvg('public/images/products/onion-flakes-prep.svg', onionFlakesSvg);

writeSvg('public/images/products/tomato-powder.svg', tomatoPowderSvg);
writeSvg('public/images/products/tomato-powder-detail.svg', tomatoPowderSvg);
writeSvg('public/images/products/tomato-powder-field.svg', tomatoPowderSvg);

writeSvg('public/images/products/ginger-powder.svg', gingerPowderSvg);
writeSvg('public/images/products/ginger-powder-detail.svg', gingerPowderSvg);
writeSvg('public/images/products/ginger-powder-root.svg', gingerPowderSvg);

// Industry SVGs
const indFoodProcessing = `<path d="M-12 -12 L12 -12 L16 12 L-16 12 Z" /><circle cx="0" cy="0" r="5" /><path d="M-8 -18 L-8 -12 M8 -18 L8 -12" />`;
const indSeasoning = `<path d="M-10 10 C-10 -5 10 -5 10 10 Z" /><path d="M-3 -8 L3 -8 L2 -14 L-2 -14 Z" /><circle cx="0" cy="0" r="1" /><circle cx="-4" cy="4" r="1" /><circle cx="4" cy="4" r="1" />`;
const indSauces = `<path d="M-8 -12 L8 -12 L10 12 L-10 12 Z" /><path d="M-5 -12 L-5 -18 L5 -18 L5 -12" /><path d="M-10 4 C-5 0 5 8 10 4" />`;
const indInstantFoods = `<path d="M-14 -2 C-14 12 14 12 14 -2 Z" /><path d="M-6 -6 Q-4 -12 -6 -16" /><path d="M0 -6 Q2 -12 0 -16" /><path d="M6 -6 Q8 -12 6 -16" />`;
const indSpiceBlends = `<polygon points="0,-16 5,-5 16,0 5,5 0,16 -5,5 -16,0 -5,-5" />`;
const indCommercialCulinary = `<path d="M-12 10 L-6 -10 L6 -10 L12 10 Z" /><path d="M-16 10 L16 10" />`;

writeSvg('public/images/industries/food-processing.svg', createIndustrySvg('Food Processing', indFoodProcessing));
writeSvg('public/images/industries/seasoning.svg', createIndustrySvg('Seasoning Manufacturing', indSeasoning));
writeSvg('public/images/industries/sauces.svg', createIndustrySvg('Sauce & Dressing Production', indSauces));
writeSvg('public/images/industries/instant-foods.svg', createIndustrySvg('Instant Foods & Soups', indInstantFoods));
writeSvg('public/images/industries/spice-blends.svg', createIndustrySvg('Spice Blending & Rubs', indSpiceBlends));
writeSvg('public/images/industries/commercial-culinary.svg', createIndustrySvg('Commercial Food Service', indCommercialCulinary));

// Quality & Sourcing SVGs
const sourcingSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bgSrc" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1B5138" />
      <stop offset="100%" stop-color="#0E281C" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#bgSrc)" />
  <!-- Agricultural farm contours -->
  <path d="M0 340 Q200 300 400 320 T800 310 L800 500 L0 500 Z" fill="#246646" opacity="0.7" />
  <path d="M0 380 Q300 340 600 360 T800 350 L800 500 L0 500 Z" fill="#1B5138" />
  <!-- Crop furrow lines -->
  <line x1="100" y1="420" x2="300" y2="500" stroke="#C6A15B" stroke-width="1.5" opacity="0.4" />
  <line x1="250" y1="400" x2="450" y2="500" stroke="#C6A15B" stroke-width="1.5" opacity="0.4" />
  <line x1="400" y1="390" x2="600" y2="500" stroke="#C6A15B" stroke-width="1.5" opacity="0.4" />
  <!-- Sun & Horizon -->
  <circle cx="400" cy="220" r="90" fill="#E5C77A" opacity="0.25" />
  <circle cx="400" cy="220" r="50" fill="#C6A15B" opacity="0.4" />
  <text x="400" y="270" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="700" fill="#FFFFFF" text-anchor="middle">
    Agricultural Sourcing Across India
  </text>
  <text x="400" y="300" font-family="'Inter', sans-serif" font-size="13" font-weight="500" letter-spacing="2" fill="#C6A15B" text-anchor="middle">
    SOURCING INTEGRITY • SELECT GROWERS &amp; PROCESSORS
  </text>
</svg>`;

const qualityInspectionSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bgQ" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#123D2A" />
      <stop offset="100%" stop-color="#0A2217" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#bgQ)" />
  <rect x="40" y="40" width="720" height="420" fill="none" stroke="#C6A15B" stroke-width="1" opacity="0.4" />
  <circle cx="400" cy="220" r="100" fill="#1B5138" stroke="#C6A15B" stroke-width="2" />
  <!-- Inspection Loupe / Specification checklist mark -->
  <path d="M370 220 L395 245 L445 195" fill="none" stroke="#E5C77A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
  <text x="400" y="360" font-family="'Playfair Display', Georgia, serif" font-size="26" font-weight="700" fill="#FFFFFF" text-anchor="middle">
    Specification Alignment &amp; Verification
  </text>
  <text x="400" y="390" font-family="'Inter', sans-serif" font-size="13" font-weight="500" letter-spacing="2" fill="#C6A15B" text-anchor="middle">
    BATCH CONSISTENCY • BUYER REQUIREMENT COORDINATION
  </text>
</svg>`;

const exportLogisticsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bgLog" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A3A2C" />
      <stop offset="100%" stop-color="#0F241B" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#bgLog)" />
  <!-- Global Longitude / Latitude Arc Grid -->
  <g stroke="#C6A15B" stroke-width="0.8" opacity="0.3" fill="none">
    <ellipse cx="400" cy="220" rx="280" ry="140" />
    <ellipse cx="400" cy="220" rx="180" ry="140" />
    <ellipse cx="400" cy="220" rx="80" ry="140" />
    <line x1="120" y1="220" x2="680" y2="220" />
  </g>
  <!-- Cargo Container Vessel Icon / Motif -->
  <path d="M260 270 L540 270 L510 320 L290 320 Z" fill="#246646" stroke="#C6A15B" stroke-width="2" />
  <rect x="310" y="235" width="40" height="30" fill="#C6A15B" />
  <rect x="360" y="235" width="40" height="30" fill="#E5C77A" />
  <rect x="410" y="235" width="40" height="30" fill="#C6A15B" />
  <rect x="460" y="235" width="30" height="30" fill="#2D7B55" />
  <text x="400" y="375" font-family="'Playfair Display', Georgia, serif" font-size="26" font-weight="700" fill="#FFFFFF" text-anchor="middle">
    International Export Capabilities
  </text>
  <text x="400" y="405" font-family="'Inter', sans-serif" font-size="13" font-weight="500" letter-spacing="2" fill="#C6A15B" text-anchor="middle">
    SEAPORT &amp; AIR CARGO COORDINATION • GLOBAL DESTINATIONS
  </text>
</svg>`;

writeSvg('public/images/about/sourcing-agriculture.svg', sourcingSvg);
writeSvg('public/images/about/quality-inspection.svg', qualityInspectionSvg);
writeSvg('public/images/about/export-logistics.svg', exportLogisticsSvg);

console.log('All luxury SVG assets successfully generated!');
