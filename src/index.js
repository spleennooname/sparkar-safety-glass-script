
/**
 *
 *
 */

const Materials = require('Materials')
const Textures = require('Textures')
const Shaders = require('Shaders')
const CameraInfo = require('CameraInfo')
const R = require('Reactive')
const console = require('Diagnostics')
// get face material
const faceCameraMaterial = Materials.get('face0')
// get resolution
const res = R.pack2(CameraInfo.previewSize.width, CameraInfo.previewSize.height)
// get camera shader signal
const cameraColor = Textures.get('cameraTexture0').signal
// get texture coords
const texc = Shaders.vertexAttribute({ variableName: Shaders.VertexAttribute.TEX_COORDS })
// get per-fragment uv
const uv = Shaders.fragmentStage(texc)
// fx parameters
const cell = 0.05
const strength = 2
// new uv
const newUV = uv
  .mod(cell)
  .mul(strength)
  .add(
    R.val(cell)
      .mul(
        R.sign(strength).mul(R.val(-1))
      )
  )
// sampling texture color
const finalColor = Shaders.textureSampler(cameraColor, texc.add(newUV))
// Assign the shader signal to the texture slot
faceCameraMaterial.setTexture(finalColor, { textureSlotName: Shaders.DefaultMaterialTextures.DIFFUSE })
