const SET_SEARCH_TEXT = "search/SET_SEARCH_TEXT" as const;
const CLEAR_SEARCH_TEXT = "search/CLEAR_SEARCH_TEXT" as const;
const SET_CURRENT_PAGE = "search/SET_CURRENT_PAGE" as const;
const SET_DATA_COUNT = "search/SET_DATA_COUNT" as const;

// 인터페이스
interface IState {
  searchText: string;
  currentPageNumber: number;
  dataCount: number;
}

//액션 생성 함수
export const setSearchText = (searchText: string) => ({
  type: SET_SEARCH_TEXT,
  payload: { searchText: searchText },
});
export const clearSearchText = () => ({
  type: CLEAR_SEARCH_TEXT,
});

export const setCurrentPageNumber = (currentPageNumber: number) => ({
  type: SET_CURRENT_PAGE,
  playload: { currentPageNumber: currentPageNumber },
});

export const setDataCount = (count: number) => ({
  type: SET_DATA_COUNT,
  payload: { dataCount: count },
});

type ActionSearchReducer =
  | ReturnType<typeof setSearchText>
  | ReturnType<typeof clearSearchText>
  | ReturnType<typeof setCurrentPageNumber>
  | ReturnType<typeof setDataCount>;

// 초기값 선언
const initialState: IState = {
  searchText: "",
  currentPageNumber: 1,
  dataCount: 0,
};

//current routes를 추가해야할까?

//리듀서 선언
export default function searchReducer(
  state = initialState,
  action: ActionSearchReducer
) {
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
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPageNumber: action.playload.currentPageNumber,
      };
    case SET_DATA_COUNT:
      return {
        ...state,
        dataCount: action.payload.dataCount,
      };
    default:
      return state;
  }
}
