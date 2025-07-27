"use client"

import { Particles } from "@tsparticles/react"

export function SnowParticles() {
  return (
    <Particles
      id="snow-particles"
      className="fixed inset-0 pointer-events-none z-10"
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: false,
            },
            onHover: {
              enable: false,
            },
            resize: {
              enable: true,
            },
          },
        },
        particles: {
          color: {
            value: ["#ffffff", "#e0e0e0", "#c0c0c0", "#a0a0a0"],
          },
          move: {
            direction: "bottom",
            enable: true,
            outModes: {
              default: "out",
            },
            random: true,
            speed: { min: 0.5, max: 2 },
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 100,
          },
          opacity: {
            value: { min: 0.3, max: 0.8 },
            animation: {
              enable: true,
              speed: 1,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 4 },
            animation: {
              enable: true,
              speed: 2,
            },
          },
        },
        detectRetina: true,
      }}
    />
  )
} 