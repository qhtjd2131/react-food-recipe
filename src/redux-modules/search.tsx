const SET_SEARCH_TEXT = "search/SET_SEARCH_TEXT" as const;
const CLEAR_SEARCH_TEXT = "search/CLEAR_SEARCH_TEXT" as const;

// 인터페이스
interface IState {
  searchText: string;
}

//액션 생성 함수
export const setSearchText = (searchText: string) => ({
  type: SET_SEARCH_TEXT,
  payload: { searchText: searchText },
});
export const clearSearchText = () => ({
  type: CLEAR_SEARCH_TEXT,
});

type Action =
  | ReturnType<typeof setSearchText>
  | ReturnType<typeof clearSearchText>;

// 초기값 선언
const initialState: IState = {
  searchText: "",
};

//리듀서 선언
export default function searchReducer(state = initialState, action: Action) {
  switch (action.type) {
    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload.searchText,
      };
    case CLEAR_SEARCH_TEXT:
      return {
        ...state,
        searchText: "",
      };
    default:
      return state;
  }
}
