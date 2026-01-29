/**
 * Aurora Component - Vanilla JavaScript version
 * Adapted from ReactBits React component
 */

class Aurora {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      // Keep existing colors as requested
      colorStops: options.colorStops || ['#020f3e', '#1fad7e', '#213e97'],
      amplitude: options.amplitude || 1.0,
      blend: options.blend || 0.5,
      speed: options.speed || 1.0,
      ...options
    };

    this.animateId = null;
    this.renderer = null;
    this.program = null;
    this.mesh = null;

    // Store propsRef equivalent for the animation loop
    this.propsRef = this.options;

    this.init();
  }

  init() {
    if (!this.container) return;

    // Check if OGL is available
    let OGL_NS = window.OGL || window.ogl;
    if (!OGL_NS) {
      // Try to find it in window
      for (let key in window) {
        if (key.toLowerCase().includes('ogl') && window[key]?.Renderer) {
          OGL_NS = window[key];
          break;
        }
      }
    }

    if (!OGL_NS) {
      console.error('Aurora: OGL not found');
      return;
    }

    const { Renderer, Program, Mesh, Color, Triangle } = OGL_NS;

    try {
      this.renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: true
      });
    } catch (e) {
      console.error('Aurora: Renderer init failed', e);
      return;
    }

    const gl = this.renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    // Explicitly handle canvas style
    const canvas = gl.canvas;
    canvas.style.backgroundColor = 'transparent';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1'; // Ensure it is behind content if index is managed

    this.container.appendChild(canvas);

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

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const colorStopsArray = this.options.colorStops.map(hex => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });

    this.program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: this.options.amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [this.container.offsetWidth, this.container.offsetHeight] },
        uBlend: { value: this.options.blend }
      }
    });

    this.mesh = new Mesh(gl, { geometry, program: this.program });

    // Resize handler
    this.resize = () => {
      if (!this.container) return;
      const width = this.container.offsetWidth;
      const height = this.container.offsetHeight;
      this.renderer.setSize(width, height);
      if (this.program) {
        // Mobile Zoom Hack: Pass larger resolution to shader to zoom in the noise/gradient
        const isMobile = window.innerWidth < 768;
        const scaleFactor = isMobile ? 3.0 : 1.0; // Zoom 3x on mobile
        this.program.uniforms.uResolution.value = [width * scaleFactor, height * scaleFactor];
      }
    };
    window.addEventListener('resize', this.resize);
    this.resize();

    // Start Animation Loop
    this.animate(0);
  }

  animate(t) {
    this.animateId = requestAnimationFrame((time) => this.animate(time));

    // Match React component update logic: t * 0.01
    const time = t * 0.01;
    const speed = this.options.speed || 1.0;

    if (this.program) {
      this.program.uniforms.uTime.value = time * speed * 0.1;
      this.program.uniforms.uAmplitude.value = this.propsRef.amplitude ?? 1.0;
      this.program.uniforms.uBlend.value = this.propsRef.blend ?? 0.5;

      const stops = this.propsRef.colorStops;
      if (window.OGL || window.ogl) {
        const Color = (window.OGL || window.ogl).Color;
        this.program.uniforms.uColorStops.value = stops.map(hex => {
          const c = new Color(hex);
          return [c.r, c.g, c.b];
        });
      }
    }

    if (this.renderer && this.mesh) {
      this.renderer.render({ scene: this.mesh });
    }
  }

  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.propsRef = this.options;
  }

  destroy() {
    if (this.animateId) {
      cancelAnimationFrame(this.animateId);
    }
    window.removeEventListener('resize', this.resize);

    if (this.container && this.renderer && this.renderer.gl && this.renderer.gl.canvas) {
      if (this.container.contains(this.renderer.gl.canvas)) {
        this.container.removeChild(this.renderer.gl.canvas);
      }

      const gl = this.renderer.gl;
      const ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    }
  }
}
