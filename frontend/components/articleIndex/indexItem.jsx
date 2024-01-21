
import './articleIndexItem.css'
import { useNavigate } from 'react-router-dom';

const IndexItem = ({article, author}) => {
  const navigate = useNavigate();

  const handleNavClick = (e) => {
    e.preventDefault();
    navigate(`article/${article.id}`)
  }


  const originalDate = new Date(article.createdAt);

  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    originalDate
  );
  

    return (
      <div className="indexItem">
        <div className="indexItemContainer">
          <div className="userBarIndex">
            <div className="userPhotoContainer">
              <img
                className="userPhoto"
                src={author && author.photoUrl}
                alt=""
              />
            </div>
            <div className="indexItemAuthorNameDiv">
              <span className="indexItemAuthorName">
                {author && author.username}
              </span>
            </div>
            <div className="createdAt">
              <span>{".  " + formattedDate}</span>
            </div>
          </div>
          <div className="indexItemTitleDiv" onClick={handleNavClick}>
            <h2 className="indexItemTitle">{article.title}</h2>
          </div>
          <div className="indexItemBodyDiv" onClick={handleNavClick}>
            <p className="indexItemBody">
              {article.body.slice(0, 150) + "..."}
            </p>
          </div>
          <div className="indexItemFooter">
            <div className="indexItemFooterLeftDiv">
              <span className="indexItemFooterSpan">Topic</span>
              <span className="indexItemFooterSpan">8 Minute Read</span>
            </div>
            <div className="indexItemFooterRightDiv">
              <span className="indexItemFooterSpan">Save Icon</span>
            </div>
          </div>
        </div>
          <div className="index imageContainer">
            <img onClick={handleNavClick} className="indexImage" src={article.photoUrl} alt="" />
          </div>
      </div>
    );
}


export default IndexItem