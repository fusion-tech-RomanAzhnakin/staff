import React from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import RichTextBox from 'ui/components/RichTextBox';
import SelectWrapper from 'ui/components/SelectWrapper';
import StyledContainer from 'pages/documents/PortfolioBuilder/components/EditableProject.style';
import { SelectOptionType } from 'utils/types';

function EditableProject(props) {
  const { technologiesOptions } = useSelector(
    ({ portfolioBuilder }) => portfolioBuilder,
  );

  const handleInputChange = (ev) => {
    const newData = {
      description: ev.target.value,
    };

    props.onChange(newData, props.index);
  };

  const handleSelectChange = (value) => {
    const newData = {
      technologies: value,
    };

    props.onChange({ data: { ...newData } }, props.index);
  };

  return (
    <StyledContainer>
      <Typography
        className="editable-project__title"
        component="h3"
        variant="h2"
      >
        {props.title}
      </Typography>

      <RichTextBox
        name="description"
        value={props.description}
        onChange={handleInputChange}
      />

      <SelectWrapper>
        <Select
          className="portfolio-builder-form__select"
          classNamePrefix="select"
          name="technologies"
          placeholder="Выбрать технологии"
          options={technologiesOptions}
          value={props.techs}
          closeMenuOnSelect={false}
          isMulti
          onChange={handleSelectChange}
        />
      </SelectWrapper>
    </StyledContainer>
  );
}

EditableProject.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  techs: PropTypes.arrayOf(SelectOptionType),
  onChange: PropTypes.func,
};

EditableProject.defaultProps = {
  title: '',
  description: '',
  techs: [],
  onChange: () => null,
};

export default EditableProject;
