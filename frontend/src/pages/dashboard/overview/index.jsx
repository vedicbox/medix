import { CardMedia } from "@mui/material";

export default function OverViewPage() {
  return (
    <>
      <div className="p-relative">
        <CardMedia
          className="mx-auto"
          sx={{ paddingTop: { md: "25%", xs: "45%" }, borderRadius: 2 }}
          image="/assets/images/overview_block.svg"
        />
      </div>
    </>
  );
}
