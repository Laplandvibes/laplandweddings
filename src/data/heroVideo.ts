import type { HeroVideo } from '../components/PageHero';

/**
 * Ambient aurora loop for the aurora-season home hero and the Northern Lights
 * wedding page (Vesa 19.9.2026: "prexel saisi videoitakin revontulista
 * upotettua, saisi tunnelmaa").
 *
 * Receipt (lv_permanent_rules §24, per clip):
 *   source    https://www.pexels.com/video/northern-lights-timelapse-28492331/
 *   asset id  28492331 · author T Honkamies (Pexels profile location: Finland)
 *   published 18 Sep 2024 · licence Pexels (free, commercial use, no attribution required)
 *   original  3840×2160, 24 fps, 16.96 s, real-time-lapse of green and violet aurora over a
 *             spruce treeline; no people, no logos, no buildings
 *   ours      seconds 1–13 → 1920×1080, 24 fps, no audio; mp4 H.264 CRF 30 (2.4 MB),
 *             webm VP9 CRF 36 (1.4 MB); no poster attribute: the <img> still is a Commons photo
 *   fetched   19 Sep 2026 via https://www.pexels.com/download/video/28492331/
 * Hosted locally, one site only (public/images/heroes/), never hotlinked.
 */
export const AURORA_VIDEO: HeroVideo = {
  webm: '/images/heroes/aurora-hero.webm',
  mp4: '/images/heroes/aurora-hero.mp4',
};
