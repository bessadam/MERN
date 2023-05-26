import React from "react";
// components
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
// redux
import axios from "../axios";
// custom hooks
import { useParams } from "react-router-dom";
// Markdown assets
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("data", data);

  if (isLoading) {
    return <Post isLoading={isLoading} isEditable />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isEditable
      >
        <ReactMarkdown children={data.text} />
      </Post>
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
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
