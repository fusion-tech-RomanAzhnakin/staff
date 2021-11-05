import React from 'react';
import { useDispatch } from 'react-redux';
import { PDFReader } from 'reactjs-pdf-reader';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import StyledContainer from 'ui/components/PdfViewer/PdfViewer.style';

import {
  setPageNumber,
  setTotalPages,
} from 'pages/documents/PortfolioBuilder/store/reducer';

function PdfViewer(props) {
  const dispatch = useDispatch();

  const handleNextPage = () => {
    if (props.pageNumber === props.totalPages) { return; }

    dispatch(setPageNumber(props.pageNumber + 1));
  };

  const handlePrevPage = () => {
    if (props.pageNumber === 1) { return; }

    dispatch(setPageNumber(props.pageNumber - 1));
  };

  const handleDocumentLoadSuccess = (totalPages) => {
    dispatch(setTotalPages(totalPages));
  };

  return (
    <StyledContainer>
      <PDFReader
        url={props.url}
        page={props.pageNumber}
        onDocumentComplete={handleDocumentLoadSuccess}
      />

      {props.totalPages > 1 && (
        <div className="pdf-viewer__wrapper">
          <IconButton aria-label="previous-page" onClick={handlePrevPage}>
            <ArrowBackIcon />
          </IconButton>

          {props.pageNumber}

          <IconButton aria-label="next-page" onClick={handleNextPage}>
            <ArrowForwardIcon />
          </IconButton>
        </div>
      )}

      <Button
        className="pdf-viewer__download-btn"
        variant="contained"
        color="primary"
      >
        <a
          className="pdf-viewer__link"
          href={props.url}
          download={props.fileName}
        >
          Скачать
        </a>
      </Button>
    </StyledContainer>
  );
}

PdfViewer.propTypes = {
  url: PropTypes.string,
  pageNumber: PropTypes.number,
  totalPages: PropTypes.number,
  fileName: PropTypes.string,
};

PdfViewer.defaultProps = {
  url: '',
  pageNumber: 1,
  totalPages: null,
  fileName: 'file.pdf',
};

export default PdfViewer;
