import React, { useEffect } from "react";
import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function post({ post, comments }) {
  const classes = useStyles();
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return !router.isFallback && Object.keys(post)?.length === 0 ? (
    <div>Page is not found</div>
  ) : (
    <Grid container className={classes.root} spacing={2}>
      <h1>{post?.title}</h1>
      {comments?.map((comment) => (
        <Grid key={comment.id} item xs={6} md={4}>
          <Card>
            <CardContent>
              <p>{comment.body}</p>
              <small>
                <strong>{comment.email}</strong>
              </small>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <style jsx>
        {`
          h1 {
            width: 100%;
          }
        `}
      </style>
    </Grid>
  );
}

export async function getStaticProps(ctx) {
  console.log("fetching...");
  const postRes = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${ctx.params.postId}`
  );
  const commentRes = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${ctx.params.postId}/comments`
  );
  const post = await postRes.json();
  const comments = await commentRes.json();

  return {
    props: {
      post,
      comments,
    },
    // revalidate: 1,
  };
}
export async function getStaticPaths() {
  let paths = new Array(30)
    .fill(null)
    .map((_, index) => ({ params: { postId: `${index + 1}` } }));

  return {
    paths,
    fallback: true,
  };
}

export default post;
