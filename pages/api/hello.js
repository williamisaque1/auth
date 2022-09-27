// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const crypto = require("crypto");
export default function handler(req, res) {
  let login = [{ email: "willzera@email.com", senha: "123456" }];
  let email = req.body.email;
  let senha = req.body.senha;
  console.log("recebi");
  console.log(req.body);
  let user = login.find((e) => e.email == email && e.senha == senha);
  console.log(user);

  const header = JSON.stringify({
    alg: "HS256",
    typ: "JWT",
  });

  const payload = JSON.stringify({
    email: "willzao@email.com",
    password: "1234",
  });
  const base64Header = Buffer.from(header).toString("base64").replace(/=/g, "");
  const base64Payload = Buffer.from(payload)
    .toString("base64")
    .replace(/=/g, "");
  const secret = "mydsad";

  const data = base64Header + "." + base64Payload;

  const signature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64");

  const signatureUrl = signature
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  console.log(data + "." + signatureUrl);
  user
    ? res.status(200).json({
        name: "willzera",
        email,
        token: data + "." + signatureUrl,
      })
    : res.status(200).json({ token: null });
}
