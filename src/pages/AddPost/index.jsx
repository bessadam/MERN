import React from "react";
import styles from "./AddPost.module.scss";
// mui
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
// MDE assets
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
// redux
import { selectIsAuth } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import axios from "../../axios";
// router
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

export const AddPost = () => {
  const [imageUrl, setImageUrl] = React.useState("");
  const [value, setValue] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");

  const inputFileRef = React.useRef(null);
  const isAuth = useSelector(selectIsAuth);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { id } = useParams();
  const isEditable = React.useRef(pathname.includes("edit"));

  React.useEffect(() => {
    if (isEditable.current) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setTitle(data.title);
        setValue(data.text);
        setTags(data.tags);
        setImageUrl(data.imageUrl);
      });
    }
  }, []);

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (err) {
      console.log(err);
      alert("Error uploading");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        tags,
        text: value,
        imageUrl,
      };

      const { data } = isEditable.current
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields);

      const postId = isEditable.current ? id : data._id;

      navigate(`/posts/${postId}`);
    } catch (err) {
      console.log(err);
      alert("Error by uploading new article");
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Type text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Load preview
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Delete
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Article title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={value}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditable.current ? "Edit" : "Submit"}
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
