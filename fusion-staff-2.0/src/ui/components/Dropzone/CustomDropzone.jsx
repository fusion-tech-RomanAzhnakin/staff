import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import StyledDropzoneWrapper, { CustomListFileItem } from 'ui/components/Dropzone/CustomDropzone.style';

const CustomDropzone = ({
  className,
  placeholder,
  files,
  changeFiles,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    changeFiles([...files, ...acceptedFiles]);
  }, [files]); // eslint-disable-line react-hooks/exhaustive-deps

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <StyledDropzoneWrapper>
      <div className={clsx('drop-zone__zone', className && className)}>
        <div {...getRootProps()} className="drop-zone__content">
          <input {...getInputProps()} />
          {<p className="dropzone-placeholder">{placeholder}</p>}
        </div>
      </div>
      <div className="drop-zone__file-list">
        {files.map((file, index) => (
          <CustomListFileItem key={`${file.name}${index}`}>
            <p className="list-item__text">{file.name}</p>
            <div className="list-item__close-icon">x</div>
          </CustomListFileItem>
        ))}
      </div>
    </StyledDropzoneWrapper>
  );
};

CustomDropzone.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  files: PropTypes.arrayOf(PropTypes.object),
  changeFiles: PropTypes.func,
};

CustomDropzone.defaultProps = {
  className: '',
  placeholder: 'Double click or drag and drop here your files',
  files: [],
  changeFiles: () => null,
};

export default CustomDropzone;
