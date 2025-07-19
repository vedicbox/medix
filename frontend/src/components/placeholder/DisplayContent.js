export default function DisplayContent({ valid1, content, children }) {
  return valid1 ? children : content;
}
