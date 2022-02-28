export default function Logout() {
  window.sessionStorage.removeItem("loginedId");
  window.sessionStorage.removeItem("userNo");
  window.sessionStorage.removeItem("userUrl");
  window.sessionStorage.removeItem("userName");
  window.location.replace("/");
}
