import fs from "fs/promises";

export function setup() {
  fs.access("./uploads")
    .then(() => console.log("Der Upload Ordner ist schon vorhanden"))
    .catch(() => {
      fs.mkdir("./uploads");
    });
}
