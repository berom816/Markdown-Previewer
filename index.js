'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//object that sets the default text
var defaultText = {
  text: "# Type in Markdown styling to preview it \n Rendered by **marked**."
};

//take the texts in textarea with Markdown styling and show it in preview box using external Mark library
function showInPreview(input) {
  //marked is external method that converts Markdown formatting into html
  document.getElementById('preview').innerHTML = marked(input);
}

//Editor component that returns textarea and updates accordingly

var Editor = function (_React$Component) {
  _inherits(Editor, _React$Component);

  function Editor(props) {
    _classCallCheck(this, Editor);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      text: defaultText['text']
    };
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  //on any change, update text to be the value of what's in textarea
  //also calls the props onChange method

  Editor.prototype.handleChange = function handleChange(event) {
    this.setState({ text: event.target.value });
    this.props.onChange(event.target.value);
  };

  Editor.prototype.render = function render() {
    //show in preview defaultText
    showInPreview(this.state.text);
    return React.createElement('textarea', {
      className: 'editor',
      rows: '20',
      value: this.state.text,
      onChange: this.handleChange });
  };

  return Editor;
}(React.Component);

//parent component Display that manage Editor and previewBox

var Display = function (_React$Component2) {
  _inherits(Display, _React$Component2);

  function Display(props) {
    _classCallCheck(this, Display);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.state = {
      displayText: ""
    };
    _this2.handleTextChange = _this2.handleTextChange.bind(_this2);
    return _this2;
  }

  //handles the text change by updating displayText

  Display.prototype.handleTextChange = function handleTextChange(val) {
    this.setState({
      displayText: val
    });
  };

  Display.prototype.render = function render() {
    //show in in preview
    showInPreview(this.state.displayText);
    return(
      //show it in editor
      React.createElement(
        'div',
        null,
        React.createElement(Editor, { value: this.state.displayText, onChange: this.handleTextChange })
      )
    );
  };

  return Display;
}(React.Component);

//render in container

ReactDOM.render(React.createElement(Display, null), document.getElementById('editorDiv'));