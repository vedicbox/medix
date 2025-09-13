import ImgReplacer from "components/placeholder/ImgReplacer";

const imgDetails = {
  src: "https://cdn-icons-png.flaticon.com/512/9733/9733327.png",
  heading: "Thank you for visit",
};

export default function MovePage() {
  return (
    <>
      <ImgReplacer {...imgDetails} />
    </>
  );
}
