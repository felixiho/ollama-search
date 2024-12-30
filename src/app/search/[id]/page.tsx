import SearchPage from "./SearchPage";

type Props = {
  params: { id: string };
};

export default function Search({ params: { id } }: Props) {
  return <SearchPage id={id} />;
}
