const users = [];

const trimAndLowerCase = (str) => {
  return str.trim().toLowerCase();
};

const addUser = ({ id, name, room }) => {
  name = trimAndLowerCase(name);
  room = trimAndLowerCase(room);
  const user = { id, name, room };
  users.push(user);
  return user;
};

const editUser = (id, name) => {
  const userIndex = users.findIndex((userObj) => userObj.id === id);
  users[userIndex].name = name;
  return users[userIndex];
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index != -1) {
    return users.splice(index, 1)[0];
  }
};

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getUser = (id) => users.find((user) => user.id === id);

module.exports = { addUser, editUser, removeUser, getUsersInRoom, getUser };
