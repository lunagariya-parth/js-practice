function PasswordManager() {
    let passwords = {};
  
    function setPassword(username, password) {
      passwords[username] = password;
      console.log(`Password set for ${username}`);
    }
  
    function getPassword(username) {
      return passwords[username];
    }
  
    function getAllPasswords() {
      return passwords;
    }
  
    return {
      setPassword,
      getPassword,
      getAllPasswords,
    };
  }
  
  
  
  const passwordManager = PasswordManager();
  
  passwordManager.setPassword("user1", "password123");
  passwordManager.setPassword("user2", "securePass");
  
  console.log(passwordManager.getPassword("user1")); // Output: password123
  console.log(passwordManager.getAllPasswords()); // Output: { user1: 'password123', user2: 'securePass' }
  