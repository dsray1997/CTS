import jwtDecode from "jwt-decode";

interface DecodedToken {
  [key: string]: any;
}

function decodeJwt(jwtToken: string): DecodedToken | null {
  try {
    const decodedToken: DecodedToken = jwtDecode(jwtToken);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

export default decodeJwt;