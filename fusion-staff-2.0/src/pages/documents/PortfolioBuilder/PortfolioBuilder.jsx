import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PdfViewer from 'ui/components/PdfViewer';
import PortfolioBuilderForm from 'pages/documents/PortfolioBuilder/components/PortfolioBuilderForm';
import StyledMain from 'pages/documents/PortfolioBuilder/PortfolioBuilder.style';

import { reset, setTechnologiesOptions } from 'pages/documents/PortfolioBuilder/store/reducer';

function PortfolioBuilder() {
  const dispatch = useDispatch();
  const {
    technologies,
    portfolioUrl,
    pageNumber,
    totalPages,
  } = useSelector(({ enums, portfolioBuilder }) => ({
    technologies: enums.technologies,
    portfolioUrl: portfolioBuilder.pdf.portfolioUrl,
    pageNumber: portfolioBuilder.pdf.pageNumber,
    totalPages: portfolioBuilder.pdf.totalPages,
  }));

  const createSelectOptions = (arr) => {
    const options = arr.map((item) => {
      const data = {
        value: item.id,
        label: item.title,
      };

      return data;
    });

    return options;
  };

  useEffect(() => {
    const options = createSelectOptions(technologies || []);

    dispatch(setTechnologiesOptions(options));

    return () => dispatch(reset());
  }, [dispatch, technologies]);

  return (
    <StyledMain>
      <PortfolioBuilderForm />

      {portfolioUrl && (
        <PdfViewer
          url={portfolioUrl}
          pageNumber={pageNumber}
          totalPages={totalPages}
          fileName="portfolio.pdf"
        />
      )}
    </StyledMain>
  );
}

export default PortfolioBuilder;
