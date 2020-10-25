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
      {/* {posts.map((post, index) => {
        // const min = currentPageNum * 5;
        // const max = (currentPageNum + 1) * 5;
        return (
          <li key={post.id}>
            <Link href="/post/[postId]" as={`/post/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        );
      })} */}
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
