import { Header } from "../components/Header";
import { Props } from "./models/props";

export function LayoutMovies( props: Props ) {
  return (
    <>
      <Header />

      <div style={{
        marginTop: "60px"
      }}>
        { props.children }
      </div>
    </>
  );
}
