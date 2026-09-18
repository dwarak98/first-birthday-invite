let context: AudioContext | null = null;
let noise: AudioBuffer | null = null;
let lastBurstAt = 0;

function audioContext() {
  if (!context) {
    context = new AudioContext();
  }
  return context;
}

function noiseBuffer(ctx: AudioContext) {
  if (noise) return noise;
  const length = Math.floor(ctx.sampleRate * 0.22);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  noise = buffer;
  return noise;
}

function cracklePop(ctx: AudioContext, time: number, frequency: number, duration: number, gain: number) {
  const source = ctx.createBufferSource();
  source.buffer = noiseBuffer(ctx);

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = frequency;
  filter.Q.value = 1.8;

  const amp = ctx.createGain();
  amp.gain.setValueAtTime(0.0001, time);
  amp.gain.exponentialRampToValueAtTime(gain, time + 0.004);
  amp.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  source.connect(filter);
  filter.connect(amp);
  amp.connect(ctx.destination);
  source.start(time);
  source.stop(time + duration + 0.02);
}

export function armFireworkSound() {
  const ctx = audioContext();
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
}

export function playFireworkCrackle() {
  const now = performance.now();
  if (now - lastBurstAt < 160) return;
  lastBurstAt = now;

  const ctx = audioContext();
  if (ctx.state === "suspended") {
    void ctx.resume();
  }

  const t = ctx.currentTime;
  const jitter = Math.random();

  cracklePop(ctx, t, 2400 + jitter * 400, 0.09, 0.16);
  cracklePop(ctx, t + 0.018, 3200 + jitter * 500, 0.07, 0.12);
  cracklePop(ctx, t + 0.042, 1800 + jitter * 300, 0.11, 0.1);
  cracklePop(ctx, t + 0.07, 4100 + jitter * 600, 0.05, 0.08);
}
