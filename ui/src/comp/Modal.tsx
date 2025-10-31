interface ModalParams {
  isActive: boolean;
  onClose: () => void;
  headline: string;
  link: string;
  details: string;
}

const Modal = ({ isActive, onClose, headline, link, details }: ModalParams) => {
  if (!isActive) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <div className="modal-card-title is-size-6">{headline}</div>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">{details}</section>
        <footer className="modal-card-foot">
          <div className="modal-card-body is-size-7">{"Source : " + link}</div>
          <button className="button" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
