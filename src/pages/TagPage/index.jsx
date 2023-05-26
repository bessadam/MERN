import React from "react";
import styles from "./TagPage.module.scss";
// mui
import Grid from "@mui/material/Grid";
// components
import { Post } from "../../components/Post";
import { TagsBlock } from "../../components/TagsBlock";
// redux 
import { useSelector } from "react-redux";
import axios from "../../axios";
// router
import { useParams } from "react-router-dom";

function TagPage() {
  const [posts, setPosts] = React.useState([]);
  const [tags, setTags] = React.useState([]);

  const isPostsLoading = React.useRef(true);
  const isTagsLoading = React.useRef(true);

  const userData = useSelector((state) => state.auth.data);
  const { tag } = useParams();

  React.useEffect(() => {
    axios.get(`/posts`).then(({ data }) => {
      setPosts(data.filter((item) => item.tags.includes(tag)));
      isPostsLoading.current = false;
    });

    axios.get(`/tags`).then(({ data }) => {
      setTags(data);
      isTagsLoading.current = false;
    });
  }, [tag]);

  return (
    <div className={styles.tagPage}>
      <h1>#{tag}</h1>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading.current ? [...Array(5)] : posts).map((obj, index) =>
            isPostsLoading.current ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                key={obj._id}
                imageUrl={
                  obj.imageUrl && `http://localhost:4444${obj.imageUrl}`
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags} isLoading={isTagsLoading.current} />
        </Grid>
      </Grid>
    </div>
  );
}

export { TagPage };
