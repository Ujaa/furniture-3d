import axios from "axios";
import FormData from "form-data";
import fs from "node:fs";

const payload = {
  image: fs.createReadStream("./cat-statue.png"),
};

const response = await axios.postForm(
  `https://api.stability.ai/v2beta/3d/stable-fast-3d`,
  axios.toFormData(payload, new FormData()),
  {
    validateStatus: undefined,
    responseType: "arraybuffer",
    headers: {
      Authorization: `Bearer sk-MYAPIKEY`,
    },
  }
);

if (response.status === 200) {
  fs.writeFileSync("./3d-cat-statue.glb", Buffer.from(response.data));
} else {
  throw new Error(`${response.status}: ${response.data.toString()}`);
}
