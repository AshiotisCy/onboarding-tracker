import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Todo } from "../interfaces/Interfaces";
import { colors } from "../config/styledElements";
import Loader from "../helpers/Loader";

const TodoWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
`;

const CheckBox = styled.input`
  display: flex;
  cursor: not-allowed;
`;

const Label = styled.label`
  word-break: break-word;
  max-width: 400px;
`;

const Inner = styled.div`
  display: flex;
  max-width: 1140px;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const InnerTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const TitleWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  max-width: 430px;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  font-size: 30px;
  font-weight: bold;
`;

const TodosWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  height: 370px;
  padding: 10px 40px;
  overflow: scroll;
  overflow-x: hidden;
  gap: 10px;

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px bluegray;
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

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isError, setIsError] = useState<Boolean>(false);
  const [isErrorPage, setIsErrorPage] = useState<Boolean>(false);

  const { userId } = useParams();

  const getTodos = async (userId: string | undefined) => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId}/todos`
      );
      setTodos(result.data);
      setIsError(false);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodos(userId);
  }, [userId]);

  useEffect(() => {
    if (todos.length === 0 && !isLoading) {
      setIsErrorPage(true);
    } else {
      setIsErrorPage(false);
    }
  }, [todos, isLoading]);

  return (
    <InnerTable>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {(isErrorPage || isError) && <Navigate to="/error" replace={true} />}
          <TitleWrapper>
            <Title>Todos</Title>
          </TitleWrapper>
          <TodosWrapper>
            {todos?.map((todo) => (
              <Inner key={todo?.id}>
                <TodoWrapper>
                  <CheckBox
                    type="checkbox"
                    checked={todo.completed}
                    disabled
                    onChange={() => {}}
                  />
                  <Label>{todo.title}</Label>
                </TodoWrapper>
              </Inner>
            ))}
          </TodosWrapper>
        </>
      )}
    </InnerTable>
  );
};

export default Todos;
