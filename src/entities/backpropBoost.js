import k from "../kaplayCtx";

export function makeBackpropBoost(pos) {
  return k.add([
    k.sprite("backpropBoost", { anim: "pulse" }),
    k.area(),
    k.scale(4),
    k.anchor("center"),
    k.pos(pos),
    k.offscreen(),
    "backpropBoost",
  ]);
}
