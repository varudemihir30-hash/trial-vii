/**
 * Aurora Component - Vanilla JavaScript version
 * Converted from React component
 */

class Aurora {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      colorStops: options.colorStops || ['#5227FF', '#7cff67', '#5227FF'],
      amplitude: options.amplitude || 1.0,
      blend: options.blend || 0.5,
      speed: options.speed || 0.5,
      ...options
    };

    this.animateId = null;
    this.renderer = null;
    this.program = null;
    this.mesh = null;
    this.startTime = performance.now();

    this.init();
  }

  init() {
    if (!this.container) {
      console.error('Aurora: Container not found');
      return;
    }

    // Check if OGL is available (handle ES module default export)
    let OGL_NS = window.OGL;
    
    // ES modules might export as default
    if (OGL_NS && OGL_NS.default) {
      OGL_NS = OGL_NS.default;
      window.OGL = OGL_NS; // Update reference
    }
    
    // If still not found, try to find it
    if (!OGL_NS) {
      // Check common variations
      OGL_NS = window.ogl || window.OGL_NS;
      
      // Search window for OGL-like objects
      if (!OGL_NS) {
        for (let key in window) {
          if (key.toLowerCase().includes('ogl') && 
              typeof window[key] === 'object' && 
              window[key] !== null) {
            // Check if it has Renderer (might be default export)
            let candidate = window[key];
            if (candidate.default && candidate.default.Renderer) {
              OGL_NS = candidate.default;
            } else if (candidate.Renderer) {
              OGL_NS = candidate;
            }
            
            if (OGL_NS && OGL_NS.Renderer) {
              window.OGL = OGL_NS; // Cache it
              break;
            }
          }
        }
      }
    }
    
    if (!OGL_NS || typeof OGL_NS.Renderer === 'undefined') {
      console.error('Aurora: OGL library not loaded. Please include OGL from CDN.');
      console.error('window.OGL:', window.OGL);
      return;
    }

    console.log('Aurora: Initializing with OGL', OGL_NS);

    // Create renderer
    try {
      this.renderer = new OGL_NS.Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: true
      });
    } catch (error) {
      console.error('Aurora: Failed to create renderer', error);
      return;
    }
    
    const gl = this.renderer.gl;
    
    if (!gl) {
      console.error('Aurora: WebGL context not available');
      return;
    }
    
    console.log('Aurora: Renderer created, WebGL context:', gl);

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = 'transparent';

    // Setup canvas
    const canvas = this.renderer.gl.canvas;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.opacity = '1';
    canvas.style.visibility = 'visible';
    canvas.style.zIndex = '0';
    
    // Make sure container is properly positioned
    this.container.style.position = 'absolute';
    this.container.style.top = '0';
    this.container.style.left = '0';
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    this.container.style.zIndex = '0';
    this.container.style.pointerEvents = 'none';
    this.container.style.background = 'transparent';
    this.container.style.overflow = 'visible';
    
    this.container.appendChild(canvas);
    
    // Resize handler
    this.resizeHandler = () => this.resize();
    this.resize();
    window.addEventListener('resize', this.resizeHandler);

    // Create geometry
    const geometry = new OGL_NS.Triangle(gl);
    // Remove uv attribute if it exists
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    // Convert color stops to RGB arrays
    const colorStopsArray = this.options.colorStops.map(hex => {
      const c = new OGL_NS.Color(hex);
      return [c.r, c.g, c.b];
    });

    // Create program
    this.program = new OGL_NS.Program(gl, {
      vertex: this.vertexShader,
      fragment: this.fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: this.options.amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [this.container.offsetWidth, this.container.offsetHeight] },
        uBlend: { value: this.options.blend }
      }
    });

    this.mesh = new OGL_NS.Mesh(gl, { geometry, program: this.program });

    // Start animation
    console.log('Aurora: Starting animation loop');
    this.animate();
  }

  resize() {
    if (!this.renderer || !this.container) return;
    
    // Get container dimensions
    const width = this.container.offsetWidth || window.innerWidth;
    const height = this.container.offsetHeight || window.innerHeight;
    
    if (width === 0 || height === 0) {
      console.warn('Aurora: Container has zero dimensions', { width, height });
      return;
    }
    
    this.renderer.setSize(width, height);
    
    if (this.program && this.program.uniforms && this.program.uniforms.uResolution) {
      this.program.uniforms.uResolution.value = [width, height];
    }
    
    console.log('Aurora: Resized', { width, height });
  }

  animate() {
    this.animateId = requestAnimationFrame(() => this.animate());
    
    const t = performance.now() * 0.01;
    const time = t * (this.options.speed || 0.5) * 0.1;
    
    if (this.program && this.program.uniforms) {
      this.program.uniforms.uTime.value = time;
      this.program.uniforms.uAmplitude.value = this.options.amplitude ?? 1.0;
      this.program.uniforms.uBlend.value = this.options.blend ?? 0.5;
      
      // Update color stops if they changed
      const stops = this.options.colorStops ?? ['#5227FF', '#7cff67', '#5227FF'];
      const OGL_NS = window.OGL || window.ogl;
      if (OGL_NS && OGL_NS.Color) {
        this.program.uniforms.uColorStops.value = stops.map(hex => {
          const c = new OGL_NS.Color(hex);
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
  }

  destroy() {
    if (this.animateId) {
      cancelAnimationFrame(this.animateId);
      this.animateId = null;
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    if (this.container && this.renderer && this.renderer.gl && this.renderer.gl.canvas) {
      try {
        this.container.removeChild(this.renderer.gl.canvas);
      } catch (e) {
        // Canvas might already be removed
      }
      const gl = this.renderer.gl;
      if (gl.getExtension('WEBGL_lose_context')) {
        gl.getExtension('WEBGL_lose_context').loseContext();
      }
    }
  }

  get vertexShader() {
    return `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;
  }

  get fragmentShader() {
    return `
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

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

vec3 getColorFromRamp(float factor) {
  vec3 color0 = uColorStops[0];
  vec3 color1 = uColorStops[1];
  vec3 color2 = uColorStops[2];
  
  if (factor <= 0.5) {
    float t = factor / 0.5;
    return mix(color0, color1, t);
  } else {
    float t = (factor - 0.5) / 0.5;
    return mix(color1, color2, t);
  }
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  vec3 rampColor = getColorFromRamp(uv.x);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  gl_FragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;
  }
}

