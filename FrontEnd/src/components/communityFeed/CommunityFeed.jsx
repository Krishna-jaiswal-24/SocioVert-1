import Share from "../share/share"
import "./communityfeed.css";
import CommunityPost from "../communityPost/CommunityPost";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function CommunityFeed({username}) {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);
  const id = user._id;

  useEffect((id)=>{
    const fetchPosts = async () => {
      const id = user._id;
      const res = username ?
       await axios.get(`/posts/profile/${username}`)
       : await axios.get(`posts/timeline/${id}`);
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }))
  
    }
    fetchPosts(); 
  },[username, user._id, id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
    {(!username || username === user.username) && <div className="shareBox"><Share/></div>}
   {posts.map(p=>(
       <CommunityPost key = {p._id} post={p}/>
))}
    
      </div>
    </div>
  )
}
