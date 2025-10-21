import k from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";
import { makeMotobug } from "../entities/motobug";
import { makeDataPoint } from "../entities/dataPoint";
import { makeBackpropBoost } from "../entities/backpropBoost";

export default function game() {
  const citySfx = k.play("city", { volume: 0.2, loop: true });
  k.setGravity(3100);
  const bgPieceWidth = 1920;
  const bgPieces = [
    k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
    k.add([
      k.sprite("chemical-bg"),
      k.pos(bgPieceWidth, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
  ];

  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite("platforms"), k.pos(384, 450), k.scale(4)]),
  ];

  const sonic = makeSonic(k.vec2(200, 745));
  sonic.setControls();
  sonic.setEvents();

  const controlsText = k.add([
    k.text("Press Space/Click/Touch to Jump!", {
      font: "mania",
      size: 64,
    }),
    k.anchor("center"),
    k.pos(k.center()),
  ]);

  const dismissControlsAction = k.onButtonPress("jump", () => {
    k.destroy(controlsText);
    dismissControlsAction.cancel();
  });

  const scoreText = k.add([
    k.text("DATA POINTS : 0", { font: "mania", size: 72 }),
    k.pos(20, 20),
  ]);
  let score = 0;
  let scoreMultiplier = 0;
  
  // Data Point collection
  sonic.onCollide("dataPoint", (dataPoint) => {
    k.play("ring", { volume: 0.5 });
    k.destroy(dataPoint);
    score++;
    scoreText.text = `DATA POINTS : ${score}`;
    sonic.dataPointCollectUI.text = "+1";
    k.wait(1, () => {
      sonic.dataPointCollectUI.text = "";
    });
  });
  
  // Backpropagation Boost collection
  sonic.onCollide("backpropBoost", (boost) => {
    k.play("hyper-ring", { volume: 0.7 });
    k.destroy(boost);
    
    // Activate speed boost
    if (!sonic.speedBoostActive) {
      sonic.speedBoostActive = true;
      sonic.dataPointCollectUI.text = "BOOST!";
      sonic.dataPointCollectUI.color = k.Color.fromArray([150, 50, 255]);
      
      // Show purple aura effect
      sonic.speedBoostAura.opacity = 0.6;
      sonic.speedBoostAura.onUpdate(() => {
        sonic.speedBoostAura.scale = k.wave(1.0, 1.3, k.time() * 5);
      });
      
      // Boost lasts for 3 seconds
      k.wait(3, () => {
        sonic.speedBoostActive = false;
        sonic.speedBoostAura.opacity = 0;
        sonic.dataPointCollectUI.text = "";
        sonic.dataPointCollectUI.color = k.Color.fromArray([255, 255, 0]);
      });
    }
  });
  
  sonic.onCollide("enemy", (enemy) => {
    if (!sonic.isGrounded()) {
      k.play("destroy", { volume: 0.5 });
      k.play("hyper-ring", { volume: 0.5 });
      k.destroy(enemy);
      sonic.play("jump");
      sonic.jump();
      scoreMultiplier += 1;
      score += 10 * scoreMultiplier;
      scoreText.text = `DATA POINTS : ${score}`;
      if (scoreMultiplier === 1)
        sonic.dataPointCollectUI.text = `+${10 * scoreMultiplier}`;
      if (scoreMultiplier > 1) sonic.dataPointCollectUI.text = `x${scoreMultiplier}`;
      k.wait(1, () => {
        sonic.dataPointCollectUI.text = "";
      });
      return;
    }

    k.play("hurt", { volume: 0.5 });
    k.setData("current-score", score);
    k.go("gameover", citySfx);
  });

  let gameSpeed = 300;
  k.loop(1, () => {
    gameSpeed += 50;
  });

  const spawnMotoBug = () => {
    const motobug = makeMotobug(k.vec2(1950, 773));
    motobug.onUpdate(() => {
      // Apply speed boost multiplier if active
      const speedMultiplier = sonic.speedBoostActive ? 1.5 : 1;
      if (gameSpeed < 3000) {
        motobug.move(-((gameSpeed + 300) * speedMultiplier), 0);
        return;
      }
      motobug.move(-(gameSpeed * speedMultiplier), 0);
    });

    motobug.onExitScreen(() => {
      if (motobug.pos.x < 0) k.destroy(motobug);
    });

    const waitTime = k.rand(0.5, 2.5);

    k.wait(waitTime, spawnMotoBug);
  };

  spawnMotoBug();

  const spawnDataPoint = () => {
    const dataPoint = makeDataPoint(k.vec2(1950, 745));
    dataPoint.onUpdate(() => {
      // Apply speed boost multiplier if active
      const speedMultiplier = sonic.speedBoostActive ? 1.5 : 1;
      dataPoint.move(-(gameSpeed * speedMultiplier), 0);
    });
    dataPoint.onExitScreen(() => {
      if (dataPoint.pos.x < 0) k.destroy(dataPoint);
    });

    const waitTime = k.rand(0.5, 3);

    k.wait(waitTime, spawnDataPoint);
  };

  spawnDataPoint();

  const spawnBackpropBoost = () => {
    const backpropBoost = makeBackpropBoost(k.vec2(1950, 700));
    backpropBoost.onUpdate(() => {
      // Apply speed boost multiplier if active
      const speedMultiplier = sonic.speedBoostActive ? 1.5 : 1;
      backpropBoost.move(-(gameSpeed * speedMultiplier), 0);
    });
    backpropBoost.onExitScreen(() => {
      if (backpropBoost.pos.x < 0) k.destroy(backpropBoost);
    });

    const waitTime = k.rand(5, 10); // Spawn less frequently than data points

    k.wait(waitTime, spawnBackpropBoost);
  };

  spawnBackpropBoost();

  k.add([
    k.rect(1920, 300),
    k.opacity(0),
    k.area(),
    k.pos(0, 832),
    k.body({ isStatic: true }),
    "platform",
  ]);

  k.onUpdate(() => {
    if (sonic.isGrounded()) scoreMultiplier = 0;

    // Apply speed boost to background and platform scrolling
    const bgSpeedMultiplier = sonic.speedBoostActive ? 1.5 : 1;
    
    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
      bgPieces.push(bgPieces.shift());
    }

    bgPieces[0].move(-(100 * bgSpeedMultiplier), 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

    // for jump effect
    bgPieces[0].moveTo(bgPieces[0].pos.x, -sonic.pos.y / 10 - 50);
    bgPieces[1].moveTo(bgPieces[1].pos.x, -sonic.pos.y / 10 - 50);

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 4, 450);
      platforms.push(platforms.shift());
    }

    platforms[0].move(-(gameSpeed * bgSpeedMultiplier), 0);
    platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450);
  });
}
