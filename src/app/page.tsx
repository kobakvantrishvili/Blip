import About from "@/components/about/About";
import Nav from "@/components/nav/Nav";
import Main from "@/components/main/Main";

export default function Page() {
  return (
    <div className={`bg-dark-bg min-h-screen flex flex-col`}>
      <Nav />
      <About />
      <div className="flex-1">
        <Main />
      </div>
    </div>
  );
}
