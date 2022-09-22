import styled from "styled-components";

export const PostsContainer = styled.div`
  flex: 1;
`;

export const PostsWrapper = styled.div`
  /* padding: 1rem; */
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 90vw;
  max-width: 700px;
  margin: 0 auto;
`;

export const EmptyListText = styled.span`
  text-align: center;
  display: block;
  font-size: 1.125rem;
  font-weight: bold;
`;
