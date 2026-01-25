---
title: "Part 3: The Skybox Struggle - Wrapping Nano Bananas"
series: "From 2D Asset to 3D Studio"
part: 3
date: 2026-01-16
tags: [3D, Skybox, Gemini, Babylon.js, UI/UX]
reading_time: "10 min"
---

# Part 3: The Skybox Struggle - Wrapping Nano Bananas

**The Story So Far:** We have 3D models. But they’re floating in a void. It’s time to build a world.

![equirectangular panorama](/blog/From-2D-Asset-to-3D-Studio/Screenshot%202026-01-13%20200250.png)
## The Vision: Total Immersion

I wanted more than just a model viewer. I wanted the user to feel like they were **inside** the game. This meant building a **Skybox**—a 360-degree environment that surrounds the camera.


For this, we turned to **Gemini 2.5 Flash** (the "Nano Banana"). It’s incredibly fast and, as it turns out, surprisingly good at generating **equirectangular panoramas**.

## The Tech: The 2:1 Wrap

**The Setup:** January 16, 2026. I’m asking Gemini to dream up a "cyberpunk street at night."

The output is a flat 2:1 image that looks like a distorted world map. The challenge is taking that flat image, wrapping it into a sphere, and standing in the center.

### The Three.js Wall

Initially, we tried to stick with our **Three.js / React Three Fiber** stack. It seemed logical. But we hit a massive, frustrating wall with `OrbitControls`. 

When you’re *inside* a sphere, Three.js controls go crazy. They invert, they jitter, and they refuse to orbit "around" the camera correctly. We spent hours trying to hack the controls to feel like Google Street View.

**Narrator voice**: *They failed. Spectacularly.*

## The Pivot: Babylon.js to the Rescue

I had to make a call. I didn't want to spend another three days fighting Three.js math. I did some research and found that **Babylon.js** has a component called `PhotoDome`. 

It was built exactly for this. 

I told my AI agents: *"We’re pivoting. Rip out the R3F skybox. We’re using Babylon for this component."*

They were confused. *"But our whole app is Three.js!"*

**Me:** *"I don't care. Babylon works. Three doesn't. Build the bridge."*

## The "Yelp" Moment

![skybox generation](/blog/From-2D-Asset-to-3D-Studio/Screenshot%202026-01-15%20182034.png)

We built a wrapper component (`SimpleSkyboxViewer.tsx`) that isolated the Babylon engine from the rest of the React/Three.js stack.

The moment it loaded was pure magic.

The skybox appeared—a detailed, starry nebula I’d generated with Nano Banana. I clicked my mouse and dragged. The rotation was butter-smooth. I was *inside* the environment.

**The Moment:** I actually jumped up from my desk and let out a yelp. For the first time, it felt like a **Studio**. It wasn't just a generator anymore; it was an environment.

## What I Learned

### 1. Don't Be a Stack Zealot
Just because you started with Three.js doesn't mean you have to die with it. Use the tool that solves the problem in 10 minutes, not the one that takes 10 hours of math.

### 2. Isolation is Key
By keeping Babylon inside its own canvas and its own component, we didn't break the rest of the app. We just had a very specialized "360 Viewer" tool.

---

**Commit References**:
- `9a8b7c6` - Implement Babylon.js PhotoDome skybox viewer
- `5d4e3f2` - Connect Gemini panorama generation to skybox preview

**Related Files**:
- `src/memory/adr/023-skybox-viewer-selection.md`
- `src/components/studio/SimpleSkyboxViewer.tsx`

**Code**: [SimpleSkyboxViewer.tsx](https://github.com/zenchantlive/Asset-Hatch/blob/main/src/components/studio/SimpleSkyboxViewer.tsx)

