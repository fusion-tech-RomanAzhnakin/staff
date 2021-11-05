import { connect } from 'react-redux';

export const withUser = connect(({ main }) => ({ user: main.user }));
