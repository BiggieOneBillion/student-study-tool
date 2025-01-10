import MyLearningView from "../_components/my-learning-view";

export default async function MyLearningPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <MyLearningView id={id} />;
}
