import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { setLogin } from 'redux/actions';
import App from 'main/view';

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
});
const mapDispatchToProps = dispatch => ({
  setLogin: (loggedIn) => {
    dispatch(setLogin(loggedIn));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
