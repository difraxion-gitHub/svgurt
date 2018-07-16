'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RECURSIVE_LINE_ALGORITHMS = exports.SVG_RENDER_TYPES = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.updateRenderType = updateRenderType;
exports.createController = createController;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _dat = require('dat.gui');

var _dat2 = _interopRequireDefault(_dat);

require('./Controller.css');

var _random = require('../utils/random');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SVG_RENDER_TYPES = exports.SVG_RENDER_TYPES = {
  CIRCLE: 'CIRCLE',
  CURVE: 'CURVE',
  LINE: 'LINE',
  RECURSIVE: 'RECURSIVE'
};

var RECURSIVE_LINE_ALGORITHMS = exports.RECURSIVE_LINE_ALGORITHMS = {
  first: 'first',
  second: 'second',
  third: 'third',
  fourth: 'fourth',
  fifth: 'fifth'
};

function openLinkInNewTab(url) {
  (0, _assign2.default)(document.createElement('a'), {
    target: '_blank',
    href: url,
    rel: 'noopener noreferrer'
  }).click();
}

var controllerConfig = {
  'Import New Image': {
    default: function _default() {}
  },

  // Image Controls
  blur: {
    default: 0,
    description: 'Image blur'
  },
  grayscale: {
    default: true
  },
  invert: {
    default: true
  },
  cannyEdgeDetection: {
    default: false
  },
  postBlur: {
    default: 0
  },
  posterize: {
    default: false
  },
  posterizeLevels: {
    default: 5
  },
  lowThreshold: {
    default: 20
  },
  highThreshold: {
    default: 50
  },
  applyFractalField: {
    default: false
  },
  fieldOpacity: {
    default: 0.5
  },
  fieldRatioX: {
    default: 0.01
  },
  fieldRatioY: {
    default: 0.01
  },
  fieldRandomSeed: {
    default: (0, _random.createRandomSeed)()
  },

  // SVG Controls
  amplitude: {
    default: 5
  },
  amplitudeRandomness: {
    default: 0.5
  },
  amountOfLines: {
    default: 150
  },
  continuous: {
    default: false
  },
  crossHatch: {
    default: true
  },
  direction: {
    default: 30
  },
  directionRandomness: {
    default: 0.01
  },
  displaceOrigin: {
    default: false
  },
  lineLength: {
    default: 6
  },
  lengthOnColor: {
    default: true
  },
  lengthRandomness: {
    default: 0.2
  },
  minColorRecognized: {
    default: 50
  },
  maxColorRecognized: {
    default: 255
  },
  maxRecursiveDepth: {
    default: 150
  },
  minLineLength: {
    default: 1
  },
  outputScale: {
    default: 1
  },
  randomSeed: {
    default: (0, _random.createRandomSeed)()
  },
  radius: {
    default: 1.5
  },
  radiusOnColor: {
    default: false
  },
  radiusRandomness: {
    default: 0.25
  },
  resurseBehindNonMatching: {
    default: false
  },
  recursiveAlgorithm: {
    default: RECURSIVE_LINE_ALGORITHMS.fifth
  },
  renderEveryXPixels: {
    default: 5
  },
  renderEveryYPixels: {
    default: 5
  },
  startAtCenterOfShapes: {
    default: false
  },
  strokeColor: {
    default: 'rgb(28, 32, 38)'
  },
  strokeWidth: {
    default: 1
  },
  strokeWidthRandomness: {
    default: 0.1
  },
  svgRenderType: {
    default: SVG_RENDER_TYPES.RECURSIVE
  },
  wavelength: {
    default: 3
  },
  wavelengthRandomness: {
    default: 0.5
  },
  waves: {
    default: 3
  },
  wavesRandomness: {
    default: 0.5
  },
  applyFractalDisplacement: {
    default: false
  },
  displacementAmount: {
    default: 5
  },
  fractalRatioX: {
    default: 0.01
  },
  fractalRatioY: {
    default: 0.01
  },
  fractalRandomSeed: {
    default: (0, _random.createRandomSeed)()
  },
  chooseSVGRenderType: {
    default: function _default() {}
  },
  autoColor: {
    default: false
  },
  'Download SVG': {
    default: function _default() {}
  },

  // General Controls
  'Live Update': {
    default: true
  },

  // About
  Github: {
    default: function _default() {
      openLinkInNewTab('https://github.com/Anemy/svgurt');
    }
  }
};

