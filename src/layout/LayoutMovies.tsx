import { Header } from "../components/Header";
import { Props } from "./models/props";
import './style/layoutMovies.scss';

export function LayoutMovies( props: Props ) {
  return (
    <>
      <Header />

      <div className="container-children">
        { props.children }
      </div>
    </>
  );
}
