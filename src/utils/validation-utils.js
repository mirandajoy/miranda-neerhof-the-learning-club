const emailFormat =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const validateEmail = (email) => {
  if (!email) return "An email is required for sign up";
  else if (!email.match(emailFormat)) return "This is not a valid email address";
  else return null;
};

export const validatePassword = (password) => {
  if (!password) return "A password is required for sign up";
  else if (password.length < 8) return "Your password must be at least 8 characters long";
  else return null;
};

export const validateSignUp = (input) => {
  const { name, email, password } = input;

  return {
    nameError: !name ? "A name is required for sign up" : null,
    emailError: validateEmail(email),
    passwordError: validatePassword(password),
  };
};
