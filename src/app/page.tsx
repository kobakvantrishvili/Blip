import Nav from "@/components/nav/Nav";
import Collection from "@/components/collection/Collection";

export default function Page() {
  return (
    <div className={`bg-dark-bg min-h-screen flex flex-col`}>
      <Nav />
      <Collection />
    </div>
  );
}
