import { useEffect } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

const index = ({ posts }) => {
  // useEffect(() => console.log("this is home page"), []);
  return (
    <div>
      <h1>Jsonplaceholder</h1>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/post/${post.id}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
      <style jsx>
        {`
          h1 {
            width: 100%;
          }
          li {
            list-style: none;
            margin-bottom: 1em;
          }
          a {
            text-decoration: none;
            color: black;
          }
        `}
      </style>
    </div>
  );
};

export async function getStaticProps() {
  let res = await fetch("https://jsonplaceholder.typicode.com/posts");
  let posts = await res.json();
  return { props: { posts } };
}

export default index;
