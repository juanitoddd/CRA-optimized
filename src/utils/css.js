// Takes a nested CSS Object and returns a plain Object of CSS Properties

const _apiURL = process.env.REACT_APP_API_URL;
const apiUrl = _apiURL.substring(0, _apiURL.length - 4);
// @param _background []
export const parseCssBackground = _background => {
  const _bgImage = [];
  const _bgPosition = [];
  const _bgSize = [];
  const _bgRepeat = [];
  const _bgAttachment = [];
  _background.map(_bg => {
    if (_bg.visible) {
      switch (_bg.type) {
        case "solid":
          _bgImage.push(`linear-gradient(${_bg.color}, ${_bg.color})`);
          break;
        case "image":
          _bgImage.push(`url(${apiUrl}/${_bg.image})`);
          if (_bg.position) {
            _bgPosition.push(_bg.position);
          }
          if (_bg.repeat) {
            _bgRepeat.push(_bg.repeat);
          }
          if (_bg.attachment) {
            _bgAttachment.push(_bg.attachment);
          }
          if (_bg.size === "custom") {
            const _w = _bg.sizeCustom.width;
            const _h = _bg.sizeCustom.height;
            const _str = `${_w ? `${_w.value}${_w.unit}` : "auto"} ${
              _h ? `${_h.value}${_h.unit}` : "auto"
              }`;
            _bgSize.push(_str);
          } else {
            _bgSize.push(_bg.size);
          }
          break;
        case "linear-gradient":
          // TODO
          break;
        case "radial-gradient":
          // TODO
          break;
      }
    } else {
      // _bgImage.push("none");
    }
  });

  const _plain = {};
  if (_bgImage.length) {
    _plain.backgroundImage = _bgImage.join(", ");
  }
  if (_bgRepeat.length) {
    _plain.backgroundRepeat = _bgRepeat.join(", ");
  }
  if (_bgSize.length) {
    _plain.backgroundSize = _bgSize.join(", ");
  }
  if (_bgPosition.length) {
    _plain.backgroundPosition = _bgPosition.join(", ");
  }
  if (_bgAttachment.length) {
    _plain.backgroundAttachment = _bgAttachment.join(", ");
  }
  return _plain;
};

// Not Used
// @param _typography {}
export const parseCssTypography = _typo => {
  const _plain = {
    fontFamily: _typo.fontFamily,
    fontSize: `${_typo.fontSize.value}${_typo.fontSize.unit}`,
    fontStyle: _typo.fontStyle,
    fontWeight: _typo.fontWeight,
    lineHeight: `${_typo.lineHeight.value}${_typo.lineHeight.unit}`,
    color: _typo.color,
    textAlign: _typo.textAlign,
    textTransform: _typo.textTransform
  };
  return _plain;
};

// Not Used
// @param _spacing {}
export const parseCssSpacing = _space => {
  const _plain = {
    paddingTop: `${_space.paddingTop.value}${_space.paddingTop.unit}`,
    paddingBottom: `${_space.paddingBottom.value}${_space.paddingBottom.unit}`,
    paddingLeft: `${_space.paddingLeft.value}${_space.paddingLeft.unit}`,
    paddingRight: `${_space.paddingRight.value}${_space.paddingRight.unit}`,
    marginTop: `${_space.marginTop.value}${_space.marginTop.unit}`,
    marginBottom: `${_space.marginBottom.value}${_space.marginBottom.unit}`,
    marginLeft: `${_space.marginLeft.value}${_space.marginLeft.unit}`,
    marginRight: `${_space.marginRight.value}${_space.marginRight.unit}`
  };
  return _plain;
};

// Not Used
// @param _size {}
export const parseCssSize = _size => {
  const _plain = {
    height: `${_size.height.value}${_size.height.unit}`,
    width: `${_size.width.value}${_size.width.unit}`,
    minHeight: `${_size.minHeight.value}${_size.minHeight.unit}`,
    minWidth: `${_size.minWidth.value}${_size.minWidth.unit}`,
    maxHeight: `${_size.maxHeight.value}${_size.maxHeight.unit}`,
    maxWidth: `${_size.maxWidth.value}${_size.maxWidth.unit}`,
    overflow: _size.overflow
  };
  return _plain;
};

// Not Used
// @param _border {}
export const parseCssBorder = _border => {
  const _plain = {
    borderTop: `${_border.borderTop.style} ${_border.borderTop.width.value}${_border.borderTop.width.unit} ${_border.borderTop.color}`,
    borderBottom: `${_border.borderBottom.style} ${_border.borderBottom.width.value}${_border.borderBottom.width.unit} ${_border.borderBottom.color}`,
    borderLeft: `${_border.borderLeft.style} ${_border.borderLeft.width.value}${_border.borderLeft.width.unit} ${_border.borderLeft.color}`,
    borderRight: `${_border.borderRight.style} ${_border.borderRight.width.value}${_border.borderRight.width.unit} ${_border.borderRight.color}`,
    borderRadiusTopLeft: `${_border.borderRadiusTopLeft.value}${_border.borderRadiusTopLeft.value}`,
    borderRadiusTopRight: `${_border.borderRadiusTopRight.value}${_border.borderRadiusTopRight.value}`,
    borderRadiusBottomLeft: `${_border.borderRadiusBottomLeft.value}${_border.borderRadiusBottomLeft.value}`,
    borderRadiusBottomRight: `${_border.borderRadiusBottomRight.value}${_border.borderRadiusBottomRight.value}`
  };
  return _plain;
};

