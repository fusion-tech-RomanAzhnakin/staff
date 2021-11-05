import React, { Component } from 'react';
import { toast } from 'react-toastify';
import _get from 'lodash/get';
import styled from 'styled-components';
import moment from 'moment';
import zenscroll from 'zenscroll';

import extraHourImage from 'ui/images/extraHours.png';
import { connectGlobalUser } from 'store/connections';
import { createPrettiedRange, getName } from 'utils';
import {
  getExtraHours,
  postExtraHours,
  updateExtraHours,
  deleteExtraHours
} from 'api/extraHoursAPI';

import ExtraHoursModal from './components/ExtraHoursModal';
import FullTable from './components/FullTable';
import ExtraHoursButton from './components/ExtraHoursButton';
import ExtraHoursSelect, { paymentOptions } from './components/ExtraHoursSelect';
import { UserType } from 'utils/types';
import CalculateModal from './components/CalculateExtraModal';

import { RoleCheck } from 'utils/protector';

import { SelectFromDB, WarningModal } from 'ui';

class ExtraHours extends Component {
  state = {
    rows: [],
    count: 0,
    order: 'desc',
    orderBy: 'createdAt',
    page: 0,
    rowsPerPage: 25,
    isFormModal: false,
    isDeleteModal: false,
    isCalculateModalOpen: false,
    extraObject: undefined,
    isProcessed: paymentOptions[0],
    author: null,
  };

  componentDidMount() {
    this.getRows();
  }

  getRows = async () => {
    try {
      const { order, orderBy, page, rowsPerPage, isProcessed, author } = this.state;
      const { value } = isProcessed;
      const user_id = author?.value || null;

      const {
        data: { count, rows }
      } = await getExtraHours({
        order,
        orderBy,
        page,
        rowsPerPage,
        value,
        user_id,
      });
      const formattedRows = rows.map((el) => {
        return {
          ...el,
          range: createPrettiedRange(el.start, el.end),
          date: moment(el.date),
          author: {
            label: getName(el.user),
            value: el.user.id
          }
        };
      });

      this.setState({
        count,
        rows: formattedRows
      });
    } catch (e) {
      toast.error(`Ошибка получения списка с сервера! Ошибка: ${e}`);
    }
  };

  changeObjectParameters = (extra) => {
    this.setState({ extraObject: extra });
  };

  handleDeleteModal = () => {
    this.setState({ extraObject: undefined });
    this.setState(({ isDeleteModal }) => ({ isDeleteModal: !isDeleteModal }));
  };

  handleFormModal = () => {
    this.setState({ extraObject: undefined });
    this.setState(({ isFormModal }) => ({ isFormModal: !isFormModal }));
  };

  toggleCalculateModalOpen = () => {
    this.setState(({ isCalculateModalOpen }) => ({ isCalculateModalOpen: !isCalculateModalOpen }));
  };

  submitForm = async (data) => {
    try {
      const { author } = data;
      const { extraObject } = this.state;
      const { role, id: currentUserId } = this.props.user;
      const payload = {
        ...data
      };
      if (extraObject) {
        payload.user_id = author ? author.value : null;
        await updateExtraHours(extraObject.id, payload);
      } else {
        if (role !== 'admin') {
          payload.user_id = currentUserId;
        } else {
          payload.user_id = data.author ? data.author.value : null;
        }

        await postExtraHours(payload);
      }
      this.getRows();
      toast.success(
        `Заявка о переработке ${extraObject ? 'обновлена!' : 'отправлена администрации!'}`
      );
      this.handleFormModal();
    } catch (err) {
      if (_get(err, 'response.status', 500) === 400) {
        toast.error(_get(err, 'response.data', 'Ошибка валидации'));
        return;
      }
      toast.error('Внутренняя ошибка сервера');
    }
  };

  isDeliting = false;

  deleteRow = async () => {
    if (this.isDeliting) {
      return;
    }
    this.isDeliting = true;
    try {
      const { id } = this.state.extraObject;
      await deleteExtraHours(id);
      this.getRows();
      toast.success('Заявка о переработке удалена!');
    } catch (e) {
      toast.error(`Ошибка: ${e}!`);
    }
    this.handleDeleteModal();
    this.isDeliting = false;
  };

