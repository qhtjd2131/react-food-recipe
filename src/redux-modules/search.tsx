import { Hit } from "../components/type2";

const SET_SEARCH_TEXT = "search/SET_SEARCH_TEXT" as const;
const CLEAR_SEARCH_TEXT = "search/CLEAR_SEARCH_TEXT" as const;
const SET_CURRENT_PAGE = "search/SET_CURRENT_PAGE" as const;
const SET_DATA_COUNT = "search/SET_DATA_COUNT" as const;
const ADD_EXIST_DATA = "search/ADD_EXIST_DATA" as const;
const SET_NEXT_LINK = "search/SET_NEXT_LINK" as const;
const CLEAR_EXIST_DATA = "search/CLEAR_EXIST_DATA" as const;
const SET_FOODITEMS = "search/SET_FOODITEMS" as const;
const ADD_FOODITEMS = "search/ADD_FOODITEMS" as const;
const SET_IS_LOADING = "search/SET_IS_LOADING" as const;
const SET_IS_LIMITED_CALL = "search/SET_IS_LIMITED_CALL" as const;
const SET_IS_ZERO_DATA = "search/SET_IS_ZERO_DATA" as const;

// 인터페이스
interface IState {
  searchText: string;
  currentPageNumber: number;
  dataCount: number;
  existData: IExistData;
  nextLink: string;
  isLoading: boolean;
  isLimitedCall: boolean;
  isZeroData : boolean;
  foodItems: Hit[][] | [];
}
interface IExistData {
  [key: number]: { exist: boolean };
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

export const addExistData = (key: number, value: boolean) => ({
  type: ADD_EXIST_DATA,
  payload: {
    existData: { [key]: { exist: value } },
  },
});

export const clearExistData = () => ({
  type: CLEAR_EXIST_DATA,
});

export const setNextLink = (nextLink: string) => ({
  type: SET_NEXT_LINK,
  payload: { nextLink: nextLink },
});

export const setFoodItems = (foodItems: Hit[][] | []) => ({
  type: SET_FOODITEMS,
  payload: { foodItems: foodItems },
});

export const addFoodItems = (foodItems: Hit[][]) => ({
  type: ADD_FOODITEMS,
  payload: { foodItems: foodItems },
});

export const setIsLoading = (bool: boolean) => ({
  type: SET_IS_LOADING,
  payload: { isLoading: bool },
});

export const setIsLimitedCall = (bool: boolean) => ({
  type: SET_IS_LIMITED_CALL,
  payload: { isLimitedCall: bool },
});

export const setIsZeroData = (bool : boolean) => ({
  type : SET_IS_ZERO_DATA,
  payload : {isZeroData : bool}
})

type ActionSearchReducer =
  | ReturnType<typeof setSearchText>
  | ReturnType<typeof clearSearchText>
  | ReturnType<typeof setCurrentPageNumber>
  | ReturnType<typeof setDataCount>
  | ReturnType<typeof addExistData>
  | ReturnType<typeof setNextLink>
  | ReturnType<typeof clearExistData>
  | ReturnType<typeof setFoodItems>
  | ReturnType<typeof addFoodItems>
  | ReturnType<typeof setIsLoading>
  | ReturnType<typeof setIsLimitedCall>
  | ReturnType<typeof setIsZeroData>;

// 초기값 선언
const initialState: IState = {
  searchText: "",
  currentPageNumber: 1,
  dataCount: 0,
  existData: {
    0: {
      exist: false,
    },
  },
  nextLink: "",
  foodItems: [],
  isLoading: true,
  isLimitedCall: false,
  isZeroData : false,
};

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
    case ADD_EXIST_DATA:
      const newExistData = action.payload.existData;
      return {
        ...state,
        existData: { ...state.existData, ...newExistData },
      };
    case CLEAR_EXIST_DATA:
      return {
        ...state,
        existData: { 0: { exist: false } },
      };
    case SET_NEXT_LINK:
      return {
        ...state,
        nextLink: action.payload.nextLink,
      };
    case SET_FOODITEMS:
      return {
        ...state,
        foodItems: action.payload.foodItems,
      };
    case ADD_FOODITEMS:
      const newFoodItem = action.payload.foodItems;
      return {
        ...state,
        foodItems: [...state.foodItems, ...newFoodItem],
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case SET_IS_LIMITED_CALL:
      return {
        ...state,
        isLimitedCall: action.payload.isLimitedCall,
      };
      case SET_IS_ZERO_DATA:
        return{
          ...state,
          isZeroData : action.payload.isZeroData,
        }
    default:
      return state;
  }
}
