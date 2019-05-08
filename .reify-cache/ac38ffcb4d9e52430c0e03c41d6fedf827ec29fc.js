"use strict";var test;module.link('tape-promise/tape',{default(v){test=v}},0);var GLTFPostProcessor;module.link('@loaders.gl/gltf/gltf/gltf-post-processor',{default(v){GLTFPostProcessor=v}},1);/* eslint-disable max-len, camelcase */




const TEST_CASES = [
  {
    name: 'KHR_lights_punctual',
    gltf: {
      extensionsUsed: ['KHR_lights_punctual'],
      extensions: {
        KHR_lights_punctual: {
          lights: [
            {
              color: [1.0, 1.0, 1.0],
              type: 'directional'
            }
          ]
        }
      },
      nodes: [
        {
          extensions: {
            KHR_lights_punctual: {
              light: 0
            }
          }
        }
      ]
    },
    postProcessed: {
      extensionsUsed: [],
      extensions: {},
      nodes: [
        {
          extensions: {},
          id: 'node-0',
          children: [],
          light: {
            color: [1.0, 1.0, 1.0],
            type: 'directional'
          }
        }
      ]
    }
  }
];

test('GLTF roundtrip#extensions', t => {
  const postProcessor = new GLTFPostProcessor();
  const gltf = TEST_CASES[0].gltf;
  postProcessor.postProcess(gltf);

  t.deepEqual(TEST_CASES[0].gltf, TEST_CASES[0].postProcessed, TEST_CASES[0].name);

  t.end();
});