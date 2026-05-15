/**
 * Build-time OG image generator
 * Route: /og/[slug].png
 *
 * Generates a 1200×630 PNG for each blog post using satori + resvg-js.
 * The image is referenced in BaseHead.astro when type="article".
 *
 * Layout (matches the screenshot style):
 *   - Blurred/dimmed hero image fills the left ~45% as a tilted card
 *   - Right side: domain pill, title, tags, "Read more" button
 *   - Orange accent bar at the bottom
 */

import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import fs from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

// ── Font loading ──────────────────────────────────────────────────────────────
// We load Space Grotesk from the local .astro font cache that Astro already
// downloaded. Falls back to a system sans-serif if not found.

async function loadFont(weight: 400 | 700): Promise<ArrayBuffer | null> {
  // Astro caches Google fonts in .astro/fonts/
  const fontDir = path.resolve('.astro/fonts');
  try {
    const files = await fs.readdir(fontDir);
    // Match font-heading-{weight}-normal-latin-*.woff2
    const match = files.find(
      (f) => f.startsWith(`font-heading-${weight}-normal-latin`) && f.endsWith('.woff2')
    );
    if (match) {
      const buf = await fs.readFile(path.join(fontDir, match));
      return buf.buffer as ArrayBuffer;
    }
  } catch { /* font dir not found, will use fallback */ }
  return null;
}

// ── Static paths ──────────────────────────────────────────────────────────────

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts.map((post) => ({ params: { slug: post.id } }));
};

// ── Image dimensions ──────────────────────────────────────────────────────────

const W = 1200;
const H = 630;

// ── Route handler ─────────────────────────────────────────────────────────────

