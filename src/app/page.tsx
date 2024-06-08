import About from "@/components/about/about";
import Nav from "@/components/nav/Nav";

export default function Page() {
  return (
    <div className={`bg-dark-bg scroll-smooth overscroll-contain`}>
      <Nav />
      <About />
    </div>
  );
}