var ControllerControls = function ControllerControls() {
  var _this = this;

  (0, _classCallCheck3.default)(this, ControllerControls);

  _lodash2.default.each(controllerConfig, function (configItem, index) {
    _this[index] = configItem.default;
  });
};

function updateRenderType(controller) {
  var newRenderType = controller.settings.svgRenderType;
  var svgFolder = controller.svgFolder;
  var fractalFolder = controller.svgFolder.fractalFolder;

  if (controller.svgFolder.fractalFolder) {
    svgFolder.removeFolder(fractalFolder);
  }
  controller.svgFractalControls = {};
  _lodash2.default.each(controller.svgChangingControls, function (svgRenderSettingController) {
    svgFolder.remove(svgRenderSettingController);
  });
  controller.svgChangingControls = {};
  _lodash2.default.each(controller.svgRenderChangingControls, function (svgRenderChangingController) {
    svgFolder.remove(svgRenderChangingController);
  });
  controller.svgRenderChangingControls = {};

  var mainController = controller.settings;

  controller.svgRenderChangingControls.svgRenderType = svgFolder.add(mainController, 'svgRenderType', _lodash2.default.keys(SVG_RENDER_TYPES));

  // eslint-disable-next-line default-case
  switch (newRenderType) {
    case SVG_RENDER_TYPES.CIRCLE:
      {
        controller.svgChangingControls['strokeWidth'] = svgFolder.add(mainController, 'strokeWidth', 0, 20);
        controller.svgChangingControls['strokeWidthRandomness'] = svgFolder.add(mainController, 'strokeWidthRandomness', 0, 1);
        controller.svgChangingControls['renderEveryXPixels'] = svgFolder.add(mainController, 'renderEveryXPixels', 1, 50).step(1);
        controller.svgChangingControls['renderEveryYPixels'] = svgFolder.add(mainController, 'renderEveryYPixels', 1, 50).step(1);
        // controller.svgChangingControls['continuous'] = svgFolder.add(mainController, 'continuous');
        controller.svgChangingControls['radius'] = svgFolder.add(mainController, 'radius', 0, 50);
        controller.svgChangingControls['radiusOnColor'] = svgFolder.add(mainController, 'radiusOnColor');
        controller.svgChangingControls['radiusRandomness'] = svgFolder.add(mainController, 'radiusRandomness', 0, 1);
        break;
      }
    case SVG_RENDER_TYPES.CURVE:
      {
        controller.svgChangingControls['strokeWidth'] = svgFolder.add(mainController, 'strokeWidth', 0, 20);
        controller.svgChangingControls['strokeWidthRandomness'] = svgFolder.add(mainController, 'strokeWidthRandomness', 0, 1);
        controller.svgChangingControls['renderEveryXPixels'] = svgFolder.add(mainController, 'renderEveryXPixels', 1, 50).step(1);
        controller.svgChangingControls['renderEveryYPixels'] = svgFolder.add(mainController, 'renderEveryYPixels', 1, 50).step(1);
        controller.svgChangingControls['waves'] = svgFolder.add(mainController, 'waves', 0, 50);
        controller.svgChangingControls['wavesRandomness'] = svgFolder.add(mainController, 'wavesRandomness', 0, 1);
        controller.svgChangingControls['direction'] = svgFolder.add(mainController, 'direction', 0, 180);
        controller.svgChangingControls['directionRandomness'] = svgFolder.add(mainController, 'directionRandomness', 0, 1);
        controller.svgChangingControls['amplitude'] = svgFolder.add(mainController, 'amplitude', 0, 50);
        controller.svgChangingControls['amplitudeRandomness'] = svgFolder.add(mainController, 'amplitudeRandomness', 0, 1);
        // controller.svgRenderChangingControls['continuous'] = svgFolder.add(mainController, 'continuous');
        // if (!mainController.continuous) {
        controller.svgChangingControls['wavelength'] = svgFolder.add(mainController, 'wavelength', 0, 50);
        controller.svgChangingControls['wavelengthRandomness'] = svgFolder.add(mainController, 'wavelengthRandomness', 0, 1);
        // }
        break;
      }
    case SVG_RENDER_TYPES.LINE:
      {
        controller.svgChangingControls['strokeWidth'] = svgFolder.add(mainController, 'strokeWidth', 0, 20);
        controller.svgChangingControls['strokeWidthRandomness'] = svgFolder.add(mainController, 'strokeWidthRandomness', 0, 1);
        controller.svgRenderChangingControls['continuous'] = svgFolder.add(mainController, 'continuous');
        if (!mainController.continuous) {
          controller.svgChangingControls['renderEveryXPixels'] = svgFolder.add(mainController, 'renderEveryXPixels', 1, 50).step(1);
          controller.svgChangingControls['renderEveryYPixels'] = svgFolder.add(mainController, 'renderEveryYPixels', 1, 50).step(1);
          controller.svgChangingControls['lineLength'] = svgFolder.add(mainController, 'lineLength', 0, 50);
          controller.svgChangingControls['lengthOnColor'] = svgFolder.add(mainController, 'lengthOnColor');
          controller.svgChangingControls['lengthRandomness'] = svgFolder.add(mainController, 'lengthRandomness', 0, 1);
        } else {
          controller.svgChangingControls['minLineLength'] = svgFolder.add(mainController, 'minLineLength', 1, 50).step(1);
          controller.svgChangingControls['crossHatch'] = svgFolder.add(mainController, 'crossHatch');
          controller.svgChangingControls['amountOfLines'] = svgFolder.add(mainController, 'amountOfLines', 1, 5000).step(1);
        }
        controller.svgChangingControls['direction'] = svgFolder.add(mainController, 'direction', 0, 180);
        controller.svgChangingControls['directionRandomness'] = svgFolder.add(mainController, 'directionRandomness', 0, 1);
        break;
      }
    case SVG_RENDER_TYPES.RECURSIVE:
      {
        controller.svgChangingControls['strokeWidth'] = svgFolder.add(mainController, 'strokeWidth', 0, 20);
        controller.svgChangingControls['strokeWidthRandomness'] = svgFolder.add(mainController, 'strokeWidthRandomness', 0, 1);
        controller.svgChangingControls['renderEveryXPixels'] = svgFolder.add(mainController, 'renderEveryXPixels', 1, 50).step(1);
        controller.svgChangingControls['renderEveryYPixels'] = svgFolder.add(mainController, 'renderEveryYPixels', 1, 50).step(1);
        controller.svgChangingControls['recursiveAlgorithm'] = svgFolder.add(mainController, 'recursiveAlgorithm', _lodash2.default.keys(RECURSIVE_LINE_ALGORITHMS));
        controller.svgChangingControls['maxRecursiveDepth'] = svgFolder.add(mainController, 'maxRecursiveDepth', 1, 1000).step(1);
        break;
      }
  }
  // Add Displacement Fractal Field settings to to the end of SVG controls
  var newFractalFolder = svgFolder.addFolder('Displacement Fractal Field');
  controller.svgFolder.fractalFolder = newFractalFolder;
  controller.svgFractalControls['applyFractalDisplacement'] = newFractalFolder.add(mainController, 'applyFractalDisplacement');
  controller.svgFractalControls['displacementAmount'] = newFractalFolder.add(mainController, 'displacementAmount', 0, 200);
  controller.svgFractalControls['displaceOrigin'] = newFractalFolder.add(mainController, 'displaceOrigin');
  controller.svgFractalControls['fractalRatioX'] = newFractalFolder.add(mainController, 'fractalRatioX', 0, 1);
  controller.svgFractalControls['fractalRatioY'] = newFractalFolder.add(mainController, 'fractalRatioY', 0, 1);
  controller.svgFractalControls['fractalRandomSeed'] = newFractalFolder.add(mainController, 'fractalRandomSeed', 0, _random.MAX_SEED).step(1);
}

