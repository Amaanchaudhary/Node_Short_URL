import User from "../models/user.js";

export const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.end(`
    <html>
    <title>Error signup</title>
    <head>
    </head>
    <body>
        <h1>All Field are Mandatory</h1>
    </body>
    </html>
    `);
  }

  await User.create({
    name,
    email,
    password,
  });

  return res.render("home");
};
