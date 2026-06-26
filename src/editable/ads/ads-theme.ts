// ✏️ EDITABLE — theme the ads to match this site. Devs own this file.
// You control the LOOK here (radius, border, shadow, background, label color).
// You CANNOT change the ad's shape/fit from here — that stays locked in
// src/lib/ad-slots.ts, so the ad always displays correctly no matter what.

import type { AdSkin } from '@/lib/ads/ad-frame'

// Site-wide default skin — tune to your brand.
export const adSkin: AdSkin = {
  radius: '16px',
  border: '1px solid rgba(255,255,255,0.10)',
  shadow: '0 18px 50px -28px rgba(0,0,0,0.85)',
  background: '#141417',
  labelClassName: 'bg-[#ff5e2b] text-white',
}

// Optional per-slot overrides — adjust only where you need to.
export const adSkinBySlot: Partial<Record<string, AdSkin>> = {
  sidebar: { radius: '14px', shadow: 'none', border: '1px solid rgba(255,255,255,0.12)' },
  popup: { radius: '20px' },
  header: { radius: '18px', background: '#101013' },
  footer: { radius: '18px', background: '#101013' },
}

/** Merge site default + per-slot override for a slot. */
export function skinFor(slot: string): AdSkin {
  return { ...adSkin, ...(adSkinBySlot[slot] ?? {}) }
}
// junior tweak
