export const vertexShaderSource = `
      uniform mat4 u_model_view;
      uniform mat4 u_projection;
      uniform mat4 u_normal_matrix;

      attribute vec4 a_position;
      attribute vec3 a_normal;
      attribute vec4 a_color;

      varying highp vec4 v_color;
      varying highp vec3 v_lighting;

      void main() {
          gl_Position = u_projection * u_model_view * a_position;
          v_color = a_color;

          highp vec3 ambient = vec3(0.3, 0.3, 0.3);
          highp vec3 directional_color = vec3(1, 1, 1);
          highp vec3 directional_vector = normalize(vec3(0.85, 0.8, 0.75));

          highp vec4 transformed_normal = u_normal_matrix * vec4(a_normal, 1.0);

          highp float directional = max(dot(transformed_normal.xyz, directional_vector), 0.0);
          v_lighting = ambient + (directional_color * directional);
      }
`;

export const fragmentShaderSource = `
    precision mediump float;
      varying highp vec4 v_color;
      varying highp vec3 v_lighting;

      void main() {
          gl_FragColor = vec4(v_color.rgb * v_lighting, v_color.a);
      }
`;
