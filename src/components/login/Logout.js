import axios from "axios";

export default function Logout() {
  axios.post("/logout");
  window.sessionStorage.removeItem("loginedId");
  window.sessionStorage.removeItem("userNo");
  window.sessionStorage.removeItem("userUrl");
  window.sessionStorage.removeItem("userName");
  window.location.replace("/");
}
