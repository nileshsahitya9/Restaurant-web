const initialState = {
    isLoading: false,
    invoice:[]
};
console.log("yoooo")

const invoice = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SET_INVOICE":
            return { ...state, ...payload };
        default:
            return state;
    }
};

export default invoice;
