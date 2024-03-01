export function resizeCanvasToDisplaySize(canvas) {
  const needResize =
    canvas.width !== canvas.clientWidth ||
    canvas.height !== canvas.clientHeight;

  if (needResize) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  return needResize;
}

export function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  }

  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

export function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program;
  }

  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

export function initBuffer(gl, data, type) {
  const buffer = gl.createBuffer();

  gl.bindBuffer(type, buffer);
  gl.bufferData(type, data, gl.STATIC_DRAW);

  return buffer;
}
