const TOGGLE_IS_SUBMITTING = 'TOGGLE_IS_SUBMITTING';
const TOGGLE_IS_AUTO_SUBMITTING = 'TOGGLE_IS_AUTO_SUBMITTING';
const SET_COUNT_AUTO_SUBMITTING = 'SET_COUNT_AUTO_SUBMITTING';
const DECREASE_COUNT_AUTO_SUBMITTING = 'DECREASE_COUNT_AUTO_SUBMITTING';
const TOGGLE_IS_CANCEL_AUTO_SUBMITTING = 'TOGGLE_IS_CANCEL_AUTO_SUBMITTING';

const initialState = {
    isSubmitting: false,
    isAutoSubmitting: false,
    isCancelAutoSubmitting: false,
    countAutoSubmitting: 0
};

const labReducer = (state = initialState, action) => {
    // debugger;
    switch (action.type) {
        case 'TOGGLE_IS_SUBMITTING':
            return {...state, isSubmitting: action.isSubmitting};
        case 'TOGGLE_IS_AUTO_SUBMITTING':
            return {...state, isAutoSubmitting: action.isAutoSubmitting};
        case 'SET_COUNT_AUTO_SUBMITTING':
            return {...state, countAutoSubmitting: action.countAutoSubmitting};
        case 'DECREASE_COUNT_AUTO_SUBMITTING':
            return {...state, countAutoSubmitting: (state.countAutoSubmitting-1)};
        case 'TOGGLE_IS_CANCEL_AUTO_SUBMITTING':
            return {...state, isCancelAutoSubmitting: action.isCancelAutoSubmitting};
        default:
            return state;
    }
};


export const toggleIsSubmitting = (isSubmitting) => ({type: TOGGLE_IS_SUBMITTING, isSubmitting});
export const toggleIsAutoSubmitting = (isAutoSubmitting) => ({type: TOGGLE_IS_AUTO_SUBMITTING, isAutoSubmitting});
export const toggleIsCancelAutoSubmitting = (isCancelAutoSubmitting) => ({type: TOGGLE_IS_CANCEL_AUTO_SUBMITTING, isCancelAutoSubmitting});
export const setCountAutoSubmitting = (countAutoSubmitting) => ({type: SET_COUNT_AUTO_SUBMITTING, countAutoSubmitting});
export const decreaseCountAutoSubmitting = () => ({type: DECREASE_COUNT_AUTO_SUBMITTING});

// export const getProfile = (userId) => async (dispatch) => {
//     const response = await userAPI.getProfile(userId);
//     dispatch(setUserData(response.data));
// }

export default labReducer;