const parseCssProp = (_prop, _value) => {
  switch (_prop) {
    case "fontSize":
    case "lineHeight":
    case "paddingTop":
    case "paddingBottom":
    case "paddingLeft":
    case "paddingRight":
    case "marginTop":
    case "marginBottom":
    case "marginLeft":
    case "marginRight":
    case "height":
    case "width":
    case "minHeight":
    case "minWidth":
    case "maxHeight":
    case "maxWidth":
    case "borderRadiusTopLeft":
    case "borderRadiusTopRight":
    case "borderRadiusBottomLeft":
    case "borderRadiusBottomRight":
      return `${_value.value}${_value.unit}`;
    case "border":
    case "borderTop":
    case "borderBottom":
    case "borderLeft":
    case "borderRight":
      return `${_value.style} ${_value.width.value}${_value.width.unit} ${_value.color}`;
    case "gridTemplateColumns":
      const __value = _value.map(e => `${e}fr`);
      return __value.join(" ");
    default:
      return _value;
  }
};

export const parseCss = _css => {
  let _plain = {};
  for (var prop in _css) {
    if (prop === "background") {
      _plain = { ..._plain, ...parseCssBackground(_css[prop]) };
    } else {
      _plain[prop] = parseCssProp(prop, _css[prop]);
    }
  }
  return _plain;
};

const _background = [
  {
    order: 0,
    type: "solid",
    visible: true,
    label: "#fff",
    image: null,
    position: null,
    size: null,
    sizeCustom: {
      width: null,
      height: null
    },
    repeat: null,
    attachment: null,
    origin: null,
    clip: null,
    color: "#fff"
  }
];

const _typography = {
  fontFamily: "string",
  fontSize: { value: 10, unit: "px" },
  fontStyle: "italic",
  fontWeight: "value",
  lineHeight: { value: 12, unit: "px" },
  color: "value",
  textAlign: "value",
  textTransform: "value"
};

const _spacing = {
  paddingTop: { value: 12, unit: "px" },
  paddingBottom: { value: 12, unit: "px" },
  paddingLeft: { value: 12, unit: "px" },
  paddingRight: { value: 12, unit: "px" },
  marginTop: { value: 12, unit: "px" },
  marginBottom: { value: 12, unit: "px" },
  marginpaddingLeft: { value: 12, unit: "px" },
  marginRight: { value: 12, unit: "px" }
};

const _size = {
  height: { value: 12, unit: "px" },
  width: { value: 12, unit: "px" },
  minHeight: { value: 12, unit: "px" },
  minWidth: { value: 12, unit: "px" },
  maxHeight: { value: 12, unit: "px" },
  maxWidth: { value: 12, unit: "px" },
  overflow: "value"
};

const _border = {
  borderTop: {
    style: "value",
    color: "value",
    width: { value: 1, unit: "px" }
  },
  borderBottom: {
    style: "value",
    color: "value",
    width: { value: 1, unit: "px" }
  },
  borderLeft: {
    style: "value",
    color: "value",
    width: { value: 1, unit: "px" }
  },
  borderRight: {
    style: "value",
    color: "value",
    width: { value: 1, unit: "px" }
  },
  borderRadiusTopLeft: { value: 1, unit: "px" },
  borderRadiusTopRight: { value: 1, unit: "px" },
  borderRadiusBottomLeft: { value: 1, unit: "px" },
  borderRadiusBottomRight: { value: 1, unit: "px" }
};

// Metasite CSS Properties

// Turn json to css;
export const json2css = (_json, _type = ".") => {
  let _css = "";
  for (var _class in _json) {
    // skip loop if the property is from prototype
    if (!_json.hasOwnProperty(_class)) continue;
    // console.log("_class", _class);
    _css += `${_type}${_class}{\n`;
    for (var _prop in _json[_class]) {
      // skip loop if the property is from prototype
      if (!_json[_class].hasOwnProperty(_prop)) continue;
      // _css += `\t${_prop}:${_json[_class][_prop]};\n`;
      _css += `\t${_json[_class][_prop]}\n`;
      // console.log("_prop", _prop);
      // console.log("value", _json[_class][_prop]);
    }
    _css += "}\n";
  }
  return _css;
};

export const mediaQuery = _width => {
  return `@media only screen and (max-width: ${_width}px) {\n`
}

// Gets an Object, returns an Array

export const orderObj = _obj => {

  var sortable = [];
  for (var query in _obj) {
    if (query !== 'desktop') {
      sortable.push([parseInt(query), _obj[query]]);
    }
  }

  sortable.sort((a, b) => a[0] - b[0]);
  const reversed = sortable.reverse();

  return reversed;
}