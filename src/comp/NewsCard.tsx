interface newsCardType {
  headline: string;
  news: string;
}

function NewsCard({ headline, news }: newsCardType) {
  return (
    <>
      <article className="message is-info">
        <div className="message-header">
          <p>{headline}</p>
          <button className="delete" aria-label="delete"></button>
        </div>
        <div className="message-body">{news}</div>
      </article>
    </>
  );
}

export default NewsCard;
