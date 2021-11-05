import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Url from 'urls-tool';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { setCandidate, setSocket, setMessages } from 'pages/HrBoards/store/reducer';
import { getAllMessages } from 'pages/HrBoards/store/thunks';

import SocketClass from 'utils/Socket';
import socketMessage from 'utils/socket-constant';

import CandidateForm from './components/CandidateForm';
import MessagesForm from './components/MessagesForm';
// import HistoryForm from './components/HistoryForm';

const ModalChangeCandidate = (props) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const matches = useMediaQuery('(max-width:646px)');
  const dispatch = useDispatch();
  const socket = useSelector(({ hrBoards }) => hrBoards.socket);

  const handleClose = async () => {
    if (socket) {
      socket.leaveRoom();
      socket.disconnect();
      dispatch(setSocket(null));
    }
    dispatch(setCandidate({ id: null, isOpen: false, messages: [] }));
    Url.params = ['candidate', false];
  };

  const candidate_id = useSelector(({ hrBoards }) => hrBoards.openCandidate.id);

  useEffect(() => {
    if (candidate_id) {
      const newSocket = new SocketClass('http://localhost:4000', candidate_id);
      newSocket.joinToRoom();

      (async () => {
        await dispatch(getAllMessages(
          { candidate_id },
        ));
      })();

      newSocket.on(socketMessage.GET_APPEND_MESSAGE_BY_ID, (newMessage) => {
        dispatch(setMessages(newMessage));
      });
      dispatch(setSocket(newSocket));
      Url.params = ['candidate', `${candidate_id}`];
    }
  }, [candidate_id, dispatch]);

  const {
    openCandidate,
  } = props;

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Dialog
      scroll="body"
      open={openCandidate.modalIsOpen}
      maxWidth={'md'}
      fullWidth={true}
      PaperProps={matches ? PaperProps : {}}
      onClose={handleClose}
    >
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        indicatorColor="primary"
        scrollButtons="auto"
        orientation={matches ? 'vertical' : 'horizontal'}
        variant="scrollable"
      >

        <Tab label="Информация"
        />
        {openCandidate.id &&
          <Tab
            label="Сообщения"
          />
        }
        {/* {openCandidate.id &&
          <Tab label="История" />
        } */}
      </Tabs>
      {selectedTab === 0 &&
        <CandidateForm
          onClose={handleClose} />
      }

      {selectedTab === 1 &&
        <MessagesForm
          onClose={handleClose} />
      }

      {/* {selectedTab === 2 &&
        <HistoryForm />
      } */}

    </Dialog>
  );
};

const PaperProps = {
  style: {
    margin: 0,
    maxWidth: '100%',
    width: '100%',
  },
};

ModalChangeCandidate.propTypes = {
  openCandidate: PropTypes.objectOf(PropTypes.any),
};

ModalChangeCandidate.defaultProps = {
  openCandidate: null,
};

const mapStateToProps = (store) => ({
  candidates: store.hrBoards.candidates,
  technologies: store.enums.technologies,
  openCandidate: store.hrBoards.openCandidate,
});

export default connect(mapStateToProps, null)(ModalChangeCandidate);
