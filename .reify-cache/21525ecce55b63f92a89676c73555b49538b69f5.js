"use strict";module.export({parseImageNode:()=>parseImageNode});var getPixels;module.link('get-pixels',{default(v){getPixels=v}},0);var util;module.link('util',{default(v){util=v}},1);var getImageMetadata;module.link('../lib/get-image-metadata',{getImageMetadata(v){getImageMetadata=v}},2);/* global Buffer */




async function parseImageNode(arrayBuffer, options) {
  // TODO - check if getPixels callback is asynchronous if provided with buffer input
  // if not, parseImage can be a sync function
  const getPixelsAsync = util.promisify(getPixels);

  const {mimeType} = getImageMetadata(arrayBuffer);
  const buffer = arrayBuffer instanceof Buffer ? arrayBuffer : Buffer.from(arrayBuffer);

  const ndarray = await getPixelsAsync(buffer, mimeType);
  return {
    width: ndarray.shape[0],
    height: ndarray.shape[1],
    data: ndarray.data
  };
}