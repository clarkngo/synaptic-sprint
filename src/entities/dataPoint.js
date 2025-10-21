import k from "../kaplayCtx";

export function makeDataPoint(pos) {
  return k.add([
    k.sprite("dataPoint", { anim: "spin" }),
    k.area(),
    k.scale(4),
    k.anchor("center"),
    k.pos(pos),
    k.offscreen(),
    "dataPoint",
  ]);
}
