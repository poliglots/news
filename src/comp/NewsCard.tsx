interface newsCardType {
  headline: string;
  news: string;
  link: string;
}

function NewsCard({ headline, news, link }: newsCardType) {
  return (
    <>
      <article className="message is-info">
        <div className="message-header">
          <p>{headline}</p>
          <button className="delete" aria-label="delete"></button>
        </div>
        <div className="message-body">
          <a id="news" href={link}>
            {news.split(".").slice(0, 4).join(". ").concat(".")}
          </a>
        </div>
      </article>
    </>
  );
}

export default NewsCard;
