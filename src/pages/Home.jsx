import React from "react";
// mui
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
// components
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";

export const Home = () => {
  const [filterState, setFilterState] = React.useState("new");
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  React.useEffect(() => {
    if (filterState === "new") {
      const newPosts = [...posts.items];
      newPosts.sort(
        (a, b) =>
          Date.now(new Date(b.updatedAt)) - Date.now(new Date(a.updatedAt))
      );
      setFilteredPosts(newPosts);
    } else {
      const popularPosts = [...posts?.items];
      popularPosts.sort((a, b) => b.viewsCount - a.viewsCount);
      setFilteredPosts(popularPosts);
    }
  }, [posts, filterState]);

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={filterState === "new" ? 0 : 1}
        aria-label="basic tabs example"
      >
        <Tab label="New" onClick={() => setFilterState("new")} />
        <Tab label="Popular" onClick={() => setFilterState("popular")} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : filteredPosts).map((obj, index) =>
            isPostsLoading ? (
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
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "User 1",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Some mock comment",
              },
              {
                user: {
                  fullName: "User 2",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "Some mock comment too",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
