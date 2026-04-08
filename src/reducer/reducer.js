export const initialState = { 
  shows: [], 
  filter: { platform: "All", category: "All Languages", search: "" }, 
  sort: "alphabetical" 
};

export function reducer(state, action) {
  switch (action.type) {
    case "ADD_SHOW": 
      return { 
        ...state, 
        shows: [{ ...action.payload, id: Date.now(), favorite: false }, ...state.shows] 
      };
    case "TOGGLE_FAVORITE":
      return {
        ...state,
        shows: state.shows.map(show => 
          show.id === action.payload ? { ...show, favorite: !show.favorite } : show
        )
      };
    case "SET_FILTER": 
      return { ...state, filter: { ...state.filter, ...action.payload } };
    case "SET_SORT": 
      return { ...state, sort: action.payload };
    default: 
      return state;
  }
}