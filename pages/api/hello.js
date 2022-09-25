// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let login = [{ email: "willzera@email.com", senha: "123456" }];
  let email = req.body.email;
  let senha = req.body.senha;
  console.log("recebi");
  console.log(req.body);
  let user = login.find((e) => e.email == email && e.senha == senha);
  console.log(user);
  user
    ? res.status(200).json({
        name: "willzera",
        email,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IndpbGwiLCJlbWFpbCI6IndpbGx6ZXJhQGVtYWlsLmNvbSIsInNlbmhhIjoiMTIzNDU2In0.F3dnV6_fxUzzYpjPyZfiTzPYfm8sS7nq4o09LhnVegU",
      })
    : res.status(200).json({ token: null });
}
