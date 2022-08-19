import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, NavLink, Outlet, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { colors } from "./config/styledElements";
import Loader from "./helpers/Loader";
import { Users } from "./interfaces/Interfaces";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${colors.ivory};
`;

const Inner = styled.div`
  display: flex;
  max-width: 1140px;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  height: 600px;
  width: 100%;
  box-shadow: ${colors.lightbluegray} 0px 5px 15px;
`;

const TableHeader = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid ${colors.gray};
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  background-color: ${colors.bluegray};
  color: ${colors.white};
`;

const InnerTable = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  height: 100%;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-width: 50%;
  width: 100%;
  border-right: 1px solid ${colors.bluegray};
  border-radius: 5px 0 0 5px;
  background-color: ${colors.ivory};
`;

const TitleWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  max-width: 360px;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  font-size: 30px;
  font-weight: bold;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-width: 50%;
  width: 100%;
`;

const UsersWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  height: 370px;
  padding: 10px 40px;
  overflow: scroll;
  overflow-x: hidden;
  gap: 10px;
  max-width: 360px;
  width: 100%;

  & a {
    text-decoration: none;
    color: ${colors.coolgray};
  }

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px transparent;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${colors.lighterbluegray};
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.bluegray};
  }
`;

const UsersItems = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 2px solid ${colors.bluegray};
  border-radius: 5px;
  cursor: pointer;
  scale: 1;
  transition: all 0.3s ease;

  &.--active {
    scale: 1.05;
    border: 1px solid ${colors.lighterbluegray};
  }

  :hover {
    scale: 1.05;
    border: 1px solid ${colors.lighterbluegray};
  }
`;
interface AppProps {
  users: Users[];
  isLoading: Boolean;
  isError: Boolean;
}

function App({ users, isLoading, isError }: AppProps) {
  return (
    <Wrapper>
      <Inner>
        {isError && <Navigate to="/error" replace={true} />}
        <Table>
          <TableHeader>Onboarding Tracker</TableHeader>
          <InnerTable>
            <LeftSide>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <TitleWrapper>
                    <Title>Users</Title>
                  </TitleWrapper>
                  <UsersWrapper>
                    {users?.map((user) => (
                      <NavLink to={`/users/${user.id}`} key={user.id}>
                        {({ isActive }) => (
                          <UsersItems
                            className={isActive ? "--active" : ""}
                            key={user?.id}
                          >
                            {user.name}
                          </UsersItems>
                        )}
                      </NavLink>
                    ))}
                  </UsersWrapper>
                </>
              )}
            </LeftSide>
            <RightSide>
              <Outlet />
            </RightSide>
          </InnerTable>
        </Table>
      </Inner>
    </Wrapper>
  );
}

export default App;
