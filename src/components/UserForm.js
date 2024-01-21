import React, { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";

const UserForm = () => {
  const [localMsg, setLocalMsg] = useState("");
  const { user, setUser } = useContext(UserContext);

  //   useEffect(() => {
  //     console.log(user);
  //     console.log(user.listArr.length);
  //   }, [user]);

  //   useEffect(() => {
  //     console.log(localMsg);
  //   }, [localMsg]);
  //
  const handleAdd = () => {
    if (user.isAuthenticated) {
      setUser({
        ...user,
        listArr: [
          ...user.listArr,
          { id: user.listArr.length === 0 ? 0 : user.listArr[user.listArr.length - 1].id + 1, localMsg: localMsg },
        ],
      });
      setLocalMsg("");
    } else {
      alert("User is not Logged in. Please log in first");
    }
  };

  const handleClear = () => {
    if (user.isAuthenticated) {
      setUser({ ...user, listArr: [] });
    } else {
      alert("User is not Logged in. Please log in first");
    }
  };
  const handleRemove = (removeItem) => {
    setUser({...user, listArr : user.listArr.filter(item => item.id !== removeItem.id)})
  };
  //
  return (
    <div>
      <h5 id="current-user">
        Current user:{user.name}, isAuthenticated: {user.isAuthenticated?"Yes":"No"}
      </h5>
      <form onSubmit={(e) => {e.preventDefault();}}>
        
        <button 
          id="login-btn"
          onClick={() =>setUser({ ...user, isAuthenticated: true, name: "Ted" })}
        > Login </button>
        
        <button
          id="signout"
          onClick={() => setUser({ ...user, isAuthenticated: false, name: "" })}
        > SignOut </button>
        
        <input
          id="shopping-input"
          type="text"
          placeholder="enter text"
          style={{ display: "block" }}
          onChange={(e) => setLocalMsg(e.target.value)}
          value={localMsg}
        />

        <button onClick={() => handleAdd()}>Add</button>
        <button id="clear-list" onClick={() => handleClear()}>Clear List</button>
        </form>
        <ul>
        {
          user.listArr.length !== 0 && user.listArr.map((item) => (
              <li 
                key={item.localMsg}
                id={`item-${item.localMsg}`} 
              >
                  <button
                    id={`remove-${item.localMsg}`}
                    onClick={() => handleRemove(item)}
                  > 
                  Remove 
                  </button>
                  <span > 
                    {item.localMsg} 
                  </span>
              </li>
            ))
        }  
        </ul>        
      
    </div>
  );
};

export default UserForm;