export const GET: APIRoute = async ({ params, site }) => {
  const slug = params.slug as string;
  const post = await getEntry('blog', slug);

  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  const { title, description, tags = [], heroImage } = post.data;
  const domain = site ? new URL(site).hostname : 'bhardwajarun.com';

  // Load fonts
  const [fontRegular, fontBold] = await Promise.all([
    loadFont(400),
    loadFont(700),
  ]);

  const fonts: satori.Font[] = [];
  if (fontRegular) fonts.push({ name: 'SpaceGrotesk', data: fontRegular, weight: 400, style: 'normal' });
  if (fontBold)    fonts.push({ name: 'SpaceGrotesk', data: fontBold,    weight: 700, style: 'normal' });

  const fontFamily = fonts.length > 0 ? 'SpaceGrotesk' : 'sans-serif';

  // Load hero image as base64 data URI (satori needs data URIs for images)
  let heroDataUri: string | null = null;
  if (heroImage) {
    try {
      // heroImage.src is like /_astro/filename.hash.ext — read from dist or src
      // During build, we read from the source asset path instead
      const srcPath = path.resolve('src', heroImage.src.replace(/^\//, '').replace(/^_astro\//, ''));
      // Try the processed path first, then fall back to src/assets
      let imgBuf: Buffer | null = null;
      try {
        imgBuf = await fs.readFile(srcPath);
      } catch {
        // Try finding the original in src/assets by matching the filename stem
        const assetsDir = path.resolve('src/assets');
        const assetFiles = await fs.readdir(assetsDir);
        // heroImage.src after Astro processing looks like /_astro/vercel-breach.abc123.png
        // The original is src/assets/vercel-breach.png
        const processedName = path.basename(heroImage.src); // e.g. vercel-breach.abc123.png
        const stemMatch = processedName.replace(/\.[a-f0-9]{8,}\.(png|jpg|jpeg|webp|avif)$/, '');
        const original = assetFiles.find((f) => f.startsWith(stemMatch));
        if (original) {
          imgBuf = await fs.readFile(path.join(assetsDir, original));
        }
      }
      if (imgBuf) {
        const ext = (heroImage.src.split('.').pop() ?? 'jpg').toLowerCase();
        const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
        heroDataUri = `data:${mime};base64,${imgBuf.toString('base64')}`;
      }
    } catch { /* skip image if unreadable */ }
  }

  // Truncate title for display
  const displayTitle = title.length > 72 ? title.slice(0, 69) + '…' : title;
  const displayDesc  = description.length > 100 ? description.slice(0, 97) + '…' : description;
  const displayTags  = tags.slice(0, 3);

  // ── Satori JSX-like object tree ───────────────────────────────────────────

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width:           `${W}px`,
          height:          `${H}px`,
          display:         'flex',
          flexDirection:   'row',
          background:      '#0D1117',
          fontFamily,
          overflow:        'hidden',
          position:        'relative',
        },
        children: [

          // ── Left panel — hero image card ──────────────────────────────────
          {
            type: 'div',
            props: {
              style: {
                width:          '480px',
                height:         '100%',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                flexShrink:     0,
                position:       'relative',
                overflow:       'hidden',
              },
              children: [
                // Blurred background glow
                heroDataUri && {
                  type: 'img',
                  props: {
                    src: heroDataUri,
                    style: {
                      position:  'absolute',
                      inset:     '-40px',
                      width:     'calc(100% + 80px)',
                      height:    'calc(100% + 80px)',
                      objectFit: 'cover',
                      filter:    'blur(32px) brightness(0.35)',
                    },
                  },
                },
                // Tilted image card
                heroDataUri
                  ? {
                      type: 'div',
                      props: {
                        style: {
                          width:        '320px',
                          height:       '400px',
                          borderRadius: '24px',
                          overflow:     'hidden',
                          transform:    'rotate(-8deg) translateY(-10px)',
                          boxShadow:    '0 32px 80px rgba(0,0,0,0.7)',
                          border:       '2px solid rgba(255,255,255,0.12)',
                          flexShrink:   0,
                          position:     'relative',
                          zIndex:       1,
                        },
                        children: [
                          {
                            type: 'img',
                            props: {
                              src: heroDataUri,
                              style: {
                                width:     '100%',
                                height:    '100%',
                                objectFit: 'cover',
                              },
                            },
                          },
                        ],
                      },
                    }
                  : // No hero image — show accent gradient card
                    {
                      type: 'div',
                      props: {
                        style: {
                          width:        '320px',
                          height:       '400px',
                          borderRadius: '24px',
                          background:   'linear-gradient(135deg, #EA580C 0%, #F97316 50%, #FDBA74 100%)',
                          transform:    'rotate(-8deg) translateY(-10px)',
                          boxShadow:    '0 32px 80px rgba(234,88,12,0.4)',
                          display:      'flex',
                          alignItems:   'center',
                          justifyContent: 'center',
                          flexShrink:   0,
                        },
                        children: [
                          {
                            type: 'div',
                            props: {
                              style: {
                                fontSize:   '80px',
                                color:      'rgba(255,255,255,0.9)',
                              },
                              children: 'AB',
                            },
                          },
                        ],
                      },
                    },
              ].filter(Boolean),
            },
          },

          // ── Right panel — text content ────────────────────────────────────
          {
            type: 'div',
            props: {
              style: {
                flex:           1,
                display:        'flex',
                flexDirection:  'column',
                justifyContent: 'center',
                padding:        '60px 56px 60px 48px',
                gap:            '0px',
              },
              children: [

                // Domain pill
                {
                  type: 'div',
                  props: {
                    style: {
                      display:        'inline-flex',
                      alignItems:     'center',
                      background:     'rgba(255,255,255,0.08)',
                      border:         '1px solid rgba(255,255,255,0.15)',
                      borderRadius:   '999px',
                      padding:        '6px 16px',
                      fontSize:       '14px',
                      color:          'rgba(255,255,255,0.7)',
                      marginBottom:   '24px',
                      width:          'fit-content',
                      letterSpacing:  '0.02em',
                    },
                    children: domain,
                  },
                },

                // Title
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize:     displayTitle.length > 50 ? '36px' : '42px',
                      fontWeight:   700,
                      color:        '#F8FAFC',
                      lineHeight:   1.2,
                      marginBottom: '16px',
                      letterSpacing: '-0.02em',
                    },
                    children: displayTitle,
                  },
                },

                // Description
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize:     '16px',
                      color:        '#94A3B8',
                      lineHeight:   1.6,
                      marginBottom: '28px',
                    },
                    children: displayDesc,
                  },
                },

                // Tags row
                displayTags.length > 0 && {
                  type: 'div',
                  props: {
                    style: {
                      display:      'flex',
                      gap:          '8px',
                      marginBottom: '32px',
                      flexWrap:     'wrap',
                    },
                    children: displayTags.map((tag) => ({
                      type: 'div',
                      props: {
                        style: {
                          background:    'rgba(249,115,22,0.15)',
                          border:        '1px solid rgba(249,115,22,0.3)',
                          borderRadius:  '999px',
                          padding:       '4px 12px',
                          fontSize:      '12px',
                          fontWeight:    600,
                          color:         '#FB923C',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        },
                        children: tag,
                      },
                    })),
                  },
                },

                // "Read more" button
                {
                  type: 'div',
                  props: {
                    style: {
                      display:        'inline-flex',
                      alignItems:     'center',
                      background:     '#EA580C',
                      borderRadius:   '999px',
                      padding:        '12px 28px',
                      fontSize:       '15px',
                      fontWeight:     700,
                      color:          '#fff',
                      width:          'fit-content',
                      letterSpacing:  '-0.01em',
                    },
                    children: 'Read more →',
                  },
                },

              ].filter(Boolean),
            },
          },

          // ── Bottom accent bar ─────────────────────────────────────────────
          {
            type: 'div',
            props: {
              style: {
                position:   'absolute',
                bottom:     0,
                left:       0,
                right:      0,
                height:     '4px',
                background: 'linear-gradient(90deg, #EA580C 0%, #F97316 50%, #FDBA74 100%)',
              },
            },
          },

        ],
      },
    },
    {
      width:  W,
      height: H,
      fonts,
    }
  );

  // ── SVG → PNG ─────────────────────────────────────────────────────────────

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: W },
  });
  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      'Content-Type':  'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
