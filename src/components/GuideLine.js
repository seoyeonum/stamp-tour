export default function GuideLine({ subTitle, textGuideline }) {
  return (
    <>
      <h3>{subTitle}</h3>
      <ul className="spot-list">
        {textGuideline.map((text) => (
          <li>{text}</li>
        ))}
      </ul>
    </>
  );
}
