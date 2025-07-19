import { Grid } from "@mui/material";
import ShadeCard from "components/card/ShadeCard";

export default function FinancePage() {
  return (
    <>
      <div className="p-relative">
        <Grid container>
          <Grid item size={6}>
            <ShadeCard />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
