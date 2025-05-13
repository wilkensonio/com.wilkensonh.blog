function Divider(text: { text: string }): JSX.Element {
  return (
    <div className="flex items-center justify-between py-5">
      <div className="border-t border-gray-500 w-32"></div>
      <span className="text-gray-500 text-sm">{text.text}</span>
      <div className="border-t border-gray-500 w-32"></div>
    </div>
  );
}

export default Divider;
