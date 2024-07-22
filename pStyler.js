const readline = require('readline');
const fs = require('fs');
const path = require('path');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const styles = {
  cinematic: "8K UHD, film grain, shallow depth of field, anamorphic lens flare, cinematic lighting, dramatic shadows, high contrast, rule of thirds composition, golden hour, lens distortion, motion blur, color grading, atmospheric haze, ultra-detailed textures, HDR, IMAX aspect ratio",
  oilPainting: "Oil painting technique, visible brush strokes, impasto, canvas texture, rich saturated colors, chiaroscuro lighting, sfumato technique, glazing layers, alla prima style, palette knife textures, varnished finish, trompe l'oeil effects",
  anime: "Anime style, cel shading, vibrant color palette, clean linework, large expressive eyes, exaggerated facial features, dynamic action lines, speed lines, chibi proportions, detailed hair highlights, sparkles and visual effects, moe aesthetic",
  digitalArt: "Digital painting, high resolution (8K), intricate details, vivid color harmonies, concept art style, hyperrealistic textures, particle effects, volumetric lighting, ambient occlusion, normal mapping, specular highlights, subsurface scattering, rule of thirds composition",
  hyperrealism: "Hyperrealistic, photorealistic, ultra-detailed micro textures, 8K resolution, tack-sharp focus, HDR lighting, subsurface scattering, true-to-life color accuracy, high dynamic range",
  popArt: "Pop art style, bold primary colors, halftone dot patterns, comic book outlines, high contrast, retro 1960s aesthetic, ben-day dots, graphic flat shadows, screen printing effect, bold typography, collage elements",
  artNouveau: "Art Nouveau style, ornate curvilinear designs, flowing organic lines, nature-inspired motifs, pastel color palette, decorative borders, stained glass effect, whiplash curves, elegant compositions",
  conceptArt: "Concept art style, imaginative environments, detailed world-building elements, vibrant color schemes, atmospheric perspective, rule of thirds composition, dynamic lighting, visual storytelling, matte painting techniques, orthographic views",
  underwater: "Underwater lighting effects, caustic light patterns, floating particles, bubbles, refracted sunlight, bioluminescent elements, flowing fabrics, distorted perspective, muted color palette, ethereal atmosphere",
  steampunk: "Steampunk aesthetic, brass and copper tones, intricate gears and clockwork, retro-futuristic machinery, leather and rivets, sepia color grading, industrial revolution inspired",
  surrealism: "Surrealist composition, dreamlike imagery, impossible physics, melting objects, visual paradoxes, juxtaposition of unrelated elements, distorted perspectives, symbolic imagery, subconscious themes, ethereal lighting, metamorphosis effects",
  fantasy: "High fantasy aesthetic, magical aura effects, enchanted atmosphere, mythical elements, epic landscapes, magical portals, glowing runes, ornate designs, spell casting visual effects, otherworldly architecture, heroic poses",
  sciFi: "Futuristic aesthetic, cyberpunk neon lighting, holographic displays, advanced technology, sleek metallic surfaces, dystopian atmosphere, bioluminescent elements, energy effects, AI interfaces, augmented reality overlays",
  impressionism: "Impressionist style, visible brushstrokes, soft diffused colors, en plein air lighting, blurred edges, atmospheric effects, broken color technique, vibrant shadows, loose painterly style",
  gothic: "Gothic aesthetic, dark brooding atmosphere, intricate carvings, medieval setting, haunting shadows, dramatic chiaroscuro lighting, stained glass effects, vaulted structures, candlelit ambiance",
  minimalism: "Minimalist composition, clean geometric shapes, limited color palette, negative space, sparse elements, monochromatic scheme, modern sleek surfaces, simple typography, Bauhaus inspired, zen aesthetic, essential forms, balanced asymmetry",
  abstract: "Abstract expressionism, non-representational forms, bold color fields, geometric shapes, dynamic brush strokes, layered textures, mixed media effect, experimental techniques, gestural mark-making, color theory exploration",
  photorealism: "Photorealistic rendering, hyper-detailed textures, true-to-life lighting and shadows, accurate reflections and refractions, depth of field, chromatic aberration, lens distortion, film grain, color grading, high dynamic range, studio lighting setups",
  retroFuturism: "1980s retro-futurism, synthwave color palette, neon glow effects, VHS artifacts, CRT screen lines, vaporwave aesthetics, old school computer graphics, wireframe models, laser grids, airbrushed style, retro sci-fi poster aesthetic",
  noir: "Classic film noir style, high contrast black and white, deep shadows, low-key lighting, Venetian blind shadows, cigarette smoke effects, rain-soaked reflections, neon sign glow, mysterious silhouettes, Dutch angle compositions",
  cubism: "Cubist style, fragmented geometric shapes, multiple perspectives, angular forms, limited color palette, flattened picture plane, analytical cubism, synthetic cubism, deconstructed objects, abstract interpretation",
  watercolor: "Watercolor painting technique, translucent washes, wet-on-wet technique, color bleeding, soft edges, granulation effects, paper texture visible, loose brushwork, gestural strokes, white space preservation, pooling pigments, layered glazes",
  artDeco: "Art Deco style, geometric patterns, luxurious materials, streamlined forms, bold curves, symmetrical compositions, stepped forms, sunburst motifs, Egyptian revival elements, metallic gold accents, sleek typography",
  pixelArt: "Pixel art style, limited color palette, visible pixels, isometric perspective, 8-bit aesthetic, dithering effects, sprite animation frames, block shading, limited resolution, nostalgic gaming visuals",
  baroque: "Baroque style, dramatic chiaroscuro, rich ornate details, dynamic compositions, theatrical lighting, emotional expressiveness, trompe l'oeil effects, elaborate drapery, voluptuous forms",
  ukiyoE: "Ukiyo-e style, Japanese woodblock print aesthetic, flat color areas, bold outlines, asymmetrical composition, negative space use, stylized waves, seasonal nature elements",
  brutalism: "Brutalist aesthetic, raw concrete textures, monolithic structures, geometric forms, exposed construction materials, minimalist functionality, imposing scale, strong shadow play, urban dystopian feel, monochromatic palette",
  glitchArt: "Digital glitch effects, corrupt data aesthetics, pixel sorting, RGB color separation, datamoshing, scan lines, VHS artifacts, distorted images, fragmented patterns, neon color palette, circuit board elements, binary code overlay",
  chalkArt: "Chalk drawing effect, textured paper background, pastel colors, soft edges, smudged shading, street art style, temporary art feel, 3D illusion techniques, anamorphic perspective, weathered look, imperfect lines",
  rococo: "Rococo style, pastel color scheme, ornate gilded details, asymmetrical designs, nature motifs, flowing curves, frilly ornamentation, whimsical themes, light and airy atmosphere",
  stainedGlass: "Stained glass effect, lead came lines, translucent color panels, geometric patterns, rose window designs, light refraction effects, mosaic-like composition",
  expressionism: "Expressionist style, distorted forms, intense colors, emotional brushwork, exaggerated perspectives, psychological themes, dream-like imagery, raw emotive power, subjective interpretation",
  cyberpunk: "Cyberpunk aesthetic, neon-lit environments, high-tech low-life, cyborg elements, holographic interfaces, dystopian urban feel, retro-futuristic technology, rainy night scenes, corporate logos, neon signs, matrix-like code",
  pointillism: "Pointillist technique, dots of pure color, optical color mixing, vibrant complementary colors, detailed stippling, scientific color theory, precise dot placement",
  synthwave: "Synthwave aesthetic, 1980s retro-futurism, neon pink and blue palette, sunset gradients, grid patterns, chrome text effects, starry skies, analog synthesizer visuals",
  collage: "Mixed media collage, layered paper textures, cut-out elements, vintage ephemera, juxtaposed images, text fragments, distressed edges, decoupage effect, surreal compositions, hand-drawn additions, photo montage",
  tiltShift: "Tilt-shift photography effect, selective focus, miniature fake effect, blurred foreground and background, heightened saturation, toy-like appearance, aerial perspective, forced perspective, diorama-style",
  risograph: "Risograph print style, limited color layers, slight misalignment, grainy textures, halftone patterns, vibrant spot colors, vintage poster look, imperfect ink coverage, minimalist designs, zine aesthetic",
  graffiti: "Street art style, spray paint texture, bold outlines, drips and splatters, wildstyle lettering, urban decay aesthetic, stencil art, wheat paste poster look, vibrant color palette",
  silhouette: "Silhouette art, high contrast black shapes, backlit scenes, dramatic backgrounds, detailed cutout style, negative space utilization, minimalist storytelling, papercut effect, shadow puppetry inspiration"
};
function askText() {
  rl.question('Enter your text: ', (text) => {
    askStyle(text);
  });
}

