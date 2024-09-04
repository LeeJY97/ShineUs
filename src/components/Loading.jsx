import { BeatLoader } from "react-spinners";
import styled from "styled-components";

const Loading = () => {
  return (
    <StyledContainer>
      <BeatLoader color="#9747FF" margin={5} size={15} />
    </StyledContainer>
  );
};

export default Loading;

const StyledContainer = styled.div``;
