const ReducerUser = (state = false, action) => {
    switch (action.type) {
      case "reload":
        return action.status;
      default:
        return state;
    }
  };
  
  export default ReducerUser;