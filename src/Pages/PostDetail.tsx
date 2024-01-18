import { GraphQLResult, generateClient } from "aws-amplify/api";
import { useParams } from "react-router-dom";
import { OnePost, PostData } from "../Types/data";
import { getPost } from "../graphql/queries";
import { useEffect, useState } from "react";
import userimg from "../assets/images/user.jpeg";
import SocialMedia from "../components/SocialMedia";
import BlogPostCard from "../components/BlogPostCard";

export default function PostDetail() {
  const client = generateClient();
  const [post, setPost] = useState<OnePost>();

  const { id } = useParams();
  useEffect(() => {
    const fetchPost = async () => {
      const res: GraphQLResult<any> = await client.graphql({
        query: getPost,
        variables: {
          id: id, // Pass the id as a variable to the query
        },
      });

      console.log(res);
      const postdata: OnePost = res.data.getPost;
      setPost(postdata);
    };

    fetchPost();
  }, []);

  return (
    <div className="flex  w-full  flex-col lg:flex-row p-5">
      <div id="" className="left w-full  lg:w-2/3 mr-2">
        <div>
          <h3 className="font-bold text-md text-blue-500 mb-10 mt-5">
            <span className="pr-1  border-r-2 border-r-gray-600 mr-1">
              Sashika Dulaj
            </span>
            {post?.updatedAt}
          </h3>
        </div>
        <h2 className="mb-10 text-2xl font-bold">{post?.title}</h2>
        <img
          className=" max-w-full mb-10"
          src={`https://serverlessblogger4765849ba144454a9073c0a54dbb0c144656-dev.s3.ap-southeast-2.amazonaws.com/public/${post?.image}`}
          alt=""
        />
        {post?.body && (
          <div
            className="text-left"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        )}
      </div>
      <div id=" " className="right w-full lg:w-1/3 ml-5 mt-0 p-2 text-left">
        <img src={userimg} alt="" className=" max-w-full " />
        <h3 className="font-bold text-xl">Sashika D.</h3>
        <p className="text-sm mt-5 mb-3">
          I am Elliyas A. , Professionally Web Developer & Founder of
          COMPROMATH.
        </p>
        <h3 className="font-semibold text-sm mb-8">READ MORE</h3>
        <h2 className="text-md font-semibold">FOLLOW ME</h2>
        <div className="w-full mt-2" >
         <SocialMedia/>
        </div>
        <div>
           <h2 className="mb-10 mt-20 font-bold text-xl">
           RECOMMENDED POSTS</h2> 
           {post?.category.posts.items.map((postdata,index)=>(
  <BlogPostCard key={index} post={postdata}/>
           ))}
        </div>
      </div>
    </div>
  );
}
