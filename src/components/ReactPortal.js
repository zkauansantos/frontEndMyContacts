import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default function ReactPortal({ nameId, children }) {
 let container = document.getElementById(nameId);

  if (!container) {
  container = document.createElement('div');
  container.setAttribute('id', nameId);
  document.body.appendChild(container);
}

  return ReactDOM.createPortal(children, container);
}

ReactPortal.propTypes = {
  nameId: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ReactPortal.defaultProps = {
  nameId: '',
};
