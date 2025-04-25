// components/Loader.jsx
import './Loader.css';

function Loader({ small }) {
  return (
    <div className={`loader-container ${small ? 'small' : ''}`}>
      <div className="loader"></div>
    </div>
  );
}

export default Loader;