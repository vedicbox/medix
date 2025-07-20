import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Iconify from "components/icons/Iconify";
import { ICON_NAME } from "values/img-links";

export default function ControlledAccordions(props) {
  const { title, subtitle, children } = props;
  return (
    <div>
      <Accordion variant="outlined">
        <AccordionSummary
          expandIcon={<Iconify icon={ICON_NAME.EXPAND_DOWN} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className="br-bottom"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>{title}</Typography>
          <Typography sx={{ color: "text.secondary" }}>{subtitle}</Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
}
