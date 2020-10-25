import { useEffect } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Page from "../src/components/Page";

const index = ({ posts }) => {
  // useEffect(() => console.log("this is home page"), []);
  // console.log(posts.length);
  return (
    <div>
      <h1>Jsonplaceholder</h1>
      <Page posts={posts} />
    </div>
  );
};

export async function getStaticProps() {
  let res = await fetch("https://jsonplaceholder.typicode.com/posts");
  let posts = await res.json();

  return { props: { posts } };
}

export default index;
