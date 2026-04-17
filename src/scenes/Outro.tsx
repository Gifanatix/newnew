/**
 * Outro scene — 25 to 30 s (frames 0–150 relative)
 * CTA question + subscribe bounce animation + glowing end text.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from "remotion";
import { COLORS, FONT_FAMILY, FPS } from "../constants";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();

  // Question slides up
  const questionProgress = spring({
    frame,
    fps: FPS,
    config: { damping: 20, stiffness: 90 },
    durationInFrames: 30,
  });
  const questionY = interpolate(questionProgress, [0, 1], [80, 0]);
  const questionOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subscribe badge bounces in
  const subscribeProgress = spring({
    frame: frame - 30,
    fps: FPS,
    config: { damping: 12, stiffness: 200, mass: 0.6 },
    durationInFrames: 25,
  });
  const subscribeScale = interpolate(subscribeProgress, [0, 1], [0.3, 1]);
  const subscribeOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subscribe pulse animation
  const pulse = 1 + 0.04 * Math.sin(frame * 0.25);

  // End tagline fades in
  const taglineOpacity = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Global glow pulse
  const glow = 0.6 + 0.4 * Math.sin(frame * 0.1);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
        gap: 48,
      }}
    >
      {/* Main question */}
      <div
        style={{
          transform: `translateY(${questionY}px)`,
          opacity: questionOpacity,
          textAlign: "center",
          padding: "0 120px",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: COLORS.white,
            lineHeight: 1.15,
            textShadow: `0 0 ${40 * glow}px ${COLORS.accentGlow}`,
          }}
        >
          Which country
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            background: `linear-gradient(90deg, ${COLORS.accentGlow}, ${COLORS.gold})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          surprised you most?
        </div>
      </div>

      {/* Subscribe button */}
      <div
        style={{
          transform: `scale(${subscribeScale * pulse})`,
          opacity: subscribeOpacity,
          background: "#ff0000",
          borderRadius: 16,
          padding: "22px 72px",
          display: "flex",
          alignItems: "center",
          gap: 18,
          boxShadow: `0 0 ${30 * glow}px #ff000088, 0 8px 32px #00000066`,
          cursor: "pointer",
        }}
      >
        {/* Bell icon */}
        <span style={{ fontSize: 38 }}>🔔</span>
        <span
          style={{
            fontSize: 44,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: 1,
          }}
        >
          SUBSCRIBE
        </span>
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          color: COLORS.muted,
          fontSize: 30,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        Comment your answer below 👇
      </div>

      {/* Bottom glow line */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          width: interpolate(frame, [100, 150], [0, 900], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 3,
          background: `linear-gradient(90deg, transparent, ${COLORS.accent}, ${COLORS.gold}, transparent)`,
          borderRadius: 2,
          boxShadow: `0 0 16px ${COLORS.accentGlow}`,
          opacity: taglineOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
