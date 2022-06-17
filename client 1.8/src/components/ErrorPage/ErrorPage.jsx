import React from "react";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";

export function ErrorPage() {
  return (
    <div>
      <ErrorAlert
        msg="Algo salió mal."
        code="404"
      />
    </div>
  );
}
