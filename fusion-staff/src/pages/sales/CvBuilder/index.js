import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _get from 'lodash/get';
import { compose } from 'redux';
import { createSelector } from 'reselect';

import { connectGlobalUser } from 'store/connections';
import {
  getValueFromSelect,
  getLabelFromSelect
} from 'utils';
import {
  languageOptions,
  employeePositionOptions
} from 'utils/constants';
import { createCV } from 'api/projectApi';

import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import {
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import {
  SelectFromDB,
  RadioTwoPicker,
  RichTextBox,
  PdfViewer,
  ProjectActivityEditorModal,
  FormSelect
  // SelectTags
} from 'ui';
import { UserType } from 'utils/types';

class CvBuilder extends Component {
  createArrayUsers = createSelector(
    (props) => props.user,
    (user) => {
      return [user];
    }
  );

  stateInitData = {
    language: languageOptions[0],
    fullName: '',
    experience: '',
    employeePosition: employeePositionOptions[0],
    farewell: 'Would like to chat? Contact me at welcome@fusion-team.com',
    farewellRu: 'Хотите пообщаться? Свяжитесь со мной по welcome@fusion-team.com',
    user: null,
    selectedUserId: null,
    technologies: [],
    projects: [],
    spinner: false,
    isMyData: 'general',
    specializedOn: [],
    skills: `
    <p>Fluent English speaker</p>
    <p>Strong communicator</p>
    <p>Constructive feedback</p>
    <p>Ability to take criticism</p>
    <p>Willingness to grow</p>`,
    education: `
    <p><b>Master of Computer Science, 2016 </b></p>
    <p>Computer-Aided Design and Software Development</p>
    <p>Southern Federal University, Taganrog, Russia</p>`,
    skillsRu: `
    <p>Свободно владеет английским языком</p>
    <p>Умеет вести диалог</p>
    <p>Конструктивная обратная связь</p>
    <p>Способность воспринимать критику</p>
    <p>Готовность к росту и саморазвитию</p>`,
    educationRu: `
    <p><b>Магистр компьютерных наук, 2016 </b></p>
    <p>Автоматизированное проектирование и разработка программного обеспечения</p>
    <p>Южный Федеральный Университет, Таганрог, Россия</p>`,
    benefits: '',
    knowledgeTechnology: [],
    numPages: null,
    pageNumber: 1,
    url: null,
    haveUser: true,
    intro: '',
    projectActivitiesEditorVisibility: false
  };

  state = { ...this.stateInitData };

  resetForm = () => this.setState({ ...this.stateInitData });

  nextPage = () => {
    const { numPages, pageNumber } = this.state;
    if (numPages !== pageNumber) {
      this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));
    }
  };

  prevPage = () => {
    const { pageNumber } = this.state;
    if (pageNumber > 1) {
      this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));
    }
  };

  prepareEducationField = (educationString) => {
    if (educationString) {
      const eduSplitted = educationString.split('\n');
      return eduSplitted.map((eduSubString, idx) => {
        if (idx === 0) {
          return `<p><b>${eduSubString}</b></p>`;
        }
        return `<p>${eduSubString}</p>`;
      }).join('\n');
    }

    return this.stateInitData.education;
  }

  onSelectChange = (value, { name }) => {
    let pathLang;
    let pathEdu;

    switch (value.value) {
      case 'ru':
        pathLang = 'label_ru';
        pathEdu = 'education_ru';
        break;
      case 'en':
      default:
        pathLang = 'label';
        pathEdu = 'education';
    }
    const educationString = _get(this.state.user, pathEdu, '');

    this.setState({
      [name]: value,
      fullName: _get(this.state.user, pathLang, '').replace(/\([^)]*\)/, '').trim(),
      education: this.prepareEducationField(educationString),
    });
  }

  onInputChange = ({ target: { name, value } = {} } = {}) => {
    this.setState({ [name]: value });
  }

  onKnowledgeTechnologyChange = (knowledgeTechnology) => {
    this.setState({ knowledgeTechnology });
  };

  onBenefitsChange = (benefits) => {
    this.setState({ benefits });
  };

  onIntroChange = (intro) => {
    this.setState({ intro });
  };

  onDocumentLoadSuccess = (numPages) => {
    this.setState({ numPages });
  };

  handleChange = (event) => {
    this.setState({ isMyData: event.target.value });
  };

  selectedUsers = (user) => {
    const { language: { value } } = this.state;
    let pathLang;
    let pathEdu;

    switch (value) {
      case 'ru':
        pathLang = 'label_ru';
        pathEdu = 'education_ru';
        break;
      case 'en':
      default:
        pathLang = 'label';
        pathEdu = 'education';
    }

    const educationString = _get(user, pathEdu, '');

    this.setState({
      user,
      fullName: _get(user, pathLang, '').replace(/\([^)]*\)/, '').trim(),
      education: this.prepareEducationField(educationString),
      selectedUserId: user ? user.value : null,
    });
  };

  selectedTechnologies = (technologies) => {
    this.setState({ technologies: technologies || [] });
  };

  selectedProjects = (projects) => {
    this.setState({ projects: projects || [] });
  };

  onSkillsChange = (skills) => {
    this.setState({ skills });
  };

  onSkillsRuChange = (skillsRu) => {
    this.setState({ skillsRu });
  };

  onEducationChange = (education) => {
    this.setState({ education });
  };

  onEducationRuChange = (educationRu) => {
    this.setState({ educationRu });
  };

  selectedSpecialization = (technologies) => {
    this.setState({ specializedOn: technologies });
  };

  onFarewellChange = (farewell) => {
    this.setState({ farewell });
  };

  onFarewellRuChange = (farewellRu) => {
    this.setState({ farewellRu });
  };

  getSelectedRole = (projectsArray) => {
    return (projectsArray || []).map((project) => {
      const newProject = { ...project };
      const { selectedRole = 0 } = newProject;
      newProject.role = newProject.role[selectedRole].text;
      return newProject;
    });
  };

  submit = async (e) => {
    e.preventDefault();

    this.setState({ pageNumber: 1, url: '', spinner: true });
    if (this.state.user) {
      const language = _get(this.state.language, 'value');

      const {
        education,
        experience,
        educationRu,
        farewell,
        farewellRu,
        skills,
        skillsRu,
        ...restState
      } = this.state;

      const data = {
        ...restState,
        user: {
          name: this.state.fullName,
          id: _get(this.state.user, 'value')
        },
        experience,
        employeePosition: _get(this.state.employeePosition, 'value', employeePositionOptions[0].value),
        technologies: getValueFromSelect(this.state.technologies),
        projects: getValueFromSelect(this.state.projects),
        specializedOn: getLabelFromSelect(this.state.specializedOn),
        knowledgeTechnology: getLabelFromSelect(this.state.knowledgeTechnology),
        rolesInProjects: this.getSelectedRole(this.state.projects),
        farewell: language === 'ru' ? farewellRu : farewell,
        skills: language === 'ru' ? skillsRu : skills,
        education: language === 'ru' ? educationRu : education,
        language,
      };
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try {
        const url = await createCV(data);
        this.setState({ url, spinner: false });
      } catch (err) {
        console.log(err);
      }
    } else {
      this.setState({ haveUser: false, spinner: false });
    }
  };

  onDrop = (dropResult) => {
    const { removedIndex, addedIndex } = dropResult;
    const { projects } = this.state;
    const b = projects[removedIndex];
    projects[removedIndex] = projects[addedIndex];
    projects[addedIndex] = b;
    this.setState({ projects });
  };

  openProjectActivitiesEditor = () => {
    this.setState((state) => ({
      projectActivitiesEditorVisibility: !state.projectActivitiesEditorVisibility
    }));
  };

  render() {
    const {
      language,
      fullName,
      experience,
      employeePosition,
      user,
      selectedUserId,
      isMyData,
      technologies,
      specializedOn,
      skills,
      skillsRu,
      url,
      projects,
      education,
      educationRu,
      pageNumber,
      numPages,
      haveUser,
      knowledgeTechnology,
      // benefits,
      farewell,
      farewellRu,
      intro,
      spinner,
      projectActivitiesEditorVisibility
    } = this.state;
    const users = this.createArrayUsers(this.state);
    return (
      <StyledContainer className="container">
        <form onSubmit={this.submit}>
          <ProjectActivityEditorModal
            projects={projects}
            onDrop={this.onDrop}
            open={projectActivitiesEditorVisibility}
            onClose={this.openProjectActivitiesEditor}
            onSubmit={this.selectedProjects}
          />
          <Grid container spacing={24}>
            <Grid item sm={6} xs={12}>
              <SelectFromDB
                filter={{ notRole: 'student', status: 'active' }}
                change={this.selectedUsers}
                value={users}
                class="col-md-9"
                dataType="users"
                isMulti={false}
                title="Developer"
                isValid={haveUser}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <RadioTwoPicker
                value={isMyData}
                onChange={this.handleChange}
                firstValue="general"
                firstLabel="Database"
                secondValue="my"
                secondLabel={"Developer's projects"}
                selectedUserId={selectedUserId}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <FormSelect title="CV language">
                <Select
                  options={languageOptions}
                  classNamePrefix="select"
                  value={language}
                  name="language"
                  onChange={this.onSelectChange}
                />
              </FormSelect>

              <div>
                <h4>Full name</h4>
                <TextField
                  value={fullName}
                  name="fullName"
                  onChange={this.onInputChange}
                  fullWidth
                  placeholder="Full name"
                  variant="outlined"
                />
              </div>

              <div>
                <h4>Experience</h4>
                <TextField
                  value={experience}
                  name="experience"
                  onChange={this.onInputChange}
                  fullWidth
                  placeholder="Experience"
                  variant="outlined"
                />
              </div>

              <FormSelect title="Employee position">
                <Select
                  options={employeePositionOptions}
                  classNamePrefix="select"
                  value={employeePosition}
                  name="employeePosition"
                  onChange={this.onSelectChange}
                />
              </FormSelect>

              <SelectFromDB
                change={this.selectedTechnologies}
                value={technologies}
                class="col-md-9"
                dataType="technologies"
                closeMenuOnSelect={false}
                title="Filter projects by technologies"
              />
              <SelectFromDB
                isMyData={isMyData}
                change={this.selectedProjects}
                selectedUserId={selectedUserId}
                value={projects}
                class="col-md-9"
                dataType="projects"
                filter={technologies}
                closeMenuOnSelect={false}
                title="Projects"
              />
              <div className="padd-t-20">
                <Button
                  variant="outlined"
                  className="accept-btn"
                  type="button"
                  onClick={() => this.openProjectActivitiesEditor()}
                  disabled={!projects.length}
                >
                  Projects editor
                </Button>
              </div>
              <SelectFromDB
                change={this.selectedSpecialization}
                value={specializedOn}
                class="col-md-9"
                closeMenuOnSelect={false}
                dataType="technologies"
                title="Specializes in"
              />
              <RichTextBox
                value={intro}
                title="Intro"
                onChange={this.onIntroChange}
                globalUser={this.props.user}
                count
              />

              {language.value === 'ru'
                ?
                <>
                  <RichTextBox
                    key='skillsRu'
                    value={skillsRu}
                    title="Soft skills"
                    onChange={this.onSkillsRuChange}
                    globalUser={this.props.user}
                    count
                  />

                  <RichTextBox
                    key='educationRu'
                    value={educationRu}
                    title="Education"
                    onChange={this.onEducationRuChange}
                    globalUser={this.props.user}
                    count
                  />
                </>
                :
                <>
                  <RichTextBox
                    key='skills'
                    value={skills}
                    title="Soft skills"
                    onChange={this.onSkillsChange}
                    globalUser={this.props.user}
                    count
                  />

                  <RichTextBox
                    key='education'
                    value={education}
                    title="Education"
                    onChange={this.onEducationChange}
                    globalUser={this.props.user}
                    count
                  />
                </>
              }

              <SelectFromDB
                change={this.onKnowledgeTechnologyChange}
                value={knowledgeTechnology}
                class="col-md-9"
                dataType="technologies"
                closeMenuOnSelect={false}
                title="Technologies"
              />

              {language.value === 'ru'
                ?
                <RichTextBox
                  key='farewellRu'
                  value={farewellRu}
                  title="Farewell"
                  onChange={this.onFarewellRuChange}
                  globalUser={this.props.user}
                  count
                />
                :
                <RichTextBox
                  key='farewell'
                  value={farewell}
                  title="Farewell"
                  onChange={this.onFarewellChange}
                  globalUser={this.props.user}
                  count
                />
              }

              <div className="padd-t-20">
                <Button
                  variant="outlined"
                  className="accept-btn"
                  type="submit"
                  value="CVWasCreated"
                  onSubmit={this.submit}
                >
                  Create CV
                </Button>

                <Button
                  type="button"
                  onClick={this.resetForm}
                  variant="outlined"
                  className="decline-btn"
                >
                  Clear
                </Button>

              </div>
            </Grid>

            {spinner && (
              <Grid item sm={6} xs={12}>
                <img className="spinner" src={`${process.env.PUBLIC_URL}/spinner.svg`} alt="" />
              </Grid>
            )}

            {url && !spinner && (
              <Grid item sm={6} xs={12}>
                <PdfViewer
                  numPages={numPages}
                  url={url}
                  filename={`${user.label
                    ? user.label.replace(/\(.*\)/, '').trim()
                    : ''} CV.pdf`}
                  pageNumber={+pageNumber}
                  onChange={this.onDocumentLoadSuccess}
                  onNext={this.nextPage}
                  onPrev={this.prevPage}
                />
              </Grid>
            )}
          </Grid>
        </form>
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  padding-top: 30px;
  padding-bottom: 150px;
  max-width: 90%;
  margin: 0 auto;

  .flex-container {
    display: flex;
    margin: 55px 0 0 0;
    flex-direction: row;
  }
  .padd-t-20 {
    padding-top: 20px;
  }

  .spinner {
    display: flex;
    margin: auto;
  }

  input {
    text-align: left;
  }
  .decline-btn {
    margin-left: 30px;
  }
`;

CvBuilder.propTypes = {
  user: UserType.isRequired,
  history: PropTypes.shape().isRequired
};

CvBuilder.defaultProps = {
  user: null
};

export default compose(
  withRouter,
  connectGlobalUser
)(CvBuilder);
