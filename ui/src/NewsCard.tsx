import { useState } from "react";
import Modal from "./Modal";
import type { NewsLog } from "../../crawl/src/store";

function NewsCard({ newsLog }: { newsLog: NewsLog }) {
  const [isModalActive, setIsModalActive] = useState(false);

  const handleOpenModal = () => {
    setIsModalActive(true);
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
  };

  return (
    <>
      <article className="message is-info">
        <div className="message-header">
          <p>{newsLog.headline}</p>
          <button className="button is-small is-info is-light">
            {newsLog.level}
          </button>
        </div>
        <div className="message-body">
          <a id="news" onClick={handleOpenModal}>
            {newsLog.message}
            <br></br>
            <button className="button is-small is-light">
              {new Date(newsLog.updatedAt).toDateString()}
            </button>
          </a>

          <Modal
            isActive={isModalActive}
            onClose={handleCloseModal}
            headline={newsLog.headline}
            link={newsLog.link}
            details={newsLog.details}
          />
        </div>
      </article>
    </>
  );
}

export default NewsCard;
