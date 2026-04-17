/**
 * Intro scene — 0 to 3 s (90 frames)
 * Displays the title with a glowing reveal.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from "remotion";
import { COLORS, FONT_FAMILY, FPS } from "../constants";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();

  // Title slides up + fades in
  const titleProgress = spring({
    frame,
    fps: FPS,
    config: { damping: 18, stiffness: 80 },
  });

  const titleY = interpolate(titleProgress, [0, 1], [60, 0]);
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle fades in slightly later
  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow pulse
  const glowPulse = 0.7 + 0.3 * Math.sin(frame * 0.15);

  // Divider line grows
  const lineWidth = interpolate(frame, [25, 55], [0, 680], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Top label */}
      <div
        style={{
          opacity: subtitleOpacity,
          color: COLORS.accentGlow,
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: 8,
          textTransform: "uppercase",
          marginBottom: 20,
        }}
      >
        2026 Edition
      </div>

      {/* Main title */}
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: COLORS.white,
            lineHeight: 1.1,
            textShadow: `0 0 ${40 * glowPulse}px ${COLORS.accentGlow}, 0 0 80px ${COLORS.accent}`,
          }}
        >
          Top 5 Richest
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.goldGlow})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Countries in the World
        </div>
      </div>

      {/* Glowing divider */}
      <div
        style={{
          marginTop: 32,
          height: 3,
          width: lineWidth,
          background: `linear-gradient(90deg, transparent, ${COLORS.accent}, ${COLORS.goldGlow}, transparent)`,
          borderRadius: 2,
          boxShadow: `0 0 16px ${COLORS.accentGlow}`,
        }}
      />

      {/* GDP per capita label */}
      <div
        style={{
          opacity: subtitleOpacity,
          color: COLORS.muted,
          fontSize: 26,
          marginTop: 20,
          letterSpacing: 3,
        }}
      >
        Ranked by GDP per Capita
      </div>
    </AbsoluteFill>
  );
};