var datConfig = {
  // load: JSON, // When we have some states.
  useLocalStorage: true
};

function createController() {
  var gui = new _dat2.default.GUI(datConfig);

  var controller = {
    imageChangingControls: {},
    svgChangingControls: {},
    svgSettingControls: {}
  };

  var mainController = new ControllerControls();

  controller['Import New Image'] = gui.add(mainController, 'Import New Image');

  var imageFolder = gui.addFolder('Image Controls');

  controller.imageChangingControls['grayscale'] = imageFolder.add(mainController, 'grayscale');
  controller.imageChangingControls['blur'] = imageFolder.add(mainController, 'blur', 0, 30).step(1);
  controller.imageChangingControls['invert'] = imageFolder.add(mainController, 'invert');
  var posterizeFolder = imageFolder.addFolder('Posterize');
  controller.imageChangingControls['posterize'] = posterizeFolder.add(mainController, 'posterize');
  controller.imageChangingControls['posterizeLevels'] = posterizeFolder.add(mainController, 'posterizeLevels', 1, 30).step(1);
  var cannyFolder = imageFolder.addFolder('Edge Detection');
  controller.imageChangingControls['cannyEdgeDetection'] = cannyFolder.add(mainController, 'cannyEdgeDetection');
  controller.imageChangingControls['lowThreshold'] = cannyFolder.add(mainController, 'lowThreshold', 0, 128).step(1);
  controller.imageChangingControls['highThreshold'] = cannyFolder.add(mainController, 'highThreshold', 0, 128).step(1);
  var fieldFolder = imageFolder.addFolder('Fractal Field Opacity');
  controller.imageChangingControls['applyFractalField'] = fieldFolder.add(mainController, 'applyFractalField');
  controller.imageChangingControls['fieldOpacity'] = fieldFolder.add(mainController, 'fieldOpacity', 0, 1);
  controller.imageChangingControls['fieldRatioX'] = fieldFolder.add(mainController, 'fieldRatioX', 0, 1);
  controller.imageChangingControls['fieldRatioY'] = fieldFolder.add(mainController, 'fieldRatioY', 0, 1);
  controller.imageChangingControls['fieldRandomSeed'] = fieldFolder.add(mainController, 'fieldRandomSeed', 0, _random.MAX_SEED).step(1);
  controller.imageChangingControls['postBlur'] = imageFolder.add(mainController, 'postBlur', 0, 30).step(1);

  var svgFolder = gui.addFolder('SVG Controls');
  controller.svgFolder = svgFolder;
  controller.svgSettingControls['minColorRecognized'] = svgFolder.add(mainController, 'minColorRecognized', 0, 255).step(1);
  controller.svgSettingControls['maxColorRecognized'] = svgFolder.add(mainController, 'maxColorRecognized', 0, 255).step(1);
  controller.svgSettingControls['outputScale'] = svgFolder.add(mainController, 'outputScale', 0, 5);
  controller.svgSettingControls['strokeColor'] = svgFolder.addColor(mainController, 'strokeColor');
  controller.svgSettingControls['autoColor'] = svgFolder.add(mainController, 'autoColor');
  controller.downloadSvgButton = gui.add(mainController, 'Download SVG');

  controller['Live Update'] = gui.add(mainController, 'Live Update');

  var aboutFolder = gui.addFolder('About');
  controller.Github = aboutFolder.add(mainController, 'Github');

  controller.gui = gui;
  controller.settings = mainController;

  // gui.remember(mainController);

  updateRenderType(controller);

  return controller;
}