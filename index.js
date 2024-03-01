import { vertexShaderSource, fragmentShaderSource } from "./shaders.js"
import { createShader, createProgram, initBuffer } from "./utils.js"
import { drawScene } from "./drawScene.js"
import { data } from "./data.js"

const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

const locations = {
  position: gl.getAttribLocation(program, "a_position"),
  normal: gl.getAttribLocation(program, "a_normal"),
  color: gl.getAttribLocation(program, "a_color"),
  model: gl.getUniformLocation(program, "u_model_view"),
  projection: gl.getUniformLocation(program, "u_projection"),
  normalMatrix: gl.getUniformLocation(program, "u_normal_matrix"),
};

const buffers = {
  position: initBuffer(gl, data.positions, gl.ARRAY_BUFFER),
  normal: initBuffer(gl, data.normals, gl.ARRAY_BUFFER),
  color: initBuffer(gl, data.colors, gl.ARRAY_BUFFER),
  indices: initBuffer(gl, data.indices, gl.ELEMENT_ARRAY_BUFFER),
}

let prevTime = 0;
let totalTime = 0;

function render(now) {
  now *= 0.001;
  totalTime += now - prevTime;
  prevTime = now;

  drawScene(
    gl,
    program,
    locations,
    buffers,
    totalTime,
  );

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
