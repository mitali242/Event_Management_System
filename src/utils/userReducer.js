const userReducer = (state = {},action) => {
    switch (action.type) {
    case 'UPDATE_NAME':
        return {
            name: action.name
        }
        default:
            return
    }
}
export default userReducer;