import { useEffect, useState } from "react";
import "./writeArticleForm.css";
import ProfileButton from "../navigation/ProfileButton";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editArticle } from "../../src/store/article";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getArticle } from "../../src/store/article";

const EditArticle = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submittable, setSubmittable] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.currentUser);
  const errors = useSelector((state) => state.errors.articles);
  const navigate = useNavigate();
  const { articleId } = useParams();
  const [image, setImage] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null); 

  const [imageTypeError, setImageTypeError] = useState(false);
  const validFileTypes = ["image/jpeg", "image/jpg", "image/png"];



 
  //why da heeeek
  const articles = useSelector(state => state.articles)
  const article = articles[articleId]


function replaceNewLines(text) {
  // Replace "/n" with an empty line
  text = text.replace(/\/n/g, "\n");

  // Replace "\\n" with an empty line
  text = text.replace(/\\n/g, "\n");

  return text;
}
  

  useEffect(() => {
    
    if (article) {
      setTitle(article.title);
      let newBody = replaceNewLines(article.body)
      setBody(newBody);
      setImage(article.image)
      setPhotoUrl(article.photoUrl)
    }
  }, [article]);
  
  
  useEffect(() => {
    dispatch(getArticle(articleId));

  }, [articleId, dispatch])

  useEffect(() => {
    if (title !== "" && body !== "") {
      setSubmittable(true);
    } else {
      setSubmittable(false);
    }
  }, [title, body]);

  const handleSubmitMouseEnter = () => {
    if (!submittable) {
      setShowToolTip(true);
    }
  };

  const handleSubmitMouseLeave = () => {
    setShowToolTip(false);
  };

  const handleSubmit = async (e) => {
    console.log(currentUser);
    e.preventDefault();
    const formData = new FormData();
    formData.append("article[title]", title);
    formData.append("article[body]", body);
    formData.append("article[author_id]", currentUser.user.id);
    formData.append('article[id]', article.id)

    if (image) {
      formData.append("article[photo]", image);
    }
    let result = await dispatch(editArticle(formData));

    if (result) {
      navigate(`/article/${result}`);
    }
  };

  console.log("ERRORS", errors);

  const handleFile = (e) => {
    let file = e.target.files[0];
    if (validFileTypes.find((type) => type === file.type)) {
      setImage(file);
      setImageTypeError(false);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => setPhotoUrl(fileReader.result);
    } else {
      setImageTypeError(true);
      setPhotoUrl(null);
    }
  };

  let preview = null;
  if (photoUrl) preview = <img src={photoUrl} className="imagePreview" />;


  return (
    <div className="writeArticleContainer">
      <div className="articleHeader">
        <div className="articleHeaderLeft"></div>
        <div className="articleHeaderRight">
          <Link className="writeArticleHomeLink" to="/">
            Home
          </Link>
          <div className="publishButtonContainer">
            <div
              className={`publishButton ${submittable && "active"}`}
              onMouseEnter={handleSubmitMouseEnter}
              onMouseLeave={handleSubmitMouseLeave}
              onClick={submittable ? handleSubmit : null}
            >
              Publish
            </div>
          </div>
          <ProfileButton></ProfileButton>
        </div>
      </div>
      <div className="articleFormContainer">
        <div className={`tooltip ${showToolTip && "active"}`}>
          Please fill out article before submitting.
        </div>
        <div className="errors">{errors}</div>
        <textarea
          className="formTitleText"
          placeholder="Title"
          cols="39"
          rows="2"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          className="formBodyText"
          placeholder="Tell your story..."
          cols="77"
          rows="15"
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
        {preview}
        <form action="">
          <input type="file" onChange={handleFile} />
        </form>
      </div>
    </div>
  );
};

export default EditArticle;
