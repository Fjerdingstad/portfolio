import React from "react";

import UsersTable from "./UsersTable";

const UsersList = ({ users_simplified, deleteUser_simplified }) => {
  return (
    <>
      <UsersTable
        users_simplified={users_simplified}
        deleteUser_simplified={deleteUser_simplified}
      />
    </>
  );
};

export default UsersList;
