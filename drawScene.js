import { resizeCanvasToDisplaySize } from "./utils.js";

const { mat4 } = glMatrix;

export function drawScene(
  gl,
  program,
  locations,
  buffers,
  totalTime,
) {
  resizeCanvasToDisplaySize(gl.canvas);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  const model_view = mat4.create();
  mat4.translate(model_view, model_view, [0.0, 0.0, -6.0])
  mat4.rotateX(model_view, model_view, totalTime * 0.5);
  mat4.rotateY(model_view, model_view, totalTime * 0.7);
  mat4.rotateZ(model_view, model_view, totalTime * 0.9);

  const projection = mat4.perspective(
    mat4.create(),
    (45 * Math.PI) / 180,
    gl.canvas.clientWidth / gl.canvas.clientHeight,
    0.1,
    100.0,
  );

  const normalMatrix = mat4.create();
  mat4.invert(normalMatrix, model_view);
  mat4.transpose(normalMatrix, normalMatrix);

  gl.clearColor(0.1, 0.2, 0.3, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);

  gl.enableVertexAttribArray(locations.position);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(locations.position, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
  gl.vertexAttribPointer(locations.normal, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(locations.normal);

  gl.enableVertexAttribArray(locations.color);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  gl.vertexAttribPointer(locations.color, 4, gl.FLOAT, false, 0, 0);

  gl.uniformMatrix4fv(locations.model, false, model_view);
  gl.uniformMatrix4fv(
    locations.projection,
    false,
    projection,
  );
  gl.uniformMatrix4fv(
    locations.normalMatrix,
    false,
    normalMatrix,
  );

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
}

