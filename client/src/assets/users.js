// Dummy user data with profile pictures and full names
// Usage example:
// import users from "./assets/users";
// users.map(u => <img src={u.avatar} alt={u.fullName} />)

import alison from "./profile_alison.png";
import enrique from "./profile_enrique.png";
import marco from "./profile_marco.png";
import martin from "./profile_martin.png";
import richard from "./profile_richard.png";

const users = [
  { id: 1, fullName: "Alison Parker", avatar: alison ,bio: "I'm a software engineer",},
  { id: 2, fullName: "Enrique Gomez", avatar: enrique ,bio: "I'm a software engineer", },
  { id: 3, fullName: "Marco Rossi", avatar: marco ,bio: "I'm a software engineer",},
  { id: 4, fullName: "Martin Hughes", avatar: martin ,bio: "I'm a software engineer", },
  { id: 5, fullName: "Richard Kim", avatar: richard ,bio: "I'm a software engineer",},
];

export default users;