function askStyle(text) {
  console.log('Select a style:');
  Object.keys(styles).forEach((style, index) => {
    console.log(`${index + 1}. ${style}`);
  });
  console.log(`${Object.keys(styles).length + 1}. All styles`);

  rl.question('Enter the number of your chosen style: ', (styleNumber) => {
    if (styleNumber == Object.keys(styles).length + 1) {
      const result = generateAllStyles(text);
      saveToFile(text, result);
      console.log(`Result saved to file.`);
    } else {
      const styleKey = Object.keys(styles)[styleNumber - 1];
      if (styleKey) {
        const keywords = styles[styleKey];
        const result = `${text}, ${keywords}`;
        console.log(`Result: ${result}`);
      } else {
        console.log('Invalid style number.');
      }
    }
    askAgain();
  });
}

function generateAllStyles(text) {
  let result = text + '\n\n';
  Object.entries(styles).forEach(([style, keywords]) => {
    result += `${style}:\n${text}, ${keywords}\n\n`;
  });
  return result;
}

function saveToFile(text, content) {
  const fileName = text.split(' ').slice(0, 3).join('_') + '.txt';
  const filePath = path.join(__dirname, fileName);
  fs.writeFileSync(filePath, content);
  console.log(`File saved as: ${filePath}`);
}

function askAgain() {
  rl.question('Do you want to enter another text? (yes/no): ', (answer) => {
    if (answer.toLowerCase() === 'yes') {
      askText();
    } else {
      console.log('Goodbye!');
      rl.close();
    }
  });
}

askText();