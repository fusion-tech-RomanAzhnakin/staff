import React from 'react';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';

import ReactQuill from 'react-quill';
import InputLabel from '@material-ui/core/InputLabel';

const RichTextBox = (props) => {
  const changeHandler = (text) => {
    props.onChange({
      target: {
        value: text,
        name: props.name,
      },
    });
  };

  return (
    <>
      <InputLabel className="project-field-title">
        {props.label && props.label}
      </InputLabel>
      {props.children}
      <ReactQuill
        toolbar= {false}
        className={'focused-editor'}
        hideToolbar={true}
        value={props.value}
        name={props.name}
        onChange={changeHandler}
        formats={formats}
        modules={modules}
        autoFocus={props.autoFocus}
      />
    </>
  );
};

const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code',
  'code-block',
  'align',
  'list',
  'bullet',
  'link',
  'color',
  'background',
];

const modules = {
  toolbar: [
    [
      { font: ['sans-serif', 'serif', 'monospace'] },
      { header: [1, 2, 3, 4, false, 5, 6] },
    ],
    [
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'code',
      'code-block',
    ],
    [{ align: [false, 'center', 'right', 'justify'] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    [
      {
        color: [
          'black',
          '#e20000',
          '#b57603',
          '#dede00',
          'green',
          '#0000ea',
          'purple',
          'grey',
          'red',
          'orange',
          'yellow',
          '#00c300',
          '#7979ff',
          '#c700c7',
          '#d4d4d4',
          '#ff7575',
          '#ffd382',
          '#ffffb0',
          '#01ff01',
          '#b4b4ff',
          '#ff09ff',
          'white',
          '#ffc4c4',
          '#ffefd2',
          '#ffffe7',
          '#bfffbf',
          '#e6e6ff',
          '#ffb9ff',
        ],
      },
      {
        background: [
          'black',
          '#e20000',
          '#b57603',
          '#dede00',
          'green',
          '#0000ea',
          'purple',
          'grey',
          'red',
          'orange',
          'yellow',
          '#00c300',
          '#7979ff',
          '#c700c7',
          '#d4d4d4',
          '#ff7575',
          '#ffd382',
          '#ffffb0',
          '#01ff01',
          '#b4b4ff',
          '#ff09ff',
          'white',
          '#ffc4c4',
          '#ffefd2',
          '#ffffe7',
          '#bfffbf',
          '#e6e6ff',
          '#ffb9ff',
        ],
      },
    ],
    ['clean'],
  ],
};

RichTextBox.propTypes = {
  label: PropTypes.string || PropTypes.node,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  autoFocus: PropTypes.bool,
  children: PropTypes.node,
};

RichTextBox.defaultProps = {
  label: '',
  value: '',
  name: '',
  onChange: () => null,
  autoFocus: false,
  children: null,
};

export default RichTextBox;
