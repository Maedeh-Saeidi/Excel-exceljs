import { useEffect, useState } from "react";
import axios from "axios";
import TableElements from "./TableElements";
import ExportButton from "./ExportButton";
import Flat from "./Flat";

export default function Table({
  isLoading,
  setIsLoading,
  isPresenting,
  setIsPresenting,
}) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImp0aSI6IjFhNDYxNjdkLTQyYzktNDhkNC04Y2Q2LTc4YWZkN2JkM2I2OSIsInBob25lIjoiMDAwMDAwMDAwMDAiLCJuYXRpb25hbElkIjoiMDAwMDAwMDAwMCIsInV1aWQiOiIyNTQ0ZDIyMy1iODMyLTQ0MGMtYmQxNy05OTQ0M2QyM2VjZGMiLCJmYWNpbGl0eUlkIjo2MiwiaXNBY3RpdmUiOnRydWUsInBlcm1pc3Npb25zIjpbIlN5c3RlbS5BZG1pbiIsIkZhY2lsaXR5LkFkbWluIl0sImlhdCI6MTcwODE1OTAxNiwiZXhwIjoxNzA4NTkzMDE2fQ.RLxtfOaSHCBeVwyNl-DFKEwkiXJIdKdMc7bPfFpb1Gc";

        const res = await axios.get(
          "https://bims.ngn-net.net/bims-api/location/25778?type=BOX",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserInfo(res.data.data);
        setIsLoading(false);
        setIsPresenting(true);
      } catch (err) {
        console.log("error happened", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {!isLoading && isPresenting && (
        <ExportButton userInfo={userInfo}></ExportButton>
      )}
      {/* <TableElements userInfo={userInfo} isLoading={isLoading} /> */}
      {/* {!isLoading && <Flat userInfo={userInfo} isLoading={isLoading}></Flat>} */}
    </div>
  );
}
