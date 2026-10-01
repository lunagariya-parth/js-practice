import { useState } from "react";

export default function NotificationChallenge() {
  const [msgs, setMsgs] = useState(["a", "b"]);
  if (msgs.length == 0)
    return (
      <div>
        <p>You're all caught up!</p>
        <button onClick={() => setMsgs((msgs) => [...msgs, "New Message"])}>Add New Message</button>
      </div>
    );

  return (
    <div>
      <p>
        You've {msgs.length} unread message{msgs.length > 1 && "s"}
      </p>
    </div>
  );
}
