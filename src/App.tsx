import ClaudeChef from "./chef/ClaudeChef";
import MemeGenerator from "./MemeGenerator";
import NotificationChallenge from "./NotificationChallenge";
import PageForForm from "./PageForForm";
import PageForUseState from "./PageForUseState";

function App() {
  return (
    <main className="p-4 mx-auto max-w-7xl">
      {/* <ClaudeChef />
      <NotificationChallenge />
      <PageForForm />
      <PageForUseState /> */}
      <MemeGenerator/>
    </main>
  );
}

export default App;
