import { useMutation } from "@apollo/client";
import React from "react";
import { AUTH_TOKEN } from "../../constants";
import { UPDATE_USER } from "../../graphQl/mutations";

export default function LeaveBarButton(props) {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const [leaveBar] = useMutation(UPDATE_USER, {
    headers: {
      authorization: `${authToken}`,
    },
    variables: {
      id: Number(props.id),

      currentBar: 0,
    },
    onError: (error) => {
      <p>{error.message};</p>;
    },
    onCompleted: ({ createBar }) => {
      window.location.href = "/";
    },
  });

  return (
    <div>
      <button onClick={leaveBar}>leave bar</button>
    </div>
  );
}
