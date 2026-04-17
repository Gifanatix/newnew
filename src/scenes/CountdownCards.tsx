/**
 * CountdownCards scene — 3 to 25 s (frames 0–660 relative)
 * Each country gets 132 frames (4.4 s). Countries shown #5 → #1.
 */
import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  Sequence,
} from "remotion";
import { COLORS, FONT_FAMILY, FPS, COUNTRIES, Country } from "../constants";

const CARD_DURATION = 132; // frames per card

// Animate an integer counting up from 0 to target
const useCountUp = (frame: number, target: number, startFrame: number, endFrame: number): string => {
  const value = interpolate(frame, [startFrame, endFrame], [0, target], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.round(value).toLocaleString("en-US");
};

// ---- Single country card ----
const CountryCard: React.FC<{ country: Country }> = ({ country }) => {
  const frame = useCurrentFrame();

  // Slide in from right
  const slideProgress = spring({
    frame,
    fps: FPS,
    config: { damping: 22, stiffness: 100, mass: 0.8 },
    durationInFrames: 30,
  });
  const cardX = interpolate(slideProgress, [0, 1], [500, 0]);
  const cardOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slide out to left at the end
  const exitStart = CARD_DURATION - 25;
  const exitProgress = interpolate(frame, [exitStart, CARD_DURATION], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitX = interpolate(exitProgress, [0, 1], [0, -500]);
  const exitOpacity = interpolate(frame, [exitStart, CARD_DURATION], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateX = cardX + exitX;
  const opacity = cardOpacity * exitOpacity;

  // Bar grows
  const barProgress = spring({
    frame: frame - 20,
    fps: FPS,
    config: { damping: 18, stiffness: 60 },
    durationInFrames: 60,
  });
  const barWidth = interpolate(barProgress, [0, 1], [0, country.barPct * 780]);

  // GDP count up
  const gdpDisplay = useCountUp(frame, country.gdp, 20, 80);

  // Glow pulse
  const glow = 0.7 + 0.3 * Math.sin(frame * 0.12);

  // Rank badge color
  const rankColor = country.rank === 1 ? COLORS.gold : COLORS.accentGlow;

  return (
    <AbsoluteFill
      style={{
        transform: `translateX(${translateX}px)`,
        opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Card */}
      <div
        style={{
          width: 1100,
          background: `linear-gradient(135deg, ${COLORS.bgCard} 0%, #1a1a3e 100%)`,
          borderRadius: 28,
          border: `2px solid ${COLORS.accent}44`,
          boxShadow: `0 0 ${40 * glow}px ${COLORS.accent}44, 0 0 80px #00000088, inset 0 1px 0 #ffffff11`,
          padding: "56px 72px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {/* Rank badge */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${rankColor}33, transparent)`,
              border: `3px solid ${rankColor}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: `0 0 ${20 * glow}px ${rankColor}88`,
            }}
          >
            <span
              style={{
                fontSize: 36,
                fontWeight: 900,
                color: rankColor,
              }}
            >
              #{country.rank}
            </span>
          </div>

          {/* Flag emoji */}
          <div style={{ fontSize: 100, lineHeight: 1, flexShrink: 0 }}>
            {country.flag}
          </div>

          {/* Country name */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: COLORS.white,
                lineHeight: 1,
                textShadow: `0 0 30px ${COLORS.accentGlow}66`,
              }}
            >
              {country.name}
            </div>
          </div>

          {/* GDP value */}
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ color: COLORS.muted, fontSize: 22, marginBottom: 4 }}>
              GDP per Capita
            </div>
            <div
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: rankColor,
                textShadow: `0 0 20px ${rankColor}`,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              ${gdpDisplay}
            </div>
          </div>
        </div>

        {/* Animated bar */}
        <div>
          <div
            style={{
              height: 18,
              background: "#1e1e3a",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: barWidth,
                background: `linear-gradient(90deg, ${COLORS.bar1}, ${COLORS.bar2}, ${rankColor})`,
                borderRadius: 10,
                boxShadow: `0 0 ${12 * glow}px ${rankColor}`,
                transition: "width 0.1s linear",
              }}
            />
          </div>
          {/* Bar label */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
              color: COLORS.muted,
              fontSize: 20,
            }}
          >
            <span>$0</span>
            <span>$150K+</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- All 5 cards in sequence ----
export const CountdownCards: React.FC = () => (
  <AbsoluteFill>
    {COUNTRIES.map((country, i) => (
      <Sequence
        key={country.rank}
        from={i * CARD_DURATION}
        durationInFrames={CARD_DURATION + 10}
      >
        <CountryCard country={country} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
