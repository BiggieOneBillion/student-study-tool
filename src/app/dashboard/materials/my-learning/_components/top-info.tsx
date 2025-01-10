type TopInfoType = {
  topic: string;
  level: string;
};
const TopInfo = ({ topic, level }: TopInfoType) => {
  return (
    <section className="flex items-center gap-3">
      {/* topic */}
      <div className="flex items-center gap-2">
        <p className="text bg-black/70y text-whitey rounded-sm border px-2 text-base font-semibold">
          Topic:
        </p>
        <p>{topic}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text bg-black/70y text-whitey rounded-sm border px-2 text-base font-semibold">
          Level:
        </p>
        <p>{level}</p>
      </div>
    </section>
  );
};

export default TopInfo;
