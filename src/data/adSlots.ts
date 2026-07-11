/**
 * LaplandWeddings — etusivun standardi mainospaikat (LV Media).
 *
 * JAETTU MALLI: MainPartnerBanner (sponsors[0]) heti heron alle +
 * HomeAdSlots-osio (sponsors[1] + 6 premium-paikkaa) heti ensimmäisen
 * sisältöosion jälkeen.
 *
 * MYYTY KUMPPANI → täytä sponsors[0]/[1] tai spotin partner + BUILD + DEPLOY.
 * Tyhjät paikat renderöivät house-adin ("Haluatko mainoksesi tähän?") joka
 * linkittää LV Media -portaaliin.
 */

import type { HomeAdSlotsConfig } from '../../../shared/HomeAdSlots';
import { DEFAULT_PREMIUM_SPOTS } from '../../../shared/PremiumSpotGrid';

export const AD_SLOTS: HomeAdSlotsConfig = {
  siteSlug: 'laplandweddings',
  sponsors: [null, null],
  spots: DEFAULT_PREMIUM_SPOTS,
};
