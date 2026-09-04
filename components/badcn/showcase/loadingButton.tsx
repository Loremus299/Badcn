import { useState } from "react";
import LoadingButton from "../loadingButton";

export default function LoadingButtonDemo() {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingButton
      loading={loading}
      onClick={async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLoading(false);
      }}
    >
      Load for 3 seconds.
    </LoadingButton>
  );
}
