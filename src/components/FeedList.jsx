import styled from "styled-components";
import FeedCard from "./FeedCard";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

const FeedList = () => {
  // const [feedData, setFeedData] = useState(SHINE_DATA.sort(() => Math.random() - 0.5).slice(0, 10));

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) {
        console.log("error=>", error);
      } else {
        console.log("data=>", data);
        setPosts(data);
      }
    };
    fetchdata();
  }, []);

  // 삭제
  const handleDelete = (id) => {
    setPosts(posts.filter((item) => item.id !== id));
  };

  // 수정
  const handleEdit = (id, newContents) => {
    setPosts(posts.map((item) => (item.id === id ? { ...item, contents: newContents } : item)));
  };

  return (
    <StyledContainer>
      {posts.map((card) => (
        <FeedCard key={card.id} data={card} onDelete={handleDelete} onEdit={handleEdit} />
      ))}
    </StyledContainer>
  );
};

export default FeedList;

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 100%;
  padding: 20px;
`;
