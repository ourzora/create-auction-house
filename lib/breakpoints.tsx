import facepaint from 'facepaint';

/* ALL BREAKPOINTS FOR MORE GRANULAR CONTROL */
export const breakpoints = [420, 640, 768, 1280, 1440, 1921]
export const mq = facepaint(
  breakpoints.map(bp => `@media (min-width: ${bp}px)`)
)

/* GENERAL BREAKPOINTS BETWEEN PORTRAIT AND LARGER LAPTOP */
export const breakpoints_main = [900, 1280, 1440]
export const mqMain = facepaint(
  breakpoints_main.map(bp => `@media (min-width: ${bp}px)`)
)
