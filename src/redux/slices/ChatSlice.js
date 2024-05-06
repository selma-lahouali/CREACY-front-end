// chatReducer.js
const initialState = {
    chattedUsers: [],
    messages: [],
    // Other chat state properties
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CHATTED_USERS_SUCCESS':
            return { ...state, chattedUsers: action.payload };
        // Other cases for updating chat state based on actions
        default:
            return state;
    }
};

export default chatReducer;
