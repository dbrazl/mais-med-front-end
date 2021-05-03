import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 130px;
  width: 100%;
  height: calc(100% - 130px);
  overflow-y: scroll;
`;

export const Header = styled.div`
  padding-right: 33px;
  width: calc(100% - 33px);
  display: flex;
  flex-direction: row-gap;
  justify-content: flex-end;
`;

export const AddButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: transparent;
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 21px;
  height: 21px;
  object-fit: contain;
`;

export const Label = styled.p`
  margin-left: 10px;
`;

export const List = styled.ul`
  margin-top: 40px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

export const Item = styled.li`
  margin-bottom: 20px;
  list-style: none;
  width: calc(100% - 40px);
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  cursor: pointer;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Labels = styled.div`
  display: flex;
  align-items: baseline;
`;

export const Alert = styled.p`
  margin-left: 10px;
  color: #ff9900;
  font-size: 12px;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 130px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Illustration = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;

  @media (min-width: 1152px) {
    width: 300px;
    height: 300px;
  }
`;

export const Message = styled.p`
  margin-top: 20px;
`;
