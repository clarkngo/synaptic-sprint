import k from "../kaplayCtx";

export function makeSonic(pos) {
  const sonic = k.add([
    k.sprite("sonic", { anim: "run" }),
    k.scale(4),
    k.area(),
    k.anchor("center"),
    k.pos(pos),
    k.body({ jumpForce: 1700 }),
    {
      dataPointCollectUI: null,
      speedBoostActive: false,
      speedBoostAura: null,
      setControls() {
        k.onButtonPress("jump", () => {
          if (this.isGrounded()) {
            this.play("jump");
            this.jump();
            k.play("jump", { volume: 0.5 });
          }
        });
      },
      setEvents() {
        this.onGround(() => {
          this.play("run");
        });
      },
    },
  ]);

  sonic.dataPointCollectUI = sonic.add([
    k.text("", { font: "mania", size: 24 }),
    k.color(255, 255, 0),
    k.anchor("center"),
    k.pos(30, -10),
  ]);

  // Add backpropagation boost aura effect (initially hidden)
  sonic.speedBoostAura = sonic.add([
    k.circle(60),
    k.color(150, 50, 255),
    k.opacity(0),
    k.anchor("center"),
    k.pos(0, 0),
    k.z(-1),
  ]);

  return sonic;
}
