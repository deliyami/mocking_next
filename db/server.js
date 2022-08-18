// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db/db.json");
const middlewares = jsonServer.defaults();

// db.json를 조작하기 위해 lowdb를 사용
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db/db.json");
const db = low(adapter);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// 요청
// server.get("/", (req, res) => {
//   res.send(db.get("todos").value());
// });
// server.delete("/todos", (req, res) => {
//   db.get("todos").remove({ id: 1 }).write();

//   res.send(db.get("todos").value());
// });

server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running");
});
