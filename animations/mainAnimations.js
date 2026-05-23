// animations/mainAnimations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initGlobalAnimations() {
  console.log("Global animations initialized");
}
