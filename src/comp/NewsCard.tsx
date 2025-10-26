import { useState } from "react";
import Modal from "./Modal";

interface newsCardType {
  headline: string;
  news: string;
  link: string;
}

function NewsCard({ headline, news, link }: newsCardType) {
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
          <p>{headline}</p>
          <button className="delete" aria-label="delete"></button>
        </div>
        <div className="message-body">
          <a id="news" onClick={handleOpenModal}>
            {news.split(".").slice(0, 4).join(". ").concat(".")}
          </a>
          <Modal
            isActive={isModalActive}
            onClose={handleCloseModal}
            headline={headline}
            link={link}
            details={news}
          />
        </div>
      </article>
    </>
  );
}

export default NewsCard;