  handleRequestSort = (orderBy, order) => {
    this.setState(
      {
        orderBy,
        order
      },
      this.getRows
    );
  };

  handleIsProceesedChange = async (idx) => {
    try {
      const row = this.state.rows[idx];
      const newIsProcessed = !row.isProcessed;
      await updateExtraHours(row.id, { ...row, isProcessed: newIsProcessed });
      const rows = [...this.state.rows];
      rows[idx].isProcessed = newIsProcessed;
      this.setState({ rows });
      this.getRows();
    } catch (err) {
      toast.error(err.message);
    }
  };

  scrollDown = () => {
    zenscroll.toY(document.body.scrollHeight);
  };

  handleChangePage = (event, page) => {
    this.setState({ page }, async () => {
      await this.getRows();
      this.scrollDown();
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState(
      {
        page: 0,
        rowsPerPage: event.target.value
      },
      async () => {
        await this.getRows();
        this.scrollDown();
      }
    );
  };

  handleChangePayment = (option) => {
    this.setState({ isProcessed: option }, this.getRows);
  };

  onAuthorChange = (author) => { this.setState({ author }, this.getRows); };

  render() {
    const {
      rows,
      extraObject,
      isFormModal,
      isCalculateModalOpen,
      page,
      rowsPerPage,
      isDeleteModal,
      count,
      order,
      orderBy,
      isProcessed,
    } = this.state;

    const isEmpty = !count && isProcessed === null;

    return (
      <StyledContainer>
        {isEmpty && <img src={extraHourImage} alt="human" className="container-image" />}

        <TableContainer className="container__table" isEmpty={isEmpty}>
          <HeaderContainer>
            <HeaderButtonContainer>
              <ExtraHoursButton
                handleCreateModal={this.handleFormModal}
                handleCalculateModal={this.toggleCalculateModalOpen}
                isEmpty={isEmpty}
              />
            </HeaderButtonContainer>
            {this.props.user.role === 'admin' && !isEmpty && (
              <ExtraHoursSelect
                onChangePayment={this.handleChangePayment}
                isProcessed={isProcessed}
              />
            )}
            <RoleCheck forRole='admin'>
              <div className="select">
                <SelectFromDB
                  change={this.onAuthorChange}
                  filter={{ notRole: 'student', status: 'active' }}
                  value={this.state.author}
                  class="col-md-9"
                  isMulti={false}
                  dataType="users"
                  placeholder="Все"
                />
              </div>
            </RoleCheck>
          </HeaderContainer>

          {!isEmpty && (
            <FullTable
              globalUser={this.props.user}
              count={count}
              rows={rows}
              page={page}
              rowsPerPage={rowsPerPage}
              handleRequestSort={this.handleRequestSort}
              handleIsProceesedChange={this.handleIsProceesedChange}
              orderBy={orderBy}
              order={order}
              handleModal={this.handleFormModal}
              handleChangePage={this.handleChangePage}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
              handleDeleteModal={this.handleDeleteModal}
              changeObjectParameters={this.changeObjectParameters}
            />
          )}
        </TableContainer>

        <ExtraHoursModal
          open={isFormModal}
          onClose={this.handleFormModal}
          data={extraObject}
          submitForm={this.submitForm}
        />
        <CalculateModal
          open={isCalculateModalOpen}
          onClose={this.toggleCalculateModalOpen}
          getRows={this.getRows}
        />

        <WarningModal
          questionText="Удалить выбранную переработку?"
          open={isDeleteModal}
          onClose={this.handleDeleteModal}
          success={this.deleteRow}
          successButtonText="Удалить"
        />
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  margin: 0 auto;
  padding-top: 20px;
  width: 100%;

  .container-image {
    margin: 0 auto;
    margin-top: 100px;
    display: block;
  }
  && .MuiPaper-root-25 {
    background-color: inherit;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  @media (max-width: 768px) {
    margin-top: 0;
    flex-direction:column;
    align-items: flex-start;
  }
`;

const HeaderButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TableContainer = styled.div`
  margin: auto;

  &.container__table {
    width: ${({ isEmpty }) => (!isEmpty ? '90%' : '215px')};
  }
`;

ExtraHours.propTypes = {
  user: UserType.isRequired
};

export default connectGlobalUser(ExtraHours);
