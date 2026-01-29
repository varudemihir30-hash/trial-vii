/**
 * Aurora Component - Vanilla JavaScript version
 * Ported from Reactbits
 */

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

class Aurora {
  constructor(container, options = {}) {
    this.container = container;
    this.colorStops = options.colorStops || ['#5227FF', '#7cff67', '#5227FF'];
    this.amplitude = options.amplitude !== undefined ? options.amplitude : 1.0;
    this.blend = options.blend !== undefined ? options.blend : 0.5;
    this.time = 0;
    this.rafId = null;

    // Auto-detect OGL classes
    const OGL = window.OGL || window.ogl;
    if (!OGL) {
      console.error('Aurora: OGL library not found');
      return;
    }

    this.Renderer = OGL.Renderer || (OGL.ogl && OGL.ogl.Renderer);
    this.Program = OGL.Program || (OGL.ogl && OGL.ogl.Program);
    this.Mesh = OGL.Mesh || (OGL.ogl && OGL.ogl.Mesh);
    this.Color = OGL.Color || (OGL.ogl && OGL.ogl.Color);
    this.Triangle = OGL.Triangle || (OGL.ogl && OGL.ogl.Triangle);

    if (!this.Renderer || !this.Program || !this.Mesh || !this.Triangle) {
      console.error('Aurora: Required OGL classes not found');
      return;
    }

    this.init();
  }

  init() {
    this.renderer = new this.Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true
    });

    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);

    this.container.appendChild(this.this_canvas = this.gl.canvas);
    this.this_canvas.style.backgroundColor = 'transparent';
    this.this_canvas.style.display = 'block';

    this.geometry = new this.Triangle(this.gl);
    if (this.geometry.attributes.uv) {
      delete this.geometry.attributes.uv;
    }

    const colorStopsArray = this.colorStops.map(hex => {
      const c = new this.Color(hex);
      return [c.r, c.g, c.b];
    });

    this.program = new this.Program(this.gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: this.amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [0, 0] },
        uBlend: { value: this.blend }
      }
    });

    this.mesh = new this.Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });

    window.addEventListener('resize', () => this.resize());
    this.resize();
    this.animate();

    console.log('✓ Aurora initialized successfully');
  }

  resize() {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;
    this.renderer.setSize(width, height);
    if (this.program) {
      this.program.uniforms.uResolution.value = [width, height];
    }
  }

  animate() {
    this.time += 0.01;
    if (this.program) {
      this.program.uniforms.uTime.value = this.time;
    }
    this.renderer.render({ scene: this.mesh });
    this.rafId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this.resize);
    if (this.this_canvas && this.this_canvas.parentNode) {
      this.this_canvas.parentNode.removeChild(this.this_canvas);
    }
  }
}

window.Aurora = Aurora;
console.log('✓ Aurora class v1.5 loaded');
