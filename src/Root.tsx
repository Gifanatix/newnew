import React from "react";
import {
  Composition,
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { WIDTH, HEIGHT, FPS, DURATION_FRAMES } from "./constants";
import { Intro } from "./scenes/Intro";
import { CountdownCards } from "./scenes/CountdownCards";
import { Outro } from "./scenes/Outro";

// ----- Background shared across every frame -----
const Background: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at 20% 50%, #1a0a3e 0%, #0a0a14 60%, #000510 100%)",
    }}
  />
);

// Subtle moving particles
const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  const dots = Array.from({ length: 28 }, (_, i) => i);
  return (
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
      {dots.map((i) => {
        const x = ((i * 137.5) % 100);
        const y = ((i * 73.1) % 100);
        const speed = 0.15 + (i % 5) * 0.05;
        const size = 1.5 + (i % 3);
        const opacity = 0.15 + (i % 4) * 0.06;
        const drift = Math.sin(frame * speed * 0.02 + i) * 0.8;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x + drift}%`,
              top: `${(y + frame * speed * 0.02) % 100}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              background: "#a78bfa",
              opacity,
              boxShadow: `0 0 ${size * 2}px #6c63ff`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ----- Main composition -----
const RichestCountriesComp: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Background />
      <Particles />

      {/* Intro: 0–90 frames */}
      <Sequence from={0} durationInFrames={90}>
        <Intro />
      </Sequence>

      {/* Countdown cards: 90–750 frames */}
      <Sequence from={90} durationInFrames={660}>
        <CountdownCards />
      </Sequence>

      {/* Outro: 750–900 frames */}
      <Sequence from={750} durationInFrames={150}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};

// ----- Root -----
export const Root: React.FC = () => (
  <>
    <Composition
      id="RichestCountries"
      component={RichestCountriesComp}
      durationInFrames={DURATION_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  </>
);
